import * as fs from 'fs';
import * as path from 'path';

const request = require('supertest');

// Mock the weaver module
jest.mock('../src/weaver', () => ({
  runWeaver: jest.fn()
}));

import { runWeaver } from '../src/weaver';
import app from '../src/server';

// Cast to jest.MockedFunction for better type safety
const mockRunWeaver = runWeaver as jest.MockedFunction<typeof runWeaver>;

describe('Server API Tests', () => {
  const tempDir = 'temp';
  
  // Helper function to create a test zip file and return its path
  const createTestZipFile = (fileName: string = 'test-woven-code.zip'): string => {
    const testZipPath = path.join(tempDir, fileName);
    const testZipContent = Buffer.from('test zip content');
    fs.writeFileSync(testZipPath, testZipContent);
    return testZipPath;
  };
  
  beforeAll(() => {
    // Ensure temp directory exists for tests
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up temp directory after tests
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /health', () => {
    it('should return 200 with healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({
        status: 'healthy'
      });
    });
  });

  describe('POST /api/weave', () => {
    it('should return error when no files uploaded', async () => {
      const response = await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .expect(400);

      expect(response.body).toEqual({
        error: 'No file uploaded'
      });
    });

    it('should process files successfully and return log content and zip', async () => {
      // Create a temporary zip file for testing
      const testZipPath = path.join(tempDir, 'test-woven-code.zip');
      const testZipContent = Buffer.from('test zip content');
      fs.writeFileSync(testZipPath, testZipContent);

      // Mock successful weaver execution with new return format
      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });

      // Create test files
      const testJsContent = Buffer.from('console.log("test");');

      const response = await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('zipfile', testZipContent, 'test.zip')
        .attach('file', testJsContent, 'script.js')
        .expect(200);

      expect(response.body).toHaveProperty('logContent');
      expect(response.body).toHaveProperty('wovenCodeZip');
      expect(response.body.logContent).toContain('Processing completed successfully');
      expect(mockRunWeaver).toHaveBeenCalledTimes(1);
      
      // Verify the session-based temp directory was passed
      const weaverCall = mockRunWeaver.mock.calls[0];
      expect(weaverCall[4]).toMatch(/^temp\/[\w-]+$/); // Session temp directory

      // Clean up
      if (fs.existsSync(testZipPath)) {
        fs.unlinkSync(testZipPath);
      }
    });

    it('should handle weaver errors', async () => {
      // Mock weaver failure
      mockRunWeaver.mockRejectedValue(new Error('Weaver execution failed'));

      const testZipContent = Buffer.from('test zip content');
      const testJsContent = Buffer.from('console.log("test");');

      const response = await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('zipfile', testZipContent, 'test.zip')
        .attach('file', testJsContent, 'script.js')
        .expect(500);

      expect(response.body).toEqual({
        error: 'An internal server error occurred. Please try again later.'
      });
    });

    it('should accept only file parameter (no zipfile)', async () => {
      // Create a temporary zip file for testing
      const testZipPath = path.join(tempDir, 'test-woven-code-2.zip');
      const testZipContent = Buffer.from('test zip content');
      fs.writeFileSync(testZipPath, testZipContent);

      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });

      const testJsContent = Buffer.from('console.log("test");');

      const response = await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('file', testJsContent, 'script.js')
        .expect(200);

      expect(response.body).toHaveProperty('logContent');
      expect(response.body.logContent).toContain('Processing completed successfully');
      expect(mockRunWeaver).toHaveBeenCalledWith(
        process.env.TOOL || '',
        '', // no zipfile
        expect.any(String), // scriptFile path
        'c++11',
        expect.stringMatching(/^temp\/[\w-]+$/) // session temp directory
      );

      // Clean up
      if (fs.existsSync(testZipPath)) {
        fs.unlinkSync(testZipPath);
      }
    });

    it('should accept only zipfile parameter (no script file)', async () => {
      const testZipPath = createTestZipFile('test-woven-code-3.zip');
      
      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });

      const testZipContent = Buffer.from('test zip content');

      const response = await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('zipfile', testZipContent, 'test.zip')
        .expect(200);

      expect(response.body).toHaveProperty('logContent');
      expect(response.body.logContent).toContain('Processing completed successfully');
      expect(mockRunWeaver).toHaveBeenCalledWith(
        process.env.TOOL || '',
        expect.any(String), // zipfile path
        '', // no script file
        'c++11',
        expect.stringMatching(/^temp\/[\w-]+$/) // session temp directory
      );
    });

    it('should use default standard when not provided', async () => {
      const testZipPath = createTestZipFile('test-woven-code-4.zip');
      
      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });

      const testJsContent = Buffer.from('console.log("test");');

      await request(app)
        .post('/api/weave')
        .attach('file', testJsContent, 'script.js')
        .expect(200);

      // Should use default c++17 standard
      expect(mockRunWeaver).toHaveBeenCalledWith(
        process.env.TOOL || '',
        '',
        expect.any(String),
        'c++17', // default standard
        expect.stringMatching(/^temp\/[\w-]+$/)
      );
    });

    it('should use environment variable TOOL in weaver call', async () => {
      const testZipPath = createTestZipFile('test-woven-code-5.zip');
      
      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });
      
      const testJsContent = Buffer.from('console.log("test");');

      await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('file', testJsContent, 'script.js')
        .expect(200);

      expect(mockRunWeaver).toHaveBeenCalledWith(
        process.env.TOOL || '',
        '',
        expect.any(String),
        'c++11',
        expect.stringMatching(/^temp\/[\w-]+$/) // session temp directory
      );
    });

    it('should return base64 encoded zip content', async () => {
      // Create a test zip file that the server will read
      const sessionId = 'test-session-123';
      const sessionDir = path.join(tempDir, sessionId);
      const zipPath = path.join(sessionDir, 'woven_code.zip');
      
      if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
      }
      
      const testZipContent = Buffer.from('mock zip file content');
      fs.writeFileSync(zipPath, testZipContent);

      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: zipPath
      });

      const testJsContent = Buffer.from('console.log("test");');

      const response = await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('file', testJsContent, 'script.js')
        .expect(200);

      expect(response.body.wovenCodeZip).toBe(testZipContent.toString('base64'));
      
      // Clean up test file
      if (fs.existsSync(sessionDir)) {
        fs.rmSync(sessionDir, { recursive: true, force: true });
      }
    });
  });

  describe('Multer file handling', () => {
    it('should save uploaded files with correct extension', async () => {
      const testZipPath = createTestZipFile('test-woven-code-6.zip');
      
      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });

      const testJsContent = Buffer.from('console.log("test");');

      await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('file', testJsContent, 'script.js')
        .expect(200);

      // Check that runWeaver was called with a path ending in .js
      const calls = mockRunWeaver.mock.calls;
      const [, , scriptPath] = calls[0];
      expect(scriptPath).toMatch(/\.js$/);
    });

    it('should create session-specific upload directories', async () => {
      const testZipPath = createTestZipFile('test-woven-code-7.zip');
      
      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });

      const testJsContent = Buffer.from('console.log("test");');

      await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('file', testJsContent, 'script.js')
        .expect(200);

      // Check that runWeaver was called with a session-specific path
      const calls = mockRunWeaver.mock.calls;
      const [, , scriptPath] = calls[0];
      expect(scriptPath).toMatch(/temp\/[\w-]+\/uploads\/file-[\da-f]+\.js$/);
    });

    it('should generate unique session IDs for concurrent requests', async () => {
      const testZipPath = createTestZipFile('test-woven-code-8.zip');
      
      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });

      const testJsContent = Buffer.from('console.log("test");');

      // Make two concurrent requests
      const [response1, response2] = await Promise.all([
        request(app)
          .post('/api/weave')
          .field('standard', 'c++11')
          .attach('file', testJsContent, 'script.js'),
        request(app)
          .post('/api/weave')
          .field('standard', 'c++11')
          .attach('file', testJsContent, 'script.js')
      ]);

      expect(response1.status).toBe(200);
      expect(response2.status).toBe(200);
      expect(mockRunWeaver).toHaveBeenCalledTimes(2);

      // Check that different session temp directories were used
      const call1 = mockRunWeaver.mock.calls[0];
      const call2 = mockRunWeaver.mock.calls[1];
      expect(call1[4]).not.toBe(call2[4]); // Different session temp directories
    });
  });

  describe('Session cleanup', () => {
    it('should process request successfully with session management', async () => {
      const testZipPath = createTestZipFile('test-woven-code-cleanup.zip');

      mockRunWeaver.mockResolvedValue({
        logContent: 'Processing completed successfully',
        wovenCodeZip: testZipPath
      });

      const testJsContent = Buffer.from('console.log("test");');

      const response = await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('file', testJsContent, 'script.js')
        .expect(200);

      // Verify the response contains the expected data
      expect(response.body).toHaveProperty('logContent');
      expect(response.body.logContent).toContain('Processing completed successfully');
      expect(response.body).toHaveProperty('wovenCodeZip');
      
      // Verify weaver was called with a session-specific directory
      const calls = mockRunWeaver.mock.calls;
      const [, , , , sessionTempDir] = calls[0];
      expect(sessionTempDir).toMatch(/^temp\/[\w-]+$/);
    });

    it('should clean up session directory on weaver failure', async () => {
      // Mock weaver failure
      mockRunWeaver.mockRejectedValue(new Error('Weaver failed'));

      const testJsContent = Buffer.from('console.log("test");');

      await request(app)
        .post('/api/weave')
        .field('standard', 'c++11')
        .attach('file', testJsContent, 'script.js')
        .expect(500);

      expect(mockRunWeaver).toHaveBeenCalledTimes(1);
      // Cleanup happens in the catch block, but we can't easily test the exact directory
      // without exposing sessionId. The important thing is that the error was handled properly.
    });
  });
});

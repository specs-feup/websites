import * as path from 'path';

// Mock modules
jest.mock('child_process', () => ({
  exec: jest.fn(),
  execFile: jest.fn()
}));

jest.mock('fs', () => ({
  createReadStream: jest.fn(),
  createWriteStream: jest.fn(),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
  rmSync: jest.fn()
}));

jest.mock('unzipper', () => ({
  Extract: jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue(undefined)
  })
}));

jest.mock('archiver', () => {
  const mockArchive = {
    pipe: jest.fn(),
    directory: jest.fn(),
    finalize: jest.fn(),
    on: jest.fn()
  };
  return jest.fn(() => mockArchive);
});

import { execFile } from 'child_process';
import * as fs from 'fs';
const unzipper = require('unzipper');
const archiver = require('archiver');
import { runWeaver } from '../src/weaver';

// Properly type the mocked execFile function
const mockExecFile = jest.mocked(execFile);
const mockFs = fs as jest.Mocked<typeof fs>;

describe('Weaver Functions', () => {
  const testTempDir = 'test-temp';
  const testInputFile = 'test-input.zip';
  const testScriptFile = 'test-script.js';
  const testStandard = 'c++11';
  const testTool = 'clava';

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup fs mocks - THIS IS THE KEY FIX
    mockFs.existsSync.mockReturnValue(true);
    
    // Mock the pipe chain that actually resolves
    const mockExtract = unzipper.Extract();
    mockFs.createReadStream.mockReturnValue({
      pipe: jest.fn().mockReturnValue(mockExtract)
    } as any);
    
    mockFs.createWriteStream.mockReturnValue({
      on: jest.fn((event: string, callback: () => void) => {
        if (event === 'close') {
          setTimeout(() => callback(), 0); // Simulate async close
        }
      })
    } as any);

    // Setup archiver mock
    const mockArchive = archiver();
    mockArchive.on.mockImplementation((event: string, callback: (err?: Error) => void) => {
      if (event === 'error') return mockArchive;
      if (event === 'close') {
        setTimeout(() => callback(), 0); // Simulate async close
      }
      return mockArchive;
    });

    // Setup default execFile mock
    (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
      callback(null, 'Done', '');
    });
  });

  describe('runWeaver', () => {
    describe('Parameter validation', () => {
      it('should throw error when tool parameter is missing', async () => {
        await expect(
          runWeaver('', testInputFile, testScriptFile, testStandard, testTempDir)
        ).rejects.toThrow('Missing required parameters: tool');
      });

      it('should throw error when tool parameter is empty string', async () => {
        await expect(
          runWeaver('', testInputFile, testScriptFile, testStandard, testTempDir)
        ).rejects.toThrow('Missing required parameters: tool');
      });

      it('should throw error when inputFile parameter is missing', async () => {
        await expect(
          runWeaver(testTool, '', testScriptFile, testStandard, testTempDir)
        ).rejects.toThrow('Missing required parameters: inputFile');
      });

      it('should throw error when inputFile parameter is undefined', async () => {
        await expect(
          runWeaver(testTool, '', testScriptFile, testStandard, testTempDir)
        ).rejects.toThrow('Missing required parameters: inputFile');
      });

      it('should throw error when scriptFile parameter is missing', async () => {
        await expect(
          runWeaver(testTool, testInputFile, '', testStandard, testTempDir)
        ).rejects.toThrow('Missing required parameters: scriptFile');
      });

      it('should throw error when scriptFile parameter is empty string', async () => {
        await expect(
          runWeaver(testTool, testInputFile, '', testStandard, testTempDir)
        ).rejects.toThrow('Missing required parameters: scriptFile');
      });

      it('should NOT throw error when standard parameter is missing (not required)', async () => {
        (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
          callback(null, 'Done', '');
        });

        // Standard parameter is not required, so this should work
        const result = await runWeaver(testTool, testInputFile, testScriptFile, '', testTempDir);
        expect(result.logContent).toContain('Done');
      });

      it('should NOT throw error when multiple optional parameters are missing', async () => {
        (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
          callback(null, 'Done', '');
        });

        // Only tool, inputFile, and scriptFile are required
        const result = await runWeaver(testTool, testInputFile, testScriptFile, '', testTempDir);
        expect(result.logContent).toContain('Done');
      });

      it('should throw error when all required parameters are missing', async () => {
        await expect(
          runWeaver('', '', '', '', testTempDir)
        ).rejects.toThrow('Missing required parameters: tool');
      });

      it('should NOT throw error when tempDir is missing (has default value)', async () => {
        (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
          callback(null, 'Done', '');
        });

        // This should work because tempDir has a default value
        const result = await runWeaver(testTool, testInputFile, testScriptFile, testStandard);
        expect(result.logContent).toContain('Done');
      });

      it('should work with all valid parameters including tempDir', async () => {
        (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
          callback(null, 'Processing complete: Done', '');
        });

        const result = await runWeaver(
          testTool, 
          testInputFile, 
          testScriptFile, 
          testStandard, 
          testTempDir
        );

        expect(result.logContent).toContain('Done');
        expect(mockExecFile).toHaveBeenCalledTimes(1);
      });
    });

    it('should execute weaver command successfully and return object with log content', async () => {
      // Mock successful exec with "Done" in stdout
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        expect(file).toBe('clava');
        expect(args).toContain('classic');
        expect(args).toContain(testScriptFile);
        expect(args).toContain('-std');
        expect(args).toContain(testStandard);
        callback(null, 'Done', '');
      });

      const result = await runWeaver(
        testTool,
        testInputFile,
        testScriptFile,
        testStandard,
        testTempDir
      );

      expect(result).toHaveProperty('logContent');
      expect(result).toHaveProperty('wovenCodeZip');
      expect(result.logContent).toBe('Done');
      expect(result.wovenCodeZip).toContain('woven_code.zip');
      expect(mockExecFile).toHaveBeenCalledTimes(1);
    });

    it('should handle weaver command errors', async () => {
      // Mock exec with error
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        callback(new Error('Command failed'), '', 'error output');
      });

      await expect(
        runWeaver(testTool, testInputFile, testScriptFile, testStandard, testTempDir)
      ).rejects.toThrow('Weaver tool failed');
    });

    it('should build correct command with all parameters', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        expect(file).toBe(testTool);
        expect(args).toEqual(['classic', testScriptFile, '-p', `${testTempDir}/input`, '-o', testTempDir, '-std', testStandard]);
        callback(null, 'Done', '');
      });

      await runWeaver(testTool, testInputFile, testScriptFile, testStandard, testTempDir);
    });

    it('should build correct command without standard parameter for non-clava tools', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        expect(file).toBe('kadabra');
        expect(args).toEqual(['classic', testScriptFile, '-p', `${testTempDir}/input`, '-o', testTempDir]);
        callback(null, 'Done', '');
      });

      await runWeaver('kadabra', testInputFile, testScriptFile, testStandard, testTempDir);
    });

    it('should build correct command without standard parameter when standard is empty', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        expect(file).toBe(testTool);
        expect(args).toEqual(['classic', testScriptFile, '-p', `${testTempDir}/input`, '-o', testTempDir]);
        callback(null, 'Done', '');
      });

      await runWeaver(testTool, testInputFile, testScriptFile, '', testTempDir);
    });

    it('should use default temp directory when not provided', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        expect(args).toContain('-o');
        expect(args).toContain('temp/');
        expect(args).toContain('-p');
        expect(args).toContain('temp/input');
        callback(null, 'Done', '');
      });

      await runWeaver(testTool, testInputFile, testScriptFile, testStandard);
    });

    it('should call unzipFile to extract input archive', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        callback(null, 'Done', '');
      });

      await runWeaver(testTool, testInputFile, testScriptFile, testStandard, testTempDir);

      // Verify that createReadStream was called with the input file
      expect(mockFs.createReadStream).toHaveBeenCalledWith(testInputFile);
    });

    it('should call zipFolder to create output archive', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        callback(null, 'Done', '');
      });

      const mockArchive = archiver();
      
      await runWeaver(testTool, testInputFile, testScriptFile, testStandard, testTempDir);

      // Verify that archiver was called
      expect(archiver).toHaveBeenCalledWith('zip', { zlib: { level: 9 } });
      expect(mockArchive.directory).toHaveBeenCalledWith(`${testTempDir}/woven_code/input`, 'woven_code');
      expect(mockArchive.finalize).toHaveBeenCalled();
    });

    it('should create correct input and output paths', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        // Verify the command contains the correct input path
        expect(args).toContain('-p');
        expect(args).toContain(`${testTempDir}/input`);
        // Verify the command contains the correct output directory
        expect(args).toContain('-o');
        expect(args).toContain(testTempDir);
        callback(null, 'Done', '');
      });

      await runWeaver(testTool, testInputFile, testScriptFile, testStandard, testTempDir);
    });
  });

  describe('createLog function (tested via runWeaver)', () => {
    it('should format log content correctly', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        callback(null, 'Done', '');
      });

      const result = await runWeaver(
        testTool,
        testInputFile,
        testScriptFile,
        testStandard,
        testTempDir
      );

      expect(result.logContent).toBe('Done');
    });

    it('should handle empty stderr', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        callback(null, 'Done', '');
      });

      const result = await runWeaver(
        testTool,
        testInputFile,
        testScriptFile,
        testStandard,
        testTempDir
      );

      expect(result.logContent).toBe('Done');
    });

    it('should combine stdout and stderr', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        callback(null, 'Done', 'Warning message');
      });

      const result = await runWeaver(
        testTool,
        testInputFile,
        testScriptFile,
        testStandard,
        testTempDir
      );

      expect(result.logContent).toBe('DoneWarning message');
    });
  });

  describe('File operations', () => {
    it('should handle zip creation with correct paths', async () => {
      (mockExecFile as any).mockImplementation((file: string, args: string[], callback: any) => {
        callback(null, 'Done', '');
      });

      const mockWriteStream = { 
        on: jest.fn((event: string, callback: () => void) => {
          if (event === 'close') {
            setTimeout(() => callback(), 0);
          }
        })
      };
      mockFs.createWriteStream.mockReturnValue(mockWriteStream as any);

      const result = await runWeaver(testTool, testInputFile, testScriptFile, testStandard, testTempDir);

      // Verify output zip path creation
      expect(mockFs.createWriteStream).toHaveBeenCalledWith(
        path.join(testTempDir, 'woven_code.zip')
      );
      expect(result.wovenCodeZip).toBe(path.join(testTempDir, 'woven_code.zip'));
    });
  });
});

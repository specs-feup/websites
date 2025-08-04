# Backend

Node.js/Express API server for the Weaver Web Demo, providing secure file processing and weaver tool execution.

## 🎯 Overview

TypeScript-based backend featuring:
- 📤 **File upload** with session-based temporary storage
- 🔧 **Weaver execution** using `execFile` for security
- 📦 **ZIP processing** for input/output file handling
- 🛡️ **Path traversal protection** and session isolation
- 🧹 **Automatic cleanup** of temporary files

## 🔧 API Endpoints

### `GET /health`
Health check endpoint for Docker container monitoring.

### `POST /api/weave`
Main weaving endpoint with file upload support.

**Request:**
- `multipart/form-data` with optional files:
  - `zipfile` - Input code archive (optional)
  - `file` - JavaScript weaver script (optional)
- `standard` - Language standard (e.g., `c++11`, `c++17`)

**Response:**
```json
{
  "log": "stdout: Done\n\nstderr: ",
  "outputFile": "api/download/session-id/output.zip"
}
```

### `GET /api/download/:sessionId/:filename`
Secure file download with automatic session cleanup.

**Security Features:**
- Session ID validation (`/^[a-zA-Z0-9_-]+$/`)
- Filename validation (`/^[a-zA-Z0-9._-]+$/`)
- Path traversal prevention
- Automatic session directory removal after download

## 🏗️ Architecture

### Core Components

#### **`server.ts`**
- Express server setup with CORS and multer
- Session management with UUID generation
- File upload handling with proper extensions
- Error handling and cleanup

#### **`weaver.ts`**
- Secure weaver tool execution using `execFile`
- ZIP file processing (unzip input, zip output)
- Command construction with proper argument arrays
- Tool-specific parameter handling

### Security Features

- **`execFile` over `exec`**: Prevents command injection attacks
- **Path validation**: Prevents directory traversal
- **Session isolation**: Each request gets unique temporary directory
- **Automatic cleanup**: Old sessions removed after 1 hour
- **Input validation**: Regex validation for IDs and filenames

## 📁 Project Structure

```
backend/
├── src/
│   ├── server.ts           # Express server and API endpoints
│   └── weaver.ts           # Weaver tool execution logic
├── tests/
│   ├── server.test.ts      # API endpoint tests
│   └── weaver.test.ts      # Weaver function tests
├── Dockerfile              # Container configuration
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Testing configuration
└── package.json            # Dependencies and scripts
```

## 🔄 Session Management

Each request creates a unique session:
1. **Session ID**: Generated using `randomUUID().slice(0, 8)`
2. **Temporary directory**: `temp/{sessionId}/`
3. **File uploads**: Stored in `temp/{sessionId}/uploads/`
4. **Cleanup**: Automatic removal after download or 1-hour timeout

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Run Tests
```bash
npm test           # Run all tests
npm run test:watch # Watch mode
npm run test:coverage # Coverage report
```

## 🧪 Testing

Comprehensive test suite covering:
- **API endpoints** with real HTTP requests
- **File upload/download** functionality
- **Session management** and cleanup
- **Security validation** (path traversal, injection)
- **Error handling** scenarios
- **Weaver execution** with mocked tools

Test files use **Jest** with **Supertest** for API testing and proper mocking of external dependencies.

## 🐋 Container Configuration

Built on `node:22` with:
- **Java 17** for weaver tool execution
- **Global tool installation** via npm (`@specs-feup/${TOOL}`)
- **Multi-stage build** for optimized production image
- **Health check** endpoint for container monitoring

Environment variables:
- `TOOL` - Weaver tool name (clava, kadabra, etc...)
- `PORT` - Server port (default: 4000)
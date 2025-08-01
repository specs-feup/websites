import * as fs from 'fs';
import 'dotenv/config';
import * as path from 'path';
import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from 'multer';
import { runWeaver } from './weaver';
import { randomUUID} from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

const tempDir = 'temp';

// Define proper types for multer files
interface MulterFiles {
  zipfile?: Express.Multer.File[];
  file?: Express.Multer.File[];
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const sessionId = (req as any).sessionId;
    const uploadDir = path.join(tempDir, sessionId, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // this attaches the correct file extension to the uploaded file
    // we do this because clava requires the script file to be .js
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + randomUUID().slice(0, 8) + extension);
  }
});

const upload = multer({ storage: storage });

// This intercepts the request to /api/weave, generating a unique session ID for each request.
// Then routes the request to the actual /api/weave endpoint.
app.use('/api/weave', (req, res, next) => {
  (req as any).sessionId = randomUUID().slice(0, 8); // Generate a short session ID
  next();
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Backend listening at http://localhost:${PORT}`);
  });
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

app.post(
  '/api/weave',
  upload.fields([
    { name: 'zipfile', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  (req: Request, res: Response) => {
    console.log('========= ENDPOINT HIT =========');
    console.log('Request received at:', new Date().toISOString());

    const tool = process.env.TOOL;
    const files = req.files as MulterFiles;
    const sessionId = (req as any).sessionId;

    console.log('SessionId:', sessionId);
    console.log('Tool:', tool);
    console.log('Files:', files);

    if (!files || (!files.zipfile && !files.file)) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    console.log('Received request body:', req.body);
    console.log('Args from request:', req.body.args);
    // Get args 
    const inputFile = files?.zipfile?.[0];
    const scriptFile = files?.file?.[0];
    const args = JSON.parse(req.body.args || '[]');
    const sessionTempDir = path.join(tempDir, sessionId);

    console.log('Using args:', args);

    runWeaver(tool || '', inputFile?.path || '', scriptFile?.path || '', args, sessionTempDir)
      .then((result) => {
        console.log('Weaver tool executed successfully');
        
        // Read the zip file
        const zipContent = fs.readFileSync(result.wovenCodeZip);
        
        // Return the log and zipfile content as base64
        res.status(200).json({
          logContent: result.logContent,
          wovenCodeZip: zipContent.toString('base64')
        });
        
        // Clean up session directory after sending files
        if (fs.existsSync(sessionTempDir)) {
          fs.rmSync(sessionTempDir, { recursive: true, force: true });
        }
      })
      .catch((error) => {
        console.error('Weaver error:', error);
        
        // Clean up session directory on weaver failure
        if (fs.existsSync(sessionTempDir)) {
          fs.rmSync(sessionTempDir, { recursive: true, force: true });
        }
        
        res.status(200).json({ 
          logContent: error || 'Weaver failed',
          wovenCodeZip: null
        });
      });
  }
);

export default app;

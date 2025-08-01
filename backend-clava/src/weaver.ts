/*
This file provides the functions needed to Weave the input files received by the backend server.
*/

import * as fs from 'fs';
import * as path from 'path';
import unzipper from 'unzipper';
import archiver from 'archiver';
import { execFile } from 'child_process';

/**
 * Unzips a zip file to a target directory using unzipper.
 * @param zipPath - Path to the zip file.
 * @param targetDir - Directory to extract to.
 * @returns Promise<void>
 */
async function unzipFile(zipPath: string, targetDir: string): Promise<void> {
    await fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: targetDir }))
        .promise();
}

/**
 * Zips a folder to a specified output path using archiver.
 * @param sourceFolder Source folder to zip
 * @param outPath Output path for the zip file
 * @returns Promise<void>
 */
function zipFolder(sourceFolder: string, outPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const output = fs.createWriteStream(outPath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => resolve());
        archive.on('error', (err: Error) => reject(err));

        archive.pipe(output);
        // Include the folder itself in the zip with the name "woven_code"
        archive.directory(sourceFolder, 'woven_code');
        archive.finalize();
    });
}

/**
 * 
 * @param tool The Weaver tool to use (e.g., 'clava')
 * @param inputFile The input file to weave, which is a zip file that will be unzipped
 * @param scriptFile The javascript file to use for weaving
 * @param args The Arguments to use for weaving (e.g., '-std c++11')
 * @param tempDir The temporary directory to use for input and output files (default is 'temp/')
 * @returns A promise that resolves to an object with log content string and path to woven code zip
 */
async function runWeaver(
    tool: string, 
    inputFile: string, 
    scriptFile: string, 
    args: string[], 
    tempDir: string = 'temp/'
){

    console.log('=== runWeaver called ===');
    console.log('tool:', tool);
    console.log('inputFile:', inputFile);
    console.log('scriptFile:', scriptFile);
    console.log('args:', args);
    console.log('tempDir:', tempDir);
    // Throw error if any of the required parameters are missing
    if (!tool) {
        throw new Error("Missing required parameters: tool");
    }
    if (!inputFile) {
        throw new Error("Missing required parameters: inputFile");
    }
    if (!scriptFile) {
        throw new Error("Missing required parameters: scriptFile");
    }

    // Create the input and output directories
    const inputPath = path.join(tempDir, "input");
    await unzipFile(inputFile, inputPath);
    const resultFolderName = 'woven_code';

    const finalArgs = [tool, 'classic', scriptFile, '-p', inputPath, '-o', tempDir, ...args];

    console.log(`Running command: npx ${finalArgs.join(' ')}`);

    let logContent = '';

    await new Promise<void>((resolve, reject) => {
        execFile("npx", finalArgs, (error, stdout, stderr) => {
            // Concatenate stdout, stderr and error for the log
            logContent = stdout + '\n\n' + stderr + '\n' + error + '\n\n';
            
            if (error) {
                // If the process itself failed, a.k.a exit code is not 0
                reject(logContent);
            } else if (stderr && /error/i.test(stderr)) {
                // If stderr contains an error message
                reject(logContent);
            } else {
                resolve();
            }
        });
    });

    const outputZipPath = path.join(tempDir, `${resultFolderName}.zip`);
    
    // Zip the 'input' folder inside the 'woven_code' folder, but name it 'woven_code' in the ZIP
    const inputFolderInWovenCode = path.join(tempDir, resultFolderName, 'input');
    await zipFolder(inputFolderInWovenCode, outputZipPath);

    // Return the log content directly and path to zip file
    return {
        logContent: logContent,
        wovenCodeZip: outputZipPath
    };
}

export {
    runWeaver
};

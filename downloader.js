import axios from 'axios';
import fetch from 'node-fetch';
import fs from 'fs';
import cliProgress from 'cli-progress';
import unzipper from 'unzipper';
import * as tar from 'tar';
import lz4js from 'lz4js';
import path from 'path';

// Utility function for downloading files using axios
async function downloadWithAxios(url, output) {
    const writer = fs.createWriteStream(output);

    // Get file using axios
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream',
    });

    const totalLength = response.headers['content-length'];
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    let downloadedLength = 0;
    progressBar.start(totalLength, 0);

    response.data.on('data', (chunk) => {
        downloadedLength += chunk.length;
        progressBar.update(downloadedLength);
    });

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            progressBar.stop();
            resolve();
        });
        writer.on('error', reject);
    });
}

// Utility function for downloading files using node-fetch
async function downloadWithFetch(url, output) {
    const response = await fetch(url);
    const totalLength = response.headers.get('content-length');
    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    const writer = fs.createWriteStream(output);
    let downloadedLength = 0;
    progressBar.start(totalLength, 0);

    response.body.on('data', (chunk) => {
        downloadedLength += chunk.length;
        progressBar.update(downloadedLength);
    });

    response.body.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', () => {
            progressBar.stop();
            resolve();
        });
        writer.on('error', reject);
    });
}

// Function to handle extraction of downloaded files
async function extractFile(filePath) {
    const fileExtension = path.extname(filePath);

    if (fileExtension === '.zip') {
        await fs.createReadStream(filePath).pipe(unzipper.Extract({ path: './' })).promise();
        console.log('Extracted ZIP file successfully.');
    } else if (fileExtension === '.tar.gz' || fileExtension === '.tgz') {
        await tar.x({
            file: filePath,
            C: './'
        });
        console.log('Extracted TAR.GZ file successfully.');
    } else if (fileExtension === '.lz4') {
        const compressedData = fs.readFileSync(filePath);
        const decompressedData = lz4js.decompress(compressedData);
        fs.writeFileSync(filePath.replace('.lz4', ''), Buffer.from(decompressedData));
        console.log('Decompressed LZ4 file successfully.');
    } else {
        console.log('No extraction needed for this file type.');
    }
}
// downloader.js

export async function downloadWithAxios(url, output) {
    // Logic to download a file with Axios
}

export async function downloadWithFetch(url, output) {
    // Logic to download a file with node-fetch
}

export async function extractFile(filePath, outputDir) {
    // Logic to extract tar, zip, etc.
}
 

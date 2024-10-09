import { Command } from 'commander';
import { downloadWithAxios, downloadWithFetch, extractFile } from './downloader.js';
import path from 'path';

const program = new Command();

program
    .version('1.0.0')
    .description('A CLI download manager')
    .option('-u, --url <url>', 'URL to download the file from')
    .option('-o, --output <path>', 'Output path for the downloaded file')
    .option('--use-fetch', 'Use node-fetch for downloading the file')
    .action(async (options) => {
        const url = options.url;
        const output = options.output || path.basename(url);

        if (!url) {
            console.error('Error: URL is required.');
            process.exit(1);
        }

        try {
            if (options.useFetch) {
                console.log('Downloading with node-fetch...');
                await downloadWithFetch(url, output);
            } else {
                console.log('Downloading with axios...');
                await downloadWithAxios(url, output);
            }

            console.log('Download complete!');

            // Try extracting the file if it's a compressed format
            await extractFile(output);
        } catch (error) {
            console.error('Error occurred during download:', error.message);
        }
    });

program.parse(process.argv);


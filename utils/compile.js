/**
 * @file compile.js
 * @author Dan Cox
 * @license Zlib
 * Steps to compile the source format files into a distributable format.
 * 1) Read `format.json`.
 * 2) Read `format.html`.
 * 3) Set the `source` property to the contents of `format.html`.
 * 4) Write the result to `dist/<format name>/format.js` as a JSONP function call using "window.storyFormat()".
 * 5) Copy the image file specified in `format.json` to the same directory as `format.js`, if it exists.
 */
// Require the necessary modules
import { readFileSync, mkdirSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create variables for input paths
const formatJsonPath = join(__dirname, '../src/format.json');
const formatHtmlPath = join(__dirname, '../src/format.html');

// Define the output directory and file path
const distDir = join(__dirname, '../dist', 'paperthin');
const formatJsPath = join(distDir, 'format.js');

// Step 1: Read format.json
let formatJson = JSON.parse(readFileSync(formatJsonPath, 'utf8'));

// Step 2: Read format.html
let formatHtml = readFileSync(formatHtmlPath, 'utf8');

// Step 3: Set the source property
formatJson.source = formatHtml;

// Step 4: Write the result to dist/<format name>/format.js
mkdirSync(distDir, { recursive: true });
writeFileSync(formatJsPath, `window.storyFormat(${JSON.stringify(formatJson)});`);

// Step 5: Copy the image file if it exists
if (formatJson.image) {
    const imageSrcPath = join(__dirname, '../src', formatJson.image);
    const imageDestPath = join(distDir, formatJson.image);
    try {
        copyFileSync(imageSrcPath, imageDestPath);
        console.log(`Copied image from ${imageSrcPath} to ${imageDestPath}`);
    }
    catch (error) {
        console.error(`Error copying image:`, error);
    }
}

console.log(`Compiled format to ${formatJsPath} successfully.`);
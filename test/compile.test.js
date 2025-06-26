import assert from 'assert';
import { describe, it, before, after } from 'node:test';
import { existsSync, rmSync, mkdirSync, readdirSync, rmdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Compile Format', () => {
    // Clean up the dist directory before running tests
    before(() => {
        const distDir = join(__dirname, '../dist', 'paperthin');
        if (existsSync(distDir)) {
            rmSync(distDir, { recursive: true, force: true });
        }
        mkdirSync(distDir, { recursive: true });
        console.log('Cleaned up dist/format directory.');
    });

    // Clean up the dist directory after tests
    after(() => {
        const distDir = join(__dirname, '../dist', 'paperthin');
        
        // Remove the dist/paperthin directory if it exists
        if (existsSync(distDir)) {
            rmSync(distDir, { recursive: true, force: true });
        }
        // Remove the dist directory if it is empty
        const parentDir = dirname(distDir);
        if (readdirSync(parentDir).length === 0) {
            rmdirSync(parentDir);
        }
        console.log('Cleaned up dist/format directory after tests.');

    });

    it('should compile format.json and format.html into dist/format.js', async () => {
        // Import the format compiler module using ES modules.
        const { default: formatCompiler } = await import('../utils/compile.js');

        // Assert that the dist/paperthin/format.js file is created.
        const formatJsPath = join(__dirname, '../dist', 'paperthin', 'format.js');
        assert(existsSync(formatJsPath), '../dist/paperthin/format.js should exist after compilation');
    });
});
const assert = require('assert');
const { describe, it, before, after } = require('node:test');
const fs = require('fs');
const path = require('path');

describe('Compile Format', () => {
    // Clean up the dist directory before running tests
    before(() => {
        const distDir = path.join(__dirname, '../dist', 'paperthin');
        if (fs.existsSync(distDir)) {
            fs.rmSync(distDir, { recursive: true, force: true });
        }
        fs.mkdirSync(distDir, { recursive: true });
        console.log('Cleaned up dist/format directory.');
    });

    // Clean up the dist directory after tests
    after(() => {
        const distDir = path.join(__dirname, '../dist', 'paperthin');
        
        // Remove the dist/paperthin directory if it exists
        if (fs.existsSync(distDir)) {
            fs.rmSync(distDir, { recursive: true, force: true });
        }
        // Remove the dist directory if it is empty
        const parentDir = path.dirname(distDir);
        if (fs.readdirSync(parentDir).length === 0) {
            fs.rmdirSync(parentDir);
        }
        console.log('Cleaned up dist/format directory after tests.');

    });

    it('should compile format.json and format.html into dist/format.js', () => {
       // Require the format compiler module.
        const formatCompiler = require('../utils/compile.js');

        // Assert that the dist/paperthin/format.js file is created.
        const formatJsPath = path.join(__dirname, '../dist', 'paperthin', 'format.js');
        assert(fs.existsSync(formatJsPath), '../dist/paperthin/format.js should exist after compilation');
    });
});
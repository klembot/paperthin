const assert = require('assert');
const { describe, it, before, after } = require('node:test');
const fs = require('fs');
const path = require('path');

describe('Cleanup Tests', () => {
    const distDir = path.join(__dirname, 'dist', 'format');

    // Clean up the dist directory before running tests
    before(() => {
        if (fs.existsSync(distDir)) {
            fs.rmSync(distDir, { recursive: true, force: true });
        }
        fs.mkdirSync(distDir, { recursive: true });
        console.log('Cleaned up dist/format directory before tests.');
    }
    );
    
    // Clean up the dist directory after tests
    after(() => {
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

    it('should remove the dist/format directory', () => {
        // Check if the directory exists
        assert(fs.existsSync(distDir), 'dist/format directory should exist before cleanup');

        // Remove the directory
        fs.rmSync(distDir, { recursive: true, force: true });

        // Check if the directory has been removed
        assert(!fs.existsSync(distDir), 'dist/format directory should be removed after cleanup');
    });

    it('should not throw an error when removing a non-existent directory', () => {
        const nonExistentDir = path.join(__dirname, 'dist', 'nonExistent');
        
        // Attempt to remove a non-existent directory
        fs.rmSync(nonExistentDir, { recursive: true, force: true });

        // Check that no error is thrown
        assert(!fs.existsSync(nonExistentDir), 'Non-existent directory should not cause an error when removed');
    });
});
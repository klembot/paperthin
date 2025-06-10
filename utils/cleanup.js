/**
 * Utility function to clean up temporary files and directories.
 */

// Require the necessary modules
const fs = require('fs');
const path = require('path');

// Remove a directory and its contents recursively
function removeDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`Removed directory: ${dirPath}`);
    } else {
        console.log(`Directory does not exist: ${dirPath}`);
    }
}

// Remove the dist directory
removeDirectory(path.join(__dirname, '../dist'));

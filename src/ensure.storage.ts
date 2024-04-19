import fs from 'fs-extra'
import path from 'path';

const directoryPath = path.join(process.cwd(), "data");
const jsonFileName = 'db.json';
const content = {};

// Function to write content to a JSON file
const writeJsonFile = (filePath: string, data: Record<string, any>) => {
    fs.outputJson(filePath, data)
        .then(() => {
            console.log(`storage file created`);
        })
        .catch(err => {
            console.log(err);
        });
};

// Main function to create file in directory
const createFileInDirectory = (directoryPath: string, fileName: string, fileContent: Record<string, any>) => {
    fs.ensureDir(directoryPath)
        .then(() => {
            const filePath = path.join(directoryPath, fileName);
            writeJsonFile(filePath, fileContent);
        })
        .catch(err => {
            console.log(err);
        });
};

// Handle process exit event
process.on('exit', () => {
    if (fs.existsSync(directoryPath)) {
        fs.remove(directoryPath)
            .then(() => {
                console.log(`storage cleared`);
            })
            .catch(err => {
                console.log(err);
            });
    }
});

// Usage
createFileInDirectory(directoryPath, jsonFileName, content);
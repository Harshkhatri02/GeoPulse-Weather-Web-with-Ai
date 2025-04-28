import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Ensure the views directory exists
if (!fs.existsSync('views')) {
    fs.mkdirSync('views', { recursive: true });
}

// Install dependencies
console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Explicitly install EJS
console.log('Installing EJS...');
execSync('npm install ejs@3.1.10 --save', { stdio: 'inherit' });

// Copy views directory to the deployment directory
console.log('Copying views directory...');
if (process.env.VERCEL) {
    const sourceDir = path.join(process.cwd(), 'views');
    const targetDir = path.join(process.cwd(), '.vercel/output/functions/app.func/views');
    
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }
    
    fs.cpSync(sourceDir, targetDir, { recursive: true });
}

console.log('Build completed successfully!'); 
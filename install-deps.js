// This file exists to ensure EJS is properly installed on Vercel
import { execSync } from 'child_process';
import fs from 'fs';

try {
  console.log('Checking if EJS is installed...');
  
  try {
    // Try to require EJS to see if it's already installed
    import('ejs');
    console.log('EJS is already installed!');
  } catch (error) {
    // If EJS is not installed, install it
    console.log('EJS is not installed. Installing now...');
    execSync('npm install ejs@3.1.10 --no-save', { stdio: 'inherit' });
    console.log('EJS installed successfully!');
  }
  
  // Create a verification file to prove EJS was installed
  fs.writeFileSync('./ejs-installed.txt', 'EJS was installed at: ' + new Date().toISOString());
  
  console.log('Dependency check completed successfully.');
} catch (error) {
  console.error('Error during dependency check:', error);
  process.exit(1);
} 
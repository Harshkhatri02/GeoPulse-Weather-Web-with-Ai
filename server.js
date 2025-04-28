// Special entry point for Vercel deployment

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Explicitly require EJS
try {
  require('ejs');
  console.log('EJS loaded successfully via require');
} catch (error) {
  console.error('Error loading EJS via require:', error);
  
  try {
    // Try installing EJS if it's not found
    const { execSync } = require('child_process');
    execSync('npm install ejs@3.1.10', { stdio: 'inherit' });
    console.log('EJS installed successfully');
  } catch (installError) {
    console.error('Error installing EJS:', installError);
  }
}

// Import and start the main app
import('./app.js').catch(err => {
  console.error('Error starting application:', err);
  process.exit(1);
}); 
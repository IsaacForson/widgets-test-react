import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('📦 Packaging Chatbot Wizard Web Component...\n');

// Create release directory
const releaseDir = path.join(rootDir, 'release');
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

// Copy built files
const distDir = path.join(rootDir, 'dist');
const files = [
  'chatbot-wizard.js',
  'chatbot-wizard.css',
  'chatbot-wizard.js.map'
];

console.log('Copying files to release directory...');
files.forEach(file => {
  const srcPath = path.join(distDir, file);
  const destPath = path.join(releaseDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    const stats = fs.statSync(destPath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    console.log(`✓ ${file} (${sizeKB} KB)`);
  } else {
    console.log(`⚠ ${file} not found, skipping...`);
  }
});

// Copy documentation
console.log('\nCopying documentation...');
const docFiles = [
  'DISTRIBUTION-README.md',
  'DEPLOYMENT.md',
  'demo-webcomponent.html'
];

docFiles.forEach(file => {
  const srcPath = path.join(rootDir, file);
  const destPath = path.join(releaseDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✓ ${file}`);
  }
});

// Rename README for release
if (fs.existsSync(path.join(releaseDir, 'DISTRIBUTION-README.md'))) {
  fs.renameSync(
    path.join(releaseDir, 'DISTRIBUTION-README.md'),
    path.join(releaseDir, 'README.md')
  );
  console.log('✓ README.md (renamed from DISTRIBUTION-README.md)');
}

// Create example HTML file
console.log('\nCreating quick start example...');
const quickStartHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chatbot Wizard - Quick Start</title>
  <link rel="stylesheet" href="chatbot-wizard.css">
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 40px 20px;
      background: white;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .header h1 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .header p {
      margin: 0;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🤖 Chatbot Wizard</h1>
      <p>Create your AI-powered chatbot in minutes</p>
    </div>
    
    <chatbot-wizard></chatbot-wizard>
  </div>

  <script src="chatbot-wizard.js"></script>
  <script>
    // Listen for completion event
    const wizard = document.querySelector('chatbot-wizard');
    wizard.addEventListener('chatbot-complete', (event) => {
      console.log('Chatbot created!', event.detail);
      
      const { chatLink, phoneNumber, chatbotConfig } = event.detail;
      alert(\`✅ Success! Your chatbot "\${chatbotConfig.name}" is ready!\\n\\nChat Link: \${chatLink}\\nPhone: \${phoneNumber}\`);
    });
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(releaseDir, 'quick-start.html'), quickStartHTML);
console.log('✓ quick-start.html');

// Create version info
const versionInfo = {
  version: '1.0.0',
  buildDate: new Date().toISOString(),
  files: files.filter(f => fs.existsSync(path.join(releaseDir, f))),
  size: {
    js: `${(fs.statSync(path.join(releaseDir, 'chatbot-wizard.js')).size / 1024).toFixed(2)} KB`,
    css: `${(fs.statSync(path.join(releaseDir, 'chatbot-wizard.css')).size / 1024).toFixed(2)} KB`
  }
};

fs.writeFileSync(
  path.join(releaseDir, 'version.json'),
  JSON.stringify(versionInfo, null, 2)
);
console.log('✓ version.json');

// Create zip archive instructions
console.log('\n📋 Package Summary:');
console.log('─────────────────────────────────────────');
console.log(`Location: ${releaseDir}`);
console.log(`Files: ${files.length + docFiles.length + 2}`);
console.log(`JavaScript: ${versionInfo.size.js}`);
console.log(`CSS: ${versionInfo.size.css}`);
console.log('─────────────────────────────────────────');
console.log('\n✅ Packaging complete!');
console.log('\n📤 Next steps:');
console.log('   1. Test the quick-start.html file');
console.log('   2. Deploy using: npm run deploy:netlify');
console.log('   3. Or upload the release/ folder to your CDN');
console.log('\n   For deployment options, see DEPLOYMENT.md\n');


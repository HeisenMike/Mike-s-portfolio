const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');

try {
  const html = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  const css = fs.readFileSync(path.join(assetsDir, 'index.css'), 'utf8');
  const js = fs.readFileSync(path.join(assetsDir, 'index.js'), 'utf8');

  // Replace the link tag with inline style
  let mergedHtml = html.replace(/<link rel="stylesheet".*?>/, `<style>${css}</style>`);
  
  // Replace the script tag with inline script
  // Note: Vite puts the script tag at the end usually, or we might need to find the src reference
  // The HTML usually looks like <script type="module" crossorigin src="./assets/index.js"></script>
  
  mergedHtml = mergedHtml.replace(/<script type="module".*?src=".*?index\.js".*?><\/script>/, `<script type="module">${js}</script>`);

  fs.writeFileSync(path.join(distDir, 'gohighlevel-embed.html'), mergedHtml);
  console.log('Created gohighlevel-embed.html successfully');
} catch (e) {
  console.error('Error creating embed file:', e);
}

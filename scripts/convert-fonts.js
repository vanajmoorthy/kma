const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '../assets');
const fonts = [
  'NeueHaasDisplayThin.ttf',
  'NeueHaasDisplayThinItalic.ttf',
  'NeueHaasDisplayRoman.ttf'
];

console.log('Converting fonts to WOFF2...');

// Check if ttf2woff2 is available
let ttf2woff2;
try {
  ttf2woff2 = require('ttf2woff2');
} catch (error) {
  console.warn('⚠️  ttf2woff2 not installed. Font conversion skipped.');
  console.warn('   Install it with: npm install ttf2woff2');
  console.warn('   Or fonts will use TTF format (still works, just larger files)');
  process.exit(0);
}

fonts.forEach(fontFile => {
  const ttfPath = path.join(assetsDir, fontFile);
  const woff2Path = path.join(assetsDir, fontFile.replace('.ttf', '.woff2'));
  
  if (!fs.existsSync(ttfPath)) {
    console.warn(`⚠️  Font file not found: ${fontFile}`);
    return;
  }
  
  try {
    const input = fs.readFileSync(ttfPath);
    const output = ttf2woff2(input);
    fs.writeFileSync(woff2Path, output);
    console.log(`✅ Converted: ${fontFile} → ${fontFile.replace('.ttf', '.woff2')}`);
  } catch (error) {
    console.error(`❌ Error converting ${fontFile}:`, error.message);
  }
});

console.log('Font conversion complete!');


const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ASSETS_DIR = path.resolve(__dirname, '../assets');
const OPT_DIR = path.resolve(__dirname, '../assets/optimized');

if (!fs.existsSync(OPT_DIR)) {
  fs.mkdirSync(OPT_DIR, { recursive: true });
}

const targetWidths = [480, 768, 1200, 1600];

async function processAllImages() {
  console.log('🚀 Generating optimized responsive WebP images with Sharp...');
  const files = fs.readdirSync(ASSETS_DIR);
  let processed = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const srcPath = path.join(ASSETS_DIR, file);
    const baseName = path.basename(file, ext).toLowerCase().replace(/[^a-z0-9_-]/g, '_');

    try {
      const metadata = await sharp(srcPath).metadata();
      const origW = metadata.width;
      const origH = metadata.height;

      // 1. Base WebP (Full size optimized)
      const baseWebpPath = path.join(OPT_DIR, `${baseName}.webp`);
      await sharp(srcPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(baseWebpPath);

      // 2. Responsive variants (never upscale)
      for (const w of targetWidths) {
        if (w < origW) {
          const ratio = w / origW;
          const h = Math.round(origH * ratio);
          const varPath = path.join(OPT_DIR, `${baseName}_${w}w.webp`);
          await sharp(srcPath)
            .resize(w, h, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80, effort: 6 })
            .toFile(varPath);
        }
      }

      processed++;
    } catch (err) {
      console.warn(`  ⚠️ Could not process ${file}:`, err.message);
    }
  }

  // Also optimize root massive files
  const rootFiles = ['image_4.png', 'grocerry bussiness type front image.png', 'Made in india logo.png', 'sequre ssl.jpg'];
  for (const rf of rootFiles) {
    const srcPath = path.resolve(__dirname, '..', rf);
    if (!fs.existsSync(srcPath)) continue;
    const ext = path.extname(rf).toLowerCase();
    const baseName = path.basename(rf, ext).toLowerCase().replace(/[^a-z0-9_-]/g, '_');

    try {
      const metadata = await sharp(srcPath).metadata();
      const origW = metadata.width;
      const origH = metadata.height;

      const baseWebpPath = path.join(OPT_DIR, `${baseName}.webp`);
      await sharp(srcPath).webp({ quality: 80, effort: 6 }).toFile(baseWebpPath);

      for (const w of targetWidths) {
        if (w < origW) {
          const ratio = w / origW;
          const h = Math.round(origH * ratio);
          const varPath = path.join(OPT_DIR, `${baseName}_${w}w.webp`);
          await sharp(srcPath)
            .resize(w, h, { fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80, effort: 6 })
            .toFile(varPath);
        }
      }
      processed++;
    } catch (e) {
      console.warn(`Could not process ${rf}:`, e.message);
    }
  }

  console.log(`✅ Successfully generated responsive WebP variants for ${processed} images.`);
}

processAllImages();

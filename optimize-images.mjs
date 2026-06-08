import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_WORKS_DIR = path.join(process.cwd(), 'public', 'works');
const MAX_WIDTH = 2000;

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const stats = fs.statSync(fullPath);
        // Only process images larger than ~1.5 MB
        if (stats.size > 1.5 * 1024 * 1024) {
          console.log(`Optimizing: ${fullPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
          
          const tempPath = `${fullPath}.tmp${ext}`;
          
          try {
            const image = sharp(fullPath);
            const metadata = await image.metadata();
            
            let pipeline = image;
            if (metadata.width && metadata.width > MAX_WIDTH) {
              pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
            }
            
            if (ext === '.png') {
              // Convert heavy PNGs to optimized webp if they don't explicitly need transparency, 
              // or just compress PNG heavily
              pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
            } else {
              pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
            }
            
            await pipeline.toFile(tempPath);
            
            fs.unlinkSync(fullPath);
            fs.renameSync(tempPath, fullPath);
            
            const newStats = fs.statSync(fullPath);
            console.log(`✅ Reduced to ${(newStats.size / 1024 / 1024).toFixed(2)} MB\n`);
          } catch (err) {
            console.error(`❌ Failed to process ${entry.name}:`, err);
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
          }
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  await processDirectory(PUBLIC_WORKS_DIR);
  console.log('Finished image optimization.');
}

run();

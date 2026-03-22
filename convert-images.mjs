import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join, extname, basename, dirname } from 'path';

const IMAGES_ROOT = './public';
const DEFAULT_QUALITY = 82;

const QUALITY_MAP = {
  'grain.webp': 25,
  'jay1.webp': 80,
};

const RESIZE_MAP = {
  'jay1.webp': { width: 376, withoutEnlargement: true },
};

function getAllImages(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...getAllImages(full));
    } else if (['.png', '.jpg', '.jpeg', '.webp'].includes(extname(entry).toLowerCase())) {
      results.push(full);
    }
  }
  return results;
}

const files = getAllImages(IMAGES_ROOT);
console.log(`Found ${files.length} images to process...\n`);

let converted = 0, skipped = 0, saved = 0;

for (const file of files) {
  const filename = basename(file);
  const outPath = join(dirname(file), basename(file, extname(file)) + '.webp');
  const quality = QUALITY_MAP[filename] ?? DEFAULT_QUALITY;
  const resizeOptions = RESIZE_MAP[filename];

  try {
    const inputSize = statSync(file).size;
    const inputBuffer = readFileSync(file);

    let pipeline = sharp(inputBuffer, { failOn: 'none' });

    if (resizeOptions) {
      pipeline = pipeline.resize(resizeOptions);
    }

    const buffer = await pipeline.webp({ quality }).toBuffer();

    const saving = inputSize - buffer.length;
    writeFileSync(outPath, buffer);

    saved += saving;
    converted++;
    console.log(`✓ ${file.replace(IMAGES_ROOT, '')} — quality: ${quality}${resizeOptions ? ` | resized to ${resizeOptions.width}px` : ''} — saved ${(saving / 1024).toFixed(1)} KB`);
  } catch (err) {
    skipped++;
    console.log(`✗ ${file.replace(IMAGES_ROOT, '')} — ${err.message}`);
  }
}

console.log(`\nDone: ${converted} converted, ${skipped} failed`);
console.log(`Total saved: ${(saved / 1024).toFixed(0)} KB`);
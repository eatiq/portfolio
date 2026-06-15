import sharp from 'sharp';
import { readdir, stat, rename } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

const DIR = path.resolve('public/artifacts');
const MAX_EDGE = 640; // display caps at ~290px CSS (≈580px @2x); 640 leaves headroom

const files = (await readdir(DIR)).filter((f) => f.toLowerCase().endsWith('.png'));
const fmt = (b) => `${(b / 1024).toFixed(0)} KB`;

let beforeTotal = 0;
let afterTotal = 0;

for (const file of files.sort()) {
  const src = path.join(DIR, file);
  const before = (await stat(src)).size;

  const resized = sharp(src).resize({
    width: MAX_EDGE,
    height: MAX_EDGE,
    fit: 'inside',
    withoutEnlargement: true,
  });

  // Candidate A: palette quantization — best for flat UI / screenshots.
  const palette = await resized
    .clone()
    .png({ palette: true, quality: 90, effort: 10, compressionLevel: 9 })
    .toBuffer();

  // Candidate B: full-color lossless re-encode — best for photos / gradients.
  const truecolor = await resized
    .clone()
    .png({ palette: false, effort: 10, compressionLevel: 9 })
    .toBuffer();

  const best = palette.length <= truecolor.length ? palette : truecolor;
  const mode = palette.length <= truecolor.length ? 'palette' : 'truecolor';

  await sharp(best).toFile(src + '.tmp');
  await rename(src + '.tmp', src);

  const after = (await stat(src)).size;
  beforeTotal += before;
  afterTotal += after;
  console.log(`${file.padEnd(34)} ${fmt(before).padStart(8)} -> ${fmt(after).padStart(8)}  [${mode}]`);
}

console.log(
  os.EOL +
    `TOTAL  ${fmt(beforeTotal)} -> ${fmt(afterTotal)}` +
    `  (saved ${fmt(beforeTotal - afterTotal)}, ${((1 - afterTotal / beforeTotal) * 100).toFixed(0)}%)`,
);

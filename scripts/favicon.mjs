// Generates public/favicon/* from one design: white Schibsted Grotesk "SC"
// on an ink square. Run with `node scripts/favicon.mjs`.
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';

const INK = '#111111';
const PAPER = '#ffffff';
const OUT = join(process.cwd(), 'public/favicon');

const font = await readFile(
  join(process.cwd(), 'node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-600-normal.woff'),
);

const h = (type, style, ...children) => ({ type, props: { style, children: children.length > 1 ? children : children[0] } });

// Satori converts the glyph to a path, so the SVG needs no font at runtime.
const svg = await satori(
  h(
    'div',
    { width: 512, height: 512, display: 'flex', alignItems: 'center', justifyContent: 'center', background: INK },
    h('span', { color: PAPER, fontSize: 300, fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 1, marginTop: -20 }, 'SC'),
  ),
  { width: 512, height: 512, fonts: [{ name: 'Schibsted Grotesk', data: font, weight: 600, style: 'normal' }] },
);

const png = (size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

// ICO with embedded PNG entries (supported by every current browser).
async function ico(sizes) {
  const images = await Promise.all(sizes.map(png));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  sizes.forEach((size, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size % 256, e);
    header.writeUInt8(size % 256, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(images[i].length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += images[i].length;
  });
  return Buffer.concat([header, ...images]);
}

await writeFile(join(OUT, 'favicon.svg'), svg);
await writeFile(join(OUT, 'favicon.ico'), await ico([16, 32, 48]));
await writeFile(join(OUT, 'apple-touch-icon.png'), await png(180));
await writeFile(join(OUT, 'android-chrome-192x192.png'), await png(192));
await writeFile(join(OUT, 'android-chrome-512x512.png'), await png(512));

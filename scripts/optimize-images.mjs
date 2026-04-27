/**
 * Convierte PNG/JPG de public/lovable-uploads a WebP (y AVIF opcional).
 *
 * Uso:
 *   bun scripts/optimize-images.mjs           # genera .webp
 *   bun scripts/optimize-images.mjs --avif    # genera .webp y .avif
 *
 * No borra los originales: solo crea los nuevos formatos junto al PNG/JPG.
 */
import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const DIR = 'public/lovable-uploads';
const WANT_AVIF = process.argv.includes('--avif');
const QUALITY_WEBP = 82;
const QUALITY_AVIF = 55;

const files = readdirSync(DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
let okWebp = 0,
  okAvif = 0,
  skipped = 0,
  bytesIn = 0,
  bytesOut = 0;

for (const file of files) {
  const input = join(DIR, file);
  const stem = basename(file, extname(file));
  const webpOut = join(DIR, `${stem}.webp`);
  const avifOut = join(DIR, `${stem}.avif`);

  const inSize = statSync(input).size;
  bytesIn += inSize;

  try {
    await sharp(input).webp({ quality: QUALITY_WEBP, effort: 5 }).toFile(webpOut);
    okWebp++;
    bytesOut += statSync(webpOut).size;
  } catch (err) {
    console.error(`✗ ${file} (webp):`, err.message);
    skipped++;
    continue;
  }

  if (WANT_AVIF) {
    try {
      await sharp(input).avif({ quality: QUALITY_AVIF, effort: 4 }).toFile(avifOut);
      okAvif++;
    } catch (err) {
      console.error(`✗ ${file} (avif):`, err.message);
    }
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
console.log('\n— Optimización completa —');
console.log(`Procesados: ${files.length}  |  WebP: ${okWebp}  |  AVIF: ${okAvif}  |  Errores: ${skipped}`);
console.log(`Originales: ${mb(bytesIn)} MB  →  WebP: ${mb(bytesOut)} MB  (ahorro ${(100 - (bytesOut / bytesIn) * 100).toFixed(1)}%)`);

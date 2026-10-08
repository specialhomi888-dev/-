import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Base SVG icon (Clean, bold, deep green background, cream text & dynamic wake-up lightning)
const svgIcon = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="104" fill="#1B4332"/>
  <circle cx="256" cy="256" r="220" stroke="#F4EBD9" stroke-width="8" stroke-dasharray="16 12" opacity="0.4"/>
  
  <!-- Stylized energy flash / wake-up spark -->
  <path d="M280 64L160 272H272L232 448L352 240H240L280 64Z" fill="#FBBF24" stroke="#FFFBEB" stroke-width="6" stroke-linejoin="round"/>
  
  <!-- Banner with bold Korean text -->
  <rect x="76" y="360" width="360" height="92" rx="24" fill="#FDFBF7" stroke="#D8F3DC" stroke-width="4"/>
  <text x="256" y="424" font-family="'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif" font-weight="900" font-size="52" fill="#1B4332" text-anchor="middle" letter-spacing="2">정신차리라!</text>
</svg>
`.trim();

// 2. Maskable SVG icon with 15% safe-zone margin
const maskableSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1B4332"/>
  
  <!-- Safe zone inner container (within 80% circle) -->
  <g transform="translate(51, 51) scale(0.8)">
    <circle cx="256" cy="256" r="220" stroke="#F4EBD9" stroke-width="8" stroke-dasharray="16 12" opacity="0.4"/>
    <path d="M280 64L160 272H272L232 448L352 240H240L280 64Z" fill="#FBBF24" stroke="#FFFBEB" stroke-width="6" stroke-linejoin="round"/>
    <rect x="76" y="360" width="360" height="92" rx="24" fill="#FDFBF7" stroke="#D8F3DC" stroke-width="4"/>
    <text x="256" y="424" font-family="'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif" font-weight="900" font-size="52" fill="#1B4332" text-anchor="middle" letter-spacing="2">정신차리라!</text>
  </g>
</svg>
`.trim();

fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon);

async function generate() {
  const svgBuffer = Buffer.from(svgIcon);
  const maskableBuffer = Buffer.from(maskableSvg);

  // 192x192 PNG
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192x192.png'));

  // 512x512 PNG
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512x512.png'));

  // Maskable 512x512 PNG
  await sharp(maskableBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));

  // Apple touch icon 180x180 PNG
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Favicon 64x64 PNG & 32x32
  await sharp(svgBuffer)
    .resize(64, 64)
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  console.log('PWA icons successfully generated in /public!');
}

generate().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

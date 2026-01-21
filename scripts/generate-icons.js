/**
 * Icon Generator Script for 8D Audio Extension
 * 
 * This script generates PNG icons for the Chrome extension.
 * 
 * Usage:
 *   npm install canvas
 *   node scripts/generate-icons.js
 * 
 * OR open icons/generate-icons.html in your browser for a visual generator.
 */

const fs = require('fs');
const path = require('path');

// Try to use canvas package if available
let createCanvas;
try {
  createCanvas = require('canvas').createCanvas;
} catch (e) {
  console.log('Canvas package not found. Please run: npm install canvas');
  console.log('');
  console.log('Alternative: Open icons/generate-icons.html in your browser');
  console.log('to generate icons visually.');
  process.exit(1);
}

const ICONS_DIR = path.join(__dirname, '..', 'icons');

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

function drawIcon(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  const center = size / 2;
  
  // Background circle
  ctx.fillStyle = '#0a0a0f';
  ctx.beginPath();
  ctx.arc(center, center, center, 0, Math.PI * 2);
  ctx.fill();
  
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#00f5d4');
  gradient.addColorStop(1, '#7b2cbf');
  
  // Outer ring
  ctx.strokeStyle = gradient;
  ctx.lineWidth = Math.max(1, size * 0.06);
  ctx.beginPath();
  ctx.arc(center, center, center * 0.75, 0, Math.PI * 2);
  ctx.stroke();
  
  // Middle ring
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = Math.max(1, size * 0.05);
  ctx.beginPath();
  ctx.arc(center, center, center * 0.5, 0, Math.PI * 2);
  ctx.stroke();
  
  // Inner filled circle
  ctx.globalAlpha = 1;
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(center, center, center * 0.25, 0, Math.PI * 2);
  ctx.fill();
  
  return canvas;
}

// Generate all icon sizes
const sizes = [16, 32, 48, 128];

sizes.forEach(size => {
  const canvas = drawIcon(size);
  const buffer = canvas.toBuffer('image/png');
  const filePath = path.join(ICONS_DIR, `icon${size}.png`);
  
  fs.writeFileSync(filePath, buffer);
  console.log(`✓ Generated icon${size}.png`);
});

console.log('');
console.log('All icons generated successfully in the icons/ directory!');


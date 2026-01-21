#!/bin/bash

# 8D Audio Extension - Build Script for Chrome Web Store
# This creates a clean ZIP file ready for upload

echo "🎧 Building 8D Audio Extension for Chrome Web Store..."

# Create dist directory
mkdir -p dist

# Remove old build
rm -f dist/8d-audio-extension.zip

# Create ZIP with only required files
zip -r dist/8d-audio-extension.zip \
  manifest.json \
  background.js \
  popup.html \
  popup.css \
  popup.js \
  offscreen.html \
  offscreen.js \
  icons/icon16.png \
  icons/icon32.png \
  icons/icon48.png \
  icons/icon128.png \
  README.md \
  -x "*.DS_Store" \
  -x "*__MACOSX*"

echo ""
echo "✅ Build complete!"
echo "📦 Output: dist/8d-audio-extension.zip"
echo ""
echo "Next steps:"
echo "1. Go to https://chrome.google.com/webstore/devconsole"
echo "2. Click 'New Item'"
echo "3. Upload dist/8d-audio-extension.zip"


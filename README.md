# 🎧 8D Audio Chrome Extension

Transform any audio playing in your browser into an immersive 8D experience. This extension captures tab audio and applies real-time spatial processing to create the sensation of sound rotating around your head.

![8D Audio Extension](https://img.shields.io/badge/Chrome-Extension-green?style=flat-square&logo=googlechrome)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

## ✨ Features

- **Real-time 8D Audio Processing** - Transforms any tab audio into immersive spatial sound
- **Adjustable Rotation Speed** - Control how fast the sound rotates around you
- **Intensity Control** - Adjust the width of the stereo field
- **Built-in Reverb** - Add spatial depth with configurable reverb
- **Bass Boost** - Enhance low frequencies for richer sound
- **Preset Profiles** - Quick access to Subtle, Classic, Intense, and Concert presets
- **Settings Persistence** - Your preferences are saved automatically
- **Beautiful Dark UI** - Modern, neon-accented interface

## 🎵 What is 8D Audio?

8D audio creates the illusion of sound moving around your head by dynamically panning audio between your left and right ears in a smooth, oscillating pattern. When combined with reverb effects, it creates an immersive listening experience that feels like you're at a live concert with speakers surrounding you.

**Best experienced with headphones!** 🎧

## 📦 Installation

### From Source (Developer Mode)

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/8d-audio-extension.git
   cd 8d-audio-extension
   ```

2. **Generate icons (if needed)**
   ```bash
   npm install
   npm run generate-icons
   ```

3. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `8d-audio-extension` folder

4. **Pin the extension** (optional)
   - Click the puzzle piece icon in Chrome's toolbar
   - Find "8D Audio Experience" and click the pin icon

## 🚀 Usage

1. **Navigate** to any website with audio (YouTube, Spotify Web, SoundCloud, etc.)
2. **Play** some audio/music on the page
3. **Click** the 8D Audio extension icon in your toolbar
4. **Press** the power button to activate the effect
5. **Adjust** settings to your preference:
   - **Rotation Speed**: How fast the sound moves around (0.1x - 3x)
   - **Intensity**: How wide the stereo panning is (0% - 100%)
   - **Reverb**: Amount of spatial reverb effect (0% - 100%)
   - **Bass Boost**: Low frequency enhancement (0% - 100%)
6. **Try presets** for quick configuration:
   - 🎵 **Subtle**: Gentle movement, minimal effects
   - 🎧 **Classic**: Balanced 8D experience
   - 🔊 **Intense**: Fast rotation, full stereo width
   - 🎭 **Concert**: Rich reverb, concert hall feel

## 🔧 How It Works

The extension uses the **Web Audio API** to process audio in real-time:

1. **Tab Capture**: Uses `chrome.tabCapture` to capture the audio stream from the current tab
2. **Audio Graph**: Creates a processing chain:
   ```
   Source → Bass Boost → Stereo Panner → [Dry + Reverb] → Output
   ```
3. **Oscillating Pan**: A sine wave oscillator modulates the stereo panner position, creating the rotating effect
4. **Convolution Reverb**: A generated impulse response adds spatial depth

## 📁 Project Structure

```
8d-audio-extension/
├── manifest.json        # Chrome extension configuration
├── popup.html           # Extension popup UI
├── popup.css            # Popup styling
├── popup.js             # UI logic and audio processing
├── background.js        # Service worker
├── audio-processor.js   # Audio processing module (reference)
├── icons/               # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
├── scripts/
│   └── generate-icons.js  # Icon generation script
├── package.json
└── README.md
```

## ⚠️ Limitations

- **Chrome/Chromium only**: Uses Chrome-specific APIs (`chrome.tabCapture`)
- **Single tab**: Only processes audio from the tab where the popup was opened
- **Browser pages excluded**: Cannot capture audio from `chrome://` URLs
- **Popup must stay open**: Audio processing stops if you close the popup
- **No DRM content**: Protected content (e.g., Netflix) cannot be captured

## 🛠️ Development

### Prerequisites
- Node.js 18+ (for icon generation)
- Chrome/Chromium browser

### Building Icons
```bash
npm install
npm run generate-icons
```

Or open `icons/generate-icons.html` in a browser to generate icons visually.

### Debugging
1. Open Chrome DevTools on the extension popup (right-click → Inspect)
2. Check the Console for `[8D Audio]` prefixed logs
3. For background script, go to `chrome://extensions/` → 8D Audio → "service worker"

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this in your own projects!

## 🙏 Credits

- Built with the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- Uses [Chrome Extensions Manifest V3](https://developer.chrome.com/docs/extensions/mv3/)
- Font: [Outfit](https://fonts.google.com/specimen/Outfit) by Rodrigo Fuenzalida

---

**Enjoy your immersive audio experience! 🎧✨**

# 8D-Audio-Chrome-Extension

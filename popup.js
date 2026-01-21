/**
 * 8D Audio Extension - Popup Script
 * 
 * Handles the popup UI, tab audio capture, and audio processing.
 */

// ============================================
// Audio8DProcessor Class (embedded for popup)
// ============================================

class Audio8DProcessor {
  constructor() {
    this.audioContext = null;
    this.sourceNode = null;
    this.pannerNode = null;
    this.gainNode = null;
    this.reverbNode = null;
    this.bassBoostNode = null;
    this.dryGainNode = null;
    this.wetGainNode = null;
    
    this.isActive = false;
    this.animationId = null;
    this.startTime = 0;
    
    this.settings = {
      speed: 1.0,
      intensity: 0.8,
      reverb: 0.3,
      bassBoost: 0.2
    };
  }

  async initialize(stream) {
    try {
      this.audioContext = new AudioContext();
      this.sourceNode = this.audioContext.createMediaStreamSource(stream);
      
      this.pannerNode = this.audioContext.createStereoPanner();
      this.pannerNode.pan.value = 0;
      
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 1.0;
      
      this.bassBoostNode = this.audioContext.createBiquadFilter();
      this.bassBoostNode.type = 'lowshelf';
      this.bassBoostNode.frequency.value = 200;
      this.bassBoostNode.gain.value = 0;
      
      await this.createReverb();
      
      this.dryGainNode = this.audioContext.createGain();
      this.wetGainNode = this.audioContext.createGain();
      
      this.updateReverbMix();
      this.updateBassBoost();
      
      this.sourceNode.connect(this.bassBoostNode);
      this.bassBoostNode.connect(this.pannerNode);
      
      this.pannerNode.connect(this.dryGainNode);
      this.dryGainNode.connect(this.gainNode);
      
      this.pannerNode.connect(this.reverbNode);
      this.reverbNode.connect(this.wetGainNode);
      this.wetGainNode.connect(this.gainNode);
      
      this.gainNode.connect(this.audioContext.destination);
      
      console.log('[8D Audio] Processor initialized');
      return true;
    } catch (error) {
      console.error('[8D Audio] Init failed:', error);
      throw error;
    }
  }

  async createReverb() {
    this.reverbNode = this.audioContext.createConvolver();
    
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2;
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const decay = Math.exp(-3 * i / length);
        channelData[i] = (Math.random() * 2 - 1) * decay;
      }
    }
    
    this.reverbNode.buffer = impulse;
  }

  updateReverbMix() {
    if (!this.dryGainNode || !this.wetGainNode) return;
    
    const wetAmount = this.settings.reverb;
    const dryAmount = 1 - (wetAmount * 0.5);
    
    this.dryGainNode.gain.setTargetAtTime(dryAmount, this.audioContext.currentTime, 0.1);
    this.wetGainNode.gain.setTargetAtTime(wetAmount, this.audioContext.currentTime, 0.1);
  }

  updateBassBoost() {
    if (!this.bassBoostNode) return;
    const gainDb = this.settings.bassBoost * 18 - 6;
    this.bassBoostNode.gain.setTargetAtTime(gainDb, this.audioContext.currentTime, 0.1);
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.startTime = this.audioContext.currentTime;
    this.animate();
  }

  stop() {
    this.isActive = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.pannerNode && this.audioContext) {
      this.pannerNode.pan.setTargetAtTime(0, this.audioContext.currentTime, 0.1);
    }
  }

  animate() {
    if (!this.isActive || !this.audioContext) return;
    
    const elapsed = this.audioContext.currentTime - this.startTime;
    const baseFrequency = 0.15;
    const frequency = baseFrequency * this.settings.speed;
    const panValue = Math.sin(elapsed * frequency * Math.PI * 2) * this.settings.intensity;
    
    this.pannerNode.pan.setTargetAtTime(panValue, this.audioContext.currentTime, 0.02);
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    if ('reverb' in newSettings) this.updateReverbMix();
    if ('bassBoost' in newSettings) this.updateBassBoost();
  }

  applyPreset(presetName) {
    const presets = {
      subtle: { speed: 0.5, intensity: 0.4, reverb: 0.2, bassBoost: 0.1 },
      classic: { speed: 1.0, intensity: 0.8, reverb: 0.3, bassBoost: 0.2 },
      intense: { speed: 1.8, intensity: 1.0, reverb: 0.4, bassBoost: 0.4 },
      concert: { speed: 0.7, intensity: 0.6, reverb: 0.7, bassBoost: 0.3 }
    };
    
    const preset = presets[presetName];
    if (preset) {
      this.updateSettings(preset);
      return preset;
    }
    return null;
  }

  getCurrentPan() {
    return this.pannerNode ? this.pannerNode.pan.value : 0;
  }

  destroy() {
    this.stop();
    if (this.sourceNode) this.sourceNode.disconnect();
    if (this.audioContext) this.audioContext.close();
    
    this.audioContext = null;
    this.sourceNode = null;
    this.pannerNode = null;
    this.gainNode = null;
    this.reverbNode = null;
    this.bassBoostNode = null;
    this.dryGainNode = null;
    this.wetGainNode = null;
  }
}


// ============================================
// UI Controller
// ============================================

class PopupController {
  constructor() {
    this.processor = null;
    this.stream = null;
    this.isActive = false;
    
    // DOM Elements
    this.powerButton = document.getElementById('powerButton');
    this.statusLabel = document.getElementById('statusLabel');
    this.statusHint = document.getElementById('statusHint');
    this.visualizer = document.getElementById('visualizer');
    this.controls = document.getElementById('controls');
    this.presetsSection = document.getElementById('presetsSection');
    
    // Sliders
    this.speedSlider = document.getElementById('speedSlider');
    this.intensitySlider = document.getElementById('intensitySlider');
    this.reverbSlider = document.getElementById('reverbSlider');
    this.bassSlider = document.getElementById('bassSlider');
    
    // Value displays
    this.speedValue = document.getElementById('speedValue');
    this.intensityValue = document.getElementById('intensityValue');
    this.reverbValue = document.getElementById('reverbValue');
    this.bassValue = document.getElementById('bassValue');
    
    // Slider fills
    this.speedFill = document.getElementById('speedFill');
    this.intensityFill = document.getElementById('intensityFill');
    this.reverbFill = document.getElementById('reverbFill');
    this.bassFill = document.getElementById('bassFill');
    
    // Preset buttons
    this.presetButtons = document.querySelectorAll('.preset-btn');
    
    this.init();
  }

  init() {
    // Power button click
    this.powerButton.addEventListener('click', () => this.toggle());
    
    // Slider events
    this.setupSlider(this.speedSlider, this.speedValue, this.speedFill, 
      (value) => `${value.toFixed(1)}x`,
      (value) => ({ speed: value }),
      0.1, 3);
    
    this.setupSlider(this.intensitySlider, this.intensityValue, this.intensityFill,
      (value) => `${Math.round(value)}%`,
      (value) => ({ intensity: value / 100 }),
      0, 100);
    
    this.setupSlider(this.reverbSlider, this.reverbValue, this.reverbFill,
      (value) => `${Math.round(value)}%`,
      (value) => ({ reverb: value / 100 }),
      0, 100);
    
    this.setupSlider(this.bassSlider, this.bassValue, this.bassFill,
      (value) => `${Math.round(value)}%`,
      (value) => ({ bassBoost: value / 100 }),
      0, 100);
    
    // Preset buttons
    this.presetButtons.forEach(btn => {
      btn.addEventListener('click', () => this.applyPreset(btn.dataset.preset));
    });
    
    // Load saved settings
    this.loadSettings();
    
    // Update slider visuals
    this.updateAllSliderFills();
  }

  setupSlider(slider, valueDisplay, fillElement, formatter, settingsMapper, min, max) {
    const updateSlider = () => {
      const value = parseFloat(slider.value);
      valueDisplay.textContent = formatter(value);
      
      // Update fill width
      const percentage = ((value - min) / (max - min)) * 100;
      fillElement.style.width = `${percentage}%`;
      
      // Update processor if active
      if (this.processor) {
        this.processor.updateSettings(settingsMapper(value));
      }
      
      // Save settings
      this.saveSettings();
    };
    
    slider.addEventListener('input', updateSlider);
    updateSlider(); // Initial update
  }

  updateAllSliderFills() {
    // Speed
    const speedPercentage = ((this.speedSlider.value - 0.1) / (3 - 0.1)) * 100;
    this.speedFill.style.width = `${speedPercentage}%`;
    this.speedValue.textContent = `${parseFloat(this.speedSlider.value).toFixed(1)}x`;
    
    // Intensity
    this.intensityFill.style.width = `${this.intensitySlider.value}%`;
    this.intensityValue.textContent = `${this.intensitySlider.value}%`;
    
    // Reverb
    this.reverbFill.style.width = `${this.reverbSlider.value}%`;
    this.reverbValue.textContent = `${this.reverbSlider.value}%`;
    
    // Bass
    this.bassFill.style.width = `${this.bassSlider.value}%`;
    this.bassValue.textContent = `${this.bassSlider.value}%`;
  }

  async toggle() {
    if (this.isActive) {
      await this.deactivate();
    } else {
      await this.activate();
    }
  }

  async activate() {
    try {
      this.setStatus('Connecting...', 'Capturing tab audio...');
      
      // Get the current tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab) {
        throw new Error('No active tab found');
      }
      
      // Check if we can capture this tab
      if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
        throw new Error('Cannot capture audio from browser pages');
      }
      
      // Capture tab audio
      this.stream = await chrome.tabCapture.capture({
        audio: true,
        video: false
      });
      
      if (!this.stream) {
        throw new Error('Failed to capture audio stream');
      }
      
      // Initialize the audio processor
      this.processor = new Audio8DProcessor();
      await this.processor.initialize(this.stream);
      
      // Apply current slider settings
      this.processor.updateSettings({
        speed: parseFloat(this.speedSlider.value),
        intensity: parseInt(this.intensitySlider.value) / 100,
        reverb: parseInt(this.reverbSlider.value) / 100,
        bassBoost: parseInt(this.bassSlider.value) / 100
      });
      
      // Start the 8D effect
      this.processor.start();
      
      // Update UI
      this.isActive = true;
      this.powerButton.classList.add('active');
      this.visualizer.classList.add('active');
      this.controls.classList.add('active');
      this.presetsSection.classList.add('active');
      this.statusLabel.classList.add('active');
      this.setStatus('Active', '8D audio effect is running');
      
      console.log('[8D Audio] Activated successfully');
      
    } catch (error) {
      console.error('[8D Audio] Activation failed:', error);
      this.showError(error.message);
      this.setStatus('Error', 'Click to try again');
    }
  }

  async deactivate() {
    try {
      // Stop and destroy processor
      if (this.processor) {
        this.processor.destroy();
        this.processor = null;
      }
      
      // Stop the stream
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
      
      // Update UI
      this.isActive = false;
      this.powerButton.classList.remove('active');
      this.visualizer.classList.remove('active');
      this.controls.classList.remove('active');
      this.presetsSection.classList.remove('active');
      this.statusLabel.classList.remove('active');
      this.setStatus('Ready', 'Click to activate 8D audio');
      
      console.log('[8D Audio] Deactivated');
      
    } catch (error) {
      console.error('[8D Audio] Deactivation error:', error);
    }
  }

  applyPreset(presetName) {
    // Update button states
    this.presetButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === presetName);
    });
    
    // Get preset values
    const presets = {
      subtle: { speed: 0.5, intensity: 40, reverb: 20, bass: 10 },
      classic: { speed: 1.0, intensity: 80, reverb: 30, bass: 20 },
      intense: { speed: 1.8, intensity: 100, reverb: 40, bass: 40 },
      concert: { speed: 0.7, intensity: 60, reverb: 70, bass: 30 }
    };
    
    const preset = presets[presetName];
    if (!preset) return;
    
    // Update sliders
    this.speedSlider.value = preset.speed;
    this.intensitySlider.value = preset.intensity;
    this.reverbSlider.value = preset.reverb;
    this.bassSlider.value = preset.bass;
    
    // Update displays
    this.updateAllSliderFills();
    
    // Apply to processor if active
    if (this.processor) {
      this.processor.applyPreset(presetName);
    }
    
    // Save settings
    this.saveSettings();
  }

  setStatus(label, hint) {
    this.statusLabel.textContent = label;
    this.statusHint.textContent = hint;
  }

  showError(message) {
    // Create error element
    const errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.textContent = message;
    
    // Add to container
    document.querySelector('.container').appendChild(errorEl);
    
    // Remove after delay
    setTimeout(() => {
      errorEl.remove();
    }, 4000);
  }

  saveSettings() {
    const settings = {
      speed: this.speedSlider.value,
      intensity: this.intensitySlider.value,
      reverb: this.reverbSlider.value,
      bass: this.bassSlider.value
    };
    
    chrome.storage.local.set({ audioSettings: settings });
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get('audioSettings');
      if (result.audioSettings) {
        const { speed, intensity, reverb, bass } = result.audioSettings;
        
        if (speed) this.speedSlider.value = speed;
        if (intensity) this.intensitySlider.value = intensity;
        if (reverb) this.reverbSlider.value = reverb;
        if (bass) this.bassSlider.value = bass;
        
        this.updateAllSliderFills();
      }
    } catch (error) {
      console.log('[8D Audio] Could not load settings:', error);
    }
  }
}


// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});


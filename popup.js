/**
 * 8D Audio Extension - Popup Script
 * 
 * UI-only script that communicates with the background service worker.
 * All audio processing happens in the offscreen document with HRTF 3D audio.
 */

class PopupController {
  constructor() {
    this.isActive = false;
    this.activeTabId = null;
    
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
    this.heightSlider = document.getElementById('heightSlider');
    
    // Value displays
    this.speedValue = document.getElementById('speedValue');
    this.intensityValue = document.getElementById('intensityValue');
    this.reverbValue = document.getElementById('reverbValue');
    this.bassValue = document.getElementById('bassValue');
    this.heightValue = document.getElementById('heightValue');
    
    // Slider fills
    this.speedFill = document.getElementById('speedFill');
    this.intensityFill = document.getElementById('intensityFill');
    this.reverbFill = document.getElementById('reverbFill');
    this.bassFill = document.getElementById('bassFill');
    this.heightFill = document.getElementById('heightFill');
    
    // Preset buttons
    this.presetButtons = document.querySelectorAll('.preset-btn');
    
    this.init();
  }

  async init() {
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
    
    this.setupSlider(this.heightSlider, this.heightValue, this.heightFill,
      (value) => `${Math.round(value)}%`,
      (value) => ({ height: value / 100 }),
      0, 100);
    
    // Preset buttons
    this.presetButtons.forEach(btn => {
      btn.addEventListener('click', () => this.applyPreset(btn.dataset.preset));
    });
    
    // Load saved settings
    await this.loadSettings();
    
    // Update slider visuals
    this.updateAllSliderFills();
    
    // Check current processing status
    await this.checkStatus();
  }

  setupSlider(slider, valueDisplay, fillElement, formatter, settingsMapper, min, max) {
    const updateSlider = async () => {
      const value = parseFloat(slider.value);
      valueDisplay.textContent = formatter(value);
      
      // Update fill width
      const percentage = ((value - min) / (max - min)) * 100;
      fillElement.style.width = `${percentage}%`;
      
      // Update processor if active
      if (this.isActive) {
        await this.sendMessage({ 
          action: 'updateSettings', 
          settings: settingsMapper(value) 
        });
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
    
    // Height
    this.heightFill.style.width = `${this.heightSlider.value}%`;
    this.heightValue.textContent = `${this.heightSlider.value}%`;
  }

  async checkStatus() {
    try {
      const response = await this.sendMessage({ action: 'getStatus' });
      
      if (response.success && response.isProcessing) {
        this.isActive = true;
        this.activeTabId = response.activeTabId;
        this.updateUIState(true);
        
        // Update sliders from current settings if available
        if (response.settings) {
          this.updateSlidersFromSettings(response.settings);
        }
      }
    } catch (error) {
      console.log('[8D Audio Popup] Could not get status:', error);
    }
  }

  updateSlidersFromSettings(settings) {
    if (settings.speed !== undefined) {
      this.speedSlider.value = settings.speed;
    }
    if (settings.intensity !== undefined) {
      this.intensitySlider.value = settings.intensity * 100;
    }
    if (settings.reverb !== undefined) {
      this.reverbSlider.value = settings.reverb * 100;
    }
    if (settings.bassBoost !== undefined) {
      this.bassSlider.value = settings.bassBoost * 100;
    }
    if (settings.height !== undefined) {
      this.heightSlider.value = settings.height * 100;
    }
    this.updateAllSliderFills();
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
      if (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://'))) {
        throw new Error('Cannot capture audio from browser pages');
      }
      
      // Get current settings
      const settings = {
        speed: parseFloat(this.speedSlider.value),
        intensity: parseInt(this.intensitySlider.value) / 100,
        reverb: parseInt(this.reverbSlider.value) / 100,
        bassBoost: parseInt(this.bassSlider.value) / 100,
        height: parseInt(this.heightSlider.value) / 100
      };
      
      // Send activation request to background
      const response = await this.sendMessage({
        action: 'activate',
        tabId: tab.id,
        settings: settings
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Activation failed');
      }
      
      // Update UI
      this.isActive = true;
      this.activeTabId = tab.id;
      this.updateUIState(true);
      this.setStatus('Active', '3D spatial audio running in background');
      
      console.log('[8D Audio Popup] Activated successfully');
      
    } catch (error) {
      console.error('[8D Audio Popup] Activation failed:', error);
      this.showError(error.message);
      this.setStatus('Error', 'Click to try again');
    }
  }

  async deactivate() {
    try {
      // Send deactivation request to background
      const response = await this.sendMessage({ action: 'deactivate' });
      
      if (!response.success) {
        throw new Error(response.error || 'Deactivation failed');
      }
      
      // Update UI
      this.isActive = false;
      this.activeTabId = null;
      this.updateUIState(false);
      this.setStatus('Ready', 'Click to activate 8D audio');
      
      console.log('[8D Audio Popup] Deactivated');
      
    } catch (error) {
      console.error('[8D Audio Popup] Deactivation error:', error);
      this.showError(error.message);
    }
  }

  updateUIState(active) {
    if (active) {
      this.powerButton.classList.add('active');
      this.visualizer.classList.add('active');
      this.controls.classList.add('active');
      this.presetsSection.classList.add('active');
      this.statusLabel.classList.add('active');
    } else {
      this.powerButton.classList.remove('active');
      this.visualizer.classList.remove('active');
      this.controls.classList.remove('active');
      this.presetsSection.classList.remove('active');
      this.statusLabel.classList.remove('active');
    }
  }

  async applyPreset(presetName) {
    // Update button states
    this.presetButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.preset === presetName);
    });
    
    // Get preset values (matching the offscreen.js presets)
    const presets = {
      subtle: { speed: 0.5, intensity: 40, reverb: 20, bass: 10, height: 10 },
      classic: { speed: 1.0, intensity: 80, reverb: 30, bass: 20, height: 30 },
      intense: { speed: 1.8, intensity: 100, reverb: 40, bass: 40, height: 50 },
      concert: { speed: 0.7, intensity: 60, reverb: 70, bass: 30, height: 20 }
    };
    
    const preset = presets[presetName];
    if (!preset) return;
    
    // Update sliders
    this.speedSlider.value = preset.speed;
    this.intensitySlider.value = preset.intensity;
    this.reverbSlider.value = preset.reverb;
    this.bassSlider.value = preset.bass;
    this.heightSlider.value = preset.height;
    
    // Update displays
    this.updateAllSliderFills();
    
    // Apply to processor if active
    if (this.isActive) {
      await this.sendMessage({ action: 'applyPreset', preset: presetName });
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

  async sendMessage(message) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(message, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve(response || { success: false, error: 'No response' });
        }
      });
    });
  }

  saveSettings() {
    const settings = {
      speed: this.speedSlider.value,
      intensity: this.intensitySlider.value,
      reverb: this.reverbSlider.value,
      bass: this.bassSlider.value,
      height: this.heightSlider.value
    };
    
    chrome.storage.local.set({ audioSettings: settings });
  }

  async loadSettings() {
    try {
      const result = await chrome.storage.local.get('audioSettings');
      if (result.audioSettings) {
        const { speed, intensity, reverb, bass, height } = result.audioSettings;
        
        if (speed) this.speedSlider.value = speed;
        if (intensity) this.intensitySlider.value = intensity;
        if (reverb) this.reverbSlider.value = reverb;
        if (bass) this.bassSlider.value = bass;
        if (height) this.heightSlider.value = height;
        
        this.updateAllSliderFills();
      }
    } catch (error) {
      console.log('[8D Audio Popup] Could not load settings:', error);
    }
  }
}


// ============================================
// Initialize
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  new PopupController();
});

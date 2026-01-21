/**
 * 8D Audio Processor
 * 
 * Creates an immersive 8D audio experience by:
 * 1. Oscillating stereo panning (creates rotating sound effect)
 * 2. Adding reverb for spatial depth
 * 3. Optional bass boost for richer low frequencies
 * 
 * The "8D" effect is achieved by smoothly panning audio left-to-right
 * in a sinusoidal pattern, making it feel like the sound is rotating
 * around your head when wearing headphones.
 */

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
    
    // Animation state
    this.isActive = false;
    this.animationId = null;
    this.startTime = 0;
    
    // Settings
    this.settings = {
      speed: 1.0,        // Rotation speed multiplier
      intensity: 0.8,    // How far left/right the pan goes (0-1)
      reverb: 0.3,       // Reverb wet/dry mix (0-1)
      bassBoost: 0.2     // Bass boost amount (0-1)
    };
  }

  /**
   * Initialize the audio processor with a media stream
   * @param {MediaStream} stream - The captured tab audio stream
   */
  async initialize(stream) {
    try {
      // Create audio context
      this.audioContext = new AudioContext();
      
      // Create source from the captured stream
      this.sourceNode = this.audioContext.createMediaStreamSource(stream);
      
      // Create the stereo panner for L/R rotation
      this.pannerNode = this.audioContext.createStereoPanner();
      this.pannerNode.pan.value = 0;
      
      // Create gain node for volume control
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 1.0;
      
      // Create bass boost (low shelf filter)
      this.bassBoostNode = this.audioContext.createBiquadFilter();
      this.bassBoostNode.type = 'lowshelf';
      this.bassBoostNode.frequency.value = 200;
      this.bassBoostNode.gain.value = 0;
      
      // Create convolution reverb
      await this.createReverb();
      
      // Create dry/wet mix nodes for reverb
      this.dryGainNode = this.audioContext.createGain();
      this.wetGainNode = this.audioContext.createGain();
      
      // Set initial reverb mix
      this.updateReverbMix();
      
      // Connect the audio graph:
      // Source -> Bass Boost -> Panner -> [Dry path + Wet/Reverb path] -> Gain -> Destination
      this.sourceNode.connect(this.bassBoostNode);
      this.bassBoostNode.connect(this.pannerNode);
      
      // Dry path (direct signal)
      this.pannerNode.connect(this.dryGainNode);
      this.dryGainNode.connect(this.gainNode);
      
      // Wet path (reverb)
      this.pannerNode.connect(this.reverbNode);
      this.reverbNode.connect(this.wetGainNode);
      this.wetGainNode.connect(this.gainNode);
      
      // Output
      this.gainNode.connect(this.audioContext.destination);
      
      console.log('[8D Audio] Processor initialized successfully');
      return true;
    } catch (error) {
      console.error('[8D Audio] Failed to initialize processor:', error);
      throw error;
    }
  }

  /**
   * Create a simple algorithmic reverb using delay lines
   * This creates a more natural spatial effect
   */
  async createReverb() {
    // Create convolver node for reverb
    this.reverbNode = this.audioContext.createConvolver();
    
    // Generate impulse response for a medium room reverb
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2; // 2 second reverb tail
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        // Exponential decay with some randomness for natural sound
        const decay = Math.exp(-3 * i / length);
        channelData[i] = (Math.random() * 2 - 1) * decay;
      }
    }
    
    this.reverbNode.buffer = impulse;
  }

  /**
   * Update the reverb wet/dry mix
   */
  updateReverbMix() {
    if (!this.dryGainNode || !this.wetGainNode) return;
    
    const wetAmount = this.settings.reverb;
    const dryAmount = 1 - (wetAmount * 0.5); // Keep some dry signal
    
    this.dryGainNode.gain.setTargetAtTime(dryAmount, this.audioContext.currentTime, 0.1);
    this.wetGainNode.gain.setTargetAtTime(wetAmount, this.audioContext.currentTime, 0.1);
  }

  /**
   * Update bass boost amount
   */
  updateBassBoost() {
    if (!this.bassBoostNode) return;
    
    // Convert 0-1 to dB gain (-6 to +12 dB range)
    const gainDb = this.settings.bassBoost * 18 - 6;
    this.bassBoostNode.gain.setTargetAtTime(gainDb, this.audioContext.currentTime, 0.1);
  }

  /**
   * Start the 8D audio effect
   */
  start() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.startTime = this.audioContext.currentTime;
    this.animate();
    
    console.log('[8D Audio] Effect started');
  }

  /**
   * Stop the 8D audio effect (resets panning to center)
   */
  stop() {
    this.isActive = false;
    
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    
    // Smoothly return to center
    if (this.pannerNode && this.audioContext) {
      this.pannerNode.pan.setTargetAtTime(0, this.audioContext.currentTime, 0.1);
    }
    
    console.log('[8D Audio] Effect stopped');
  }

  /**
   * Animation loop for the panning effect
   * Uses a sine wave to create smooth left-right oscillation
   */
  animate() {
    if (!this.isActive || !this.audioContext) return;
    
    const elapsed = this.audioContext.currentTime - this.startTime;
    
    // Calculate pan position using sine wave
    // Speed controls how fast it rotates, intensity controls how far it pans
    const baseFrequency = 0.15; // Base rotation speed (cycles per second)
    const frequency = baseFrequency * this.settings.speed;
    const panValue = Math.sin(elapsed * frequency * Math.PI * 2) * this.settings.intensity;
    
    // Apply the pan value
    this.pannerNode.pan.setTargetAtTime(panValue, this.audioContext.currentTime, 0.02);
    
    // Continue animation
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  /**
   * Update settings
   * @param {Object} newSettings - Partial settings object
   */
  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    
    // Apply reverb and bass boost changes immediately
    if ('reverb' in newSettings) {
      this.updateReverbMix();
    }
    if ('bassBoost' in newSettings) {
      this.updateBassBoost();
    }
    
    console.log('[8D Audio] Settings updated:', this.settings);
  }

  /**
   * Apply a preset configuration
   * @param {string} presetName - Name of the preset
   */
  applyPreset(presetName) {
    const presets = {
      subtle: {
        speed: 0.5,
        intensity: 0.4,
        reverb: 0.2,
        bassBoost: 0.1
      },
      classic: {
        speed: 1.0,
        intensity: 0.8,
        reverb: 0.3,
        bassBoost: 0.2
      },
      intense: {
        speed: 1.8,
        intensity: 1.0,
        reverb: 0.4,
        bassBoost: 0.4
      },
      concert: {
        speed: 0.7,
        intensity: 0.6,
        reverb: 0.7,
        bassBoost: 0.3
      }
    };
    
    const preset = presets[presetName];
    if (preset) {
      this.updateSettings(preset);
      return preset;
    }
    return null;
  }

  /**
   * Get current pan position (-1 to 1)
   */
  getCurrentPan() {
    return this.pannerNode ? this.pannerNode.pan.value : 0;
  }

  /**
   * Clean up and disconnect all nodes
   */
  destroy() {
    this.stop();
    
    if (this.sourceNode) {
      this.sourceNode.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    this.audioContext = null;
    this.sourceNode = null;
    this.pannerNode = null;
    this.gainNode = null;
    this.reverbNode = null;
    this.bassBoostNode = null;
    this.dryGainNode = null;
    this.wetGainNode = null;
    
    console.log('[8D Audio] Processor destroyed');
  }
}

// Export for use in popup.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Audio8DProcessor;
}


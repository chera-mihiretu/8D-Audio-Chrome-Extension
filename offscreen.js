/**
 * 8D Audio Extension - Offscreen Document
 * 
 * This runs in the background and handles all audio processing.
 * Uses PannerNode with HRTF for true 3D spatial audio.
 */

// ============================================
// Audio8DProcessor Class - True 3D Spatial Audio
// ============================================

class Audio8DProcessor {
  constructor() {
    this.audioContext = null;
    this.sourceNode = null;
    this.pannerNode = null;       // 3D PannerNode with HRTF
    this.gainNode = null;
    this.reverbNode = null;
    this.bassBoostNode = null;
    this.highShelfNode = null;    // For presence/clarity
    this.dryGainNode = null;
    this.wetGainNode = null;
    this.compressorNode = null;   // For consistent levels
    
    this.isActive = false;
    this.intervalId = null;
    this.startTime = 0;
    
    // Default settings
    this.settings = {
      speed: 1.0,           // Rotation speed multiplier
      intensity: 0.8,       // How far the sound travels (radius)
      reverb: 0.3,          // Reverb wet/dry mix
      bassBoost: 0.2,       // Low frequency boost
      height: 0.3,          // Vertical movement amount (0 = flat circle, 1 = full sphere)
      distance: 2.0         // Base distance from listener
    };
  }

  async initialize(streamId) {
    try {
      // Get the media stream using the stream ID from tabCapture
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          mandatory: {
            chromeMediaSource: 'tab',
            chromeMediaSourceId: streamId
          }
        },
        video: false
      });

      if (!stream) {
        throw new Error('Failed to get media stream');
      }

      this.stream = stream;
      this.audioContext = new AudioContext();
      
      // Set up the listener (the "head" position)
      const listener = this.audioContext.listener;
      
      // Position listener at origin, facing forward (-Z direction)
      if (listener.positionX) {
        // Modern API
        listener.positionX.setValueAtTime(0, this.audioContext.currentTime);
        listener.positionY.setValueAtTime(0, this.audioContext.currentTime);
        listener.positionZ.setValueAtTime(0, this.audioContext.currentTime);
        listener.forwardX.setValueAtTime(0, this.audioContext.currentTime);
        listener.forwardY.setValueAtTime(0, this.audioContext.currentTime);
        listener.forwardZ.setValueAtTime(-1, this.audioContext.currentTime);
        listener.upX.setValueAtTime(0, this.audioContext.currentTime);
        listener.upY.setValueAtTime(1, this.audioContext.currentTime);
        listener.upZ.setValueAtTime(0, this.audioContext.currentTime);
      } else {
        // Legacy API
        listener.setPosition(0, 0, 0);
        listener.setOrientation(0, 0, -1, 0, 1, 0);
      }
      
      this.sourceNode = this.audioContext.createMediaStreamSource(stream);
      
      // Create 3D Panner with HRTF for realistic spatial audio
      this.pannerNode = this.audioContext.createPanner();
      this.pannerNode.panningModel = 'HRTF';  // Head-Related Transfer Function
      
      // Use 'linear' distance model with careful settings for consistent volume
      // This prevents volume spikes when sound passes close to listener
      this.pannerNode.distanceModel = 'linear';
      this.pannerNode.refDistance = 1;           // Reference distance (no attenuation)
      this.pannerNode.maxDistance = 10;          // Max distance for attenuation calc
      this.pannerNode.rolloffFactor = 0.1;       // Very gentle rolloff (almost none)
      
      // No cone restrictions - sound radiates equally in all directions
      this.pannerNode.coneInnerAngle = 360;
      this.pannerNode.coneOuterAngle = 360;
      this.pannerNode.coneOuterGain = 0;
      
      // Initial position (directly in front of listener)
      // At angle=0: x=0, z=-distance (in front)
      this.setPosition(0, 0, -this.settings.distance);
      
      // Master gain
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 1.0;
      
      // Bass boost (low shelf filter)
      this.bassBoostNode = this.audioContext.createBiquadFilter();
      this.bassBoostNode.type = 'lowshelf';
      this.bassBoostNode.frequency.value = 150;
      this.bassBoostNode.gain.value = 0;
      
      // High shelf for presence/clarity
      this.highShelfNode = this.audioContext.createBiquadFilter();
      this.highShelfNode.type = 'highshelf';
      this.highShelfNode.frequency.value = 4000;
      this.highShelfNode.gain.value = 2; // Slight boost for clarity
      
      // Compressor for consistent levels during movement
      this.compressorNode = this.audioContext.createDynamicsCompressor();
      this.compressorNode.threshold.value = -24;
      this.compressorNode.knee.value = 30;
      this.compressorNode.ratio.value = 4;
      this.compressorNode.attack.value = 0.003;
      this.compressorNode.release.value = 0.25;
      
      // Create reverb
      await this.createReverb();
      
      // Dry/wet mix nodes
      this.dryGainNode = this.audioContext.createGain();
      this.wetGainNode = this.audioContext.createGain();
      
      // Apply initial settings
      this.updateReverbMix();
      this.updateBassBoost();
      
      // Connect the audio graph:
      // Source → Bass Boost → High Shelf → Panner → [Dry + Reverb] → Compressor → Gain → Output
      
      this.sourceNode.connect(this.bassBoostNode);
      this.bassBoostNode.connect(this.highShelfNode);
      this.highShelfNode.connect(this.pannerNode);
      
      // Dry path (direct spatial audio)
      this.pannerNode.connect(this.dryGainNode);
      this.dryGainNode.connect(this.compressorNode);
      
      // Wet path (reverb for added space)
      this.pannerNode.connect(this.reverbNode);
      this.reverbNode.connect(this.wetGainNode);
      this.wetGainNode.connect(this.compressorNode);
      
      // Final output
      this.compressorNode.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
      
      console.log('[8D Audio] Processor initialized with HRTF 3D audio');
      return true;
    } catch (error) {
      console.error('[8D Audio] Init failed:', error);
      throw error;
    }
  }

  /**
   * Set the 3D position of the sound source
   */
  setPosition(x, y, z) {
    if (!this.pannerNode || !this.audioContext) return;
    
    const currentTime = this.audioContext.currentTime;
    
    if (this.pannerNode.positionX) {
      // Modern API with AudioParams (smoother)
      this.pannerNode.positionX.setTargetAtTime(x, currentTime, 0.02);
      this.pannerNode.positionY.setTargetAtTime(y, currentTime, 0.02);
      this.pannerNode.positionZ.setTargetAtTime(z, currentTime, 0.02);
    } else {
      // Legacy API
      this.pannerNode.setPosition(x, y, z);
    }
  }

  /**
   * Create a high-quality reverb impulse response
   */
  async createReverb() {
    this.reverbNode = this.audioContext.createConvolver();
    
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2.5; // 2.5 second reverb tail
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    
    // Create a more natural-sounding reverb with early reflections
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      
      for (let i = 0; i < length; i++) {
        // Multi-stage decay for more natural sound
        const t = i / sampleRate;
        
        // Early reflections (first 50ms)
        const earlyDecay = t < 0.05 ? Math.exp(-t * 20) * 0.5 : 0;
        
        // Late reverb (exponential decay)
        const lateDecay = Math.exp(-t * 2.5);
        
        // Combine with randomness
        const noise = Math.random() * 2 - 1;
        channelData[i] = noise * (earlyDecay + lateDecay * 0.5);
      }
    }
    
    this.reverbNode.buffer = impulse;
  }

  updateReverbMix() {
    if (!this.dryGainNode || !this.wetGainNode || !this.audioContext) return;
    
    const wetAmount = this.settings.reverb;
    const dryAmount = 1 - (wetAmount * 0.3); // Keep most of dry signal
    
    this.dryGainNode.gain.setTargetAtTime(dryAmount, this.audioContext.currentTime, 0.1);
    this.wetGainNode.gain.setTargetAtTime(wetAmount * 0.7, this.audioContext.currentTime, 0.1);
  }

  updateBassBoost() {
    if (!this.bassBoostNode || !this.audioContext) return;
    // Convert 0-1 to dB gain (-3 to +12 dB range)
    const gainDb = this.settings.bassBoost * 15 - 3;
    this.bassBoostNode.gain.setTargetAtTime(gainDb, this.audioContext.currentTime, 0.1);
  }

  start() {
    if (this.isActive) return;
    this.isActive = true;
    this.startTime = Date.now();
    
    // Use setInterval for consistent updates in offscreen document
    // 60fps update rate for smooth spatial movement
    this.intervalId = setInterval(() => this.update3DPosition(), 16);
    
    console.log('[8D Audio] 3D spatial effect started');
  }

  stop() {
    this.isActive = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    // Return to front-center position (directly in front of listener)
    this.setPosition(0, 0, -this.settings.distance);
    
    console.log('[8D Audio] Effect stopped');
  }

  /**
   * Update the 3D position of the sound source
   * Creates a true circular orbit around the listener at CONSTANT distance
   * This ensures consistent volume throughout the rotation
   */
  update3DPosition() {
    if (!this.isActive || !this.audioContext || !this.pannerNode) return;
    
    // Calculate elapsed time in seconds
    const elapsed = (Date.now() - this.startTime) / 1000;
    
    // Rotation speed: base is ~6.7 seconds per full rotation
    const baseSpeed = 0.15;
    const speed = baseSpeed * this.settings.speed;
    
    // Main rotation angle (horizontal orbit)
    const angle = elapsed * speed * Math.PI * 2;
    
    // Use a fixed radius for consistent distance (and thus consistent volume)
    // The intensity controls how wide the orbit feels via the HRTF effect
    const radius = this.settings.distance;
    
    // TRUE CIRCULAR ORBIT at constant distance from listener
    // This fixes the volume fluctuation issue!
    // X: left-right (positive = right ear, negative = left ear)
    // Z: front-back (negative = in front, positive = behind)
    const x = Math.sin(angle) * radius * this.settings.intensity;
    const z = -Math.cos(angle) * radius;  // Negative cos so sound starts in front
    
    // Y position: vertical movement (subtle up-down based on height setting)
    // Using a different frequency for more organic movement
    const verticalAngle = angle * 1.5;
    const y = Math.sin(verticalAngle) * this.settings.height * 0.5;
    
    // Set the new 3D position
    this.setPosition(x, y, z);
  }

  updateSettings(newSettings) {
    this.settings = { ...this.settings, ...newSettings };
    
    if ('reverb' in newSettings) this.updateReverbMix();
    if ('bassBoost' in newSettings) this.updateBassBoost();
    
    console.log('[8D Audio] Settings updated:', this.settings);
  }

  applyPreset(presetName) {
    const presets = {
      subtle: { 
        speed: 0.5, 
        intensity: 0.4, 
        reverb: 0.2, 
        bassBoost: 0.1,
        height: 0.1,
        distance: 1.5
      },
      classic: { 
        speed: 1.0, 
        intensity: 0.8, 
        reverb: 0.3, 
        bassBoost: 0.2,
        height: 0.3,
        distance: 2.0
      },
      intense: { 
        speed: 1.8, 
        intensity: 1.0, 
        reverb: 0.4, 
        bassBoost: 0.4,
        height: 0.5,
        distance: 2.5
      },
      concert: { 
        speed: 0.7, 
        intensity: 0.6, 
        reverb: 0.7, 
        bassBoost: 0.3,
        height: 0.2,
        distance: 3.0
      }
    };
    
    const preset = presets[presetName];
    if (preset) {
      this.updateSettings(preset);
      return preset;
    }
    return null;
  }

  getSettings() {
    return { ...this.settings };
  }

  destroy() {
    this.stop();
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    // Disconnect all nodes
    const nodes = [
      this.sourceNode,
      this.pannerNode,
      this.bassBoostNode,
      this.highShelfNode,
      this.reverbNode,
      this.dryGainNode,
      this.wetGainNode,
      this.compressorNode,
      this.gainNode
    ];
    
    nodes.forEach(node => {
      if (node) {
        try { node.disconnect(); } catch (e) {}
      }
    });
    
    if (this.audioContext) {
      this.audioContext.close();
    }
    
    this.audioContext = null;
    this.sourceNode = null;
    this.pannerNode = null;
    this.gainNode = null;
    this.reverbNode = null;
    this.bassBoostNode = null;
    this.highShelfNode = null;
    this.dryGainNode = null;
    this.wetGainNode = null;
    this.compressorNode = null;
    
    console.log('[8D Audio] Processor destroyed');
  }
}


// ============================================
// Offscreen Controller
// ============================================

let processor = null;
let isProcessing = false;

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Only handle messages targeted at offscreen document
  if (message.target !== 'offscreen') {
    return false; // Let other listeners handle it
  }
  
  console.log('[8D Audio Offscreen] Received message:', message.action);
  
  handleMessage(message).then(sendResponse).catch(error => {
    console.error('[8D Audio Offscreen] Error:', error);
    sendResponse({ success: false, error: error.message });
  });
  
  return true; // Keep the message channel open for async response
});

async function handleMessage(message) {
  switch (message.action) {
    case 'start':
      return await startProcessing(message.streamId, message.settings);
    
    case 'stop':
      return stopProcessing();
    
    case 'updateSettings':
      return updateSettings(message.settings);
    
    case 'applyPreset':
      return applyPreset(message.preset);
    
    case 'getStatus':
      return getStatus();
    
    default:
      return { success: false, error: 'Unknown action' };
  }
}

async function startProcessing(streamId, settings) {
  try {
    // Clean up existing processor if any
    if (processor) {
      processor.destroy();
    }
    
    processor = new Audio8DProcessor();
    
    // Apply settings before initializing
    if (settings) {
      processor.updateSettings(settings);
    }
    
    await processor.initialize(streamId);
    processor.start();
    isProcessing = true;
    
    return { success: true, settings: processor.getSettings() };
  } catch (error) {
    console.error('[8D Audio Offscreen] Start failed:', error);
    return { success: false, error: error.message };
  }
}

function stopProcessing() {
  if (processor) {
    processor.destroy();
    processor = null;
  }
  isProcessing = false;
  return { success: true };
}

function updateSettings(settings) {
  if (!processor) {
    return { success: false, error: 'Processor not running' };
  }
  processor.updateSettings(settings);
  return { success: true, settings: processor.getSettings() };
}

function applyPreset(presetName) {
  if (!processor) {
    return { success: false, error: 'Processor not running' };
  }
  const settings = processor.applyPreset(presetName);
  return { success: true, settings };
}

function getStatus() {
  return {
    success: true,
    isProcessing,
    settings: processor ? processor.getSettings() : null
  };
}

console.log('[8D Audio Offscreen] Document loaded - HRTF 3D Audio ready');

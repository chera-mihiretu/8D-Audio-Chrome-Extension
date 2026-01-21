/**
 * 8D Audio Extension - Background Service Worker
 * 
 * Handles background tasks and extension lifecycle events.
 * Note: The actual audio processing happens in the popup since
 * it requires an active audio context and user interaction.
 */

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[8D Audio] Extension installed');
    
    // Set default settings
    chrome.storage.local.set({
      audioSettings: {
        speed: '1',
        intensity: '80',
        reverb: '30',
        bass: '20'
      }
    });
  } else if (details.reason === 'update') {
    console.log('[8D Audio] Extension updated to version', chrome.runtime.getManifest().version);
  }
});

// Handle extension icon click (opens popup by default via manifest)
// This listener is here for potential future keyboard shortcut support
chrome.action.onClicked.addListener((tab) => {
  // The popup handles everything, but this could be used for
  // a keyboard shortcut toggle in the future
  console.log('[8D Audio] Extension clicked on tab:', tab.id);
});

// Clean up when the extension is suspended
self.addEventListener('suspend', () => {
  console.log('[8D Audio] Service worker suspending');
});

console.log('[8D Audio] Background service worker started');


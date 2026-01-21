/**
 * 8D Audio Extension - Background Service Worker
 * 
 * Manages the offscreen document for audio processing and
 * coordinates communication between popup and offscreen document.
 */

// Track state
let isProcessing = false;
let activeTabId = null;

// ============================================
// Offscreen Document Management
// ============================================

const OFFSCREEN_DOCUMENT_PATH = 'offscreen.html';

async function hasOffscreenDocument() {
  const contexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOCUMENT_PATH)]
  });
  return contexts.length > 0;
}

async function createOffscreenDocument() {
  if (await hasOffscreenDocument()) {
    console.log('[8D Audio BG] Offscreen document already exists');
    return;
  }
  
  await chrome.offscreen.createDocument({
    url: OFFSCREEN_DOCUMENT_PATH,
    reasons: ['USER_MEDIA'],
    justification: 'Audio processing for 8D audio effect'
  });
  
  console.log('[8D Audio BG] Offscreen document created');
}

async function closeOffscreenDocument() {
  if (await hasOffscreenDocument()) {
    await chrome.offscreen.closeDocument();
    console.log('[8D Audio BG] Offscreen document closed');
  }
}


// ============================================
// Message Handling
// ============================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('[8D Audio BG] Received message:', message.action);
  
  handleMessage(message).then(sendResponse).catch(error => {
    console.error('[8D Audio BG] Error:', error);
    sendResponse({ success: false, error: error.message });
  });
  
  return true; // Keep channel open for async response
});

async function handleMessage(message) {
  switch (message.action) {
    case 'activate':
      return await activateProcessing(message.tabId, message.settings);
    
    case 'deactivate':
      return await deactivateProcessing();
    
    case 'updateSettings':
      return await forwardToOffscreen({ action: 'updateSettings', settings: message.settings });
    
    case 'applyPreset':
      return await forwardToOffscreen({ action: 'applyPreset', preset: message.preset });
    
    case 'getStatus':
      return await getProcessingStatus();
    
    default:
      return { success: false, error: 'Unknown action' };
  }
}

async function forwardToOffscreen(message) {
  if (!await hasOffscreenDocument()) {
    return { success: false, error: 'Audio processing not active' };
  }
  
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(message, resolve);
  });
}


// ============================================
// Audio Processing Control
// ============================================

async function activateProcessing(tabId, settings) {
  try {
    // Ensure offscreen document exists
    await createOffscreenDocument();
    
    // Get media stream ID for the tab
    const streamId = await chrome.tabCapture.getMediaStreamId({
      targetTabId: tabId
    });
    
    if (!streamId) {
      throw new Error('Failed to get media stream ID');
    }
    
    // Send to offscreen document to start processing
    const response = await new Promise((resolve) => {
      chrome.runtime.sendMessage({
        action: 'start',
        streamId: streamId,
        settings: settings
      }, resolve);
    });
    
    if (response.success) {
      isProcessing = true;
      activeTabId = tabId;
      
      // Save state
      await chrome.storage.local.set({ 
        isProcessing: true, 
        activeTabId: tabId,
        settings: response.settings
      });
    }
    
    return response;
  } catch (error) {
    console.error('[8D Audio BG] Activation failed:', error);
    return { success: false, error: error.message };
  }
}

async function deactivateProcessing() {
  try {
    // Tell offscreen document to stop
    if (await hasOffscreenDocument()) {
      await new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: 'stop' }, resolve);
      });
    }
    
    // Close offscreen document
    await closeOffscreenDocument();
    
    isProcessing = false;
    activeTabId = null;
    
    // Save state
    await chrome.storage.local.set({ 
      isProcessing: false, 
      activeTabId: null 
    });
    
    return { success: true };
  } catch (error) {
    console.error('[8D Audio BG] Deactivation failed:', error);
    return { success: false, error: error.message };
  }
}

async function getProcessingStatus() {
  const hasDoc = await hasOffscreenDocument();
  
  if (hasDoc) {
    const response = await forwardToOffscreen({ action: 'getStatus' });
    return {
      success: true,
      isProcessing: response.isProcessing || false,
      activeTabId,
      settings: response.settings
    };
  }
  
  return {
    success: true,
    isProcessing: false,
    activeTabId: null,
    settings: null
  };
}


// ============================================
// Tab Event Handling
// ============================================

// Stop processing when the captured tab is closed
chrome.tabs.onRemoved.addListener(async (tabId) => {
  if (tabId === activeTabId && isProcessing) {
    console.log('[8D Audio BG] Captured tab closed, stopping processing');
    await deactivateProcessing();
  }
});

// Stop processing when the captured tab navigates to a new URL
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo) => {
  if (tabId === activeTabId && changeInfo.url && isProcessing) {
    console.log('[8D Audio BG] Captured tab navigated, stopping processing');
    await deactivateProcessing();
  }
});


// ============================================
// Extension Lifecycle
// ============================================

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('[8D Audio BG] Extension installed');
    
    // Set default settings
    chrome.storage.local.set({
      audioSettings: {
        speed: '1',
        intensity: '80',
        reverb: '30',
        bass: '20'
      },
      isProcessing: false,
      activeTabId: null
    });
  } else if (details.reason === 'update') {
    console.log('[8D Audio BG] Extension updated to version', chrome.runtime.getManifest().version);
  }
});

// Restore state on startup
chrome.runtime.onStartup.addListener(async () => {
  // Reset processing state on browser restart
  await chrome.storage.local.set({ 
    isProcessing: false, 
    activeTabId: null 
  });
  console.log('[8D Audio BG] Browser started, reset processing state');
});

console.log('[8D Audio BG] Service worker started');

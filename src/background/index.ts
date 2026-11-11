import './storage-listener';

chrome.runtime.onInstalled.addListener(() => {
  console.info('DevTool-Kit installed successfully.');
});

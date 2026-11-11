chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'local') return;

  console.info('Chrome local storage changed:', changes);
});

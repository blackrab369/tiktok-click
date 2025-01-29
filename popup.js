document.getElementById('downloadButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: extractVideoUrl
    }, (injectionResults) => {
      const videoUrl = injectionResults[0].result;
      if (videoUrl) {
        chrome.downloads.download({
          url: videoUrl,
          filename: 'tiktok-video.mp4'
        });
      } else {
        alert('Could not extract video URL. Make sure you are on a TikTok video page.');
      }
    });
  });
});

function extractVideoUrl() {
  const videoElement = document.querySelector('video');
  if (videoElement) {
    return videoElement.src;
  }
  return null;
}

chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    const url = new URL(details.url);
    const decodedUrl = decodeURIComponent(url.searchParams.get("pdf"));
    if (decodedUrl.startsWith("http://") || decodedUrl.startsWith("https://")) {
      chrome.tabs.update(details.tabId, { url: decodedUrl });
    }
  });
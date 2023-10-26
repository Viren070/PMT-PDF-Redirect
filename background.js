chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  const url = new URL(details.url);
  const domain = url.hostname;

  switch (domain) {
    case "www.physicsandmathstutor.com":
      // Handle redirection logic for physicsandmathstutor.com
      const decodedUrl = decodeURIComponent(url.searchParams.get("pdf"));
      if (decodedUrl.startsWith("http://") || decodedUrl.startsWith("https://")) {
        console.log("Redirecting to the original PDF URL: " + decodedUrl);
        chrome.tabs.update(details.tabId, { url: decodedUrl });
      }
      break;

    case "alevelmathsrevision.com":
      // Handle redirection logic for alevelmathsrevision.com
      if (url.pathname === "/pdf-viewer/") {
        // Extract the original PDF file URL
        const pdfPath = url.searchParams.get("file");
        if (pdfPath) {
          const originalPdfUrl = "https://alevelmathsrevision.com" + pdfPath;
          console.log("Redirecting to the original PDF URL: " + originalPdfUrl);
          chrome.tabs.update(details.tabId, { url: originalPdfUrl });
        }
      }
      break;
      
    default:
      break;
  }
});

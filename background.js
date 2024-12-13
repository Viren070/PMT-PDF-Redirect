chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  try {
    const url = new URL(details.url);
    const domain = url.hostname;

    switch (domain) {
      case "www.physicsandmathstutor.com":
      case "www.physicsandmathstutor.co.uk":
        const pdfParam = url.searchParams.get("pdf");
        if (pdfParam) {
          const decodedUrl = decodeURIComponent(pdfParam);
          if (decodedUrl.startsWith("http://") || decodedUrl.startsWith("https://")) {
            console.log("Redirecting to the original PDF URL: " + decodedUrl);
            chrome.tabs.update(details.tabId, { url: decodedUrl });
          } else {
            console.warn("Invalid decoded URL: " + decodedUrl);
          }
        } else {
          console.warn("Missing 'pdf' parameter in URL: " + details.url);
        }
        break;

      default:
        console.log("Unhandled domain: " + domain);
        break;
    }
  } catch (error) {
    console.error("Error handling navigation event:", error);
  }
});

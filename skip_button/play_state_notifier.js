chrome.extension.onRequest.addListener(function(request, sender, callback) {
    var skipAttributes = document.getElementById("ff").attributes;
    var state = "disabled";
    if (skipAttributes.getNamedItem("class").nodeValue.indexOf("disabled") == -1)
      state = "enable";
    callback(state);
  });

document.getElementById("playing_controls").addEventListener("DOMSubtreeModified", function() {
    chrome.extension.sendRequest(0);
  });

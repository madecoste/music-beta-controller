chrome.extension.onRequest.addListener(function(request, sender, callback) {
    var skipAttributes = document.getElementById("ff").attributes;
    var state = "disabled";
    if (skipAttributes.getNamedItem("disabled") == undefined)
      state = "enable";
    callback(state);
  });

document.getElementById("playing_controls").addEventListener("DOMSubtreeModified", function() {
    chrome.extension.sendRequest(0);
  });

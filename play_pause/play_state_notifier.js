chrome.extension.onRequest.addListener(function(request, sender, callback) {
    var playPauseAttributes = document.getElementById("playPause").attributes;
    var state = "disabled";
    if (playPauseAttributes.getNamedItem("disabled") == -1)
      if (playPauseAttributes.getNamedItem("class").indexOf("playing") == -1)
        state = "Pause";
      else
        state = "Play";
    callback(state);
  });

document.getElementById("playing_controls").addEventListener("DOMSubtreeModified", function() {
    chrome.extension.sendRequest(0);
  });

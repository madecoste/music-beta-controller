// Find a the first tab in the current window that is showing Music Beta
// and call callback with the id of that tab.
// TODO(mad): Move to common location.
function FindMusicBetaTab(callback) {
  chrome.windows.getAll({populate: true}, function(windows) {
      var pattern = 'https?\:\/\/play\.google\.com\/music\/listen.*';
      for (var window = 0; window < windows.length; window++) {
        for (var i = 0; i < windows[window].tabs.length; i++) {
          if (windows[window].tabs[i].url.match(pattern)) {
            callback(windows[window].tabs[i].id)
            return;
          }
        }
      }
      callback(null);
    });
}

function UpdateIcon(state) {
  if (state == "enable")
    chrome.browserAction.setIcon({path: "skip-19x19.png"});
  else
    chrome.browserAction.setIcon({path: "logo-19x19.png"});
}

function UpdateIconFromPageState() {
  FindMusicBetaTab(function(tab_id) {
      if (tab_id)
        chrome.tabs.sendRequest(tab_id, "getSkipState", UpdateIcon);
      else
        chrome.browserAction.setIcon({path: "logo-19x19.png"});
    });
}
// Initial update based on initial state when we get loaded.
UpdateIconFromPageState();

// React to tabs notifications by updating our icon state if needed.
chrome.tabs.onAttached.addListener(UpdateIconFromPageState);
chrome.tabs.onDetached.addListener(UpdateIconFromPageState);
chrome.tabs.onCreated.addListener(UpdateIconFromPageState);
chrome.tabs.onRemoved.addListener(UpdateIconFromPageState);
chrome.tabs.onUpdated.addListener(UpdateIconFromPageState);

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  FindMusicBetaTab(function(tab_id) {
      if (tab_id) {
        chrome.tabs.executeScript(tab_id,
            {
              code: "document.querySelector('*[data-id=\"forward\"]').click();",
              allFrames: true
            });
      } else {
        chrome.tabs.create({url: 'http://play.google.com/music/listen',
                            selected: true});
      }
    });
});

// Called when the Skip state changes.
chrome.extension.onRequest.addListener(function(message, sender, callback) {
    UpdateIconFromPageState();
    callback();
  });

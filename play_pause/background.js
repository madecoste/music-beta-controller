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

// Send the given command to a tab showing Music Beta,
// or open one if non exists.
function clickButton(buttonId) {
  FindMusicBetaTab(function(tab_id) {
      if (tab_id) {
        chrome.tabs.executeScript(tab_id,
            {
              code: "document.querySelector('*[data-id=\"" + buttonId +
                    "\"]').click();",
              allFrames: true
            });
      } else {
        chrome.tabs.create({url: 'http://play.google.com/music/listen',
                            selected: true});
      }
    });
}

// Update the Browser Action based on the provided Play/Pause/Other state.
function UpdateIcon(state) {
  if (state == "Pause")
    chrome.browserAction.setIcon({path: "pause-19x19.png"});
  else if (state == "Play")
    chrome.browserAction.setIcon({path: "play-19x19.png"});
  else
    chrome.browserAction.setIcon({path: "logo-19x19.png"});
}

// Get the play state from a MusicBeta tab and call UpdateIcon with it.
function UpdateIconFromPageState() {
  FindMusicBetaTab(function(tab_id) {
      if (tab_id)
        chrome.tabs.sendRequest(tab_id, "getPlayState", UpdateIcon);
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
chrome.browserAction.onClicked.addListener(function (tab) {
    clickButton('play-pause');
  });

// Called when the Play/Pause state changes.
chrome.extension.onRequest.addListener(function(message, sender, callback) {
    UpdateIconFromPageState();
    callback();
  });

// Omnibox support, add and react to a list of suggest commands.
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    var suggestions = [{ content: "sk", description: "Skip" },
                       { content: "rs", description: "Restart" },
                       { content: "pp", description: "Play/Pause" },
                       { content: "fg", description: "Foreground Music Tab" }];
    suggest(suggestions);
  });
chrome.omnibox.onInputEntered.addListener(function (text) {
    if (text.toLowerCase().match('pp')) {
      clickButton('play-pause');;
    } else if (text.toLowerCase().match('rs')) {
      clickButton('rewind');
    } else if (text.toLowerCase().match('sk')) {
      clickButton('forward');
    } else if (text.toLowerCase().match('fg')) {
        FindMusicBetaTab(function(tab_id) {
          if (tab_id)
            chrome.tabs.update(tab_id, {selected: true});
        });
    }
  });

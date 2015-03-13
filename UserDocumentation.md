This page describes how to use the Music Beta Controller extensions.

# Installing #

The extensions can be found in the [Chrome Webstore](https://chrome.google.com/webstore), you can search for [music beta controller](https://chrome.google.com/webstore/search?q=music+beta+controller) go directly to the [Play/Pause](https://chrome.google.com/webstore/detail/lblkffdkmmemjagfanapkgkogilikbad) or [Skip](https://chrome.google.com/webstore/detail/lfpilffkipfhpoccjdiebpdjbdmfpefg) extension pages.

These extensions don't need any permissions so the installation should be transparent.

# First use #

Once installed, each extension shows a Browser Action button in the Chrome toolbar.

The icons will intitially look the same for both the Skip and the Play/Pause extension because they would both do the same thing at that point, open a Music Beta by Google tab (if none is already available).

Note that if a Music Beta by Google tab is already opened when the extensions get installed or updated, the tab needs to be refreshed so the script that tells the extensions to update their icon is loaded. Note that creating a new tab after the extension was installed/updated won't fix the problem is the existing one is not closed since the extension gives priority to older tabs.

[Issue 7](http://code.google.com/p/music-beta-controller/issues/detail?id=7) was filed to eventually fix this.
# Icon state #

The Play/Pause button shows a play symbol (▷) at the top when Music Beta is ready to play, and shows a pause symbol (◫) while playing. This reflects the same state as the Play/Pause button at the bottom left of the Music Beta Web page.

In the same manner, the Skip extension button shows a skip symbol (|▷▷) at the top when Music Beta is either playing or paused, so any time we can switch to the next song. This reflects the state as the Next song button at the bottom left of the Music Beta Web page.

Note that the Music Beta app can be in a state that it can't play anything (e.g., when nothing was played yet, and the Artists, Albums or Genres is selected). Even the play controller at the bottom left of the web app isn't enable in that state and so the Browser action buttons will both look the same.

# Buttons behavior #

You should have guessed by now that clicking on the Play/Pause button when Music Beta is in a playable state will start playback, and clicking on it while playing, will pause the playback. And, of course, clicking on the Skip button, whether music beta is currently playing or paused, will Skip to the next song. If the current state was paused, hitting the skip button will start the playback of the next song.

# Omnibox commands #

On top of Browser Actions, the Music Beta Controller exposes commands via the omnibox. by typing `mc` (for Music Controller) in the Chrome omnibox, you are offered the following commands:

  * **Play/Pause** (abbreviated to `pp`) does the exact same thing has clicking on the Play/Pause Browser Action.
  * **Skip** (abbreviated to `sk`) does the exact same thing has clicking on the Skip Browser Action.
  * **Restart** (abbreviated to `rs`) restarts the currently playing song, or skips to the previous one. The same behaviour as the "Previous Song" button in the Music Beta web app playing controller at the bottom left of the page.
  * **Foreground Music Tab** (abbreviated to `fg`) brings the Music Beta tab to the foreground, if one is opened, or opens a new one otherwise.

# References #

For more details about Chrome Extensions in general: http://code.google.com/chrome/extensions/index.html

Fore more details about Browser Actions: http://code.google.com/chrome/extensions/browserAction.html

For more details about Omnibox commands: http://code.google.com/chrome/extensions/omnibox.html
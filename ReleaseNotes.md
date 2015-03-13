This page enumerates the changes that were made in the previous releases in a reverse chronological order.

# Play/Pause & Skip 1.0.2 #

As suggested in [issue 10](http://code.google.com/p/music-beta-controller/issues/detail?id=10), [revision b3a39a88ee...](http://code.google.com/p/music-beta-controller/source/detail?r=b3a39a88ee0eb5f3e22875cac0e4b89fbfed1adf) changed the code that was comparing the beginning of the tab's URL strings to http://music.google.com/music/listen so that it now uses a regular expression instead and support https too.

# Skip 1.0.1 #

Fixed [issue 2](http://code.google.com/p/music-beta-controller/issues/detail?id=2), which was caused by the state of the Skip button being dependent on the state of the Play/Pause but of the Music Beta Web page as opposed to following the state of the Next song button.

# Play/Pause 1.0.1 #

As suggested in [issue 1](http://code.google.com/p/music-beta-controller/issues/detail?id=1), the keyword to launch the omnibox commands has been changed from 'mb' to 'mc'. 'mb' stood for Music Beta, but since the Beta term is likely to eventually be removed, it's more appropriate to use 'mc' for Music Controller which should better stand the  test of time.
### TODO:
- [x] library logic, status: almost done
- [ ] player logic, status: NEEDS REFRACTOR

### pending fixes
- [ ] fix album art size
- [ ] fix time format when the song is longer than one hour
- [x] fix DRY for the folder explorer
- [ ] fix DRY for the seconds formater (mm:ss)
- [ ] fix glitch when you skip on the progress bar and no songs are in the playlist it crashes
- [ ] fix when you update the folder the tracks are not in order
- [ ] fix scrollbar in library messing up symetrical spacing in the tabs navbar

### features to add
- [ ] add doubleclick playlist to change song
- [ ] add current song playing in the playlist turning black
- [ ] add save and delete playlist
- [ ] add save state and load state
- [ ] add React router animation transitions between tabs
- [ ] do animation while parsing library
- [ ] make dialog.open for file explorer asynchronous
- [ ] minimize to tray icon

### console.logs:
- [ ] remove from sidenav.jsx
- [ ] remove from playbar.container.jsx
- [ ] remove from player.container.jsx

### things that maybe would be nice to do:
- [ ] further split library_item_song
- [ ] move the local storage code to another place
- [ ] refractore the save/delete/update playlist logic to not use double search

### things that would be nice to do but im probably not going to do because it takes too much time:
- [ ] introduce and put 'business' logic in redux-saga

## Resources to learn electron:

- https://github.com/electron/electron#resources-for-learning-electron
- https://github.com/electron/electron-api-demos
- https://github.com/hokein/electron-sample-apps

## Libaries used:
- chroma.js https://github.com/gka/chroma.js
docs: https://gka.github.io/chroma.js/

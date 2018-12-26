### TODO:
- [x] library logic, status: almost done
- [ ] player logic, status: could use some refractoring

### pending fixes
- [ ] fix album art size
- [ ] fix time format when the song is longer than one hour
- [x] fix DRY for the folder explorer
- [ ] fix DRY for the seconds formater (mm:ss)
- [ ] fix glitch when you skip on the progress bar and no songs are in the playlist it crashes
- [x] fix when you update the folder the tracks are not in order
- [ ] fix scrollbar in library messing up symetrical spacing in the tabs navbar

### features to add
- [ ] add doubleclick playlist to change song
- [ ] add current song playing in the playlist turning black/highlighted
- [x] add save playlist
- [ ] add overwrite playlist
- [ ] add delete playlist
- [x] add save state and load state
- [ ] add React router animation transitions between tabs
- [ ] do animation while parsing library
- [ ] make dialog.open for file explorer asynchronous
- [ ] minimize to tray icon
- [ ] add more visualizations

### console.logs:
- [ ] remove from playbar.container.jsx

### things that would be nice to do:
- [ ] further split library_item_song
- [ ] move the local storage code to another place
- [ ] refractor the save/delete/update playlist logic to not use double search

### things that would be nice to do but im probably not going to do because it takes too much time:
- [ ] introduce and put 'business' logic in redux-saga

## Resources to learn electron:
- https://github.com/electron/electron#resources-for-learning-electron
- https://github.com/electron/electron-api-demos
- https://github.com/hokein/electron-sample-apps

## Libaries used:
- chroma.js https://github.com/gka/chroma.js
docs: https://gka.github.io/chroma.js/

import types from './types';

export function addToPlayList(audioFile) {
  return { type: types.APP_PLAYLIST_ADD_SONG, 'audioFile': audioFile };
}


export function changeCurrentPlaylist(playlist) {
  return { type: types.APP_PLAYLIST_CHANGE_CURRENT, playlist };
}

export function clearCurrentPlaylist() {
  return { type: types.APP_PLAYLIST_CLEAR_CURRENT };
}

/**
 * switch the playlist in playlist_view to the new one
 * @param {Object} playlist the playlist to load in playlist_view
 */
export function changeSelectedPlaylist(playlist) {
  return { type: types.APP_PLAYLIST_CHANGE_SELECTED, playlist };
}

export function deleteSongSelectedPlaylist(index) {
  return { type: types.APP_PLAYLIST_DELETE_SONG_SELECTED, index };
}

export function deleteSongCurrentPlaylist(index) {
  return { type: types.APP_PLAYLIST_DELETE_SONG, index };
}

/**
 * save the playlist to database
 * @param {Object} playlist from store
 */
export function storePlaylist(playlist) {
  return { type: types.APP_PLAYLIST_STORE_ADD, payload: playlist };
}

// library ---------------------------------------------------------------------------
export function changeDirectoryLibraryUp(folderNavBarIndex) {
  return { type: types.APP_LIBRARY_CHANGE_DIRECTORY_UP, payload: folderNavBarIndex };
}

export function changeDirectoryLibraryDown(folderIndex) {
  return { type: types.APP_LIBRARY_CHANGE_DIRECTORY_DOWN, payload: folderIndex };
}

export function addToLibrary(folderData) {
  return { type: types.APP_LIBRARY_ADD, payload: folderData };
}

export function clearLibrary() {
  return { type: types.APP_LIBRARY_CLEAR };
}
// library ---------------------------------------------------------------------------

// player  ---------------------------------------------------------------------------

export function playerPlay() {
  return { type: types.APP_PLAYER_PLAY };
}

export function playerPause() {
  return { type: types.APP_PLAYER_PAUSE };
}

// here next cursor is the current cursor+1
export function playerNext() {
  return { type: types.APP_PLAYER_NEXT };
}

// here previous cursor is the current cursor-1
export function playerPrevious() {
  return { type: types.APP_PLAYER_PREVIOUS };
}

// player  ---------------------------------------------------------------------------

export function toggleSidenav() {
  return { type: types.APP_PLAYLIST_TOGGLE_SIDENAV };
}

export function toggleSidenavRight() {
  return { type: types.APP_PLAYLIST_TOGGLE_SIDENAV_RIGHT };
}

export function toggleAlbumArt() {
  return { type: types.APP_PLAYLIST_TOGGLE_ALBUMART };
}

export function saveState(currentState) {
  return { type: types.SAVE_STATE, payload: currentState };
}

export function loadState(loadedState) {
  return { type: types.LOAD_STATE, payload: loadedState };
}

export function clearState(clearState) {
  return { type: types.CLEAR_STATE, payload: clearState };
}

export function switchSketch(sketchNumber) {
  return { type: types.SWITCH_SKETCH, payload: sketchNumber };
}

import types from './types';

export function addToPlayList(audioFile) {
    return { type: types.APP_PLAYLIST_ADD, "audioFile":audioFile };
}

export function addToCurrentLibrary(object) {
    return { type: types.APP_LIBRARY_ADD_CURRENT, dataPath: {...object}, };
}

export function changeDirectoryLibraryUp(folderNavBarIndex) {
    return { type: types.APP_LIBRARY_CHANGE_DIRECTORY_UP, folderNavBarIndex};
}

export function changeDirectoryLibraryDown(folderName) {
    return { type: types.APP_LIBRARY_CHANGE_DIRECTORY_DOWN, folderName};
}

export function addToLibrary(path, metadata, albumArtPath) {
    return { 
        type: types.APP_LIBRARY_ADD, 
        audioFile: {
            "path": path, 
            "metadata": metadata, 
            "albumArtPath":albumArtPath,
        } 
    };
}

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

export function addToLibraryStack(currentFolder){
    return { type: types.APP_LIBRARY_ADD_STACK, currentFolder };
}

export function toggleSidenav(){
    return { type: types.APP_PLAYLIST_TOGGLE_SIDENAV };
}

export function toggleAlbumArt() {
    return { type: types.APP_PLAYLIST_TOGGLE_ALBUMART };
}
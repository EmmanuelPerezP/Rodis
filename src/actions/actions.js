import types from './types';


export function addToPlayList(audioFile) {
    return { type: types.APP_PLAYLIST_ADD, "audioFile":audioFile };
}

export function addToCurrentLibrary(object) {
    return { type: types.APP_LIBRARY_ADD_CURRENT, dataPath: {...object}, };
}

export function addToLibraryNavbar(folderName) {
    return { type: types.APP_LIBRARY_ADD_NAVBAR, folderName};
}

export function changeDirectoryLibrary(object) {
    return { type: types.APP_LIBRARY_CHANGE_DIRECTORY, dataPath: {...object}, };
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
export function playerNext(nextCursor) {
    return { type: types.APP_PLAYER_NEXT, "nextCursor": nextCursor };
}

// here previous cursor is the current cursor-1
export function playerPrevious(previousCursor) {
    return { type: types.APP_PLAYER_PREVIOUS, "previousCursor": previousCursor };
}

export function addToLibraryStack(currentFolder){
    return { type: types.APP_LIBRARY_ADD_STACK, currentFolder };
}
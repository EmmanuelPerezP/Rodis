import types from './types';


export function addToPlayList(audioFile) {
    return { type: types.APP_PLAYLIST_ADD, "audioFile":audioFile };
}

export function addToLibrary(path, metadata) {
    return { type: types.APP_LIBRARY_ADD, audioFile: {"path": path, "metadata": metadata} };
}
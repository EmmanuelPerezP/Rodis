import types from './types';


export function addToPlayList(path) {
    return { type: types.APP_PLAYLIST_ADD, path };
}
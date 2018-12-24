import types from '../actions/types';


const Store = window.require('electron-store');

const storeEl = new Store();

// import { config } from '../lib/app';
// import { shuffleTracks } from '../utils/utils-player';

const initialState = {
  // queue: [], // Tracks to be played
  // oldQueue: [], // Queue backup (in case of shuffle)
  libraryNavbar: ['Library'], // 'Library' is always going to be the root folder
  library: [], // the library folders
  libraryStack: [[]],
  playlist: {
    name: null,
    songs: [],
  }, // the current playlist
  playlists: [],
  playlistCursor: 0,
  // queueCursor: null, // The cursor of the queue
  // repeat: config.get('audioRepeat'), // the current repeat state (one, all, none)
  // shuffle: config.get('audioShuffle'), // If shuffle mode is enabled
  playerStatus: 'stop', // Player status, can be 'stop', 'play', 'pause'
  currentSong: '',
  uiState: {
    showSidenav: false,
    showSidenavRight: false,
    showAlbumArt: true,
  },
  sketch: 1,
};


// if you have a question about fat reducers vs fat action creators look at this link
// https://redux.js.org/faq/code-structure#how-should-i-split-my-logic-between-reducers-and-action-creators-where-should-my-business-logic-go

export default (state = initialState, action) => {
  switch (action.type) {
    case (types.SWITCH_SKETCH): {
      return {
        ...state,
        sketch: action.payload,
      };
    }

    case (types.LOAD_STATE): {
      const newState = storeEl.get('state', initialState);
      return {
        ...newState,
      };
    }

    case (types.SAVE_STATE): {
      storeEl.set('state', state);
      return {
        ...state,
      };
    }

    case (types.APP_PLAYLIST_TOGGLE_ALBUMART): {
      return {
        ...state,
        uiState: {
          ...state.uiState,
          showAlbumArt: !state.uiState.showAlbumArt,
        },
      };
    }

    case (types.APP_PLAYLIST_TOGGLE_SIDENAV): {
      return {
        ...state,
        uiState: {
          ...state.uiState,
          showSidenav: !state.uiState.showSidenav,
        },
      };
    }

    case (types.APP_PLAYLIST_TOGGLE_SIDENAV_RIGHT): {
      return {
        ...state,
        uiState: {
          ...state.uiState,
          showSidenavRight: !state.uiState.showSidenavRight,
        },
      };
    }

    case (types.APP_PLAYLIST_ADD_SONG): {
      const playlistSongs = [...state.playlist.songs, action.audioFile];
      const playlistNew = state.playlist;
      playlistNew.songs = playlistSongs;
      return {
        ...state,
        playlist: playlistNew,
      };
    }

    /**
     * @param action.payload the playlist item
     */
    case (types.APP_PLAYLIST_STORE_ADD): {
      const playlists = [...state.playlists, action.payload];
      return {
        ...state,
        playlists: playlists,
      };
    }

    case (types.APP_PLAYLIST_CURRENT_UPDATE): {
      const newPlaylist = { 
        ...state,
        songs: ...state.playlist.songs
      };
      return {
        ...state,
        playlists: playlists,
        playlist: {
          ...state.playlist,
          songs: ...state.playlist.songs,
        }
      };
    }


    // library ---------------------------------------------------------------------------
    case (types.APP_LIBRARY_CHANGE_DIRECTORY_UP): {
      const index = action.payload;
      const tempLibraryNavbar = [...state.libraryNavbar];
      const tempLibraryStack = [...state.libraryStack];
      // we do -1 because the library Stack is always going to have
      // one empty element at the beginning and the length is always +1 from the index
      while (tempLibraryStack.length - 1 > index) {
        // pop the navbar and stack items until we get the selected one as the current one
        tempLibraryNavbar.splice(-1, 1);
        tempLibraryStack.splice(-1, 1);
      }
      return {
        ...state,
        libraryNavbar: tempLibraryNavbar,
        libraryStack: tempLibraryStack,
      };
    }

    /**
     * @param action.payload the data corresponding a folder parsed from explorer.js
     */
    case (types.APP_LIBRARY_CHANGE_DIRECTORY_DOWN): {
      // we update the navbar state
      const libraryNav = [...state.libraryNavbar, action.payload.fileName];
      // we update the library Stack adding an empty array for the new items of the new folder
      const tempLibraryStack = [...state.libraryStack, action.payload.subFolder];
      return {
        ...state,
        libraryNavbar: libraryNav,
        libraryStack: tempLibraryStack,
      };
    }

    /**
     * Clear the library and nav to the default ones
     */
    case (types.APP_LIBRARY_CLEAR): {
      return {
        ...state,
        libraryNavbar: initialState.libraryNavbar,
        libraryStack: initialState.libraryStack,
      };
    }

    /**
     * @param action.payload the folder parsed from the explorer.js
     */
    case (types.APP_LIBRARY_ADD): {
      const library = [action.payload];
      return {
        ...state,
        library,
        libraryStack: library,
      };
    }
    // library ---------------------------------------------------------------------------

    // Player ---------------------------------------------------------------------------


    case (types.APP_PLAYER_START): {
      const { queue, queueCursor, oldQueue } = action;
      // Backup that and change the UI
      return {
        ...state,
        queue,
        queueCursor,
        oldQueue,
        playerStatus: 'play',
      };
    }

    case (types.APP_PLAYER_PLAY): {
      return {
        ...state,
        playerStatus: 'play',
      };
    }

    case (types.APP_PLAYER_PAUSE): {
      return {
        ...state,
        playerStatus: 'pause',
      };
    }

    case (types.APP_PLAYER_STOP): {
      const newState = {
        ...state,
        queue: [],
        queueCursor: null,
        playerStatus: 'stop',
      };

      return newState;
    }

    case (types.APP_PLAYER_NEXT): {
      let nextCursor;
      if (state.playlistCursor < state.playlist.songs.length - 1) {
        nextCursor = state.playlistCursor + 1;
      } else {
        nextCursor = state.playlistCursor;
      }
      return {
        ...state,
        playlistCursor: nextCursor,
      };
    }

    case (types.APP_PLAYER_PREVIOUS): {
      let nextCursor;
      if (state.playlistCursor > 0) {
        nextCursor = state.playlistCursor - 1;
      } else {
        nextCursor = state.playlistCursor;
      }

      return {
        ...state,
        playlistCursor: nextCursor,
      };
    }

    case (types.APP_PLAYER_JUMP_TO): {
      return state;
    }

    // Player ---------------------------------------------------------------------------


    // case (types.APP_PLAYER_SHUFFLE): {
    //   const trackPlayingId = state.queue[state.queueCursor]._id;
    //
    //   // If we need to shuffle everything
    //   if (payload.shuffle) {
    //     // Let's shuffle that
    //     const { queueCursor } = state;
    //     const queue = shuffleTracks([...state.queue], queueCursor);
    //
    //     return {
    //       ...state,
    //       queue,
    //       queueCursor: 0,
    //       oldQueue: state.queue,
    //       shuffle: true,
    //     };
    //   }

    //   // Unshuffle the queue by restoring the initial queue
    //   const currentTrackIndex = state.oldQueue.findIndex(track => (
    //     trackPlayingId === track._id
    //   ));
    //
    //   Roll back to the old but update queueCursor
    //   return {
    //     ...state,
    //     queue: [...state.oldQueue],
    //     queueCursor: currentTrackIndex,
    //     shuffle: false,
    //   };
    // }
    //
    // case (types.APP_PLAYER_REPEAT): {
    //   return {
    //     ...state,
    //     repeat: payload.repeat,
    //   };
    // }
    //
    // case (types.APP_QUEUE_START): {
    //   const queue = [...state.queue];
    //   const queueCursor = payload.index;
    //
    //   // Backup that and change the UI
    //   return {
    //     ...state,
    //     queue,
    //     queueCursor,
    //     playerStatus: 'play',
    //   };
    // }
    //
    // case (types.APP_QUEUE_CLEAR): {
    //   const queue = [...state.queue];
    //   const { queueCursor } = state;
    //   queue.splice(queueCursor + 1, queue.length - queueCursor);
    //
    //   return {
    //     ...state,
    //     queue,
    //   };
    // }
    //
    // case (types.APP_QUEUE_REMOVE): {
    //   const queue = [...state.queue];
    //   queue.splice(state.queueCursor + payload.index + 1, 1);
    //   return {
    //     ...state,
    //     queue,
    //   };
    // }
    //
    // case (types.APP_QUEUE_ADD): {
    //   const queue = [...state.queue, ...payload.tracks];
    //   return {
    //     ...state,
    //     queue,
    //   };
    // }
    //
    // case (types.APP_QUEUE_ADD_NEXT): {
    //   const queue = [...state.queue];
    //   queue.splice(state.queueCursor + 1, 0, ...payload.tracks);
    //   return {
    //     ...state,
    //     queue,
    //   };
    // }
    //
    // case (types.APP_QUEUE_SET_QUEUE): {
    //   return {
    //     ...state,
    //     queue: payload.tracks,
    //   };
    // }

    default: {
      return state;
    }
  }
};

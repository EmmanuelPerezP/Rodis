import types from '../actions/types';

// import { config } from '../lib/app';
// import { shuffleTracks } from '../utils/utils-player';

const initialState = {
  // queue: [], // Tracks to be played
  // oldQueue: [], // Queue backup (in case of shuffle)
  playlist: [],
  library: [],
  playlistCursor: 0,
  // queueCursor: null, // The cursor of the queue
  // repeat: config.get('audioRepeat'), // the current repeat state (one, all, none)
  // shuffle: config.get('audioShuffle'), // If shuffle mode is enabled
  playerStatus: 'stop', // Player status
};

export default (state = initialState, action) => {
  switch (action.type) {


    case(types.APP_LIBRARY_ADD): {
      const library = [...state.library, action.audioFile];
      return {
        ...state,
        library: library,
      };
    }

    case(types.APP_PLAYLIST_ADD): {
      const playlist = [...state.playlist, action.audioFile];
      return {
        ...state,
        playlist: playlist,
      };
    }

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
      return {
        ...state,
        playerStatus: 'play',
        playlistCursor: action.nextCursor,
      };
    }

    case (types.APP_PLAYER_PREVIOUS): {
      return {
        ...state,
        playerStatus: 'play',
        playlistCursor: action.previousCursor,
      };
    }

    case (types.APP_PLAYER_JUMP_TO): {
      return state;
    }

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

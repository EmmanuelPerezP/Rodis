import React from 'react';
// redux
import { connect } from 'react-redux';
// components
import LibraryView from './library_view/library_view';
import Player from '../lib/player';
import { playerNext } from '../actions/actions';
// import { connect } from 'tls';

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    // var currentSongPath = this.props.playlist[this.props.playlistCursor].path;

    const { playlist, playlistCursor, dispatch } = this.props;

    if (playlist.length > 0) {
      Player.setAudioSrc(`file://${playlist[playlistCursor].path}`);
      Player.audio.play();
      console.log('set song file and play', playlist[playlistCursor].path);
    }
    Player.getAudio().addEventListener('ended', () => dispatch(playerNext()));
  }

  componentDidUpdate(prevProps) {
    const { playlist, playlistCursor, playerStatus } = this.props;

    // only manipulate the player if there is a song in the current playlist
    if (playlist.length > 0) {
      // if we press the next or previous button set the audio source to the next song
      if (playlistCursor !== prevProps.playlistCursor) {
        // console.log("audio set");
        Player.setAudioSrc(`file://${playlist[playlistCursor].path}`);
        console.log('changed song file', playlist[playlistCursor].path);
      }
      if (playerStatus === 'pause' && prevProps.playerStatus === 'play') {
        Player.audio.pause();
        console.log('call Player.audio.pause()');
      } else if (playerStatus === 'play') {
        Player.audio.play();
        console.log('call Player.audio.play()');
      }
    }
    // if we added a song to the previously empty playlist set the audio source to the current song
    if (playlist.length > prevProps.playlist.length && prevProps.playlist.length === 0) {
      Player.setAudioSrc(`file://${playlist[playlistCursor].path}`);
      console.log('changed song file', playlist[playlistCursor].path);
    }
  }

  render() {
    return (
      null
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
    "library": state.player.library,
    "libraryStack": state.player.libraryStack,
    "libraryCurrent": state.player.libraryCurrent,
    "playlistCursor": state.player.playlistCursor,
    ...ownProps,
    ...state.player,
  };
}


export default connect(mapStateToProps)(PlayerContainer)
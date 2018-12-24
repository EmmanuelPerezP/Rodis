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
    const { songs } = playlist;

    if (songs.length > 0) {
      Player.setAudioSrc(`file://${songs[playlistCursor].path}`);
      Player.audio.play();
    }
    Player.getAudio().addEventListener('ended', () => dispatch(playerNext()));
  }

  componentDidUpdate(propsPrev) {
    const { playlist, playlistCursor, playerStatus } = this.props;
    const { playlist: playlistPrev, playlistCursor: playlistCursorPrev, playerStatus: playerStatusPrev } = propsPrev;
    const { songs } = playlist;
    console.log(songs);
    const { songsPrev } = playlistPrev;

    // only manipulate the player if there is a song in the current playlist
    if (songs.length > 0) {
      // if we press the next or previous button set the audio source to the next song
      if (playlistCursor !== propsPrev.playlistCursor) {
        // console.log("audio set");
        Player.setAudioSrc(`file://${songs[playlistCursor].path}`);
      }
      if (playerStatus === 'pause' && propsPrev.playerStatus === 'play') {
        Player.audio.pause();
      } else if (playerStatus === 'play') {
        Player.audio.play();
      }
    }
    // if we added a song to the previously empty playlist set the audio source to the current song
    if (songs.length > playlistPrev.length && playlistPrev.length === 0) {
      Player.setAudioSrc(`file://${songs[playlistCursor].path}`);
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
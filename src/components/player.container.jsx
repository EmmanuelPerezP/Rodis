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
    const { songs: songsPrev } = playlistPrev;

    // only manipulate the player if there is a song in the current playlist
    if (songs.length > 0) {
      // if we press the next or previous button set the audio source to the next song
      if (playlistCursor !== propsPrev.playlistCursor) {
        Player.setAudioSrc(`file://${songs[playlistCursor].path}`);
      }
      // if the player goes from 'play' to 'pause' pause the audio
      if (playerStatus === 'pause' && propsPrev.playerStatus === 'play') {
        Player.audio.pause();
      // if the player goes from 'pause' to 'play' play the audio
      } else if (playerStatus === 'play') {
        Player.audio.play();
      }
    }

    // if we added a song to the previously empty playlist set the audio source to the current song
    if (songs.length > songsPrev.length && songsPrev.length === 0) {
      Player.setAudioSrc(`file://${songs[playlistCursor].path}`);
    }
    if (playlist.name !== playlistPrev.name && songs.length !== 0) {
      Player.setAudioSrc(`file://${songs[playlistCursor].path}`);
      if (playerStatus === 'play') {
        Player.audio.play();
      }
    }
    // if the playlist is cleared stop the player
    if (songs.length === 0) {
      Player.audio.pause();
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
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

    if (typeof playlist[playlistCursor] != 'undefined') { 
      Player.setAudioSrc(`file://${playlist[playlistCursor].path}`);
      Player.audio.play();
    }
    Player.getAudio().addEventListener('ended', () => dispatch(playerNext()));
  }

  componentDidUpdate(prevProps) {
    const { playlist, playlistCursor, playerStatus } = this.props;

    if (typeof playlist[playlistCursor] != "undefined") {
      // we do this to not restart the song everytime we play or pause the player
      // if we press play before loading the song to playlist the song doesnt plays (thats why the === stop condition is there)
      // if there is no stop then it doesnt reloads
      if (playlistCursor !== prevProps.playlistCursor || playerStatus == 'stop') {
        // console.log("audio set");
        Player.setAudioSrc(`file://${playlist[playlistCursor].path}`);
      }
    }
    if (typeof playlist[playlistCursor] != 'undefined') {
      if (playerStatus == 'pause' && prevProps.playerStatus == 'play') {
        Player.audio.pause();
      } else if (playerStatus == 'play') {
        Player.audio.play();
        // console.log("play");
      }
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
    "libraryNavbar": state.player.libraryNavbar,
    "playlistCursor": state.player.playlistCursor,
    ...ownProps,
    ...state.player,
  }
}


export default connect(mapStateToProps)(PlayerContainer)
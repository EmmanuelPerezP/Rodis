import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import VisualizerPlayer from './visualizer_player';
// import { connect } from 'tls';
import { playerNext } from '../../actions/actions';

class VisualizerPlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.playNextSong = this.playNextSong.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const { playerStatus, playlist, playlistCursor, sketch } = this.props;
    let differentPath = false;
    let differentPlayerStates = false;
    let differentSketches = false;

    // if a track is loaded
    if (playlist.length > 0) {
      if (nextProps.playerStatus === 'play' || nextProps.playerStatus === 'pause') {
        differentPath = playlist[playlistCursor].path !== nextProps.playlist[nextProps.playlistCursor].path;
        differentPlayerStates = playerStatus !== nextProps.playerStatus;
      }
      if (differentPath || differentPlayerStates) {
        // console.log("component should update");
      }
    }
    if (sketch !== nextProps.sketch) {
      differentSketches = true;
    }
    return differentPath || differentPlayerStates || differentSketches;
  }

  // we pass this function via props to the sketch to execute when song ends
  playNextSong() {
    const { dispatch } = this.props;
    dispatch(playerNext());
  }

  render() {
    const { playerStatus, playlist, playlistCursor, sketch } = this.props;
    // this.props.library is the songs in the library
    // console.log("render visualizer");
    let filePath = '';
    if (playerStatus === 'play' || playerStatus === 'pause') {
      // console.log(this.props.playlistCursor);
      let currentSongPath = playlist[playlistCursor].path;
      filePath = `file://${currentSongPath}`;
    }

    return (
      <VisualizerPlayer
        sketch={sketch}
        playNextSong={this.playNextSong}
        audioFilePath={filePath}
        playerStatus={playerStatus}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playerStatus": state.player.playerStatus,
    "playlist": state.player.playlist,
    "playlistCursor": state.player.playlistCursor,
    "sketch": state.player.sketch,
    ...ownProps,
  };
}


export default connect(mapStateToProps)(VisualizerPlayerContainer);

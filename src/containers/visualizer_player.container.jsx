import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import VisualizerPlayer from '../components/visualizer_player';
// import { connect } from 'tls';

class VisualizerPlayerContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    var differentPath = false;
    var differentPlayerStates = false;
    if(nextProps.playerStatus === 'play' || nextProps.playerStatus === 'pause') {
      differentPath = this.props.playlist[this.props.playlistCursor].path !== nextProps.playlist[nextProps.playlistCursor].path;
      differentPlayerStates = this.props.playerStatus !== nextProps.playerStatus;
    }
    return differentPath || differentPlayerStates;
  }

  render() {
    // this.props.library is the songs in the library
    console.log("render visualizer");
    var filePath = '';
    if(this.props.playerStatus == 'play') {
      console.log(this.props.playlistCursor);
      var currentSongPath = this.props.playlist[this.props.playlistCursor].path;
      var filePath = 'file://' + currentSongPath;
    }

    return (
      <VisualizerPlayer audioFilePath={filePath} playerStatus={this.props.playerStatus} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playerStatus": state.player.playerStatus,
    "playlist": state.player.playlist,
    "playlistCursor": state.player.playlistCursor,
    ...ownProps,
  }
}


export default connect(mapStateToProps)(VisualizerPlayerContainer);
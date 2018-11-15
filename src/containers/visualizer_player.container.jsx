import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import VisualizerPlayer from '../components/visualizer_player';
// import { connect } from 'tls';
import { playerNext } from '../actions/actions';

class VisualizerPlayerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.playNextSong = this.playNextSong.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    var differentPath = false;
    var differentPlayerStates = false;
    var differentSketches = false;
    // if a track is loaded
    if (typeof this.props.playlist[this.props.playlistCursor] != "undefined"){
      if(nextProps.playerStatus === 'play' || nextProps.playerStatus === 'pause') {
        differentPath = this.props.playlist[this.props.playlistCursor].path !== nextProps.playlist[nextProps.playlistCursor].path;
        differentPlayerStates = this.props.playerStatus !== nextProps.playerStatus;
      }
      if(differentPath || differentPlayerStates){
        // console.log("component should update");
      }
    }
    if (this.props.sketch != nextProps.sketch){
      differentSketches = true;
    }
    
    return differentPath || differentPlayerStates || differentSketches;
  }

  // we pass this function via props to the sketch to execute when song ends
  playNextSong(){
    this.props.dispatch(playerNext());
  }

  render() {

    // this.props.library is the songs in the library
    // console.log("render visualizer");
    var filePath = '';
    if(this.props.playerStatus == 'play' || this.props.playerStatus == 'pause') {
      // console.log(this.props.playlistCursor);
      var currentSongPath = this.props.playlist[this.props.playlistCursor].path;
      var filePath = 'file://' + currentSongPath;
    }

    return (
      <VisualizerPlayer sketch={this.props.sketch} playNextSong={this.playNextSong} audioFilePath={filePath} playerStatus={this.props.playerStatus} />
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
  }
}


export default connect(mapStateToProps)(VisualizerPlayerContainer);
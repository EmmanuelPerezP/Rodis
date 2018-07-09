import React from 'react';
import audioPlayer from '../lib/player';

// redux
import { connect } from 'react-redux'
// redux actions
import { playerPause, playerNext, playerPrevious, playerPlay } from '../actions/actions';

// components
import Playbar from '../components/playbar';


class PlaybarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
  }

  handlePlay(e){
    // console.log(this.props.playlist);
    if(this.props.playerStatus == 'stop') {
      console.log(this.props.playlistCursor);
      // var currentSongPath = this.props.playlist[this.props.playlistCursor].path;
      // audioPlayer.setAudioSrc("file://"+currentSongPath);
    }
    console.log("clicked play");
    // audioPlayer.play();
    this.props.dispatch(playerPlay());
    console.log(this.props.playerState);
  }

  handlePause(e) {
    // audioPlayer.pause();
    this.props.dispatch(playerPause());
    console.log(this.props.playerState);
  }

  handlePrevious(e) {
    console.log("previous");
    console.log(this.props.playlistCursor);
    if(this.props.playlistCursor > 0) {
      var nextCursor = this.props.playlistCursor-1
      this.props.dispatch(playerPrevious(nextCursor));
      // var currentSongPath = this.props.playlist[nextCursor].path;
      // console.log(currentSongPath);
      // audioPlayer.setAudioSrc("file://"+currentSongPath);
      // audioPlayer.play();
    }
  }

  handleNext(e){
    console.log("clicked next");
    console.log(this.props.playlistCursor);
    // console.log("playlistCursor:");
    // console.log(this.props.playlistCursor);
    // console.log("playlist length:");
    // console.log(this.props.playlist.length);
    if(this.props.playlistCursor < this.props.playlist.length-1){
      var nextCursor = this.props.playlistCursor+1
      this.props.dispatch(playerNext(nextCursor));
      // var currentSongPath = this.props.playlist[nextCursor].path;
      // audioPlayer.setAudioSrc("file://"+currentSongPath);
      // audioPlayer.play();
    }
  }

    
  render() {
    return (
      <Playbar 
        playerState={this.props} 
        handleNext={this.handleNext} 
        handlePrevious={this.handlePrevious} 
        handlePause={this.handlePause} 
        handlePlay={this.handlePlay} 
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playerStatus": state.player.playerStatus,
    "playlist": state.player.playlist,
    "playlistCursor": state.player.playlistCursor,
  }
}

export default connect(mapStateToProps)(PlaybarContainer);
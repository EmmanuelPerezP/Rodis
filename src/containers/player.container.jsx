import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import LibraryView from '../components/library_view';
import Player from '../lib/player';
import { playerNext } from '../actions/actions';
// import { connect } from 'tls';

class PlayerContainer extends React.Component {
  constructor(props) {
    super(props);

    // var currentSongPath = this.props.playlist[this.props.playlistCursor].path;
    if(typeof this.props.playlist[this.props.playlistCursor] != "undefined") { 
      Player.setAudioSrc("file://"+this.props.playlist[this.props.playlistCursor].path);
      Player.audio.play();
    }
    Player.getAudio().addEventListener('ended', () => this.props.dispatch(playerNext()));

  }

  componentDidUpdate(prevProps){
    if(typeof this.props.playlist[this.props.playlistCursor] != "undefined" && typeof prevProps.playlist[prevProps.playlistCursor] != "undefined") { 
      if(this.props.playlistCursor !== prevProps.playlistCursor || this.props.playerStatus == "stop") {
        console.log("audio set");
        Player.setAudioSrc("file://"+this.props.playlist[this.props.playlistCursor].path);
      }
    }
    if(this.props.playerStatus == "pause" && prevProps.playerStatus == "play"){
      Player.audio.pause();
    }
    else if(this.props.playerStatus == "play"){
      Player.audio.play();
      console.log("play");
    }
  }

  componentDidMount(){

    // if(typeof mySound != "undefined" && mySound.isLoaded() && !mySound.isPlaying()) { 
      // var currentSongPath = this.props.playlist[this.props.playlistCursor].path;
      // audioPlayer.setAudioSrc("file://"+currentSongPath);
    // }
    // console.log("clicked play");
    // audioPlayer.play();
  }
    
  render() {
    // this.props.library is the songs in the library
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
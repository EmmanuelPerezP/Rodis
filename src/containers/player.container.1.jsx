import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import LibraryView from '../components/library_view';
// import { connect } from 'tls';

class Player extends React.Component {
  constructor(props) {
    super(props);

    const mergedOptions = {
      playbackRate: 1,
      volume: 1,
      muted: false,
    };

    this.audio = new Audio();

    this.audio.defaultPlaybackRate = mergedOptions.playbackRate;
    this.audio.playbackRate = mergedOptions.playbackRate;
    this.audio.volume = mergedOptions.volume;
    this.audio.muted = mergedOptions.muted;

    // var currentSongPath = this.props.playlist[this.props.playlistCursor].path;
    if(typeof this.props.playlist[this.props.playlistCursor] != "undefined") { 
      this.audio.src = "file://"+this.props.playlist[this.props.playlistCursor].path;
      this.audio.play();
    }

  }
  
  componentDidMount(){
    // if(typeof this.props.playlist[this.props.playlistCursor] != "undefined" && typeof prevProps.playlist[prevProps.playlistCursor] != "undefined") { 
    //   console.log(prevProps.playlist[prevProps.playlistCursor]);
    //   console.log(this.props.playlist[this.props.playlistCursor]);
    //   if(this.props.playlist[this.props.playlistCursor].path !== prevProps.playlist[prevProps.playlistCursor].path){
    //     console.log("audio set");
    //     this.durationThresholdReached = false;
    //     this.audio.src = "file://"+this.props.playlist[this.props.playlistCursor].path;
    //   }
    // }
  }

  componentDidUpdate(prevProps){
    if(typeof this.props.playlist[this.props.playlistCursor] != "undefined" && typeof prevProps.playlist[prevProps.playlistCursor] != "undefined") { 
        console.log("audio set");
        this.durationThresholdReached = false;
        this.audio.src = "file://"+this.props.playlist[this.props.playlistCursor].path;
    }
    if(this.props.playerStatus == "pause"){
      this.audio.pause();
    }
    else if(this.props.playerStatus == "play"){
      this.audio.play();
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


export default connect(mapStateToProps)(Player);
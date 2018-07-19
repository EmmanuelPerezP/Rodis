import React from 'react';
import audioPlayer from '../lib/player';

// redux
import { connect } from 'react-redux'
// redux actions
import { playerPause, playerNext, playerPrevious, playerPlay, toggleSidenav } from '../actions/actions';

// components
import Playbar from '../components/playbar';

// lib
import Player from '../lib/player';


class PlaybarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.closeSidenav = this.closeSidenav.bind(this);
    this.tick = this.tick.bind(this);
    this.handleJumpTo = this.handleJumpTo.bind(this);

    this.state = {
      elapsed: 0,
      duration: null,
      x: null,
      dragging: false,
    };
  }

  componentDidMount() {
    Player.getAudio().addEventListener('timeupdate', this.tick);

    // window.addEventListener('mousemove', this.dragOver);
    // window.addEventListener('mouseup', this.dragEnd);
  }


  componentWillUnmount() {
    Player.getAudio().removeEventListener('timeupdate', this.tick);

    // window.removeEventListener('mousemove', this.dragOver);
    // window.removeEventListener('mouseup', this.dragEnd);
  }

  handlePlay(e){
    // console.log(this.props.playlist);
    if(this.props.playerStatus == 'stop') {
      // console.log(this.props.playlistCursor);
      // var currentSongPath = this.props.playlist[this.props.playlistCursor].path;
      // audioPlayer.setAudioSrc("file://"+currentSongPath);
    }
    // console.log("clicked play");
    // audioPlayer.play();
    this.props.dispatch(playerPlay());
    // console.log(this.props.playerState);
  }

  handlePause(e) {
    // audioPlayer.pause();
    this.props.dispatch(playerPause());
    // console.log(this.props.playerState);
  }

  handlePrevious(e) {
    // console.log("previous");
    // console.log(this.props.playlistCursor);
      this.props.dispatch(playerPrevious());
      // var currentSongPath = this.props.playlist[nextCursor].path;
      // console.log(currentSongPath);
      // audioPlayer.setAudioSrc("file://"+currentSongPath);
      // audioPlayer.play();
  }

  handleNext(e){
    // console.log("clicked next");
    // console.log(this.props.playlistCursor);
    // console.log("playlistCursor:");
    // console.log(this.props.playlistCursor);
    // console.log("playlist length:");
    // console.log(this.props.playlist.length);
      this.props.dispatch(playerNext());
      // var currentSongPath = this.props.playlist[nextCursor].path;
      // audioPlayer.setAudioSrc("file://"+currentSongPath);
      // audioPlayer.play();
  }

  tick(){
    this.setState({ elapsed: Player.getCurrentTime() });
  }

  handleJumpTo(e){
    const bar = this.progressBarRef;
    // bar.offsetParent.offsetWidth: the width of the progress bar parent, class .progress
    // bar.offsetLeft: the offset coordinates of the beginning of the bar (using this for flexible css)
    // e.pageX: the x coordinate of the mouse when clicking
    // check link to understand differences between offsetWidth, offsetHeight, clientWidth, clientHeight, scrollWidth and scrollHeight
    // https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
    const percent = ((e.pageX - (bar.offsetLeft + bar.offsetParent.offsetLeft)) / bar.offsetParent.offsetWidth) * 100;
    console.log(percent);

    const currentSong = this.props.playlist[this.props.playlistCursor];
    const songDuration = currentSong.metadata.format.duration;
    const jumpTo = (percent * songDuration) / 100;

    // dispatch and actionCreator (not necessary right now)
    // PlayerActions.jumpTo(jumpTo);        // change for dispatch(jumpTo()) to make the next line in the player container
    Player.setAudioCurrentTime(jumpTo);
  }

  closeSidenav(e){
    this.props.dispatch(toggleSidenav());
  }

  render() {
    var currentSong;
    var elapsedPercent = 0;
    if(typeof this.props.playlist[this.props.playlistCursor] != "undefined"){
      currentSong = this.props.playlist[this.props.playlistCursor];
      const songDuration = currentSong.metadata.format.duration;
      elapsedPercent = (this.state.elapsed * 100) / songDuration;
    }


    return (
      <Playbar 
        playerState={this.props} 
        handleNext={this.handleNext} 
        handlePrevious={this.handlePrevious} 
        handlePause={this.handlePause} 
        handlePlay={this.handlePlay} 
        currentSong={currentSong}
        closeSidenav={this.closeSidenav}
        elapsedPercent={elapsedPercent}

        // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
        progressBarRef={(bar) => this.progressBarRef = bar}

        handleJumpTo={this.handleJumpTo}

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
import React from 'react';
// redux
import { connect } from 'react-redux';
// redux actions
import { playerPause, playerNext, playerPrevious, playerPlay, toggleSidenav,
  toggleSidenavRight, loadState, saveState } from '../../actions/actions';
// components
import Playbar from './playbar';
// lib
import Player from '../../lib/player';


class PlaybarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.closeSidenav = this.closeSidenav.bind(this);
    this.closeSidenavRight = this.closeSidenavRight.bind(this);
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
    const { dispatch } = this.props;
    Player.getAudio().addEventListener('timeupdate', this.tick);

    // dispatch(loadState());
    // window.addEventListener('mousemove', this.dragOver);
    // window.addEventListener('mouseup', this.dragEnd);
  }


  componentWillUnmount() {
    Player.getAudio().removeEventListener('timeupdate', this.tick);

    // window.removeEventListener('mousemove', this.dragOver);
    // window.removeEventListener('mouseup', this.dragEnd);
  }

  handlePlay(e) {
    const { dispatch, playerStatus } = this.props;
    dispatch(playerPlay());
  }

  handlePause(e) {
    const { dispatch, playlist } = this.props;
    dispatch(playerPause());
  }

  handlePrevious(e) {
    const { dispatch, playlist } = this.props;
    dispatch(playerPause());
    dispatch(playerPrevious());
  }

  handleNext(e) {
    const { dispatch, playlist } = this.props;
    // if (playlist.length === 0) {
    //   dispatch(playerStop());
    // }
    dispatch(playerNext());
  }

  tick() {
    this.setState({ elapsed: Player.getCurrentTime() });
  }

  handleJumpTo(e) {
    const { playlist, playlistCursor } = this.props;
    const bar = this.progressBarRef;
    // bar.offsetParent.offsetWidth: the width of the progress bar parent, class .progress
    // bar.offsetLeft: the offset coordinates of the beginning of the bar (using this for flexible css)
    // e.pageX: the x coordinate of the mouse when clicking
    // check link to understand differences between offsetWidth, offsetHeight, clientWidth, clientHeight, scrollWidth and scrollHeight
    // https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
    const percent = ((e.pageX - (bar.offsetLeft + bar.offsetParent.offsetLeft)) / bar.offsetParent.offsetWidth) * 100;
    console.log(percent);

    const currentSong = playlist[playlistCursor];
    const songDuration = currentSong.metadata.format.duration;
    const jumpTo = (percent * songDuration) / 100;

    // dispatch and actionCreator (not necessary right now)
    // PlayerActions.jumpTo(jumpTo);        // change for dispatch(jumpTo()) to make the next line in the player container
    Player.setAudioCurrentTime(jumpTo);
  }

  closeSidenav(e) {
    const { dispatch } = this.props;
    dispatch(toggleSidenav());
  }

  closeSidenavRight(e) {
    const { dispatch } = this.props;
    dispatch(toggleSidenavRight());
  }

  render() {
    const { playlist, playlistCursor, playerStatus } = this.props;
    console.log('playlist cursor:', playlistCursor);
    console.log('playlist:', playlist);
    console.log('player status:', playerStatus);
    let currentSong = 'empty';
    let elapsedPercent = 0;
    // console.log('playlist: ', playlist);
    if (playlist.length > 0) {
    // if(typeof this.props.playlist != 'undefined') {
      currentSong = playlist[playlistCursor];
      const songDuration = currentSong.metadata.format.duration;
      elapsedPercent = (this.state.elapsed * 100) / songDuration;
    }


    return (
      <Playbar
        // handlers
        handleNext={this.handleNext}
        handlePrevious={this.handlePrevious}
        handlePause={this.handlePause}
        handlePlay={this.handlePlay}
        handleJumpTo={this.handleJumpTo}
        closeSidenav={this.closeSidenav}
        closeSidenavRight={this.closeSidenavRight}
        // data
        playerState={this.props}
        currentSong={currentSong}
        elapsedPercent={elapsedPercent}
        // https://reactjs.org/docs/refs-and-the-dom.html#callback-refs
        progressBarRef={(bar) => this.progressBarRef = bar}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playerStatus": state.player.playerStatus,
    "playlist": state.player.playlist,
    "playlistCursor": state.player.playlistCursor,
  };
}

export default connect(mapStateToProps)(PlaybarContainer);

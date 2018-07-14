import React from 'react';

// redux
import { connect } from 'react-redux'
// redux actions
import { addToPlayList, addToLibrary } from '../actions/actions';

// components
import MainView from '../components/main_view';


class MainViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.changeAlbumArt = this.changeAlbumArt.bind(this);
    this.state = {hideAlbumArt: true};
  }

  changeAlbumArt(e){
    this.setState({hideAlbumArt: !this.state.hideAlbumArt})
  }
    
  render() {

    // we pass currentSong to MainView to display the current albumArt from the song
    return (
      <MainView playlist={this.props.playlist} currentAlbumArt={this.props.currentAlbumArt} showSidenav={this.props.showSidenav} changeAlbumArt={this.changeAlbumArt} hideAlbumArt={this.state.hideAlbumArt}/>
    );
  }
}

function mapStateToProps(state, ownProps) {
  // current song 
  var currentSong = state.player.playlist[state.player.playlistCursor];
  var currentAlbumArt;
  if( currentSong == undefined) {
    // add default albumart
    currentAlbumArt = "";
  }
  else{
    currentAlbumArt = currentSong.albumArtPath;
  }
  return {
    "playlist": state.player.playlist,
    "library": state.player.library,
    "currentAlbumArt": currentAlbumArt,
    "showSidenav": state.player.showSidenav,
  }
}

export default connect(mapStateToProps)(MainViewContainer);
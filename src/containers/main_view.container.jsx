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
  }

    
  render() {

    // we pass currentSong to MainView to display the current albumArt from the song
    return (
      <MainView playlist={this.props.playlist} currentAlbumArt={this.props.currentAlbumArt} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  // current song 
  var currentSong = state.player.playlist[state.player.playlistCursor];
  var currentAlbumArt;
  if( currentSong == undefined) {
    currentAlbumArt = "";
  }
  else{
    currentAlbumArt = currentSong.albumArtPath;
  }
  return {
    "playlist": state.player.playlist,
    "library": state.player.library,
    "currentAlbumArt": currentAlbumArt,
  }
}

export default connect(mapStateToProps)(MainViewContainer);
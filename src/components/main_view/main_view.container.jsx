import React from 'react';

// redux
import { connect } from 'react-redux';
// redux actions
import { addToPlayList, addToLibrary } from '../../actions/actions';

// components
import MainView from './main_view';

class MainViewContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // we pass currentSong to MainView to display the current albumArt from the song
    return (
      <MainView
        currentAlbumArt={this.props.currentAlbumArt}
        hideAlbumArt={this.props.showAlbumArt}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  // current song
  const currentSong = state.player.playlist[state.player.playlistCursor];
  let currentAlbumArt;
  if (currentSong == undefined) {
    // add default albumart
    currentAlbumArt = '';
  } else {
    currentAlbumArt = currentSong.albumArtPath;
  }
  return {
    playlist: state.player.playlist,
    library: state.player.library,
    currentAlbumArt,
    showSidenav: state.player.uiState.showSidenav,
    showAlbumArt: state.player.uiState.showAlbumArt,
  };
}

export default connect(mapStateToProps)(MainViewContainer);

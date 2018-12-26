import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import Sidenav from './sidenav';
// import action creators
import {
  toggleAlbumArt,
  toggleSidenav,
  savePlaylist,
  storePlaylist,
  deleteSongCurrentPlaylist,
  updateCurrentPlaylist,
  clearCurrentPlaylist,
} from '../../actions/actions';

class SidenavContainer extends React.Component {
  constructor(props) {
    super(props);
    this.changeAlbumArt = this.changeAlbumArt.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.nameInputChange = this.nameInputChange.bind(this);
    this.handleRemoveFromPlaylist = this.handleRemoveFromPlaylist.bind(this);
    this.handleClearPlaylist = this.handleClearPlaylist.bind(this);
    this.name = '';
  }

  changeAlbumArt(e) {
    const { dispatch } = this.props;
    dispatch(toggleAlbumArt());
  }

  nameInputChange(e) {
    this.name = e.target.value;
  }

  savePlaylist(e) {
    const { dispatch, playlist } = this.props;
    const newPlaylist = { ...playlist };
    newPlaylist.name = this.name;
    dispatch(storePlaylist(newPlaylist));
  }

  handleRemoveFromPlaylist(data, number) {
    const { dispatch } = this.props;
    dispatch(deleteSongCurrentPlaylist(number));
  }

  handleClearPlaylist() {
    const { dispatch } = this.props;
    dispatch(clearCurrentPlaylist());
  }

  render() {
    // this.props.library are the songs in the library
    const { playlist, showSidenav } = this.props;
    return (
      <Sidenav
        playlist={playlist}
        nameInputChange={this.nameInputChange}
        showSidenav={showSidenav}
        savePlaylist={this.savePlaylist}
        changeAlbumArt={this.changeAlbumArt}
        handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
        handleClearPlaylist={this.handleClearPlaylist}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    "playlist": state.player.playlist,
    "library": state.player.library,
    "libraryStack": state.player.libraryStack,
    "libraryCurrent": state.player.libraryCurrent,
    "libraryNavbar": state.player.libraryNavbar,
    "showSidenav": state.player.uiState.showSidenav,
    "showAlbumArt": state.player.uiState.showAlbumArt,
  };
}

export default connect(mapStateToProps)(SidenavContainer);

import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import Sidenav from './sidenav';
// import action creators
import { toggleAlbumArt, toggleSidenav, savePlaylist, storePlaylist, updateCurrentPlaylist } from '../../actions/actions';

class SidenavContainer extends React.Component {
  constructor(props) {
    super(props);
    this.changeAlbumArt = this.changeAlbumArt.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.nameInputChange = this.nameInputChange.bind(this);
    this.handleRemoveFromPlaylist = this.handleRemoveFromPlaylist.bind(this);
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
    console.log('this name', this.name);
    // dispatch(updateCurrentPlaylist(newPlaylist));
  }

  handleRemoveFromPlaylist(data, number) {
    console.log('remove song sidenav:', data, 'index: ', number);
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

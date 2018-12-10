import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import Sidenav from './sidenav';
// import action creators
import { toggleAlbumArt, toggleSidenav } from '../../actions/actions';

class SidenavContainer extends React.Component {
  constructor(props) {
    super(props);
    this.changeAlbumArt = this.changeAlbumArt.bind(this);
  }  
  
  changeAlbumArt(e){
    this.props.dispatch(toggleAlbumArt());
  }
    
  render() {
    // this.props.library are the songs in the library
    return (
      <Sidenav playlist={this.props.playlist} showSidenav={this.props.showSidenav}  changeAlbumArt={this.changeAlbumArt}/>
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
  }
}

export default connect(mapStateToProps)(SidenavContainer);
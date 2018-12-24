import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import LibraryView from './library_view';
// import { connect } from 'tls';

class LibraryViewContainer extends React.Component {

  render() {
    // this.props.library is the songs in the library
    const { itemType, libraryStack, libraryNavbar, playlist } = this.props;
    return (
      <LibraryView itemType={itemType} libraryStack={libraryStack} libraryNavbar={libraryNavbar} playlist={playlist} />
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
    ...ownProps,
  };
}


export default connect(mapStateToProps)(LibraryViewContainer);

import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import PlaylistView from './playlist_view';

class PlaylistViewContainer extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <PlaylistView />
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
    "playlistCursor": state.player.playlistCursor,
  };
}


export default connect(mapStateToProps)(PlaylistViewContainer)
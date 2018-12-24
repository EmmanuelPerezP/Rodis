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
    const { playlists, playlistSelected } = this.props;
    return (
      <PlaylistView
        playlists={playlists}
        playlistSelected={playlistSelected}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    "playlist": state.player.playlist,
    "playlists": state.player.playlists,
    "playlistSelected": state.player.playlistSelected,
  };
}


export default connect(mapStateToProps)(PlaylistViewContainer)
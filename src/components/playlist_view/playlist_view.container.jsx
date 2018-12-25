import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import PlaylistView from './playlist_view';

class PlaylistViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveFromPlaylist = this.handleRemoveFromPlaylist.bind(this);
  }

  handleRemoveFromPlaylist(data, number) {
    console.log('remove song playlist_view:', data, 'index: ', number);
  }

  render() {
    const { playlists, playlistSelected } = this.props;
    return (
      <PlaylistView
        playlists={playlists}
        playlistSelected={playlistSelected}
        handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
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
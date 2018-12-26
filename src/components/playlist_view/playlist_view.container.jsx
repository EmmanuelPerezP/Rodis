import React from 'react';

// redux
import { connect } from 'react-redux';

import {
  deleteSongSelectedPlaylist
} from '../../actions/actions';

// components
import PlaylistView from './playlist_view';

class PlaylistViewContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemoveFromPlaylist = this.handleRemoveFromPlaylist.bind(this);
  }

  handleRemoveFromPlaylist(data, number) {
    const { dispatch } = this.props;
    dispatch(deleteSongSelectedPlaylist(number));
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
import React from 'react';

// redux
import { connect } from 'react-redux';
// redux actions
import { changeSelectedPlaylist } from '../../actions/actions';

// components
import PlaylistItem from './playlist_item';

class PlaylistItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.playPlaylist = this.playPlaylist.bind(this);
    this.changeSelectedPlaylist = this.changeSelectedPlaylist.bind(this);
  }

  playPlaylist(e) {
    console.log('play playlist');
  }

  changeSelectedPlaylist(e){
    const { dispatch, playlist } = this.props;

    dispatch(changeSelectedPlaylist(playlist));
  }
    
  render() {
    const { playlist } = this.props;
    return (
      <PlaylistItem
        playPlaylist={this.playPlaylist}
        changeSelectedPlaylist={this.changeSelectedPlaylist}
        playlist={playlist}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
  };
}

export default connect(mapStateToProps)(PlaylistItemContainer);

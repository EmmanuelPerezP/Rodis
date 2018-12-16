import React from 'react';

// redux
import { connect } from 'react-redux';
// redux actions
import { addToPlayList } from '../../actions/actions';

// components
import LibraryItemSong from './library_item_song';


class LibraryItemSongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
  }

  handleAddToPlaylist(e) {
    const { dispatch, data } = this.props;
    // console.log(this.props.data);
    dispatch(addToPlayList(data));
  }

  render() {
    const { itemType, number, data } = this.props;
    return (
      <LibraryItemSong
        itemType={itemType}
        number={number}
        data={data}
        handleAddToPlaylist={this.handleAddToPlaylist}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
    "library": state.player.library,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(LibraryItemSongContainer);

import React from 'react';

// redux
import { connect } from 'react-redux';
// redux actions
import { addToPlayList } from '../../actions/actions';

// components
import LibraryItemSong from './library_item_song';

/**
 * This is the song item for the playlist_view song table, the sidenav playlist table
 * and the library_view table it has two modes 'main' and 'library', in library mode
 * there is a minus, and in 'main' mode it has a plus
 * props:
 * @param props.handleRemoveFromPlaylist the function to call to remove this item from the table
 * @param props.itemType 'main' or 'library' choose the mode
 * @param props.data the data of the song
 */
class LibraryItemSongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
    this.handleRemoveFromPlaylist = this.handleRemoveFromPlaylist.bind(this);
  }

  handleAddToPlaylist() {
    const { dispatch, data } = this.props;
    // console.log(this.props.data);
    dispatch(addToPlayList(data));
  }

  handleRemoveFromPlaylist() {
    const {
      data, handleRemoveFromPlaylist, number,
    } = this.props;
    // console.log(this.props.data);
    handleRemoveFromPlaylist(data, number);
  }

  render() {
    const { itemType, number, data } = this.props;
    return (
      <LibraryItemSong
        itemType={itemType}
        number={number}
        data={data}
        handleAddToPlaylist={this.handleAddToPlaylist}
        handleRemoveFromPlaylist={this.handleRemoveFromPlaylist}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    playlist: state.player.playlist,
    library: state.player.library,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(LibraryItemSongContainer);

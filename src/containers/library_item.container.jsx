import React from 'react';

// redux
import { connect } from 'react-redux'
// redux actions
import { addToPlayList, addToLibrary } from '../actions/actions';

// components
import LibraryItem from '../components/library_item';


class LibraryItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
  }

  handleAddToPlaylist(e){
    const { dispatch } = this.props;
    console.log(this.props.songData);
    dispatch(addToPlayList(this.props.songData));
  }
    
  render() {
    return (
      <LibraryItem 
        number={this.props.number} 
        songData={this.props.songData}
        handleAddToPlaylist={this.handleAddToPlaylist}
        useAddButton={this.props.useAddButton} 
        useNumberColumn={this.props.useNumberColumn}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
    "library": state.player.library,
    ...ownProps,
  }
}

export default connect(mapStateToProps)(LibraryItemContainer);
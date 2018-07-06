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
    this.handleChangeFolder = this.handleChangeFolder.bind(this);
  }

  handleAddToPlaylist(e){
    const { dispatch } = this.props;
    console.log(this.props.data);
    dispatch(addToPlayList(this.props.data));
  }

  handleChangeFolder(e){

  }
    
  render() {
    return (
      <LibraryItem 
        itemType={this.props.itemType}
        number={this.props.number} 
        data={this.props.data}
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
  }
}

export default connect(mapStateToProps)(LibraryItemContainer);
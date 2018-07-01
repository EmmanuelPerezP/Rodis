import React from 'react';
import { addToPlayList } from '../actions/actions';

// redux
import { connect } from 'react-redux'


// components
import SearchFolder from '../components/search_folder';

const electron = window.require("electron")
const { dialog } = electron.remote;


 class SearchFolderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.state = {"filePath":""};

  }
  

  handleInput(e){
    dialog.showOpenDialog({
      properties: ['multiSelections', 'openDirectory'],
    }, (result) => {
      if (result) {
        this.setState({"filePath":result});
        console.log("Agregado a playlists" + result[0]);
        this.props.dispatch(addToPlayList(result[0]));
      }
    });
  }

  render() {
    return (
      <SearchFolder handleInput={this.handleInput} filePath={this.state.filePath} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.playlist,
  }

}

export default connect(mapStateToProps)(SearchFolderContainer);
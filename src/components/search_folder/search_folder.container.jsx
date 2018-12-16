import React from 'react';
import { connect } from 'react-redux';

import { addToPlayList, addToLibrary, clearLibrary, loadState, saveState} from '../../actions/actions';

import Explorer from '../../lib/explorer';
// components
import SearchFolder from './search_folder';

// node js/electron libraries
// const fs = window.require('graceful-fs');
const electron = window.require('electron');
const { dialog } = electron.remote;


class SearchFolderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.saveState = this.saveState.bind(this);
    this.loadState = this.loadState.bind(this);
    this.state = { 'filePath': '' };
  }


  loadState() {
    const { dispatch } = this.props;
    // console.log("load");
    dispatch(loadState());
  }

  saveState() {
    const { dispatch } = this.props;
    // console.log("save");
    dispatch(saveState());
  }

  handleInput() {
    // to use redux dispatch on the later functions
    const { dispatch } = this.props;

    Explorer.doEverything()
      .then((folderData) => {
        dispatch(clearLibrary());
        dispatch(addToLibrary(folderData));
      });
  }

  render() {
    const { filePath } = this.state;
    return (
      <SearchFolder
        handleInput={this.handleInput}
        loadState={this.loadState}
        saveState={this.saveState}
        filePath={filePath}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
  };
}

export default connect(mapStateToProps)(SearchFolderContainer);

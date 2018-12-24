import React from 'react';
import { connect } from 'react-redux';

import { addToPlayList, addToLibrary, clearLibrary, loadState, saveState, clearState } from '../../actions/actions';

import Explorer from '../../lib/explorer';
// components
import SearchFolder from './search_folder';

// node js/electron libraries
// const fs = window.require('graceful-fs');
const electron = window.require('electron');


class SearchFolderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.saveState = this.saveState.bind(this);
    this.clearState = this.clearState.bind(this);
    this.loadState = this.loadState.bind(this);
    this.state = { 'filePath': '' };
  }


  loadState() {
    const { dispatch } = this.props;
    dispatch(loadState());
  }

  saveState() {
    const { dispatch, reducerState } = this.props;
    dispatch(saveState());
  }

  clearState() {
    const { dispatch, reducerState } = this.props;
    dispatch(clearState());
  }

  handleInput() {
    // to use redux dispatch on the later functions
    const { dispatch } = this.props;

    Explorer.doEverything()
      .then((folderData) => {
        dispatch(clearLibrary());
        dispatch(addToLibrary(folderData));
        console.log('library loaded');
      });
  }

  render() {
    const { filePath } = this.state;
    return (
      <SearchFolder
        handleInput={this.handleInput}
        loadState={this.loadState}
        saveState={this.saveState}
        clearState={this.clearState}
        filePath={filePath}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
    "reducerState": state.player,
  };
}

export default connect(mapStateToProps)(SearchFolderContainer);

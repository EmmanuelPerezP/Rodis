import React from 'react';
import { connect } from 'react-redux';

import { addToPlayList, addToLibrary, clearLibrary, loadState, saveState} from '../../actions/actions';

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
    this.loadState = this.loadState.bind(this);
    this.state = { 'filePath': '' };
  }


  loadState() {
    const { dispatch } = this.props;
    // console.log("load");
    // const newState = storeEl.get('state');
    // dispatch(loadState(newState));
    dispatch(loadState());
    // storage.get('state', (stateReturned) => {
    //   dispatch(loadState(stateReturned));
    //   console.log('state loaded');
    // });
  }

  saveState() {
    const { dispatch, reducerState } = this.props;
    // console.log("save");
    dispatch(saveState());

    // const defaultDataPath = storage.getDefaultDataPath();

    // storeEl.set('state', reducerState);

    // console.log('path storage', defaultDataPath);
    // storage.set('state', reducerState, (error) => {
    //   if (error) {
    //     console.error(error);
    //   }
    //   console.log('state saved');
    // });
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
    "reducerState": state.player,
  };
}

export default connect(mapStateToProps)(SearchFolderContainer);

import React from 'react';
import { addToPlayList, addToLibrary } from '../actions/actions';

// redux
import { connect } from 'react-redux'


// components
import SearchFolder from '../components/search_folder';

// node js/electron libraries
const fs = window.require('fs');
const electron = window.require("electron")
const { dialog } = electron.remote;
// music metadata
const mm = window.require('music-metadata');
const util = window.require('util');




 class SearchFolderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.state = {"filePath":""};
  }
  
  handleInput(e){
    // to use redux dispatch on the later functions
    const { dispatch } = this.props

    // opens the file explorer to search for the folder
    dialog.showOpenDialog({
      properties: ['multiSelections', 'openDirectory'],
    }, (result) => {
      if (result) {
        // sets local state to put on the readOnly input
        this.setState({"filePath":result});
        fs.readdir(result[0], function(err, files) {
          var albumArtPath = null;
          // iterates over the files in the folder
          // replace for a recursive function later on
          for(let fileInFolder of files) {
            // check for albumart
            if(fileInFolder.toLocaleLowerCase() == "cover.jpg" || fileInFolder.toLocaleLowerCase() == "folder.jpg") {
              albumArtPath = result+"/"+fileInFolder;
            }
            // if the file is an mp3 add to library
            if(fileInFolder.endsWith(".mp3")){

              // check if file exists
              // fs.access(result+"/"+fileInFolder, fs.constants.F_OK, (err) => {
              //   console.log(`${result+"/"+fileInFolder} ${err ? 'does not exist' : 'exists'}`);
              // });

              mm.parseFile(result+"/"+fileInFolder, {native: true, duration: true})
                .then(function (metadata) {
                  // console.log(util.inspect(metadata, { showHidden: false, depth: null }));
                  // dispatch
                  dispatch(addToLibrary(result+"/"+fileInFolder, metadata, albumArtPath));
                })
                .catch(function (err) {
                  console.error(err.message);
                });
            }
          }
        })
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
    "playlist": state.player.playlist,
  }
}

export default connect(mapStateToProps)(SearchFolderContainer);
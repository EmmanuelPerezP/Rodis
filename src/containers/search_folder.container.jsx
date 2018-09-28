import React from 'react';
import { addToPlayList, addToLibrary, addToLibraryStack, addToCurrentLibrary, changeDirectoryLibraryDown, loadState, saveState} from '../actions/actions';

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
    this.saveState = this.saveState.bind(this);
    this.loadState = this.loadState.bind(this);
    this.state = {"filePath":""};
  }


  loadState(e){
    const { dispatch } = this.props
    console.log("load");
    dispatch(loadState());
  }

  saveState(e){
    const { dispatch } = this.props
    console.log("save");
    dispatch(saveState());
  }
  
  handleInput(e){
    // to use redux dispatch on the later functions
    const { dispatch } = this.props

    // in this function there is a problem because we use an async and a sync function in a for loop
    // therefore when updating the component sometimes it updates before the async function
    // parseFile is finished and doesnt shows the .mp3 files



    var libraryTab = [];
    // opens the file explorer to search for the folder
    dialog.showOpenDialog({
      properties: ['multiSelections', 'openDirectory'],
    }, (result) => {
      if (result) {
        dispatch(changeDirectoryLibraryDown(result[0]));
        // sets local state to put on the readOnly input
        this.setState({"filePath":result});
        fs.readdir(result[0], function(err, files) {
          var albumArtPath = null;
          // iterates over the files in the folder
          // replace for a recursive function later on

          // check for albumart first
          for(let fileInFolder of files) {
            if(fileInFolder.toLocaleLowerCase() == "cover.jpg" || fileInFolder.toLocaleLowerCase() == "folder.jpg") {
              albumArtPath = result+"/"+fileInFolder;
            }
          }
          if(albumArtPath == null){
            albumArtPath = null; // add default album art here
          }

          // add songs to library
          for(let fileInFolder of files) {
            
            if(fs.statSync(result+"/"+fileInFolder).isDirectory()){
              dispatch(addToCurrentLibrary({
                "type": "folder",
                "path": result+"/"+fileInFolder,
                "fileName": fileInFolder
              }));
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
                  let path = result+"/"+fileInFolder;
                  dispatch(addToCurrentLibrary({
                    "path": path, 
                    "fileName": fileInFolder,
                    "metadata": metadata, 
                    "albumArtPath":albumArtPath,
                    "type":"mp3",
                  }));
                })
                .catch(function (err) {
                  console.error(err.message);
                });
            }
          }
          
        })    
      }
    })

  }

  render() {
    return (
      <SearchFolder 
      handleInput={this.handleInput} 
      loadState={this.loadState} 
      saveState={this.saveState}
      filePath={this.state.filePath} 
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
  }
}

export default connect(mapStateToProps)(SearchFolderContainer);
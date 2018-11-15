import React from 'react';

// redux
import { connect } from 'react-redux'
// redux actions
import { addToPlayList, addToLibrary, addToCurrentLibrary, changeDirectoryLibraryDown, addToLibraryNavbar} from '../actions/actions';

// components
import LibraryItem from '../components/library_item';

// 
const fs = window.require('fs');
const mm = window.require('music-metadata');


class LibraryItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddToPlaylist = this.handleAddToPlaylist.bind(this);
    this.handleChangeFolder = this.handleChangeFolder.bind(this);
  }

  handleAddToPlaylist(e){
    const { dispatch } = this.props;
    // console.log(this.props.data);
    dispatch(addToPlayList(this.props.data));
  }

  handleChangeFolder(e){

    // make dispatch avaliable
    const { dispatch } = this.props


    // console.log("change folder: " + this.props.data.path);
    // console.log(this.props.data);

    var result = this.props.data.path;

    dispatch(changeDirectoryLibraryDown(this.props.data.fileName));

    fs.readdir(result, function(err, files) {
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
    
  render() {
    return (
      <LibraryItem 
        itemType={this.props.itemType}
        number={this.props.number} 
        data={this.props.data}
        handleAddToPlaylist={this.handleAddToPlaylist}
        handleChangeFolder={this.handleChangeFolder}
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
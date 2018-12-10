import { resolveSrv } from "dns";

// node js/electron libraries
const fs = window.require('fs');
const electron = window.require("electron")
const { dialog } = electron.remote;
// music metadata
const mm = window.require('music-metadata');
const util = window.require('util');


export default class Explorer extends React.Component {
  constructor() {
  }
    
  dialog() {
    // Return a promise with the files selected
    return new Promise((resolve, reject) => {
        // Open OS filesystem dialog to select the files (electron api)
        dialog.showOpenDialog({
            properties: ['multiSelections', 'openDirectory'],
        }, (result) => {
            if(result){
                resolve(result);
            }
            else{
                reject("No result in explorer");
            }
        });
    })
  }

  readDirectory(filepath){
    //  Return the files from the directory on filepath and the filepath
    return new Promise((resolve, reject) => {
        // read the directory pased in and return the files using node fs
        // https://nodejs.org/api/fs.html
        fs.readdir(filepath, (err, files) => {
            if(err===null){
                resolve(filepath, files);
            }
            else{
                reject("Error reading directory");
            }
        });
    })
  }

  folderCoverArt(filepath, files){
    const coverArtNames = ["cover.jpg", "folder.jpg", "cover.jpeg", "art.jpg"];
    // iterates over the files in the folder
    // replace for a recursive function later on
    var albumArtPath = null;
    // check for album-art
    for(let fileInFolder of files) {
        if(coverArtNames.includes(fileInFolder.toLocaleLowerCase())) {
            albumArtPath = filepath+"/"+fileInFolder;
        }
    }
    if(albumArtPath == null){
        albumArtPath = null; // add default album art here
    }

  }

  crawlFolder(){

  }

  searchAlbumArt(){

  }

  doEverythin2(){
    //   dialog()
    //   .then(result)

  }


  doEverything(){
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
            // if file is a directory
            if(fs.statSync(result+"/"+fileInFolder).isDirectory()){
              dispatch(addToCurrentLibrary({
                "type": "folder",
                "path": result+"/"+fileInFolder,
                "fileName": fileInFolder
              }));
            }
            // if the file is an mp3 add to library
            if(fileInFolder.endsWith(".mp3")){
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
}


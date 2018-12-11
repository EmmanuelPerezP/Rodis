// node js/electron libraries

// const fs2 = window.require('fs');
// const fs = window.require('graceful-fs');

// fs.gracefulify(fs2);

const electron = window.require('electron');
const { dialog } = electron.remote;
// music metadata
const mm = window.require('music-metadata');

const fs = window.require('graceful-fs');

export default class Explorer {
  constructor() {
    // this.readDirectory = this.readDirectory.bind(this);
  }

  /**
  * Opens filesystem dialog to select a folder for the library
  * @return {Promise<string>} a promise that returns the filepath selected
  */
  static dialogOpen() {
    // Return a promise with the files selected
    return new Promise((resolve, reject) => {
      // Open OS filesystem dialog to select the files (electron api)
      dialog.showOpenDialog({
        properties: ['openDirectory'],
      }, (result) => {
        if (result) {
          // return the fist element of the array (only one item/path)
          resolve(result[0]);
        } else {
          reject("No result in explorer");
        }
      });
    });
  }

  /**
   * Read the whole directory
   * @param {string} filepath the filepath to read
   * @returns {Promise<{filepath: string, files: Array.<string>}>} returns a 
   * promise with the original filepath and an array with the files of the folder
   */
  static readDirectory(filepath) {
    //  Return the files from the directory on filepath and the filepath
    return new Promise((resolve, reject) => {
      // read the directory pased in and return the files using node fs
      // https://nodejs.org/api/fs.html
      fs.readdir(filepath, (err, files) => {
        if (err === null) {
          resolve({ filepath, files });
        } else {
          reject('Error reading directory');
        }
      });
    });
  }

  /**
   * Find cover art of the folder
   * @param {{filepath: string, files: Array.<string>}} data the data object
   * containing filepath and files
   * @returns {..data, albumArtPath: string} returns original data object with
   * the corresponding album art path
   */
  static folderCoverArt(data) {
    const { filepath, files } = data;
    const coverArtNames = ['cover.jpg', 'folder.jpg', 'cover.jpeg', 'art.jpg'];
    // iterates over the files in the folder
    // replace for a recursive function later on
    let albumArtPath = null;
    // check for album-art
    for (const fileInFolder of files) {
      if (coverArtNames.includes(fileInFolder.toLocaleLowerCase())) {
        albumArtPath = `${filepath}/${fileInFolder}`;
      }
    }
    if (albumArtPath == null) {
      albumArtPath = null; // add default album art here
    }
    return { ...data, albumArtPath };
  }

  /**
   * crawl the folder
   * @param {{filepath: string, files: Array.<string>, albumArtPath: string}} data the data
   * object containing filepath, files, and album art of the current folder
   * @returns {Promise} return the data
   */
  static crawlFolder(data) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { filepath, files, albumArtPath } = data;
    // the folder array containing all the objects type 'mp3' and 'folder'
    const folder = [];
    // add songs to library
    // promises array to keep track of the promises and when to end the calls
    const promises = [];
    for (const fileInFolder of files) {
      const path = `${filepath}/${fileInFolder}`;
      // if file is a directory
      if (fs.statSync(path).isDirectory()) {
        // recursive call to get the subdirectories
        const subdirPromise = Explorer.readDirectory(path)
          .then(Explorer.folderCoverArt)
          .then(Explorer.crawlFolder)
          .then((subDirectory) => {
            folder.push({
              type: 'folder',
              path,
              fileName: fileInFolder,
              subFolder: subDirectory,
            });
          });
        promises.push(subdirPromise);
        // folder.push({
        //   type: 'folder',
        //   path,
        //   fileName: fileInFolder,
        // });
      // else if the file is an mp3 add it to the library
      } else if (fileInFolder.endsWith('.mp3')) {
        // const promise = mm.parseFile(path, { native: true, duration: true })
        //   .then((metadata) => {
        //     folder.push({
        //       type: 'mp3',
        //       path,
        //       fileName: fileInFolder,
        //       metadata,
        //       albumArtPath,
        //     });
        //   })
        //   .catch((err) => {
        //     console.error(err.message);
        //   });
        // promises.push(promise);
      }
    }
    return Promise.all(promises).then(() => folder);
  }

  static doEverything() {
    this.dialogOpen()
      .then(this.readDirectory)
      .then(this.folderCoverArt)
      .then(this.crawlFolder)
      .then((folder) => {
        console.log('the result of the directory crawl is this: ', folder);
      });
  }


  /* eslint-disable */
  static doEverythingOg(){
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
                    "type":"mp3",
                    "path": path, 
                    "fileName": fileInFolder,
                    "metadata": metadata, 
                    "albumArtPath":albumArtPath
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
  /* eslint-enable */
}

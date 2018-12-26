const electron = window.require('electron');
const { dialog } = electron.remote;
// music metadata
const mm = window.require('music-metadata');

// const fs = window.require('fs');
const fs = window.require('graceful-fs');

export default class Explorer {
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
          console.error('No result in explorer');
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
          console.error('Error reading directory');
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
    if (albumArtPath === null) {
      albumArtPath = null; // add default album art here
    }
    return { ...data, albumArtPath };
  }

  /**
   * crawl the folder and return the info with metadata, we use async/await to not
   * get the error/problem EMFILE with the file system library checkout these links for more info:
   * {@link https://github.com/Borewit/music-metadata/issues/26}
   * {@link https://github.com/Borewit/music-metadata/issues/109}
   * {@link https://stackoverflow.com/questions/8965606/node-and-error-emfile-too-many-open-files}
   * and this for the solution:
   * {@link https://stackoverflow.com/questions/29880715/how-to-synchronize-a-sequence-of-promises}
   * @param {{filepath: string, files: Array.<string>, albumArtPath: string}} data the data
   * object containing filepath, files, and album art of the current folder
   * @returns {Object} return the data
   */
  static async crawlFolder(data) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const { filepath, files, albumArtPath } = data;
    // the folder array containing all the objects type 'mp3' and 'folder'
    const folder = [];
    let counter = 0;
    // add songs to library
    // promises array to keep track of the promises and when to end the calls
    /* eslint-disable no-await-in-loop */
    for (const fileInFolder of files) {

      counter += 1;
      if (counter % 10 === 0) {
        // if is multiple of 10 do stuff
      }
      console.log('iteraded:', counter);
      console.log('iterating path: ', filepath);

      const path = `${filepath}/${fileInFolder}`;
      // if file is a directory
      if (fs.statSync(path).isDirectory()) {
        // recursive call to get the subdirectories
        await Explorer.readDirectory(path)
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
      // else if the file is an mp3 add it to the library
      } else if (fileInFolder.endsWith('.mp3')) {
        await mm.parseFile(path, { native: false, duration: false, skipCovers: true })
          .then((metadata) => {
            folder.push({
              type: 'mp3',
              path,
              fileName: fileInFolder,
              metadata,
              albumArtPath,
            });
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
    }
    /* eslint-enable no-await-in-loop */
    return folder;
  }

  static doEverything() {
    return this.dialogOpen()
      .then(this.readDirectory)
      .then(this.folderCoverArt)
      .then(this.crawlFolder);
  }

}

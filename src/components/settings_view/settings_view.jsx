import React from 'react';
// redux
import { connect } from 'react-redux';

import SearchFolderContainer from '../search_folder/search_folder.container';

class Nombre extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <div className="container-fluid pl-0">
        <div className="row no-gutters">
          <div className="col-3" />
          <div className="col-6">

            <SearchFolderContainer />

          </div>
          <div className="col-9">
            <div className="row" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    "playlist": state.player.playlist,
    "library": state.player.library,
    "libraryStack": state.player.libraryStack,
    "libraryCurrent": state.player.libraryCurrent,
    "playlistCursor": state.player.playlistCursor,
  };
}


export default connect(mapStateToProps)(Nombre);

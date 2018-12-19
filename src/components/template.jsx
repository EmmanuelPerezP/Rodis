import React from 'react';

class Nombre extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
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


export default connect(mapStateToProps)(Nombre)
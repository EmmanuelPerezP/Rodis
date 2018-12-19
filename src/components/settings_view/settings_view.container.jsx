import React from 'react';
// redux
import { connect } from 'react-redux';
import SettingsView from './settings_view';

class Nombre extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
        <SettingsView />
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
import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import BreadcrumItem from '../components/breadcrum_item';
// import { connect } from 'tls';

class BreadcrumItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderChange = this.handleFolderChange.bind(this);
  }
    
  handleFolderChange(e){
    // dispatch(FolderChange(key))

  }

  render() {
    // this.props.library is the songs in the library
    return (
      <BreadcrumItem handleFolderChange={this.handleFolderChange}  libraryStack={this.props.libraryStack} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
    "library": state.player.library,
    "libraryStack": state.player.libraryStack,
    "libraryCurrent": state.player.libraryCurrent,
    ...ownProps,
  }
}


export default connect(mapStateToProps)(BreadcrumItemContainer);
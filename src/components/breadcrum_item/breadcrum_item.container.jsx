import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import BreadcrumItem from './breadcrum_item';
import {changeDirectoryLibraryUp} from '../../actions/actions'
// import { connect } from 'tls';

class BreadcrumItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderChange = this.handleFolderChange.bind(this);
  }
    
  handleFolderChange(e){
    const { dispatch } = this.props

    // console.log(this.props.itemNumber);
    var itemNumber = this.props.itemNumber;
    // console.log("library navbar: ");
    // console.log(this.props.libraryNavbar);
    // console.log("library Stack: ");
    // console.log(this.props.libraryStack);
    dispatch(changeDirectoryLibraryUp(itemNumber))

  }

  render() {
    // this.props.library is the songs in the library

    return (
      <BreadcrumItem 
        name={this.props.name} 
        handleFolderChange={this.handleFolderChange}  
        libraryStack={this.props.libraryStack} 
        itemNumber={this.props.itemNumber}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
    "library": state.player.library,
    "libraryStack": state.player.libraryStack,
    "libraryCurrent": state.player.libraryCurrent,
    "libraryNavbar": state.player.libraryNavbar,
    ...ownProps,
  }
}


export default connect(mapStateToProps)(BreadcrumItemContainer);
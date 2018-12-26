import React from 'react';

// redux
import { connect } from 'react-redux';

// components
import BreadcrumItem from './breadcrum_item';
import { changeDirectoryLibraryUp } from '../../actions/actions';
// import { connect } from 'tls';

class BreadcrumItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleFolderChange = this.handleFolderChange.bind(this);
  }

  handleFolderChange() {
    const { dispatch, itemNumber } = this.props;
    dispatch(changeDirectoryLibraryUp(itemNumber));
  }

  render() {
    // this.props.library is the songs in the library
    const { name, libraryStack, itemNumber } = this.props;
    return (
      <BreadcrumItem
        name={name}
        handleFolderChange={this.handleFolderChange}
        libraryStack={libraryStack}
        itemNumber={itemNumber}
      />
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    playlist: state.player.playlist,
    library: state.player.library,
    libraryStack: state.player.libraryStack,
    libraryCurrent: state.player.libraryCurrent,
    libraryNavbar: state.player.libraryNavbar,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(BreadcrumItemContainer);

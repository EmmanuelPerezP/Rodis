import React from 'react';

// redux
import { connect } from 'react-redux';
// redux actions
import { changeDirectoryLibraryDown } from '../../actions/actions';

// components
import LibraryItemFolder from './library_item_folder';


class LibraryItemFolderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeFolder = this.handleChangeFolder.bind(this);
  }

  handleChangeFolder(e) {
    const { dispatch, data } = this.props;
    dispatch(changeDirectoryLibraryDown(data));
  }

  render() {
    const { data } = this.props;
    return (
      <LibraryItemFolder
        data={data}
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
  };
}

export default connect(mapStateToProps)(LibraryItemFolderContainer);

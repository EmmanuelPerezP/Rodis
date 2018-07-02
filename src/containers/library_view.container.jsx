import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import LibraryView from '../components/library_view';
// import { connect } from 'tls';

class LibraryViewContainer extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    // this.props.library is the songs in the library
    return (
      <LibraryView librarySongs={this.props.library}/>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.player.playlist,
    "library": state.player.library,
    ...ownProps,
  }
}


export default connect(mapStateToProps)(LibraryViewContainer);
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
    // var hello = [1,2,3,4];
    console.log(this.props.playlist);

    return (
      <LibraryView songs={this.props.playlist}/>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    "playlist": state.playlist,
  }
}


export default connect(mapStateToProps)(LibraryViewContainer);
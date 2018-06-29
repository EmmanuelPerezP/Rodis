import React from 'react';

// components
import LibraryView from '../components/library_view';

export default class LibraryViewContainer extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    var hello = [1,2,3,4];
    return (
      <LibraryView songs={hello}/>
    );
  }
}

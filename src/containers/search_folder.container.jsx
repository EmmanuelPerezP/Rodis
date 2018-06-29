import React from 'react';

// components
import SearchFolder from '../components/search_folder';

export default class SearchFolderContainer extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <SearchFolder />
    );
  }
}

import React from 'react';

// components
import LibraryItem from '../components/library_item';


export default class LibraryItemContainer extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <LibraryItem />
    );
  }
}

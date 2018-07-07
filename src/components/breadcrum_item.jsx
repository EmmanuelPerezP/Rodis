import React from 'react';

export default class BreadcrumItem extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
      <li class="breadcrumb-item" onClick={this.props.handleFolderChange} >
          Home
      </li>
    );
  }
}

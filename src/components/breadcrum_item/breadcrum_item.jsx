import React from 'react';

export default class BreadcrumItem extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    var lastItemInNavbar = this.props.lastItemInNavbar;
    return (
      <li className="breadcrumb-item" onClick={this.props.handleFolderChange} >
        <a href="#">
          {this.props.name}
        </a>
      </li>
    );
  }
}

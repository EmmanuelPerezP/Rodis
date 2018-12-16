import React from 'react';

export default function BreadcrumItem(props) {
  const { handleFolderChange, name } = props;
  return (
    <li className="breadcrumb-item" onClick={handleFolderChange} >
      <a href="#">
        {name}
      </a>
    </li>
  );
}

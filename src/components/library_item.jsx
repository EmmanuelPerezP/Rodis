import React from 'react';

export default class LibraryItem extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    const songData = this.props.songData;
    return (                
      <tr>
        <td scope="row">
          We the people
        </td>
        <td>
          2:52
        </td>
        <td>
          <i class="fas fa-plus"></i>
        </td>
      </tr>
    );
  }
}

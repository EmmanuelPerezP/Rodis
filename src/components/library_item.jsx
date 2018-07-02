import React from 'react';

export default class LibraryItem extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    // here we have this.props.songData like this ex: {path: "/path/file.mp3", metadata: object}
    var songMetadata = this.props.songData.metadata;

    // convert duration seconds to mm:ss string
    var date = new Date(null);
    date.setSeconds(songMetadata.format.duration); // specify value for SECONDS here
    var timeString = date.toISOString().substr(14, 5);
    return (                
      <tr>
        <td scope="row">
          {songMetadata.common.title}
        </td>
        <td>
          {timeString}
        </td>
        <td onClick={this.props.handleAddToPlaylist} >
          <i className="fas fa-plus"></i>
        </td>
      </tr>
    );
  }
}

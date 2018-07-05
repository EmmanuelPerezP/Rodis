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

    // we check if we need to render the add to playlist button from props
    let useAddButton = this.props.useAddButton;
    // check if we need to render numbercolumn
    let useNumberColumn = this.props.useNumberColumn;

    let addToPlayListButton;
    if(useAddButton) {
      addToPlayListButton = <td onClick={this.props.handleAddToPlaylist} ><i className="fas fa-plus"></i></td>
    }

    let numberColumn;
    if(useNumberColumn){
      numberColumn = <td>{this.props.number}</td>
    }

    return (                
      <tr>
        {numberColumn}
        <td scope="row">
          {songMetadata.common.title}
        </td>
        <td>
          {timeString}
        </td>
        {addToPlayListButton}
      </tr>
    );
  }
}

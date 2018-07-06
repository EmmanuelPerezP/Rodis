import React from 'react';

export default class LibraryItem extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    if(this.props.data.type == 'mp3'){
      // here we have this.props.data like this ex: {path: "/path/file.mp3", metadata: object, type: "mp3"}
      var songMetadata = this.props.data.metadata;

      // convert duration seconds to mm:ss string
      // https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
      var date = new Date(null);
      date.setSeconds(songMetadata.format.duration); // specify value for SECONDS here
      var timeString = date.toISOString().substr(14, 5);
    }

    if(this.props.itemType == 'library'){
      console.log(this.props.data.type);
      if(this.props.data.type == 'folder'){
        return (                
          <tr>
            <td scope="row">
              {this.props.data.path}
            </td>
            <td>
            </td>
          </tr>
        );
      }
      else if(this.props.data.type == 'mp3'){
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
    else if (this.props.itemType == 'main'){
      if(this.props.data.type == 'mp3'){
        return (                
          <tr>
            <td>
              {this.props.number}
            </td>
            <td scope="row">
              {songMetadata.common.title}
            </td>
            <td>
              {timeString}
            </td>
          </tr>
        );
      }
    }
    return null;
  }
}

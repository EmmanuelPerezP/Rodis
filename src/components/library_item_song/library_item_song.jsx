import React from 'react';

export default function LibraryItem(props) {
  const { itemType, number, handleAddToPlaylist, data } = props;
  // here we have this.props.data like this ex:
  // {path: "/path/file.mp3", metadata: object, type: "mp3"}
  const songMetadata = data.metadata;

  // convert duration seconds to mm:ss string
  // https://stackoverflow.com/questions/6312993/javascript-seconds-to-time-string-with-format-hhmmss
  const date = new Date(null);
  date.setSeconds(songMetadata.format.duration); // specify value for SECONDS here
  const timeString = date.toISOString().substr(14, 5);

  if (itemType === 'library') {
    return (
      <tr>
        <td scope="row">
          {songMetadata.common.title}
        </td>
        <td>
          {timeString}
        </td>
        <td onClick={handleAddToPlaylist}>
          <i className="fas fa-plus" />
        </td>
      </tr>
    );
  } if (itemType === 'main') {
    return (
      <tr>
        <td>
          {number}
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
  return null;
}

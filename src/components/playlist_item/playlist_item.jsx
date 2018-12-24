import React from 'react';

export default function PlaylistItem(props) {
  // we use the last item of the stack/array
  const { changeSelectedPlaylist, playPlaylist, playlist } = props;

  return (
    <tr>
      <td onClick={changeSelectedPlaylist}>
        {playlist.name}
      </td>
      <td onClick={playPlaylist}>
        <i className="fas fa-play" />
      </td>
    </tr>
  );
}

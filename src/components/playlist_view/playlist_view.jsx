import React from 'react';
import PlaylistItemContainer from '../playlist_item/playlist_item.container';
import LibraryItemSongContainer from '../library_item_song/library_item_song.container';

export default function PlaylistView(props) {
  // we use the last item of the stack/array
  const { playlists, playlistSelected, handleRemoveFromPlaylist } = props;
  const playlistItems = playlists.map((data, index) =>
    <PlaylistItemContainer
      playlist={data}
      key={index}
    />
  );

  const songsRows = playlistSelected.songs.map((data, index) =>
    <LibraryItemSongContainer
      itemType={'main'}
      key={index}
      number={index}
      data={data}
      handleRemoveFromPlaylist={handleRemoveFromPlaylist}
    />
  ); 

  return (
    <div className="container-fluid pl-0">
      <div className="row">
        <div className="col-5 offset-1">

          <h2>Playlists</h2>

          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>

                </th>
              </tr>
            </thead>
            <tbody>

              {playlistItems}

            </tbody>
          </table>
        </div>

        <div className="col-5">

          <h2>Songs</h2>

          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Time
                </th>
                <th>
                  +/-
                </th>
              </tr>
            </thead>
            <tbody>

              {songsRows}

            </tbody>
          </table>

        </div>
      </div>
    </div>


  );
}

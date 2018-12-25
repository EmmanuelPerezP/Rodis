import React from 'react';
import LibraryItemSongContainer from '../library_item_song/library_item_song.container';

export default function Sidenav(props) {
  const { playlist, showSidenav, changeAlbumArt, savePlaylist, handleRemoveFromPlaylist } = props;
  const songsRows = playlist.songs.map((data, index) =>
    <LibraryItemSongContainer
      itemType={'main'}
      key={index}
      number={index}
      data={data}
      handleRemoveFromPlaylist={handleRemoveFromPlaylist}
    />
  ); 
  let style = { width: '0' };
  if (showSidenav) {
    style = { width: '30vw' };
  }
  return (
    <div id="mySidenav" className="sidenav" style={style}>
      <div className="row justify-content-center mx-auto">
        <div className="col-12">
        <h2>{playlist.name}</h2>
          <div className="table-custom" data-simplebar>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                  <th scope="col">
                    <i className="fas fa-minus" />
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
      <br />
      <div className="row justify-content-center mx-auto">
        <div className="col-12">
          <div className="btn-group" role="group" aria-label="Basic example">

            <button type="button" className="btn btn-secondary btn-outline-dark">Clear Playlist/Cue</button>
            <button type="button" className="btn btn-secondary btn-outline-dark" onClick={changeAlbumArt}>Hide Album Art</button>

          </div>
        </div>  
      </div>  
      <div className="row justify-content-center mx-auto my-1">
        <div className="col-12">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Playlist Name" onChange={(e) => props.nameInputChange(e)}/>
            <div className="input-group-append">
              <button className="btn btn-outline-dark" type="button" id="button-addon2" onClick={savePlaylist}>Save as playlist</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

import React from 'react';
import LibraryItemContainer from '../library_item/library_item.container';

export default function Sidenav(props) {
  const { playlist, showSidenav, changeAlbumArt } = props;
  console.log("all the songs: ")
  console.log(playlist);
  let songsRows = playlist.map((data, index) =>
    <LibraryItemContainer
      itemType={'main'}
      key={index}
      number={index}
      data={data}
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
          <div className="table-custom" data-simplebar>
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
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
            <button type="button" className="btn btn-secondary btn-outline-dark">Save</button>
            <button type="button" className="btn btn-secondary btn-outline-dark">Delete</button>
            <button type="button" className="btn btn-secondary btn-outline-dark" onClick={changeAlbumArt}>Hide Album Art</button>
          </div>
        </div>  
      </div>  
    </div>
  );
}

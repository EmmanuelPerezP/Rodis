import React from 'react';

// containers
import LibraryItemContainer from '../containers/library_item.container';
import SearchFolderContainer from '../containers/search_folder.container';

export default class LibraryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const songs = this.props.librarySongs;
    console.log("all the songs: ")
    console.log(songs);
    var songsRows = songs.map((songData, index) =>
      <LibraryItemContainer key={index} songData={songData} />
    ); 

    return (
      <div className="container-fluid pl-0">
        <div className="row no-gutters">
          <div className="col-3" />
          <div className="col-6">

            <SearchFolderContainer />

            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">
                    Name
                  </th>
                  <th scope="col">
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
          <div className="col-9">
            <div className="row" />
          </div>
        </div>
      </div>
    );
  }
}

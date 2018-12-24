import React from 'react';

// containers
import LibraryItemSongContainer from '../library_item_song/library_item_song.container';
import LibraryItemFolderContainer from '../library_item_folder/library_item_folder.container';
import SearchFolderContainer from '../search_folder/search_folder.container';
import BreadcrumItemContainer from '../breadcrum_item/breadcrum_item.container';

export default function LibraryView(props) {
  // we use the last item of the stack/array
  const { playlist, libraryStack, libraryNavbar } = props;
  const directoryItems = libraryStack[libraryStack.length - 1];


  const songsRows = playlist.songs.map((data, index) =>
    <LibraryItemSongContainer
      itemType={'main'}
      key={index}
      number={index}
      data={data}
    />
  ); 

  // console.log('print directory rows library_view: ', directoryItems);
  const breadcrumRows = libraryNavbar.map((data, index) => {
    return (
      <BreadcrumItemContainer name={data} key={index} itemNumber={index} />
    );
  });
  const libraryRows = directoryItems.map((data, index) => {
    if (data.type === 'mp3') {
      return (
        <LibraryItemSongContainer itemType={'library'} key={index} data={data} />
      );
    } else if (data.type === 'folder') {
      return (
        <LibraryItemFolderContainer key={index} data={data} />
      );
    }
  });

  return (
    <div className="container-fluid pl-0">
      <div className="row">
        <div className="col-5 offset-1">

          <h2>Library</h2>

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {breadcrumRows}
            </ol>
          </nav>

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

              {libraryRows}

            </tbody>
          </table>
        </div>

        <div className="col-5">

          <h2>Current Playlist</h2>

          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">
                  #
                </th>
                <th scope="col">
                  Name
                </th>
                <th>
                  Time
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

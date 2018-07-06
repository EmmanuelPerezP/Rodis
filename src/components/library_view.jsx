import React from 'react';

// containers
import LibraryItemContainer from '../containers/library_item.container';
import SearchFolderContainer from '../containers/search_folder.container';

export default class LibraryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // if theres something in the stack returns the item, if there is nothing return empty array
    const rows = this.props.libraryCurrent;
    // console.log("all the rows: ")
    // console.log(rows);
    // var songsRows = songs.map((data, index) =>
    //   <LibraryItemContainer key={index} data={data} useAddButton={true} />
    // ); 

    // console.log("imprime filas library_view: ")
    // console.log(rows);
    var libraryRows = rows.map((data, index) => {
        if(data.type == 'folder') {
          return <LibraryItemContainer itemType={'library'} key={index} data={data} />
        }
        else {
          // console.log("no es folder");
          return <LibraryItemContainer itemType={'library'} key={index} data={data} />
        }
      }
    );
    // console.log(libraryRows);

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

                {libraryRows}

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

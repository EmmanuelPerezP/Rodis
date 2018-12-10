import React from 'react';

// containers
import LibraryItemContainer from '../library_item/library_item.container';
import SearchFolderContainer from '../search_folder/search_folder.container';
import BreadcrumItemContainer from '../breadcrum_item/breadcrum_item.container';

export default class LibraryView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // we use the last item of the stack/array
    const rows = this.props.libraryStack[this.props.libraryStack.length-1];
    const breadcrumRows = this.props.libraryNavbar;

    // console.log("imprime filas library_view: ")
    // console.log(rows);
    var libraryNavbar = breadcrumRows.map((data,index) => {
      return  <BreadcrumItemContainer name={data} key={index} itemNumber={index} />
    });
    var libraryRows = rows.map((data, index) => {
        return <LibraryItemContainer itemType={'library'} key={index} data={data} />
      }
    );

    // console.log(libraryRows);

    return (
      <div className="container-fluid pl-0">
        <div className="row no-gutters">
          <div className="col-3" />
          <div className="col-6">

            <SearchFolderContainer />

            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                {libraryNavbar}
              </ol>
            </nav>

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

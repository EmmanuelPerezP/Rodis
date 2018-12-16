import React from 'react';

// containers
import LibraryItemContainer from '../library_item/library_item.container';
import SearchFolderContainer from '../search_folder/search_folder.container';
import BreadcrumItemContainer from '../breadcrum_item/breadcrum_item.container';

export default function LibraryView(props) {
  // we use the last item of the stack/array
  const { libraryStack, libraryNavbar } = props;
  const rows = libraryStack[libraryStack.length - 1];

  // console.log("imprime filas library_view: ")
  // console.log(rows);
  const breadcrumRows = libraryNavbar.map((data, index) => {
    return (
      <BreadcrumItemContainer name={data} key={index} itemNumber={index} />
    );
  });
  const libraryRows = rows.map((data, index) => {
    return (
      <LibraryItemContainer itemType={'library'} key={index} data={data} />
    );
  });

  return (
    <div className="container-fluid pl-0">
      <div className="row no-gutters">
        <div className="col-3" />
        <div className="col-6">

          <SearchFolderContainer />

          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              {breadcrumRows}
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

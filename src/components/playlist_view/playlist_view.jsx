import React from 'react';

export default function PlaylistView(props) {
  // we use the last item of the stack/array
  // const { aprop } = props;

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

              <tr>
                <td>
                  Lorem ipsum dolor tus possimus epellat!
                </td>
                <td>
                  <i className="fas fa-plus" />
                </td>
              </tr>

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

              <tr>
                <td>
                  test
                </td>
                <td>
                  test
                </td>
                <td>
                  test
                </td>
              </tr>

            </tbody>
          </table>

        </div>
      </div>
    </div>


  );
}

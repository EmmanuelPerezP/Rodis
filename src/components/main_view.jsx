import React from 'react';

// container
import LibraryItemContainer from '../containers/library_item.container'

export default class MainView extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
    const songs = this.props.playlist;
    console.log("all the songs: ")
    console.log(songs);
    var songsRows = songs.map((data, index) =>
      <LibraryItemContainer 
        itemType={'main'}
        key={index} 
        number={index} 
        data={data} 
      />
    ); 
    return(
      // <div className="container-fluid pl-0">
        <div className="row no-gutters">

        <div id="mySidenav" class="sidenav">
          <a href="#" class="closebtn" onclick={this.props.closeSidenav}>&times;</a>
          <div className="col-3">
            <div className="table-custom"  data-simplebar>
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

          <div className="col-9">
            <div className="row">
              <img src={'file://'+this.props.currentAlbumArt} className="rounded mx-auto d-block" alt="..."></img>
            </div>
          </div>
        </div>
            //footer
        // </div>
      )
    }
}

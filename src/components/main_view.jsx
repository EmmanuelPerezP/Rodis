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
    var style = {width: "0"};
    if(this.props.showSidenav){
      style = {width: "30vw"};
    }
    return(
      // <div className="container-fluid pl-0">
        <div className="row no-gutters">

        <div id="mySidenav" class="sidenav" style={style}>
          <div className="row justify-content-center mx-auto">
          <div className="col-12">
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
          <br />
          <div className="row justify-content-center mx-auto">
          <div className="col-12">
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary btn-outline-dark">Save</button>
              <button type="button" class="btn btn-secondary btn-outline-dark">Delete</button>
              <button type="button" class="btn btn-secondary btn-outline-dark" onClick={this.props.changeAlbumArt} >Hide Album Art</button>
            </div>
          </div>  
          </div>  
        </div>

          <div className="col">
            <div className="row">
              {(this.props.hideAlbumArt) ? (<img src={'file://'+this.props.currentAlbumArt} className="rounded mx-auto d-block" alt="..."></img>) : null}
            </div>
          </div>
        </div>
            //footer
        // </div>
      )
    }
}

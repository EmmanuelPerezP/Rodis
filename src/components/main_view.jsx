import React from 'react';

// container
import SidenavContainer from '../containers/sidenav.container'

export default class MainView extends React.Component {
  constructor(props){
      super(props);
  }

  render(){
    return(
      // <div className="container-fluid pl-0">
        <div className="row no-gutters">

        {/* <SidenavContainer /> */}

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

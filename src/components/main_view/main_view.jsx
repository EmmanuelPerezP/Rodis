import React from 'react';

// container
import SidenavContainer from '../sidenav/sidenav.container'

export default class MainView extends React.Component {
  constructor(props){
      super(props);
  }

  render(){
    return(
        <div className="row no-gutters">
          <div className="col">
            <div className="row">
              {(this.props.hideAlbumArt) ? (<img src={'file://'+this.props.currentAlbumArt} className="album-art rounded mx-auto d-block" alt="..."></img>) : null}
            </div>
          </div>
        </div>
      )
    }
}

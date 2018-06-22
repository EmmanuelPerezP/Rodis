import React from "react";
import audioPlayer from "../lib/player";

export default class playbar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
          <footer className="footer">
              <div className="row pt-2 justify-content-center no-gutters">
                <div className="col-3">

                </div>
                <div className="col-6 mx-auto">
                  <div className="row controls">
                    <div className="col">
                      <a><i className="fas fa-step-backward"></i></a>
                    </div>
                    <div className="col">
                      <a onClick={this.handlePlay} ><i className="fas fa-play"></i></a>
                    </div>
                    <div className="col">
                      <a onClick={this.handlePause} ><i className="fas fa-pause"></i></a>
                    </div>
                    <div className="col">
                      <a><i className="fas fa-step-forward"></i></a>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  
                </div>
              </div>
          </footer>
        )
    }
}

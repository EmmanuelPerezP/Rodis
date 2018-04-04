import React from "react";

export default class Navbar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
          <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top" id="mainNav">
            <div className="container">
              <a className="navbar-brand js-scroll-trigger" href="#page-top">Rodis</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" href="/player">Player</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" href="/library">Library</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link js-scroll-trigger" href="#services">Settings</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
    }
}

import React from "react";

export default class Navbar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
          <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top" id="mainNav">
            <div class="container">
              <a class="navbar-brand js-scroll-trigger" href="#page-top">Rodis</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#about">Library</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#services">Settings</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link js-scroll-trigger" href="#contact">Player</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )
    }
}

// import react libraries
import { Switch, Route } from 'react-router-dom';
import React from "react";

// import React components for the app
import Player from './Player.js';
import Library from './Library.js';

// import custom css for the app
import '../css/App.css';


export default class Navbar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
          <main>
            <Switch>
              <Route exact path='/player' component={Player}/>
              <Route exact path='/library' component={Library}/>
            </Switch>
          </main>
        )
    }
}

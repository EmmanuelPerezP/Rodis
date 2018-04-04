import { Switch, Route } from 'react-router-dom'
import React from "react";
import '../css/App.css';
import Player from './Player.js';
import Library from './Library.js';

export default class Navbar extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
          <main>
            <Switch>
              <Route exact path='/(player)?' component={Player}/>
              <Route exact path='/library' component={Library}/>
            </Switch>
          </main>
        )
    }
}

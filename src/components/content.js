// import react libraries
import { Switch, Route } from 'react-router-dom';
import React from "react";

// import React components for the app
import MainView from './main_view';
import LibraryView from './library_view';

// import custom css for the app
import '../css/App.css';


export default class Content extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
          <main>
            <Switch>
              <Route exact path='/main_view' component={MainView}/>
              <Route exact path='/library_view' component={LibraryView}/>
            </Switch>
          </main>
        )
    }
}

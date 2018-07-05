// import react libraries
import { Switch, Route } from 'react-router-dom';
import React from 'react';

// import React components for the app
import MainViewContainer from '../containers/main_view.container';
import LibraryViewContainer from '../containers/library_view.container';

// import custom css for the app
import '../css/App.css';


export default class Content extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/main_view" component={MainViewContainer} />
          <Route exact path="/library_view" component={LibraryViewContainer} />
        </Switch>
      </main>
    );
  }
}

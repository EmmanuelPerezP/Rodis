// import react libraries
import { Switch, Route } from 'react-router-dom';
import React from 'react';

// import React components for the app
import MainViewContainer from './main_view/main_view.container';
import LibraryViewContainer from './library_view/library_view.container';

// import custom css for the app
import '../css/App.css';


export default class Content extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/main_view" component={MainViewContainer} />
          <Route exact path="/library_view" component={LibraryViewContainer} />
          <Route exact path="/settings" component={LibraryViewContainer} />
        </Switch>
      </main>
    );
  }
}

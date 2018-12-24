// import react libraries
import { Switch, Route } from 'react-router-dom';
import React from 'react';

// import React components for the app
import MainViewContainer from './main_view/main_view.container';
import LibraryViewContainer from './library_view/library_view.container';
import SettingsViewContainer from './settings_view/settings_view.container';
import PlaylistViewContainer from './playlist_view/playlist_view.container';

// import custom css for the app
import '../css/App.css';


export default class Content extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/main_view" component={MainViewContainer} />
          <Route exact path="/library_view" component={LibraryViewContainer} />
          <Route exact path="/playlist_view" component={PlaylistViewContainer} />
          <Route exact path="/settings" component={SettingsViewContainer} />
        </Switch>
      </main>
    );
  }
}

import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../../css/App.css';
import Navbar from '../navbar/navbar';
import Content from '../content';
import PlaybarContainer from '../playbar/playbar.container';
import VisualizerPlayerContainer from '../vizualizer_player/visualizer_player.container';
import PlayerContainer from '../player.container';
import SidenavContainer from '../sidenav/sidenav.container';
import SidenavRightContainer from '../sidenav_right/sidenav_right.container';

class App extends Component {
  // constructor(props){
  //   super(props);
  //   // this.handleClick = this.handleClick.bind(this);
  //   // this.materias = [];
  //   // this.state = {datos:{}, "schedule":[]};
  // }
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid pl-0">
          <SidenavRightContainer />
          <div className="main">
            <Content />
          </div>
          <PlaybarContainer />
          <SidenavContainer />
        </div>
        <VisualizerPlayerContainer />
        <PlayerContainer />
      </div>
    );
  }
}

export default App;

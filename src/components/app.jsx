import React, { Component } from 'react';
// import logo from '../logo.svg';
import '../css/App.css';
import Navbar from './navbar';
import Content from './content';
import PlaybarContainer from '../containers/playbar.container';


class App extends Component {
  // constructor(props){
  //   super(props);
  //   // this.handleClick = this.handleClick.bind(this);
  //   // this.materias = [];
  //   // this.state = {datos:{}, "schedule":[]};
  // }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container-fluid pl-0">
          <Content />
          <PlaybarContainer />
        </div>
      </div>
    );
  }
}

export default App;

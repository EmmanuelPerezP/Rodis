import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Navbar from './Navbar.js';
import Main from './Main.js';

class App extends Component {

  constructor(props){
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    // this.materias = [];
    // this.state = {datos:{}, "schedule":[]};
  }

  render() {
    return (
      <div>
        <Navbar/>
        <Main/>
      </div>
    );
  }
}

export default App;

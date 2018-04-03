import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import Navbar from './Navbar.js';

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
        <div class="container-fluid pl-0">
          <div class="row no-gutters">
            <div class="col-3">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="row">The space program</td>
                    <td>2:00</td>
                  </tr>
                  <tr>
                    <td scope="row">We the people</td>
                    <td>2:52</td>
                  </tr>
                  <tr>
                    <td scope="row">Whateva Will Be</td>
                    <td>3:54</td>
                  </tr>
                  <tr>
                    <td scope="row">Whateva Will Be loraldksfjalsdf aldkfj alksdjf fekj dcvn lj</td>
                    <td>3:54</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-9">
              <div class="row">
                <img src="cover2.jpg" class="rounded mx-auto d-block" alt="..."></img>
              </div>
            </div>
          </div>

          <div class="row pt-2 justify-content-center no-gutters">
            <div class="col-3">

            </div>
            <div class="col-6 mx-auto">
              <div class="row controls">
                <div class="col">
                  <a><i class="fas fa-step-backward"></i></a>
                </div>
                <div class="col">
                  <a><i class="fas fa-play"></i></a>
                </div>
                <div class="col">
                  <a><i class="fas fa-pause"></i></a>
                </div>
                <div class="col">
                  <a><i class="fas fa-step-forward"></i></a>
                </div>
              </div>
            </div>
            <div class="col-3">

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

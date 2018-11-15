import React from 'react';

// redux
import { connect } from 'react-redux'

// components
import Sidenav from '../components/sidenav_right';
// import action creators
import { toggleAlbumArt, toggleSidenav, switchSketch } from '../actions/actions';

class SidenavRightContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.changeAlbumArt = this.changeAlbumArt.bind(this);
    this.sketch1 = this.sketch1.bind(this);
    this.sketch2 = this.sketch2.bind(this);
    this.sketch3 = this.sketch3.bind(this);
    this.sketch4 = this.sketch4.bind(this);
    this.sketch5 = this.sketch5.bind(this);
  }  


  sketch1(){
    this.props.dispatch(switchSketch(1));
  }

  sketch2(){
    this.props.dispatch(switchSketch(2));
  }

  sketch3(){
    this.props.dispatch(switchSketch(3));
  }

  sketch4(){
    this.props.dispatch(switchSketch(4));
  }

  sketch5(){
    this.props.dispatch(switchSketch(5));
  }




  
  render() {
    return (
      <Sidenav showSidenavRight={this.props.showSidenavRight}
      sketch1={this.sketch1}
      sketch2={this.sketch2} 
      sketch3={this.sketch3} 
      sketch4={this.sketch4} 
      sketch5={this.sketch5}/>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    "showSidenavRight": state.player.uiState.showSidenavRight,
  }
}

export default connect(mapStateToProps)(SidenavRightContainer);
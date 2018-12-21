import React from 'react';

export default class Sidenav extends React.Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    var style = {width: "0"};
    if(this.props.showSidenavRight){
    // if(true){
      style = {width: "30vw"};
    }
    return(
      // <div className="container-fluid pl-0">
        <div id="mySidenav" className="sidenav-right" style={style}>
          <div className="row justify-content-center mx-auto">
            <div className="col-12">
            <div className="btn-group-vertical btn-group-lg">

                <button type="button" className="btn btn-secondary btn-outline-dark" onClick={this.props.sketch1}>Sketch 1</button>
                <button type="button" className="btn btn-secondary btn-outline-dark" onClick={this.props.sketch2}>Sketch 2</button>
                <button type="button" className="btn btn-secondary btn-outline-dark" onClick={this.props.sketch3}>Sketch 3</button>
                <button type="button" className="btn btn-secondary btn-outline-dark" onClick={this.props.sketch4}>Sketch 4</button>
                <button type="button" className="btn btn-secondary btn-outline-dark" onClick={this.props.sketch5}>Sketch 5</button>
                <button type="button" className="btn btn-secondary btn-outline-dark" onClick={this.props.sketch6}>Sketch 6</button>
            </div>  
            </div>  
          </div>  
        </div>
      )
  }
}

import React from 'react';
import p5 from 'p5';

// taken from https://github.com/NeroCor/react-p5-wrapper/blob/master/src/P5Wrapper.js
// to avoid more npm modules, and to add pull requests

export default class P5Wrapper extends React.Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }

  componentWillReceiveProps(newprops) {
    if(this.props.sketch !== newprops.sketch){
      // this.wrapper.removeChild(this.wrapper.childNodes[0]);
      this.canvas.remove();
      this.canvas = new p5(newprops.sketch, this.wrapper);
    }
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }
  }


  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    return <div id="visualizer" ref={wrapper => this.wrapper = wrapper}></div>;
  }
}
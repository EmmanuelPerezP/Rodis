import React from 'react';
import * as PIXI from 'pixi.js';
// import sketch from '../pixi_sketches/sketch1';

export default class PixiComponent extends React.Component {
//   constructor(props) {
//     super(props);
//   }

  /**
   * After mounting, add the Pixi Renderer to the div and start the Application.
   */
  componentDidMount() {
    const { sketch } = this.props;
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight);
    this.gameCanvas.appendChild(this.app.view);
    sketch(this.app);
    this.app.start();
  }

  /**
   * Stop the Application when unmounting.
   */
  componentWillUnmount() {
    this.app.stop();
  }

  /**
   * Simply render the div that will contain the Pixi Renderer.
   */
  render() {
    return (
      <div id="visualizer" ref={(thisDiv) => { this.gameCanvas = thisDiv; }} />
    );
  }
}

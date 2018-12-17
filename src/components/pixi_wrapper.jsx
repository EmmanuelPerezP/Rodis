import React from 'react';
import * as PIXI from 'pixi.js';

export default class PixiComponent extends React.Component {
//   constructor(props) {
//     super(props);
//   }

  /**
   * After mounting, add the Pixi Renderer to the div and start the Application.
   */
  componentDidMount() {
    this.app = new PIXI.Application(window.innerWidth, window.innerHeight);
    this.gameCanvas.appendChild(this.app.view);

    const circle = new PIXI.Graphics();
    circle.beginFill(0x5cafe2);
    circle.drawCircle(0, 0, 80);
    circle.x = 320;
    circle.y = 180;
    this.app.stage.addChild(circle);

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

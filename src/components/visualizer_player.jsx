import React from 'react';
import P5Wrapper from './P5Wrapper';
import Sketch from '../sketches/sketch1';

export default class VisualizerPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <P5Wrapper sketch={Sketch} audioFilePath={this.props.audioFilePath} playerStatus={this.props.playerStatus} />
    );
  }
}

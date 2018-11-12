import React from 'react';
import P5Wrapper from './P5Wrapper';
import Sketch1 from '../sketches/sketch1';
import Sketch2 from '../sketches/sketch2';
import Sketch3 from '../sketches/sketch3';
import Sketch4 from '../sketches/sketch4';
import Sketch5 from '../sketches/sketch5';
import Sketch6 from '../sketches/sketch6';

export default class VisualizerPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <P5Wrapper playNextSong={this.props.playNextSong} sketch={Sketch6} audioFilePath={this.props.audioFilePath} playerStatus={this.props.playerStatus} />
    );
  }
}

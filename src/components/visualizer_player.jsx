import React from 'react';
import P5Wrapper from './P5Wrapper';
import Sketch1 from '../sketches/sketch1';
import Sketch2 from '../sketches/sketch2';
import Sketch3 from '../sketches/sketch3';
import Sketch4 from '../sketches/sketch4';
import Sketch5 from '../sketches/sketch5';

export default class VisualizerPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var wrapper;
    if(this.props.sketch == 1){
      wrapper = <P5Wrapper playNextSong={this.props.playNextSong} sketch={Sketch1} audioFilePath={this.props.audioFilePath} playerStatus={this.props.playerStatus} />
    }
    else if(this.props.sketch == 2){
      wrapper = <P5Wrapper playNextSong={this.props.playNextSong} sketch={Sketch2} audioFilePath={this.props.audioFilePath} playerStatus={this.props.playerStatus} />
    }
    else if(this.props.sketch == 3){
      wrapper = <P5Wrapper playNextSong={this.props.playNextSong} sketch={Sketch3} audioFilePath={this.props.audioFilePath} playerStatus={this.props.playerStatus} />
    }
    else if(this.props.sketch == 4){
      wrapper = <P5Wrapper playNextSong={this.props.playNextSong} sketch={Sketch4} audioFilePath={this.props.audioFilePath} playerStatus={this.props.playerStatus} />
    }
    else if(this.props.sketch == 5){
      wrapper = <P5Wrapper playNextSong={this.props.playNextSong} sketch={Sketch5} audioFilePath={this.props.audioFilePath} playerStatus={this.props.playerStatus} />
    }
    return (
      <div>
        {wrapper}
      </div>
    );
  }
}

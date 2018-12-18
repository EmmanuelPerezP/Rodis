import React from 'react';
import P5Wrapper from '../P5Wrapper';
import Sketch1 from '../../p5_sketches/sketch1';
import Sketch2 from '../../p5_sketches/sketch2';
import Sketch3 from '../../p5_sketches/sketch3';
import Sketch4 from '../../p5_sketches/sketch4';
import Sketch5 from '../../p5_sketches/sketch5';
import PixiSketch1 from '../../pixi_sketches/sketch1';
import PixiSketch2 from '../../pixi_sketches/sketch2';
import PixiWrapper from '../pixi_wrapper';

export default function VisualizerPlayer(props) {
  const { sketch, audioFilePath, playNextSong, playerStatus } = props;
  let wrapper;
  if (sketch === 1) {
    // wrapper = <P5Wrapper playNextSong={this.props.playNextSong} sketch={Sketch1} audioFilePath={this.props.audioFilePath} playerStatus={this.props.playerStatus} />
    wrapper = <PixiWrapper sketch={PixiSketch2} />
  }
  else if (sketch === 2) {
    wrapper = <P5Wrapper playNextSong={playNextSong} sketch={Sketch2} audioFilePath={audioFilePath} playerStatus={playerStatus} />
  }
  else if (sketch === 3) {
    wrapper = <P5Wrapper playNextSong={playNextSong} sketch={Sketch3} audioFilePath={audioFilePath} playerStatus={playerStatus} />
  }
  else if (sketch === 4) {
    wrapper = <P5Wrapper playNextSong={playNextSong} sketch={Sketch4} audioFilePath={audioFilePath} playerStatus={playerStatus} />
  }
  else if (sketch === 5) {
    wrapper = <P5Wrapper playNextSong={playNextSong} sketch={Sketch5} audioFilePath={audioFilePath} playerStatus={playerStatus} />
  }
  return (
    <div>
      {wrapper}
    </div>
  );
}

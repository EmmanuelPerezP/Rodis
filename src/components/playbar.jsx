import React from 'react';
import audioPlayer from '../lib/player';

export default class playbar extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  handlePlay(e){
    audioPlayer.setAudioSrc("file:///home/ema/source/rodis/heart.mp3")
    audioPlayer.play();
  }

  handlePause(e){
    audioPlayer.pause();
  }

  render() {
    return (
      <footer className="footer">
        <div className="row pt-2 justify-content-center no-gutters">
          <div className="col-3" />
          <div className="col-6 mx-auto">
            <div className="row controls">
              <div className="col">
                <a>
                  <i className="fas fa-step-backward" />
                </a>
              </div>
              <div className="col">
                <a onClick={this.handlePlay}>
                  <i className="fas fa-play" />
                </a>
              </div>
              <div className="col">
                <a onClick={this.handlePause}>
                  <i className="fas fa-pause" />
                </a>
              </div>
              <div className="col">
                <a>
                  <i className="fas fa-step-forward" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-3" />
        </div>
      </footer>
    );
  }
}

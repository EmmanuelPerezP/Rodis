import React from 'react';


export default class Playbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var playerState = this.props.playerState;
    var pausePlay;
    if(playerState.playerStatus == "play"){
      pausePlay = 
        <div className="col">
          <a onClick={this.props.handlePause} >
            <i className="fas fa-pause" />
          </a>
        </div>
    }
    else if (playerState.playerStatus == "pause" || true){
      pausePlay = <div className="col">
                    <a onClick={this.props.handlePlay} >
                      <i className="fas fa-play" />
                    </a>
                  </div>

    }
    var timeString = "00:00";
    var title = "";
    var artist = "";
    if(typeof this.props.currentSong != "undefined"){
      var date = new Date(null);
      date.setSeconds(this.props.currentSong.metadata.format.duration); // specify value for SECONDS here
      timeString = date.toISOString().substr(14, 5);
      title = this.props.currentSong.metadata.common.title;
      artist =this.props.currentSong.metadata.common.artist;
    }
    return (
      <footer className="footer">
        

        <div className="row pt-2 justify-content-center no-gutters">
          <div className="playlist-button" onClick={this.props.closeSidenav}> 
            <i className="fas fa-list-ul"></i>
          </div>
          <div className="song-info">
            <div className="song-name"> Song: {title} </div>
            <div className="artist-name"> Artist: {artist}</div>
            <div className="time-length"> Lenght: {timeString}</div>
          </div>

          <div className="col-4 mx-auto">

            <div className="row controls">

              <div className="col">
                <a onClick={this.props.handlePrevious} >
                  <i className="fas fa-step-backward" />
                </a>
              </div>
              
              {pausePlay}
              
              <div className="col">
                <a onClick={this.props.handleNext} >
                  <i className="fas fa-step-forward" />
                </a>
              </div>

            </div>
            
          </div>
        </div>

      </footer>
    );
  }
}

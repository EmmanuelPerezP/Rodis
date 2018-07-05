import React from 'react';

// container
import LibraryItemContainer from '../containers/library_item.container'

export default class MainView extends React.Component {
    constructor(props){
        super(props);
        // audioPlayer.setAudioSrc("file:///home/ema/source/rodis/src/heart.mp3");
    }

    handlePlay(e){
      console.log("clicked play");
      // audioPlayer.play();
      // this.setState({carnet: e.target.value});
    }

    handlePause(e){
      console.log("clicked pause");
      // audioPlayer.pause();
      // this.setState({carnet: e.target.value});
    }

    render(){
    const songs = this.props.playlist;
    console.log("all the songs: ")
    console.log(songs);
    var songsRows = songs.map((songData, index) =>
      <LibraryItemContainer 
        key={index} 
        number={index} 
        songData={songData} 
        useAddButton={false} 
        useNumberColumn={true} 
      />
    ); 
    return(
      // <div className="container-fluid pl-0">
        <div className="row no-gutters">
          <div className="col-3">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>

                {songsRows}

              </tbody>
            </table>
          </div>

          <div className="col-9">
            <div className="row">
              <img src={'file://'+this.props.currentAlbumArt} className="rounded mx-auto d-block" alt="..."></img>
            </div>
          </div>
        </div>
            //footer
        // </div>
      )
    }
}

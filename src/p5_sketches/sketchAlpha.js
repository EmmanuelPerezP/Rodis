import "p5/lib/addons/p5.sound";
import p5 from "p5";
import store from '../store/store';
import { playerNext } from '../actions/actions';


export default function sketch (p) {

    var mySound;
    var currentFilePath = '';
    var numBars = 256;
    var song;
    var fft;


    p.preload = function () {
      p.soundFormats('mp3');
    }
    
    // ----------------------------------------------------------------------------------------------
    p.setup = function () {
      p.pixelDensity(1);
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.background('#ffffff');
      console.log("sketch re-render");
    };
    // ----------------------------------------------------------------------------------------------
  
    // this function doesnt re-renders the canvas or p5 logic
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      console.log("file path is the same?: ");
      console.log(currentFilePath == props.audioFilePath);
      if (currentFilePath !== props.audioFilePath) {
        // if mySound is not yet defined (like no song loaded) dont do anything, else stop song
        ((typeof mySound !== "undefined") ? mySound.stop() : true );
        mySound = p.loadSound(props.audioFilePath, () => {
          mySound.onended(() => {
            // method pass down by visualizer_player.container.jsx
            console.log("play next song");
            // props.playNextSong();
            // store.dispatch(playerNext());
            console.log("songEnded");
          });
          currentFilePath = props.audioFilePath;
          if (props.playerStatus == 'play' && typeof mySound != "undefined" && mySound.isLoaded() && !mySound.isPlaying()){
            mySound.play()
            fft = new p5.FFT();
            fft.waveform(numBars);
            fft.smooth(0.85);
          }
          else if (props.playerStatus == 'pause' && typeof mySound != "undefined" && mySound.isLoaded() && !mySound.isPlaying()){
            mySound.pause();
          }
        });

      }
      else {
        if (props.playerStatus == 'play' && typeof mySound != "undefined" && mySound.isLoaded()){
          mySound.play()
        }
        else if (props.playerStatus == 'pause' && typeof mySound != "undefined" && mySound.isLoaded()){
          mySound.pause();
        }
      }
    };

    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    }
  
    // ----------------------------------------------------------------------------------------------
    p.draw = function () {
      p.background('#ffffff');

      if(typeof mySound != "undefined" && mySound.isLoaded() && !mySound.isPlaying()) { 
        fft = new p5.FFT();
        fft.waveform(numBars);
        fft.smooth(0.85);
      }
      if(typeof fft != "undefined") {
        var spectrum = fft.analyze();
        p.noStroke();
        p.fill("rgb(0, 0, 0)");
        for(var i = 0; i < numBars; i++) {
          var x = p.map(i, 0, numBars, 0, p.displayWidth*3);
          var h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
          p.rect(x, p.height, p.width / (numBars/4), h);
        }
      }
    };
  };
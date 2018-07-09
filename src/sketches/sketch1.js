import "p5/lib/addons/p5.sound";
import p5 from "p5";

export default function sketch (p) {

    var mySound;
    var numBars = 1024;
    var song;
    var fft;


    p.preload = function () {
      p.soundFormats('mp3');
    }

    p.setup = function () {
      p.pixelDensity(1);
      p.createCanvas(window.innerWidth, window.innerHeight);
      p.background('#ffffff');
    };
  
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if (props.playerStatus == 'play'){
        mySound = p.loadSound(props.audioFilePath, () => mySound.play());
      }
      else if (props.playerStatus == 'pause') {
        mySound.pause();
      }
    };

    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    }
  
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
          var x = p.map(i, 0, numBars, 0, p.width);
          var h = -p.height + p.map(spectrum[i], 0, 255, p.height, 0);
          p.rect(x, p.height, p.width / numBars, h);
        }
      }

    };
  };
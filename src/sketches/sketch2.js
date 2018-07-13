import "p5/lib/addons/p5.sound";
import p5 from "p5";
import store from '../store/store';
import { playerNext } from '../actions/actions';
import Player from '../lib/player';


export default function sketch (p) {

    var mySound;
    var currentFilePath = '';
    var numBars = 1024;
    var song;
    var fft;
    // var frequencyData;
    var frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);



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
      if(props.playerStatus == "play"){
      }
    };

    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    }
  
    // ----------------------------------------------------------------------------------------------
    p.draw = function () {
      p.background('#ffffff');

      
      if(typeof frequencyData != "undefined") {
        Player.getAnalyser().getByteFrequencyData(frequencyData);
        var spectrum = frequencyData;
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
import p5 from "p5";
import store from '../store/store';
import { playerNext } from '../actions/actions';
import Player from '../lib/player';


/* eslint-disable */
export default function sketch (p) {

    var mySound;
    var currentFilePath = '';
    var numBars = 256;
    var song;
    var fft;
    // var frequencyData;
    var frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);

    p.preload = function () {
    }
    
    // ----------------------------------------------------------------------------------------------
    p.setup = function () {
      p.pixelDensity(1);
      p.frameRate(50);
      // p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL); // webgl
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

    let col2 = 0;
    p.draw = function () {
      p.background('#ffffff');
      // p.translate(-p.width/2,-p.height/2,0); //moves our drawing origin to the top left corner

      
      col2 += 1;
      if(typeof frequencyData != "undefined") {
        Player.getAnalyser().getByteFrequencyData(frequencyData);
        let spectrum = frequencyData;
        p.noStroke();
        p.colorMode(p.HSB, 100);

        let rowColumnNumber = Math.sqrt(numBars);
        let columnCounter = 0;
        let rowCounter = 0;

        for(let i = 0; i < numBars; i++) {

          if(columnCounter >= rowColumnNumber){
            columnCounter = 0;
            rowCounter += 1;
          }
          columnCounter += 1;
          let x = p.map(columnCounter, 0, rowColumnNumber, 0, window.innerWidth) - 35;
          let y = p.map(rowCounter, 0, rowColumnNumber, 0, window.innerHeight) + 100;
          let wh = p.map(spectrum[i], 0, 255, 50, 400);


          // let color1 = p.map(i, 0, numBars, 0, 255, true);
          let color1 = p.map(i, 0, numBars, 50, 100, true);
          // let color2 = p.map(i, numBars, 0, 0, 255);
          p.fill(color1, 50, 100);
          if(wh == 50){
            p.ellipse(x, y, 100);
          }
          p.ellipse(x, y, wh);

        }
      }
      if (col2 >= 255){
        col2 = 0;
      }
    };
  };
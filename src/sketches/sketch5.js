import p5 from "p5";
import store from '../store/store';
import { playerNext } from '../actions/actions';
import Player from '../lib/player';


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

    var angle = 0.7;

    var val;

    function branch (len) {
      p.line(0, 0, 0, -len);
      p.translate(0, -len);
      var fraction = 2/3;
      if(len > val) {
        p.push();
        p.rotate(angle);
        branch(len*fraction); 
        p.pop();
        p.push();
        p.rotate(-angle);
        branch(len*fraction);
        p.pop();
      }
    }



    let col2 = 0;
    p.draw = function () {
      p.background('#ffffff');
      // p.translate(-p.width/2,-p.height/2,0); //moves our drawing origin to the top left corner

      
      col2 += 1;
      if(typeof frequencyData != "undefined") {
        Player.getAnalyser().getByteFrequencyData(frequencyData);
        let spectrum = frequencyData;

        var h = p.map(spectrum[2], 0, 255, 0, 200);
        var j = p.map(spectrum[2], 0, 255, 2, 3);


        p.stroke(0);
        p.translate(p.width/2, p.height);
        val = j;
        branch(h);

      }

    };
  };
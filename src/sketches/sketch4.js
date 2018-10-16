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
    var ps = null;

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

      ps = new ParticleSystem(0,p.width / 2, p.height /2);

      
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


    class Particle{
      constructor(x, y) {

        this.loc = p.createVector(x, y);

        let vx = p.randomGaussian() * 0.5;
        let vy = p.randomGaussian() * 0.3 - 1.0;
    
        this.vel = p.createVector(vx,vy);
        this.acc = p.createVector(0,-3);
        this.lifespan = 100.0;

      }

      display(){
        //Set the file colour to an RGBA value where it starts off red-orange, but progressively
        //gets more grey and transparent the longer the particle has been alive for

        p.colorMode(p.RGB, 100);

        let lifespan = p.map(this.lifespan, 0, 100, 0, 100);

        let red = 100;
        let green = lifespan; 
        let blue = 0; 
        let fillStyle = p.color(red,green,blue,lifespan*0.6);

        p.noStroke();
        p.fill(fillStyle);
        p.ellipse(this.loc.x, this.loc.y, 30);
      }

      run() {
        this.update();
        this.display();
      }

      update(){
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.lifespan -= 2.5;
        this.acc.mult(0);
      }

      applyForce(f){
        this.acc.add(f);
      }

      isDead(){
        if (this.lifespan <= 0.0) {
            return true;
        } 
        else {
            return false;
        }
      }
  }
  
  //========= PARTICLE SYSTEM ===========


    /**
   * A basic particle system class
   * @param num the number of particles
   * @param v the origin of the particle system
   * @param img_ a texture for each particle in the system
   * @constructor
   */
  class ParticleSystem{

    constructor(num, x, y){
      this.particles = [];
      this.origin = p.createVector(x, y);
      for(var i = 0; i < num; ++i){
          this.particles.push(new Particle(this.origin.x, this.origin.y));
      }
    }

    run(){
      // cache length of the array we're going to loop into a variable
      // You may see <variable>.length in a for loop, from time to time but
      // we cache it here because otherwise the length is re-calculated for each iteration of a loop
      var len = this.particles.length;

      //loop through and run particles
      for (var i = len - 1; i >= 0; i--) {
        var particle = this.particles[i];
        particle.run();

        // if the particle is dead, we remove it.
        // javascript arrays don't have a "remove" function but "splice" works just as well.
        // we feed it an index to start at, then how many numbers from that point to remove.
        if (particle.isDead()) {
            this.particles.splice(i,1);
        }
      }
    }

    /**
    * Method to add a force vector to all particles currently in the system
    * @param dir a p5.Vector describing the direction of the force.
    */
    applyForce(dir){
      var len = this.particles.length;
      for(var i = 0; i < len; ++i){
          this.particles[i].applyForce(dir);
      }
    }


    addParticle(){
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }


    // ----------------------------------------------------------------------------------------------


    p.draw = function () {
      p.background('#ffffff');


      // let ps = new ParticleSystem(0, p.mouseX, p.mouseY);

      // ps = new ParticleSystem(0,p.width / 2, p.height - 60);

      ps.run();
      for (var i = 0; i < 5; i++) {
          ps.addParticle();
      }


      
      // col2 += 1;
      // if(typeof frequencyData != "undefined") {
      //   Player.getAnalyser().getByteFrequencyData(frequencyData);
      //   let spectrum = frequencyData;
      //   p.noStroke();
      //   p.colorMode(p.HSB, 100);

      //   let rowColumnNumber = Math.sqrt(numBars);
      //   let columnCounter = 0;
      //   let rowCounter = 0;

      //   for(let i = 0; i < numBars; i++) {

      //     if(columnCounter >= rowColumnNumber){
      //       columnCounter = 0;
      //       rowCounter += 1;
      //     }
      //     columnCounter += 1;
      //     let x = p.map(columnCounter, 0, rowColumnNumber, 0, window.innerWidth) - 35;
      //     let y = p.map(rowCounter, 0, rowColumnNumber, 0, window.innerHeight) + 100;
      //     let wh = p.map(spectrum[i], 0, 255, 50, 400);


      //     // let color1 = p.map(i, 0, numBars, 0, 255, true);
      //     let color1 = p.map(i, 0, numBars, 50, 100, true);
      //     // let color2 = p.map(i, numBars, 0, 0, 255);
      //     p.fill(color1, 50, 100);
      //     p.ellipse(x, y, wh);

      //   }
      // }
      // if (col2 >= 255){
      //   col2 = 0;
      // }
    // draw
    };


  };
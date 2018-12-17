import p5 from "p5";
import store from '../store/store';
import { playerNext } from '../actions/actions';
import Player from '../lib/player';


export default function sketch (p) {

    var mySound;
    var currentFilePath = '';
    var numBars = 16;
    var song;
    var fft;
    // var frequencyData;
    var frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);
    var fireArray = [];

    // p.preload = function () {
    // }
    
    // ----------------------------------------------------------------------------------------------
    p.setup = function () {
      p.pixelDensity(1);
      p.colorMode(p.RGB, 100);
      p.frameRate(50);
      // p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL); // webgl
      p.createCanvas(window.innerWidth, window.innerHeight);

      p.background('#ffffff');
      console.log("sketch re-render");


      for(let i = 0; i < numBars; i++) {
        var x = p.map(i, 0, numBars, 0, p.displayWidth);
        var ps = new ParticleSystem(0, x, p.height);
        fireArray.push(ps);
      }
      
    };
    // ----------------------------------------------------------------------------------------------
  
    // this function doesnt re-renders the canvas or p5 logic
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if(props.playerStatus == "play"){
      }
    };

    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    };
  
    // ----------------------------------------------------------------------------------------------


    class Particle{
      constructor(x, y) {

        this.loc = p.createVector(x, y);

        let vx = p.randomGaussian() * 0.5;
        let vy = p.randomGaussian() * 0.3 - 1.0;
    
        this.vel = p.createVector(vx,vy);
        this.acc = p.createVector(0,-3);
        this.lifespan = 200.0;
        this.lifespanMax = this.lifespan;
        this.size = 30;

      }

      display(){
        //Set the file colour to an RGBA value where it starts off red-orange, but progressively
        //gets more grey and transparent the longer the particle has been alive for


        let lifespan = p.map(this.lifespan, 0, this.lifespanMax, 0, 85);

        let red = 100;
        let green = lifespan; 
        let blue = 0; 
        let fillStyle = p.color(red,green,blue,lifespan);

        p.noStroke();
        p.fill(fillStyle);
        p.ellipse(this.loc.x, this.loc.y, this.size);
      }

      run() {
        this.update();
        this.display();
      }

      update(){
        this.vel.add(this.acc);
        this.loc.add(this.vel);
        this.lifespan -= 2;
        this.acc.mult(0);
      }

      applyForce(f){
        this.acc.add(f);
      }

      addVel(f){
        this.vel.add(f.copy());
      }

      changeSize(f){
        this.size = f;
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

    addVel(dir){
      var len = this.particles.length;
      for(var i = 0; i < len; ++i){
          this.particles[i].addVel(dir);
      }
    }

    changeSize(dir){
      var len = this.particles.length;
      for(var i = 0; i < len; ++i){
          this.particles[i].changeSize(dir);
      }
    }


    addParticle(){
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }


    // ----------------------------------------------------------------------------------------------


    p.draw = function () {
      p.background('#ffffff');

      if(typeof frequencyData != "undefined") {
        Player.getAnalyser().getByteFrequencyData(frequencyData);
        let spectrum = frequencyData;

        for(let i = 0; i < numBars; i++) {
          fireArray[i].run();
          fireArray[i].addParticle();
          // let wh = p.map(spectrum[i], 0, 255, 0, -0.1);
          let wh = p.map(spectrum[i], 100, 255, 0, 50);
          fireArray[i].changeSize(wh);
          // fireArray[i].addVel(p.createVector(0,wh));
          // for (let p = 0; p < wh; p++) {
          //     fireArray[i].addParticle();
          // }
        }
      }



    };


  };
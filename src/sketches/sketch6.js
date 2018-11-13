import Player from '../lib/player';


export default function sketch (p) {


    var numBars = 128;
    var forest = [];
    var fireArray = [];
    var frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);



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
        this.lifespan -= 3;
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
    // Tree
    // ----------------------------------------------------------------------------------------------


    /** class representing a tree with branches */
    class Tree{
      /**
       * @param  {int} size - the number of branches in the tree
       * @param  {int} branchSize - roughly the size of the branches
       */
      constructor(size, branchSize, x, y){
        this.tree = [];
        this.count = 0;
        this.size = size;
        this.x = x;
        this.y = y;
        this.branchSize = branchSize;

        let a = p.createVector(x, y);
        let b = p.createVector(x, y - branchSize);
        let root = new Branch(a, b); 
        this.tree.push(root);

        for(let i = 0; i < size; i++){
          this.addBranch();
        }

      }

      draw(){
        //forEach Branch of the Tree: Draw it
        for(let i = 0; i < this.tree.length; i++){

          if( i > this.tree.length / 2){
            p.strokeWeight(1);
          }

          this.tree[i].show();
        }



      }

      update(size){
        this.tree = [];

        this.size = size;
        let a = p.createVector(this.x, this.y);
        let b = p.createVector(this.x, this.y - this.branchSize);
        let root = new Branch(a, b); 
        this.tree.push(root);


        for(let i = 0; i < this.size; i++){
          this.addBranch();
        }

      }

      addBranch(){
        for(let i = this.tree.length -1; i >= 0; i--){
          let current = this.tree[i];
          //if the current Branch has no children: add them
          if(!current.finished){
            this.tree.push(current.branch(p.PI/this.size));
            this.tree.push(current.branch(-p.PI/10 * this.size));
          }
          //now that Branch has children
          current.finished = true;
        }
        //new Level added
        this.count++;
      }

    }



    // ----------------------------------------------------------------------------------------------
    // Branch
    // ----------------------------------------------------------------------------------------------

    class Branch{
  
      /**
      * create Branch with beginning and end-Point 
      * @param beging Startpoint
      * @param end Endpoint
      */
      constructor(begin, end){
        this.begin = begin;
        this.end = end;
        this.finished = false;
      }
  
      /**
      * displays the Branch
      */
      show(){
        p.stroke(50);
        p.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
      }


      branch(rotation){
        var dir = this.end.copy().sub(this.begin);
        dir.rotate(rotation);
        dir.mult(0.67);
        // dir.mult(.67);
        let newEnd = this.end.copy().add(dir);
        let b = new Branch(this.end, newEnd);
        return b;
      }     
    }




















    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      if(props.playerStatus == "play"){
      }
    };


    // ----------------------------------------------------------------------------------------------
    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    }
    // ----------------------------------------------------------------------------------------------
    // ----------------------------------------------------------------------------------------------
    p.mousePressed = function(){
      
    }
    // ----------------------------------------------------------------------------------------------


    // ----------------------------------------------------------------------------------------------
    // Setup
    // ----------------------------------------------------------------------------------------------

    p.setup = function () {
      p.pixelDensity(1);
      p.frameRate(50);
      // p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL); // webgl
      p.createCanvas(window.innerWidth, window.innerHeight);

      p.background('#ffffff');
      console.log("sketch re-render");



      p.strokeWeight(3);
      p.colorMode(p.RGB, 100);
      // change the size of the data analyzer
      Player.changeFftSize(numBars*2);
      frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);


      for(let i = 1; i < 5; i++){
        let tree1 = new Tree(0, 100, window.innerWidth/5 * 2, (window.innerHeight/4)*i);
        forest.push(tree1);
      }
      for(let i = 1; i < 5; i++){
        let tree1 = new Tree(0, 100, (window.innerWidth/5)*3, (window.innerHeight/4)*i);
        forest.push(tree1);
      }
      for(let i = 1; i < 5; i++){
        let tree1 = new Tree(0, 100, (window.innerWidth/5)*4, (window.innerHeight/4)*i);
        forest.push(tree1);
      }


      var x = p.map(0, 0, 3, 0, p.displayWidth);
      var ps = new ParticleSystem(0, window.innerWidth, p.displayHeight/2);
      fireArray.push(ps);
      var x = p.map(1, 0, 3, 0, p.displayWidth);
      var ps = new ParticleSystem(0, window.innerWidth/2, p.displayHeight/2);
      fireArray.push(ps);
      var x = p.map(2, 0, 3, 0, p.displayWidth);
      var ps = new ParticleSystem(0, 0, p.displayHeight/2);
      fireArray.push(ps);

    };

    p.draw = function () {
      p.background('#ffffff');



      p.strokeWeight(3);
      if(typeof frequencyData != "undefined") {
        Player.getAnalyser().getByteFrequencyData(frequencyData);
        let spectrum = frequencyData;

        // var j = p.map(spectrum[2], 0, 255, 2, 3);


        // tree render
        let spectrumIndex = 7;
        for(let i = 0; i < forest.length; i++){
          let h = p.map(spectrum[spectrumIndex], 0, 255, 0, 9);
          forest[i].update(h);
          forest[i].draw();
          spectrumIndex += 5;
          p.strokeWeight(3);
        }


        // Fire render
        spectrumIndex = 7;
        for(let i = 0; i < fireArray.length; i++) {
          fireArray[i].run();
          fireArray[i].addParticle();
          let wh = p.map(spectrum[spectrumIndex], 100, 255, 0, 50);
          fireArray[i].changeSize(wh);
          spectrumIndex += 20;
        }


      }

    };


  };
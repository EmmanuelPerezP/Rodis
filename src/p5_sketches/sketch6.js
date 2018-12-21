import Player from '../lib/player';

/* eslint-disable */
export default function sketch(p) {
  var numBars = 128;
  var forest = [];
  var fireArray = [];
  var frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);

  var averageList = [0, 0, 0, 0, 0];

  const average = arr => arr.reduce((p, c) => p + c, 0) / arr.length;

  // ----------------------------------------------------------------------------------------------
  // Tree
  // ----------------------------------------------------------------------------------------------

  /** class representing a tree with branches */
  class Tree {
    /**
     * @param  {int} size - the number of branches in the tree
     * @param  {int} branchSize - roughly the size of the branches
     * @param  {int} x - x position
     * @param  {int} y - y position
     * @param  {int} rand - random
     */
    constructor(size, branchSize, x, y, rand) {
      this.tree = [];
      this.count = 0;
      this.size = size;
      this.x = x;
      this.y = y;
      this.rand = rand;
      this.branchSize = branchSize;
    }

    draw() {
      //forEach Branch of the Tree: Draw it
      for (let i = 0; i < this.tree.length; i++) {
        p.strokeWeight(3);
        let color1 = p.map(i, 0, this.tree.length, 50, 100, true);
        let col = p.color(color1, 60, 100);
        p.stroke(col);
        this.tree[i].show();
      }
    }

    update(size) {
      this.tree = [];

      this.size = size;
      let a = p.createVector(this.x, this.y);
      let b = p.createVector(this.x, this.y - this.branchSize);
      let root = new Branch(a, b);
      this.tree.push(root);

      for (let i = 0; i < this.size; i++) {
        this.addBranch();
      }
    }

    addBranch() {
      for (let i = this.tree.length - 1; i >= 0; i--) {
        let current = this.tree[i];
        //if the current Branch has no children: add them
        if (!current.finished) {
          this.tree.push(current.branch(p.PI / this.size));
          this.tree.push(current.branch((-p.PI / 4) * this.size * this.rand));
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

  class Branch {
    /**
     * create Branch with beginning and end-Point
     * @param beging Startpoint
     * @param end Endpoint
     */
    constructor(begin, end) {
      this.begin = begin;
      this.end = end;
      this.finished = false;
    }

    /**
     * displays the Branch
     */
    show() {
      p.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    branch(rotation) {
      var dir = this.end.copy().sub(this.begin);
      dir.rotate(rotation);
      // dir.mult(0.67);
      dir.mult(0.7);
      let newEnd = this.end.copy().add(dir);
      let b = new Branch(this.end, newEnd);
      return b;
    }
  }

  p.myCustomRedrawAccordingToNewPropsHandler = function(props) {
    if (props.playerStatus == 'play') {
    }
  };

  // ----------------------------------------------------------------------------------------------
  p.windowResized = function() {
    p.resizeCanvas(window.innerWidth, window.innerHeight);
  };
  // ----------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------
  p.mousePressed = function() {};
  // ----------------------------------------------------------------------------------------------

  // ----------------------------------------------------------------------------------------------
  // Setup
  // ----------------------------------------------------------------------------------------------

  p.setup = function() {
    p.pixelDensity(1);
    p.frameRate(60);
    // p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL); // webgl
    p.createCanvas(window.innerWidth, window.innerHeight);

    p.background('#28a745');
    console.log('sketch re-render');

    p.strokeWeight(1);
    p.colorMode(p.HSB, 100);
    // change the size of the data analyzer
    // Player.changeFftSize(numBars * 2);
    frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);

    // number of branches, size, x, y
    // let tree1 = new Tree(0, 250, window.innerWidth/5 +window.innerWidth/5, p.displayHeight - 200, 0.1);
    let tree1 = new Tree(0, 200, window.innerWidth / 2, p.displayHeight - 200, 0.1);
    forest.push(tree1);

  };

  let col2 = 0;
  p.draw = function() {
    p.background('#ffffff');


      // update spectogram
      Player.getAnalyser().getByteFrequencyData(frequencyData);
      let spectrum = frequencyData;



      col2 += 1;
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
      if (col2 >= 255){
        col2 = 0;
      }


      // tree ------------------------------------------------------
      p.strokeWeight(14);
      if (typeof frequencyData != 'undefined') {
        // tree render
        let spectrumIndex = 5;
        for (let i = 0; i < forest.length; i++) {

          // size of recursion the last number
          let h = p.map(spectrum[spectrumIndex], 0, 255, 0, 10);
          forest[i].update(h);
          forest[i].draw();

          spectrumIndex += 30;
        }
        // tree ------------------------------------------------------


    }
  };
}


import chroma from 'chroma-js';
import * as PIXI from 'pixi.js';
import Victor from 'victor';
import Player from '../lib/player';
import * as m from '../lib/math';
// var Victor = require('victor');


// a == app
export default function sketch(app) {
  let forest = [];
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;

  // use num() to get the number
  app.renderer.backgroundColor = chroma('white').num();
  const numBars = 256;
  const frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);
  var graphics = new PIXI.Graphics();

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
      // console.log('x',this.begin.x);
      // console.log('y', this.begin.x);
      
      graphics.moveTo(this.begin.x, this.begin.y);
      graphics.lineTo(this.end.x, this.end.y);
    }

    branch(rotation) {
      let dir = this.end.clone().subtract(this.begin);
      dir.rotate(rotation);
      // dir.mult(0.67);
      dir.multiply(new Victor(0.67, 0.67));
      let newEnd = this.end.clone().add(dir);
      let b = new Branch(this.end, newEnd);
      return b;
    }
  }

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
      graphics.clear();
      //forEach Branch of the Tree: Draw it
      for (let i = 0; i < this.tree.length; i++) {
        // color
        let color1 = m.map(i, 0, this.tree.length, 50, 100);
        // let col = p.color(color1, 60, 100); // change for chroma
        // draw line
        this.tree[i].show();
      }
    }

    update(size) {
      this.tree = [];

      this.size = size;
      const a = new Victor(this.x, this.y);
      const b = new Victor(this.x, this.y - this.branchSize);
      // let a = p.createVector(this.x, this.y);
      // let b = p.createVector(this.x, this.y - this.branchSize);
      let root = new Branch(a, b); 
      this.tree.push(root);

      for (let i = 0; i < this.size; i++) {
        this.addBranch();
      }
    }

    addBranch() {
      for (let i = this.tree.length -1; i >= 0; i--) {
        let current = this.tree[i];
        //if the current Branch has no children: add them
        if (!current.finished) {
          this.tree.push(current.branch(Math.PI / this.size));
          this.tree.push(current.branch(-Math.PI / 4 * this.size * this.rand));
        }
        //now that Branch has children
        current.finished = true;
      }
      //new Level added
      this.count++;
    }
  }

  app.stage.addChild(graphics);
  // let count = 0;

  let tree1 = new Tree(0, 200, windowWidth / 2, windowHeight / 2, 0.1);
  forest.push(tree1);

  app.ticker.add(() => {
    if (typeof frequencyData !== 'undefined') {
      Player.getAnalyser().getByteFrequencyData(frequencyData);
      const spectrum = frequencyData;

      // tree render
      graphics.clear();
      let spectrumIndex = 5;
      for (let i = 0; i < forest.length; i++) {
        // size of recursion the last number
        let h = m.map(spectrum[spectrumIndex], 0, 255, 0, 14);

        let tr = forest[i];

        graphics.lineStyle(2, chroma('orange').num(), 1);


        tr.update(h);
        tr.draw();
        graphics.endFill();

        spectrumIndex += 30;
      }

      // for (let i = 0; i < numBars; i += 1) {
      //   const color1 = m.map(i, 0, numBars, 0, 50);
      //   // let color2 = p.map(i, numBars, 0, 0, 255);
      //   // p.fill(color1, 255, 255);
      //   const x = m.map(i, 0, numBars, 0, windowWidth);
      //   const h = -windowHeight + m.map(spectrum[i], 0, 255, windowHeight, 0);
      //   // p.rect(x, p.height, 10, h);
      //   let rec = bars[i];
      //   rec.clear();
      //   rec.lineStyle(2, chroma('orange').num(), 1);
      //   rec.drawRect(x, windowHeight, 5, h);
      //   rec.endFill();
      // }
    }
  });

}

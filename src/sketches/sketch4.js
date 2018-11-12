import p5 from "p5";
import store from '../store/store';
import { playerNext } from '../actions/actions';
import Player from '../lib/player';
import Branch from '../p5_classes/branch';


export default function sketch (p) {

    var mySound;
    var currentFilePath = '';
    var numBars = 128;
    var song;
    var fft;
    // var frequencyData;
    var frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);


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
          this.tree[i].show();
        }
      }

      addBranch(){
        for(let i = this.tree.length -1; i >= 0; i--){
          let current = this.tree[i];
          //if the current Branch has no children: add them
          if(!current.finished){
            this.tree.push(current.branchA());
            this.tree.push(current.branchB());
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
      
      /**
      * generates a new Branch for the right-side
      */
      branchA(){
        var dir = this.end.copy().sub(this.begin);
        dir.rotate(p.PI / 6);
        dir.mult(0.67);
        // dir.mult(.67);
        let newEnd = this.end.copy().add(dir);
        let b = new Branch(this.end, newEnd);
        return b;
      }
      
      /**
      * generates a new Branch for the left-side
      */
      branchB(){
        let dir = this.end.copy().sub(this.begin);
        dir.rotate(-p.PI / 4);
        dir.mult(0.67);
        let newEnd = this.end.copy().add(dir);
        let b = new Branch(this.end, newEnd);
        return b;
      }
    }



    // ----------------------------------------------------------------------------------------------

    p.setup = function () {
      p.pixelDensity(1);
      p.frameRate(50);
      // p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL); // webgl
      p.createCanvas(window.innerWidth, window.innerHeight);

      p.background('#ffffff');
      console.log("sketch re-render");



      p.strokeWeight(3)
      // change the size of the data analyzer
      Player.changeFftSize(numBars*2);
      frequencyData = new Uint8Array(Player.getAnalyser().frequencyBinCount);

    };

    // ----------------------------------------------------------------------------------------------
    
    p.windowResized = function () {
      p.resizeCanvas(window.innerWidth, window.innerHeight);
    }

    // ----------------------------------------------------------------------------------------------

    p.mousePressed = function(){
      
    }

    p.draw = function () {
      p.background('#ffffff');



      if(typeof frequencyData != "undefined") {
        Player.getAnalyser().getByteFrequencyData(frequencyData);
        let spectrum = frequencyData;

        // var j = p.map(spectrum[2], 0, 255, 2, 3);

          let h = p.map(spectrum[10], 0, 255, 0, 12);
          let tree1 = new Tree(h, 100, p.displayWidth/3, p.height - p.height/3);
          tree1.draw();

          h = p.map(spectrum[40], 0, 255, 0, 12);
          let tree2 = new Tree(h, 100, p.displayWidth/3 + p.displayWidth/3, p.height- p.height/5);
          tree2.draw();


      }

    };


  };
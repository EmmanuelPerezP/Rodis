/**
* representing a Branch of the FractalTree
*/
export default class Branch{
  
    /**
    * create Branch with beginning and end-Point 
    * @param beging Startpoint
    * @param end Endpoint
    */
    constructor(p, begin, end){
      this.begin = begin;
      this.end = end;
      this.finished = false;
      this.p = p;
    }

    /**
    * displays the Branch
    */
    show(){
      this.p.stroke(50);
      this.p.line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
    
    /**
    * generates a new Branch for the right-side
    */
    branchA(){
      var dir = this.end.copy().sub(this.begin);
      dir.rotate(this.p.PI / 6);
      dir.mult(0.67);
      // dir.mult(.67);
      let newEnd = this.end.copy().add(dir);
      let b = new Branch(this.p, this.end, newEnd);
      return b;
    }
    
    /**
    * generates a new Branch for the left-side
    */
    branchB(){
      let dir = this.end.copy().sub(this.begin);
      dir.rotate(-this.p.PI / 4);
      dir.mult(0.67);
      let newEnd = this.end.copy().add(dir);
      let b = new Branch(this.p, this.end, newEnd);
      return b;
    }
  }
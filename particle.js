
function Particle(x,y){
  this.pos = createVector(x,y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  
  this.applyForce = function (force){
    //takes a vector force and accumulates it in acc
    acc.add(force);
  }
  
  this.update = function(){
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.acc.mult(0);
  }
  
  this.show = function(){
    point(this.pos.x,this.pos.y)
  }
  
}
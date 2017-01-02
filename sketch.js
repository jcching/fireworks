var fireworks=[];
var gravity;
var scaledVelocity;


function setup() {
  colorMode(HSB,255,255,255,255);
  createCanvas(window.innerWidth,window.innerHeight);
  scaledVelocity=window.innerHeight/40;
  gravity = createVector(0,0.2),
  background(0);
  stroke(255);
  strokeWeight(4);
  fireworks.push(new Firework());
}

function draw() {
  background(0,0,0,70);
  
  if(random(1)<0.1){
    //10%chance a new fw spawns in the next frame
    fireworks.push(new Firework());
  }
  
  for(var i=fireworks.length-1;i>=0;i--){
    fireworks[i].update();
    fireworks[i].show();
    if(fireworks[i].done()){
      fireworks.splice(i,1);
    }
  }
  
  drawDebug();

}

//fps counter
function drawDebug(){
  var fps=frameRate();
  stroke(255);
  strokeWeight(2);
  text("FPS:"+fps.toFixed(2),10,height-10);
  text("Fireworks:"+fireworks.length,10,height-25);
}


//custom firework
function Firework(){
  
  this.hu=random(255);
  
  //shoots up from a random place
  this.firework = new Particle(random(width),height);
  this.firework.hu=this.hu;
  this.exploded=false;
  
  this.sparkles=[];
  var sc =-1*scaledVelocity
  
  this.firework.vel=createVector(0,random(sc-1,sc+5));
  
  
  this.update=function(){
    if(!this.exploded){
      this.firework.applyForce(gravity);
      this.firework.update();
      
      if(this.firework.vel.y>=0){
        //it explodes if it's starting to fall
        this.exploded=true;
        this.explode();
      }
    }else{
      for(var i=this.sparkles.length-1;i>=0;i--){
        this.sparkles[i].applyForce(gravity);
        this.sparkles[i].update();
        if (this.sparkles[i].done()){
          this.sparkles.splice(i,1);
        }
      }
    }
    
    

  }
  
  this.done=function(){
    if(this.exploded&&this.sparkles.length===0){
      return true;
    }else{
      return false;
    }
  }
  
  this.explode=function(){
    for(var i=0;i<100;i++){
      var p = new Particle(this.firework.pos.x,this.firework.pos.y);
      p.vel=p5.Vector.random2D().mult(random(1,3));
      p.applyDrag(0.03);
      p.fade=true;
      p.hu=this.hu;
      this.sparkles.push(p);
    }
  }
  
  
  this.show=function(){
    if(!this.exploded){
      this.firework.show();
    }
    
    for(var i=0;i<this.sparkles.length;i++){
      this.sparkles[i].show();
    }
  }
}


//=====customparticles

function Particle(x,y){
  this.pos=createVector(x,y);
  this.vel=createVector(0,0);
  this.acc=createVector(0,0);
  this.drag=0;//drag viscosity of the air 1=max
  this.fade=false//when true, particle fades
  this.fadeTimer=255;
  this.hu=255;
  
  this.applyForce= function(force){
    this.acc.add(force);
    //this is an instantenous force
  }
  
  this.applyDrag=function(m){
    //this is a constant drag
    this.drag=m;
  }
  
  this.update=function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.vel.mult(1-this.drag);
    if(this.fade){
      this.fadeTimer-=4;
    }
  }
  
  this.show=function(){
    if(this.fade){
      stroke(this.hu,255,255, this.fadeTimer);
    }else{
      stroke(this.hu,255,255);
    }
    
    point(this.pos.x,this.pos.y);
    
  }
  
  this.done=function(){
    if(this.fadeTimer<0){
      return true;
    }else{
      return false;
    }
  }
  
  
  
}








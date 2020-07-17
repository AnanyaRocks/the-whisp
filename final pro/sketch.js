var player,playerImage,groundImage,obstaclesGroup,score;
var PLAY = 1;
var END=0;
var gameState=PLAY;
function preload (){
 playerImage=loadImage("fur.png") 
 groundImage=loadImage("planet3.png")
 backgroundImage=loadImage("nebula.jpg")
 obstaclesImage=loadImage("pink.png")
 fur23Image=loadImage("fur23.png")
 shampooImage=loadImage("shampoo.png")
 debrisImage=loadImage("NASA.png")
 satImage=loadImage("sattelite.png")
 meatImage=loadImage("meteor.png")
 poofImage=loadImage("poof.png")
 ribImage=loadImage("ribbon.png")
}
function setup() {

  score=0
  createCanvas(800,400);
  player=createSprite(100,80, 40, 40);
  player.addImage(playerImage);
  player.scale=0.18;
 // player.debug=true;
  player.setCollider("rectangle",0,0,350,440)
ground = createSprite(400,380,800,20);
ground.addImage(groundImage);
ground.x = ground.width/2;
ground.velocityX=-4
ground.scale=1.5;

 invisibleGround = createSprite(200,385,400,5);
invisibleGround.visible = false;
obstaclesGroup=new Group();
debrisGroup=new Group();
}

function draw() {
  background(backgroundImage); 
  background.velocityX=-8
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
  
    player.velocityY = player.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    player.collide(ground);
    spawnObstacles();
  spawnDebris();
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
   }
   if(debrisGroup.isTouching(player)){
    gameState = END;
}
  }
  else if (gameState === END) {
  
    
    player.addImage(poofImage); 
    //set velcity of each game object to 0
    ground.velocityX = 0;
    player.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    //cloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
   //trex.changeAnimation("collided",trex_collided);
    
  //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    //cloudsGroup.setLifetimeEach(-1);
    rib=createSprite(width/2,height/2,10,10);
    rib.addImage(ribImage);
   // if(mousePressedOver(restart)) {
    //  reset();
   // }
  }
  
  
  drawSprites();
  if (frameCount<400){
    textSize(20);
    fill("yellow");
  text("hello newbie now that you are entering this game ",20,30);
  text(" beware of its obstacles we all know that you dont",20,50);
  text(" have a limit to jump but jump to high the satlites",20,70);
  text("and rockets will kill you jump to low and the fumes",20,90);
  text("of the alien ang the brown fured virus wil kill you",20,110);
  text("there are many reasons to die just like real life but",20,130);
  text("we are born anyway so keep goin until you go poof",20,150);
  }
}
//function spawnClouds() {
 // write code here to spawn the clouds
 // drawSprites();
//}
function spawnObstacles(){
  if(frameCount % 60 === 0) {
    var obstacles = createSprite(800,215,10,40);
    //obstacle.debug = true;
    obstacles.velocityX = -6;
    var num = Math.round(random(1 ,3));
    switch(num){
      case 1:
    obstacles.addImage(obstaclesImage);
 break;
 case 2:
   obstacles.addImage(shampooImage);
   break;
   case 3:
     obstacles.addImage(fur23Image);
     obstacles.scale= 2;
     break;
    }
    
    obstacles.scale = 0.2;
    obstacles.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacles);
  }
}
function spawnDebris(){
  if(frameCount % 150 === 0) {
    var debris = createSprite(800,100,10,40);
    //obstacle.debug = true;
    debris.velocityX = -6;
    var num = Math.round(random(1 ,3));
    switch(num){
      case 1:
    debris.addImage(debrisImage);
 break;
 case 2:
   debris.addImage(satImage);
   debris.scale = 5
   break;
   case 3:
     debris.addImage(meatImage);
     debris.scale= 5;
     break;
    }
    
    debris.scale = 0.2;
    debris.lifetime = 300;
    //add each obstacle to the group
    debrisGroup.add(debris);
  }
}
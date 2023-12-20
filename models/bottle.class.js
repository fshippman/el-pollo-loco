class Bottle extends MovableObject {
    x = 400;  //2100 max x!
    y = 350 ;
    offsetXL = 33 //33
    offsetXR = 15 //15
    offsetYU = 15 //15
    offsetYD = 10 //10
    height = 80; 
    width = 80;
    bottle_sound = new Audio('assets/audio/bottle.mp3');
  
    constructor(x) {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png' );
        // 'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        
       
        this.x = x;
        
    }

  //world.gameIsRunning


}  
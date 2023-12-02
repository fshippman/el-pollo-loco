class Bottle extends MovableObject {
    x = 400;  //2100 max x!
    y = 350 ;
    offsetXL = 20 //25
    offsetXR = 20  //35
    offsetYU = 15 //120
    offsetYD = 25 //30
    height = 80; 
    width = 80;
    
  
    constructor(x) {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png' );
        // 'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        
       
        this.x = x;
        
    }

  


}  
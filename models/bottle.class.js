class Bottle extends MovableObject {
    x = 400;  //2100 max x!
    y = 350 ;
    offsetXL = 30 //25
    offsetXR = 35  //35
    offsetYU = 15 //120
    offsetYD = 25 //30
    height = 80; 
    width = 80;
    
  
    constructor(x) {
        super().loadImage('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png' );
        // 'assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        
        console.log('test')
        this.x = x;
        
    }

  


}  
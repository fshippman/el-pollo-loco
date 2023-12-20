class Coin extends MovableObject {
  height = 120;
  width = 120;
  offsetXL = 50 //25
  offsetXR = 50   //35
  offsetYU = 80 //120
  offsetYD = 80 //30
//coin_sound = 
    constructor(x) {
        super().loadImage('assets/img/8_coin/coin_1.png');
        // this.loadImages(this.BOTTLE_ANIMATION);
        // this.animate() 
       
        this.x = x
        this.y = 50 + Math.random() * 250;
      }

     
}
class Bottle extends MovableObject {
  x = 400; //2100 max x!
  y = 350; // 350
  offsetXL = 33 //33
  offsetXR = 15 //15
  offsetYU = 15 //15
  offsetYD = 10 //10
  height = 80;
  width = 80;
  


  BOTTLE_ANIMATION = [
    './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'

  ];

  constructor(x) {
    super().loadImage('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.BOTTLE_ANIMATION);
    this.animate() 
    this.x = x;
  }

  animate() {
    setInterval(() => {
        // if (world.gameIsRunning) {
          this.playAnimation(this.BOTTLE_ANIMATION)
        // }
    }, 1000);
}

  //world.gameIsRunning


}
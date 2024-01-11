class Bottle extends MovableObject {
  x = 400;
  y = 350;
  offsetXL = 33 //The horizontal offset on the left side.
  offsetXR = 15 //The horizontal offset on the right side.
  offsetYU = 15 //The vertical offset on the upper side.
  offsetYD = 10 //The vertical offset on the lower side.
  height = 80;
  width = 80;



  BOTTLE_ANIMATION = [
    './assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    './assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];


  /**
   * Creates a new instance of the salsa bottle.
   * It loads the initial image and animation frames, and starts the animation.
   * @param {number} x - The x-coordinate for the bottle's initial position.
   */
  constructor(x) {
    super().loadImage('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    this.loadImages(this.BOTTLE_ANIMATION);
    this.animate();
    this.x = x;
  }


  /**
   * Animates the salsa bottle.
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.BOTTLE_ANIMATION);
    }, 1000);
  }
}
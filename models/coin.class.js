class Coin extends MovableObject {
    height = 120;
    width = 120;
    offsetXL = 30 //25
    offsetXR = 30 //35
    offsetYU = 30 //120
    offsetYD = 30 //30
   


    COIN_ANIMATION = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ]

        constructor(x) {
            super().loadImage('./assets/img/8_coin/coin_1.png');
            this.loadImages(this.COIN_ANIMATION)
            this.x = x
            this.y = 50 + Math.random() * 250;
            this.animate() 
        }

        animate() {
            setInterval(() => {
                // if (world.gameIsRunning) {
                  this.playAnimation(this.COIN_ANIMATION)
                // }
               
               
            }, 500);
        }
}
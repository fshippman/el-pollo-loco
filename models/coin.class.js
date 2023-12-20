class Coin extends MovableObject {
    height = 120;
    width = 120;
    offsetXL = 30 //25
    offsetXR = 30 //35
    offsetYU = 30 //120
    offsetYD = 30 //30
    coin_sound = new Audio('assets/audio/coin.mp3');

        constructor(x) {
            super().loadImage('assets/img/8_coin/coin_1.png');
            // this.loadImages(this.BOTTLE_ANIMATION);
            // this.animate() 

            this.x = x
            this.y = 50 + Math.random() * 250;
        }


}
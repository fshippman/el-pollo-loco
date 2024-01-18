class Coin extends MovableObject {
    height = 120;
    width = 120;
    offsetXL = 30 //The horizontal offset on the left side.
    offsetXR = 30 //The horizontal offset on the right side.
    offsetYU = 30 //The vertical offset on the upper side.
    offsetYD = 30 //The vertical offset on the lower side.

    COIN_ANIMATION = [
        './assets/img/8_coin/coin_1.png',
        './assets/img/8_coin/coin_2.png'
    ]


    /**
     * Constructs a new Coin instance.
     * Initializes the coin with an animation sequence and sets its position.
     * The x-coordinate is provided as a parameter, while the y-coordinate is randomly generated within a specified range.
     *
     * @param {number} x - The x-coordinate for the coin's initial position.
     */
    constructor(x) {
        super().loadImage('./assets/img/8_coin/coin_1.png');
        this.loadImages(this.COIN_ANIMATION)
        this.x = x
        this.y = 50 + Math.random() * 250;
        this.animate()
    }


    /**
     * Manages the coin's animation.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN_ANIMATION)
        }, 500);
    }
    
}
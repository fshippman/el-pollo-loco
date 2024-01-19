class Cloud extends MovableObject {
    x = Math.random() * 2800
    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;


    /**
     * Constructs a new Cloud instance.
     * Initializes the cloud with an image, sets a random speed for movement, and starts the animation.
     * The initial position is randomly determined along the x-axis, and a fixed position is set on the y-axis.
     */
    constructor() {
        super();
        this.loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.speed = 0.15 + Math.random() * 0.15;
        this.animate();
    }


    /**
     * Manages the cloud's continuous movement.
     * This method sets an interval to move the cloud to the left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}
class SmallChicken extends MovableObject {
    y = 378;
    height = 40;
    width = 50;
    offsetXL = 5  //The horizontal offset on the left side.
    offsetXR = 7  //The horizontal offset on the right side.
    offsetYU = 4  //The vertical offset on the upper side.
    offsetYD = 10 //The vertical offset on the lower side.

    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        './assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];


    /**
     * Constructs a new SmallChicken instance.
     * Initializes the small chicken with walking and death animations, sets its position, speed, and attack damage.
     * The position is randomly generated within a specified range.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD)
        this.thisRightOffset = this.offsetXR;
        this.thisLeftOffset = this.offsetXL;
        this.x = 400 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25;
        this.attackDamage = 2;
    }


    /**
     * Controls the overall animation and movement of the small chicken.
     * This method calls other methods to handle the chicken's movement and animation separately.
     */
    animate() {
        this.handleSmallChickenMovement();
        this.handleSmallChickenAnimation();
    }


    /**
     * Handles the movement of the small chicken.
     * This method sets an interval to continuously move the chicken to the left if the game is running.
     */
    handleSmallChickenMovement() {
        setInterval(() => {
            if (world.gameIsRunning) {
                this.moveLeft();
            }

        }, 1000 / 60);
    }


    /**
     * Manages the animation state of the small chicken.
     * This method sets an interval to update the chicken's animation based on its energy level.
     * It plays the death animation if the chicken is out of energy, otherwise it plays the walking animation.
     */
    handleSmallChickenAnimation() {
        setInterval(() => {
            if (world.gameIsRunning) {
                if (this.energy == 0) {
                    this.playAnimation(this.IMAGE_DEAD);
                } else {
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }

        }, 200)
    }

}
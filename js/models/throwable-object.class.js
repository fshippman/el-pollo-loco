class ThrowableObject extends MovableObject {
    offsetYU = 10 //10; // offset for hitbox from top
    offsetYD = 10 //20; // offset for hitbox from bottom
    offsetXR = 10 //20; // offset for hitbox from right
    offsetXL = 10 //10; // offset for hitbox from left

    BOTTLE_ROTATION_IMAGES = [
        './assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLE_SPLASH_IMAGES = [
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];


    /**
     * Constructs a new ThrowableObject instance, specifically for a throwable bottle in the game.
     * Initializes the throwable bottle with images for rotation and splash animations.
     * Sets the initial position, dimensions, and attack damage of the bottle.
     * 
     * @param {number} x - The x-coordinate for the bottle's initial position.
     * @param {number} y - The y-coordinate for the bottle's initial position.
     */
    constructor(x, y) {
        super().loadImage('./assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);
        this.x = x
        this.y = y
        this.height = 70;
        this.width = 70;
        this.attackDamage = 15;
    }


    /**
     * Initiates the throwing action for the object.
     * This method sets the initial vertical speed for an upward trajectory, applies gravity for a realistic flight arc,
     * and sets the horizontal flight speed. The movement is determined based on the direction the object is thrown.
     * The method also starts the animation for the object.
     *
     * @param {boolean} otherDirection - Determines the horizontal direction of the throw.
     *                                    If true, the object is thrown to the left; if false, it is thrown to the right.
     */
    throw (otherDirection) {
        this.speedY = 12; // Sets the initial vertical speed for the upward trajectory
        this.applyGravity(); // Applies gravity to create a realistic flight arc
        // Sets the horizontal flight speed
        setInterval(() => {
            if (!this.bottleCollision) {
                if (!otherDirection) {
                    this.x += 5; // Moves the object to the right
                } else {
                    this.x -= 5; // Moves the object to the left
                }
            }
        }, 1000 / 60);
        this.animate(); // Starts the animation for the object
    }


    /**
     * Manages the animation of the bottle object.
     * This method sets an interval to continuously update the bottle's animation based on its current state.
     * If the bottle has collided, it plays the splash animation. Otherwise, it plays the rotation animation.
     * The animation updates only occur if the game is running.
     */
    animate() {
        setInterval(() => {
            if (world.gameIsRunning) {
                if (this.bottleCollision) {
                    this.playAnimation(this.BOTTLE_SPLASH_IMAGES)
                } else if (!this.bottleCollision) {
                    this.playAnimation(this.BOTTLE_ROTATION_IMAGES)
                }
            }
        }, 100);
    }


    /**
     * Checks if the object has hit the ground.
     * This method compares the object's vertical position (y-coordinate) and its height to a ground level value.
     * It returns true if the object's position indicates that it has reached or surpassed the ground level.
     *
     * @returns {boolean} True if the object has hit the ground; otherwise, false.
     */
    hitsGround() {
        return this.y > 300 + this.height
    }


    /**
     * Executes the visual and auditory effects of a bottle smashing.
     * This method plays the bottle smash sound, marks the bottle as collided, and removes the bottle from the throwable objects
     * array after a short delay, simulating the bottle's destruction.
     *
     * @param {ThrowableObject[]} throwableObjects - The array of throwable objects in the game.
     * @param {number} index - The index of the bottle in the throwableObjects array that is to be smashed.
     */
    showBottlesmash(throwableObjects, index) {
        playBottlesmashSound();
        this.bottleCollision = true;
        setTimeout(() => throwableObjects.splice(index, 1), 500);
    }


   


}
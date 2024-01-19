class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 70;
    offsetXL = 2 //The horizontal offset on the left side.
    offsetXR = 4 //The horizontal offset on the right side.
    offsetYU = 5 //The vertical offset on the upper side.
    offsetYD = 17 //The vertical offset on the lower side.

    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = ['./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png']


    /**
     * Constructs a new Chicken instance.
     * Initializes the chicken with walking and death animations, sets its position, speed, and attack damage.
     * The position is randomly determined within a certain range to add variation in gameplay.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD)
        this.thisRightOffset = this.offsetXR;
        this.thisLeftOffset = this.offsetXL;
        this.x = 400 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.25; //0.25
        this.attackDamage = 5; //5?
    }


    /**
     * Orchestrates the overall animation and movement of the chicken.
     * Calls methods to separately manage the chicken's movement and animation state.
     */
    animate() {
        this.handleChickenMovement();
        this.handleChickenAnimation();
    }


    /**
     * Manages the movement of the chicken.
     * Sets an interval to continuously move the chicken to the left if the game is active, simulating enemy approach behavior.
     */
    handleChickenMovement() {
        setInterval(() => {
            if (world.gameIsRunning) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
     * Controls the animation state of the chicken.
     * Sets an interval to update the chicken's animation depending on its energy level.
     * Displays the death animation if the chicken is out of energy, or walking animation otherwise.
     */
    handleChickenAnimation() {
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
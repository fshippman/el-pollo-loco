class Character extends MovableObject {
    y = 150;
    height = 280;
    width = 107;
    offsetXL = 15; //The horizontal offset on the left side.
    offsetXR = 30; //The horizontal offset on the right side.
    offsetYU = 110; //The vertical offset on the upper side.
    offsetYD = 15; //The vertical offset on the lower side.
    speed = 5;
    currentImage = 0;
    inventoryCounter = 0;
    inventoryMax = 8;
    coinInventory = 0;
    coinMax = 15;
    isIdle = false;
    idleTimer;
    world;
    character;

    IMAGES_IDLE = [
        './assets/img/2_character_pepe/1_idle/idle/I-1.png',
        './assets/img/2_character_pepe/1_idle/idle/I-2.png',
        './assets/img/2_character_pepe/1_idle/idle/I-3.png',
        './assets/img/2_character_pepe/1_idle/idle/I-4.png',
        './assets/img/2_character_pepe/1_idle/idle/I-5.png',
        './assets/img/2_character_pepe/1_idle/idle/I-6.png',
        './assets/img/2_character_pepe/1_idle/idle/I-7.png',
        './assets/img/2_character_pepe/1_idle/idle/I-8.png',
        './assets/img/2_character_pepe/1_idle/idle/I-9.png',
        './assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        './assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        './assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_WALKING = [
        './assets/img/2_character_pepe/2_walk/W-21.png',
        './assets/img/2_character_pepe/2_walk/W-22.png',
        './assets/img/2_character_pepe/2_walk/W-23.png',
        './assets/img/2_character_pepe/2_walk/W-24.png',
        './assets/img/2_character_pepe/2_walk/W-25.png',
        './assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        './assets/img/2_character_pepe/3_jump/J-31.png',
        './assets/img/2_character_pepe/3_jump/J-32.png',
        './assets/img/2_character_pepe/3_jump/J-33.png',
        './assets/img/2_character_pepe/3_jump/J-34.png',
        './assets/img/2_character_pepe/3_jump/J-35.png',
        './assets/img/2_character_pepe/3_jump/J-36.png',
        './assets/img/2_character_pepe/3_jump/J-37.png',
        './assets/img/2_character_pepe/3_jump/J-38.png',
        './assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        './assets/img/2_character_pepe/4_hurt/H-41.png',
        './assets/img/2_character_pepe/4_hurt/H-42.png',
        './assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-52.png',
        './assets/img/2_character_pepe/5_dead/D-53.png',
        './assets/img/2_character_pepe/5_dead/D-54.png',
        './assets/img/2_character_pepe/5_dead/D-55.png',
        './assets/img/2_character_pepe/5_dead/D-51.png',
        './assets/img/2_character_pepe/5_dead/D-57.png'
    ];


    /**
     * Constructs a new Character instance.
     * Loads the initial image and various animations for the character, applies gravity, and initializes the throwing timer.
     */
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0])
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
    }


    /**
     * Checks if there is space available in the character's inventory.
     * @returns {boolean} Returns true if the inventory counter is less than the maximum inventory capacity.
     */
    checkInventorySpace() {
        return this.inventoryCounter < this.inventoryMax;
    }


    /**
     * Calculates the current percentage of the inventory filled.
     * @returns {number} The filled percentage of the inventory based on the current and maximum inventory count.
     */
    calculateInventoryPercentage() {
        return (this.inventoryCounter / this.inventoryMax) * 100;
    }


    /**
     * Calculates the current percentage of coins collected.
     * @returns {number} The filled percentage of the coin inventory based on the current and maximum coin count.
     */
    calculateCoinPercentage() {
        return (this.coinInventory / this.coinMax) * 100;
    }


    /**
     * Main animation loop for the character.
     * Regularly updates the character's state based on game conditions and controls character animations.
     */
    animate() {
        setInterval(() => {
            if (world.gameIsRunning) {
                pauseWalkingSound();
                this.controlKeyboardActions();
                this.playSleepingSound();
                this.triggerBossMusic();
                this.triggerGameOverScreen();
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60)
        setInterval(() => {
            this.animateCharacter();
            this.resetCharacterSpeedY();
        }, 200)
    }

    /**
     * This function reset the vertical speed of the character if it is -21
     * 
     */
    resetCharacterSpeedY() {
        if (this.speedY == -21) {
            this.speedY = 0
        }
    }

    /**
     * Controls the character's actions based on keyboard inputs.
     * It handles movement to the right, left, and jumping, as well as setting the idle status.
     */
    controlKeyboardActions() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.end_x) {
            this.jumpOrMoveRight();
        }
        if (this.world.keyboard.LEFT && this.x > this.world.level.start_x) {
            this.jumpOrMoveLeft();
        }
        if (this.world.keyboard.D) {
            this.setStatusIdle(false);
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.characterJumps();
        }
    }


    /**
     * Handles the character's movement to the right.
     * This method includes logic for both jumping and walking movements to the right, and plays the appropriate sound effects.
     */
    jumpOrMoveRight() {
        this.setStatusIdle(false);
        stopSleepingSound();
        if (this.isAboveGround()) {
            this.jumpingSpeed();
            this.moveCharacterRight();
        } else {
            this.walkingSpeed();
            this.moveCharacterRight();
            playWalkingSound();
        }
    }


    /**
     * Moves the character to the right.
     * This method updates the character's position to the right and sets the facing direction accordingly.
     */
    moveCharacterRight() {
        this.moveRight();
        this.otherDirection = false;
    }


    /**
     * Handles the character's movement to the left.
     * This method includes logic for both jumping and walking movements to the left and plays the appropriate sound effects.
     * It sets the character's status to not idle, stops any sleeping sound, and then either jumps or moves left based on the character's position relative to the ground.
     */
    jumpOrMoveLeft() {
        this.setStatusIdle(false);
        stopSleepingSound();
        if (this.isAboveGround()) {
            this.jumpingSpeed();
            this.moveCharacterLeft();
        } else {
            this.walkingSpeed();
            this.moveCharacterLeft();
            playWalkingSound();
        }
    }


    /**
     * Moves the character to the left.
     * This method updates the character's position to the left and sets the facing direction accordingly.
     * The 'otherDirection' property is set to true to indicate that the character is facing or moving towards the left.
     */
    moveCharacterLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }


    /**
     * Sets the character's speed when jumping.
     */
    jumpingSpeed() {
        this.speed = 4;
    }


    /**
     * Sets the character's speed when walking.
     */
    walkingSpeed() {
        this.speed = 4;
    }


    /**
     * Handles the character's jumping action.
     * This method sets the character's status to not idle, stops any sleeping sound, initiates the jumping action, and plays the jumping sound.
     * It is typically called in response to a specific user input, like pressing the jump key.
     */
    characterJumps() {
        this.setStatusIdle(false);
        stopSleepingSound();
        this.jump();
        playJumpingSound();
    }


    /**
     * Plays the sleeping sound effect if certain conditions are met.
     * This method checks if the character is in an idle state for a sufficient duration and the game is currently running.
     * If both conditions are true, it plays the sleeping sound effect.
     */
    playSleepingSound() {
        if (this.idleTime() && this.world.gameIsRunning) {
            playSleepingSound();
        }
    }


    /**
     * Triggers the boss music when the character reaches a specific location.
     */
    triggerBossMusic() {
        if (this.x > 2100) {
            playBossMusic();
        }
    }


    /**
     * Triggers the game over screen when the character is dead and the game is still running.
     * This method checks if the character is dead and if the game hasn't been stopped yet.
     * If both conditions are true, it sets a timeout to stop the game and display the game over screen after a brief delay.
     */
    triggerGameOverScreen() {
        if (this.isDead() && this.world.gameIsRunning) {
            setTimeout(() => {
                world.gameIsRunning = false;
                stopGameLose();
            }, 1000);
        }
    }


    /**
     * Manages the character's animations based on its current state and actions.
     * This method updates the character's animation depending on various conditions like death, injury, jumping, walking, or being idle.
     * It checks if the game is running and then applies the appropriate animation from the predefined sets.
     */
    animateCharacter() {
        if (world.gameIsRunning) {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                playHitSound();
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playIdleAnimations();
            }
        }
    }


    /**
     * Manages the character's idle animations.
     * This method orchestrates the playing of both short and long idle animations based on the character's state.
     */
    playIdleAnimations() {
        this.shortIdleAnimation();
        this.longIdleAnimation();
    }


    /**
     * Triggers the short idle animation for the character.
     * This method checks if no keys are pressed and if the character is not already idle.
     * If the character is not idle, it sets the idle timer and stops any sleeping sound.
     * Then, it changes the character's status to idle and plays the short idle animation.
     */
    shortIdleAnimation() {
        if (this.noKeyPressed()) {
            if (!this.isIdle) {
                this.setIdleTimer();
                stopSleepingSound();
            }
            this.setStatusIdle(true);
            this.playAnimation(this.IMAGES_IDLE);
        }
    }


    /**
     * Checks if no movement or action keys are currently pressed.
     * @returns {boolean} True if no key is pressed, otherwise false.
     */
    noKeyPressed() {
        return !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE &&
            !this.world.keyboard.D;
    }


    /**
     * Sets the idle timer for the character.
     * This method records the current time to mark the beginning of the character's idle state.
     * The recorded time is used to determine the duration of the character's idle state later on.
     */
    setIdleTimer() {
        this.idleTimer = new Date().getTime();
    }


    /**
     * Sets the idle status of the character.
     * This method updates the character's idle state based on the given status.
     * @param {boolean} status - The idle status to set for the character. True means the character is idle, false otherwise.
     */
    setStatusIdle(status) {
        this.isIdle = status;
    }


    /**
     * Triggers the long idle animation for the character.
     * This method checks if the character has been idle for a sufficient duration using the idleTime method.
     * If the character has been idle long enough, it plays the long idle animation sequence.
     */
    longIdleAnimation() {
        if (this.idleTime()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }


    /**
     * Calculates if the character has been idle for a specified duration.
     * This method computes the time elapsed since the idleTimer was set and checks if it exceeds a certain threshold.
     * @returns {boolean} True if the character has been idle for more than 10 seconds, otherwise false.
     */
    idleTime() {
        let timepassed = new Date().getTime() - this.idleTimer;
        timepassed = timepassed / 1000;
        return timepassed > 10;
    }
    
}
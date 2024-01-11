class Endboss extends MovableObject {
    y = 45;
    height = 410;
    width = 260;
    offsetXL = 30; //The horizontal offset on the left side.
    offsetXR = 40; //The horizontal offset on the right side.
    offsetYU = 160; //The vertical offset on the upper side.
    offsetYD = 15; //The vertical offset on the lower side.
    deadAnimation;
    hadFirstEndbossContact = false;
    endfightStart = false;

    IMAGES_WALKING = [
        './assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        './assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        './assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        './assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        './assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        './assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        './assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        './assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        './assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    /**
     * Constructs a new Endboss instance.
     * Initializes the endboss with various animations, sets its position and speed, and configures the initial animation state.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 0.02;
        this.x = 2400;
        this.thisRightOffset = this.offsetXR;
        this.thisLeftOffset = this.offsetXL;
        this.deadAnimation = false;
        this.attackDamage = 100;
    }


    /**
     * Manages the animation sequence of the endboss.
     * This method uses a loop to handle different animation states based on the game situation and the endboss's condition.
     */
    animate() {
        let i = 0
        setInterval(() => {
            if (world.gameIsRunning) {
                this.handleEndbossAnimation(i)
                i++;
                if (world.character.x > 2100 && !this.hadFirstEndbossContact) {
                    i = 0
                    this.hadFirstEndbossContact = true
                }
            }
        }, 200)
    }

    // setEndbossContactTrue(i) {

    // }

    /**
     * Handles the endboss's animation based on its current state.
     * Chooses different animation sequences depending on whether the endboss is hurt, dead, in an alert state, or in an attack sequence.
     */
    handleEndbossAnimation(i) {
        if (this.isHurt() && this.energy < 100 && this.energy > 50) {
            this.firstBossHurtAnimations();
        } else if (this.isHurt() && this.energy < 49 && !this.isDead()) {
            this.secondBossHurtAnimations()
        } else if (this.isDead() && !this.deadAnimation) {
            this.playDeadBossAnimation();
        } else if (!this.isDead() && !this.hadFirstEndbossContact) {
            this.playAnimation(this.IMAGES_ALERT);
        } else {
            this.playBossSequence(i);
            this.startEndfight(i);
        }
    }


    /**
     * Plays the endboss's sequence.
     * This method is triggered during the initial phase of the endboss encounter.
     */
    playBossSequence(i) {
        if (i < 20 && this.hadFirstEndbossContact) {
            this.playAnimation(this.IMAGES_ATTACK);
            world.level.end_x = 2140
            world.level.start_x = 2138
        }
    }


    /**
     * Initiates the final battle with the endboss.
     * This method sets the stage for the endfight, adjusting level boundaries and starting the endboss's walking animation.
     */
    startEndfight(i) {
        if (i > 20 && this.hadFirstEndbossContact && !this.isDead()) {
            world.level.end_x = 2200
            world.level.start_x = -600
            this.endfightStart = true
            this.speed = 0.02;
            this.playAnimation(this.IMAGES_WALKING)
            this.walkingBoss();
        }
    }


    /**
     * Manages the walking movement of the endboss.
     * Sets an interval for the endboss to move left.
     */
    walkingBoss() {
        setInterval(() => {
            if (world.gameIsRunning) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
     * Plays the first kind of hurt animation sequence for the endboss.
     * Triggered when the endboss's energy is between certain thresholds.
     */
    firstBossHurtAnimations() {
        this.playAnimation(this.IMAGES_ATTACK)
        this.stopBoss();
    }


    /**
     * Plays the second kind of hurt animation sequence for the endboss.
     * Triggered when the endboss's energy drops below a certain threshold.
     */
    secondBossHurtAnimations() {
        this.playAnimation(this.IMAGES_HURT)
        this.stopBoss();
    }


    /**
     * Stops the endboss's movement and resets certain flags.
     * Used when the endboss is playing a hurt or dead animation.
     */
    stopBoss() {
        this.stopWalking();
        this.deadAnimation = false;
    }

    /**
     * Plays the dead animation for the endboss.
     * This method is triggered when the endboss is defeated, leading to the end of the game.
     */
    playDeadBossAnimation() {
        this.playAnimation(this.IMAGES_DEAD)
        this.stopWalking();
        setTimeout(() => {
            this.deadAnimation = true;
            world.gameIsRunning = false;
            stopGameWin();
        }, 400);
    }


}
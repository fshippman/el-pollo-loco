class Character extends MovableObject {
    y = 150;
    height = 280;
    width = 107;
    offsetXL = 15;
    offsetXR = 30;
    offsetYU = 110;
    offsetYD = 15;
    speed = 5;
    currentImage = 0;
    inventoryCounter = 0;
    inventoryMax = 8;
    coinInventory = 0;
    coinMax = 15;
    isIdle = false;
    idleTimer;
    throwTimePassed;
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

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0])
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.setThrowingTimer();
    }

    playGameSound() {
        GAME_MUSIC.play();
        GAME_MUSIC.loop = true;
        checkSoundStatus(GAME_MUSIC);
    }

    playThrowingSound() {
        THROWING_SOUND.play();
    }

    setStatusbar() {
        this.statusbar.character = this;
    }

    moveCharacterLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }

    moveCharacterRight() {
        this.moveRight();
        this.otherDirection = false;
    }

    noKeyPressed() {
        return !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.world.keyboard.UP &&
            !this.world.keyboard.DOWN &&
            !this.world.keyboard.SPACE &&
            !this.world.keyboard.D;
    }

    setStatusIdle(status) {
        this.isIdle = status;
    }

    setIdleTimer() {
        this.idleTimer = new Date().getTime();
    }

    idleTime() {
        let timepassed = new Date().getTime() - this.idleTimer; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed > 10; //nach 10 Sekunden --> return gibt true aus
    }

    setThrowingTimer() {
        this.throwingTime = new Date().getTime();
    }

    throwTime() {
        let throwTimePassed = new Date().getTime() - this.throwingTime; // Difference in ms
        throwTimePassed = throwTimePassed / 1000; // Difference in s
        return throwTimePassed > 3; //nach 10 Sekunden --> return gibt true aus
    }


    checkInventorySpace() {
        return this.inventoryCounter < this.inventoryMax;
    }

    calculateInventoryPercentage() {
        return (this.inventoryCounter / this.inventoryMax) * 100;
    }

    calculateCoinPercentage() {
        return (this.coinInventory / this.coinMax) * 100;
    }

    playIdleAnimations() {
        this.shortIdleAnimation();
        this.longIdleAnimation();
    }

    shortIdleAnimation() {
        if (this.noKeyPressed()) {
            if (!this.isIdle) {
                this.setIdleTimer();
                this.stopSleepingSound();
            }
            this.setStatusIdle(true);
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    longIdleAnimation() {
        if (this.idleTime()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        }
    }

    stopSleepingSound() {
        SLEEPING_SOUND.pause();
        SLEEPING_SOUND.currentTime = 0;
    }

    jumpingSpeed() {
        this.speed = 1;
    }

    walkingSpeed() {
        this.speed = 4;
    }

    characterJumps() {
        this.setStatusIdle(false);
        this.stopSleepingSound();
        this.jump();
        JUMPING_SOUND.play();
    }

    triggerBossMusic() {
        GAME_MUSIC.pause();
        BOSS_MUSIC.play();
        BOSS_MUSIC.loop = true;
        checkSoundStatus(BOSS_MUSIC);
    }

    animateCharacter() {
        if (world.gameIsRunning) {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                HIT_SOUND.play();
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

    jumpOrMoveLeft() {
        this.setStatusIdle(false);
        this.stopSleepingSound();
        if (this.isAboveGround()) {
            this.jumpingSpeed();
            this.moveCharacterLeft();
        } else {
            this.walkingSpeed();
            this.moveCharacterLeft();
            WALKING_SOUND.play();
        }
    }

    jumpOrMoveRight() {
        this.setStatusIdle(false);
        this.stopSleepingSound();
        if (this.isAboveGround()) {
            this.jumpingSpeed();
            this.moveCharacterRight();
        } else {
            this.walkingSpeed();
            this.moveCharacterRight();
            WALKING_SOUND.play();
        }
    }

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

   
    controlCharacterActions(){
        this.controlKeyboardActions();
        if (this.idleTime() && this.world.gameIsRunning) {
            SLEEPING_SOUND.play();
        }
        if (this.x > 2100) {
            this.triggerBossMusic();
        }
        if (this.isDead() && this.world.gameIsRunning) {
            setTimeout(() => {
                world.gameIsRunning = false;
                stopGameLose();
            }, 1000);
        }
    }

    animate() {
        setInterval(() => {
            if (world.gameIsRunning) {
                WALKING_SOUND.pause();
                this.controlCharacterActions();
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60)

        setInterval(() => {
            this.animateCharacter();
        }, 150)
    }
}
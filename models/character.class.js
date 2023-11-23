class Character extends MovableObject {
    y = 150; //160
    height = 280; //270
    width = 107;
    offsetXL = 0 //25
    offsetXR = 0 //35
    offsetYU = 0 //120
    offsetYD = 0 //30
    speed = 10;
    currentImage = 0;
    inventoryCounter = 0;
    inventoryMax = 8;
    isIdle = false;
    idleTimer;


    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    //IMAGES_WALKING[0] lädt Bild 0
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    world;

    game_music = new Audio('assets/audio/music.mp3');
    boss_music = new Audio('assets/audio/boss_music.mp3'); //BOSS MUSIC attribution https://freesound.org/people/FoolBoyMedia/sounds/530064/
    walking_sound = new Audio('assets/audio/running.mp3');
    jumping_sound = new Audio('assets/audio/jump.mp3');
    sleeping_sound = new Audio('assets/audio/sleep.mp3');
    // new Audio('audio/bottle.mp3') 

    character;

    //Dadurch dass wir nen neuen Charakter erstellen wird loadimages aufgerufen 
    // super muss nur einmal gemacht werden danach kann man this sagen
    // von movable object wird loadimage aufgerufen
    constructor() {
        super().loadImage(this.IMAGES_IDLE[0])
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.applyGravity();
        // this.playGameSound();

    }

    playGameSound() {
        // this.game_music.muted = true 
        // this.game_music.muted = false 
        this.game_music.volume = 0.5;
        this.game_music.play();
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
            !this.world.keyboard.D
    }

    setStatusIdle(status) {
        this.isIdle = status;
    }

    setIdleTimer() {
        this.idleTimer = new Date().getTime();
    }

    idleTime() {
        let timepassed = new Date().getTime() - this.idleTimer; // Difference in ms
        timepassed = timepassed / 1000 // Difference in s
        return timepassed > 10; //nach 10 Sekunden --> return gibt true aus
    }

    /**
     * This function checks if inventory space is left
     * 
     * @returns boolean (true if yes, false if not)
     */
    checkInventorySpace() {
        return this.inventoryCounter < this.inventoryMax;
    }

    calculateInventoryPercentage() {
        return (this.inventoryCounter / this.inventoryMax) * 100
        // inventory.lenght
        // inventory[0, 1, 2, 3, 4, 5]
        // maxBottle = 8;
        // inv > max
        //  1/8 * 100
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
        this.sleeping_sound.pause();
        this.sleeping_sound.currentTime = 0;
    }

    //jede Sekunde ändert sich die Grafik
    animate() {

        setInterval(() => {
            // console.log(this.isIdle)
            // this.playGameSound();

            this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.setStatusIdle(false);
                this.stopSleepingSound();
                if (this.isAboveGround()) {
                    this.moveCharacterRight();
                } else {
                    this.moveCharacterRight();
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > this.world.level.level_start_x) {
                this.setStatusIdle(false);
                this.stopSleepingSound();
                if (this.isAboveGround()) {
                    this.moveCharacterLeft();
                } else {
                    this.moveCharacterLeft();
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.setStatusIdle(false);
                this.stopSleepingSound();
                this.jump();
                this.jumping_sound.play();
            }

            if (this.idleTime()) {
                this.sleeping_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)


        // modulu = hebt Rest auf
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD)
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playIdleAnimations();
            }
        }, 150) //50
    }
}



// GAME MUSIC optional choices https://freesound.org/people/joshuaempyre/sounds/251461/ 2https://freesound.org/people/OFresco/sounds/567440/
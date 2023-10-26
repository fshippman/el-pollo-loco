class Character extends MovableObject {
    y = 160; //160
    height = 270;
    width = 110;
    speed = 10;
    currentImage = 0;
    //IMAGES_WALKING[0] lädt Bild 0
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    world;
    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3')
    // new Audio('audio/bottle.mp3')



    //Dadurch dass wir nen neuen Charakter erstellen wird loadimages aufgerufen 
    // super muss nur einmal gemacht werden danach kann man this sagen
    // von movable object wird loadimage aufgerufen
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.animate();
        this.applyGravity();
    }

    moveCharacterLeft() {
        this.moveLeft();
        this.otherDirection = true;
    }

    moveCharacterRight() {
        this.moveRight();
        this.otherDirection = false;
    }

    //jede Sekunde ändert sich die Grafik
    animate() {

        setInterval(() => {
            this.walking_sound.pause();

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                if (this.isAboveGround()) {
                    this.moveCharacterRight();
                } else {
                   this.moveCharacterRight();
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                if (this.isAboveGround()) {
                    this.moveCharacterLeft();
                } else {
                    this.moveCharacterLeft();
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
                this.jumping_sound.play();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        // modulu = hebt Rest auf
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING)
                }
            }
        }, 50)
    }
}
class ThrowableObject extends MovableObject {
    // speedY = 30;
    // speedX = 20
    offsetYU = 10 //10; // offset for hitbox from top
    offsetYD = 10 //20; // offset for hitbox from bottom
    offsetXR = 10 //20; // offset for hitbox from right
    offsetXL = 10 //10; // offset for hitbox from left

    bottle_smash_sound = new Audio('assets/audio/bottlesmash.mp3')

    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        this.loadImages(this.BOTTLE_SPLASH_IMAGES);
        this.x = x
        this.y = y
        this.height = 70;
        this.width = 70;
        this.attackDamage = 15; //DO NOT CHANGE!

    }

    BOTTLE_ROTATION_IMAGES = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BOTTLE_SPLASH_IMAGES = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    throw (otherDirection) {
        //Flugbogen
        this.speedY = 12; //18

        this.applyGravity();
        //Fluggeschwindigkeit
        setInterval(() => {
            if (!this.bottleCollision) {
                if(!otherDirection){
                    this.x += 5; //8
                } else {
                    this.x -= 5;
                }
               
            }
        }, 1000 / 60); //25
        this.animate();
    }

    hitsGround(){
        return this. y > 300 + this.height
    }


    playBottlesmashSound(){
        this.bottle_smash_sound.play();
    }

    showBottlesmash(throwableObjects, index){
        this.playBottlesmashSound();
        this.bottleCollision = true;
        setTimeout(() => throwableObjects.splice(index, 1), 500);
    }

    animate() {
        setInterval(() => {
            if (this.bottleCollision) {
                // this.y = 350;
                this.playAnimation(this.BOTTLE_SPLASH_IMAGES)
            } else if (!this.bottleCollision) {
                this.playAnimation(this.BOTTLE_ROTATION_IMAGES)
            } 
        }, 100);
    }

}
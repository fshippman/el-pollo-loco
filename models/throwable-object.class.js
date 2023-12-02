class ThrowableObject extends MovableObject {
    // speedY = 30;
    // speedX = 20
    offsetYU = 10//10; // offset for hitbox from top
    offsetYD = 10//20; // offset for hitbox from bottom
    offsetXR = 10//20; // offset for hitbox from right
    offsetXL = 10//10; // offset for hitbox from left
   

    constructor(x, y) {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        this.x = x
        this.y = y
        this.height = 70;
        this.width = 70;

    }

    BOTTLE_ROTATION_IMAGES = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    throw () {
        //Flugbogen
        this.speedY = 18; //18
        this.applyGravity();
        //Fluggeschwindigkeit
        setInterval(() => {
            this.x += 8;
        }, 25);
        this.animateThrownBottle();
    }

    animateThrownBottle() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_ROTATION_IMAGES)
        }, 100);
    }


}
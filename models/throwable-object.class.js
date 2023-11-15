class ThrowableObject extends MovableObject {
    // speedY = 30;
    // speedX = 20
    x = 250;
    y = 100;
    world;

    constructor() {
        super();
        this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        // this.x = x + 20
        // this.x = 200 + Math.random() * 500;
        // this.speed = 0.15 + Math.random() * 0.5; //0.25
        // this.throw();
        this.animate();
    }

    BOTTLE_ROTATION_IMAGES = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    animate(){
        setInterval(() => {
            console.log('animate')
            this.playAnimation(this.BOTTLE_ROTATION_IMAGES)
        }, 200);
    }

    throw() {
        this.speedY * this.speedX
    }
}
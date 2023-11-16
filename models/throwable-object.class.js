class ThrowableObject extends MovableObject {
    // speedY = 30;
    // speedX = 20


    constructor() {
        super().loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        // this.loadImages(this.BOTTLE_ROTATION_IMAGES);
        this.x = 100
        this.y = 150
        this.height = 80; 
        this.width = 80;
        // this.throw(100, 100);
    }

    BOTTLE_ROTATION_IMAGES = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    // throw(x, y) {
        // this.x = x
        // this.y = y
        // this.speedY = 30; //BOGEN
        // this.applyGravity();
        // setInterval(()=>{
        //     this.x += 10;
        // }, 25);
       
        // this.playAnimation(this.BOTTLE_ROTATION_IMAGES)

    // }


}
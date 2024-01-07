class Chicken extends MovableObject {
    y = 360;
    height = 60;
    width = 70;
    offsetXL = 2 //25
    offsetXR = 4 //35
    offsetYU = 5 //120
    offsetYD = 17 //30
    

    IMAGES_WALKING = [
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    IMAGE_DEAD = ['./assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png']


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


    //jede Sekunde ändert sich die Grafik
    animate() {

        setInterval(() => {

            if (world.gameIsRunning) {
             
                this.moveLeft();
            }

        }, 1000 / 60);

        // modulu = hebt Rest auf
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
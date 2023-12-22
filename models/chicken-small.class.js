class SmallChicken extends MovableObject {
    y = 378 ;
    height = 40;
    width = 50;
    offsetXL = 5 //25
    offsetXR = 7   //35
    offsetYU = 4 //120
    offsetYD = 10 //30
    chicken_sound = new Audio('assets/audio/chicken.mp3');
  


    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD)
        this.x = 400;
        this.thisRightOffset = this.offsetXR;
        this.thisLeftOffset = this.offsetXL;
         //original
        // this.x = 200 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.5; //0.25
        this.attackDamage = 2;
        // this.animate();
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
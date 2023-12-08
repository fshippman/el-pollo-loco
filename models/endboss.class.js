class Endboss extends MovableObject {
    y = 45;
    height = 410;
    width = 260;
    // offsetYU = 130; // offset for hitbox from top
    // offsetYD = 100; // offset for hitbox from bottom
    // offsetXR = 70; // offset for hitbox from right
    // offsetXL = 30; // offset for hitbox from left

    offsetYU= 160; 
    offsetYD= 15;
    offsetXR= 40;
    offsetXL= 30;
     
    
    
    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.x = 500 // 2500!
        // this.animate();
        this.thisRightOffset = this.offsetXR;
        this.thisLeftOffset = this.offsetXL;
    }

    animate() {
        setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT)
            } else {
                this.playAnimation(this.IMAGES_WALKING)
            }

        }, 200)
    }

}
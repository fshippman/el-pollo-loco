class Endboss extends MovableObject {
    y = 45;
    height = 410;
    width = 260;
    // offsetYU = 130; // offset for hitbox from top
    // offsetYD = 100; // offset for hitbox from bottom
    // offsetXR = 70; // offset for hitbox from right
    // offsetXL = 30; // offset for hitbox from left

    offsetYU = 160;
    offsetYD = 15;
    offsetXR = 40;
    offsetXL = 30;
    deadAnimation;

    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    hadFirstEndbossContact = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 700 // 2500!
        // this.animate();
        this.thisRightOffset = this.offsetXR;
        this.thisLeftOffset = this.offsetXL;
        this.deadAnimation = false;

    }

    animate() {
        let i = 0
        let hadFirstEndbossContact = false;
        setInterval(() => {
            console.log(world.level.level_end_x)
            
            if (i < 20 && hadFirstEndbossContact) {
                this.playAnimation(this.IMAGES_ATTACK);
                // world.level.level_end_x = -600
                // world.level.level_start_x = 2200
                world.level.level_end_x = 500
                world.level.level_start_x = 400
            

            } else if (i > 20 && hadFirstEndbossContact){
                world.level.level_end_x = 2200
                world.level.level_start_x = -600
                this.playAnimation(this.IMAGES_WALKING)
            } else if(this.isHurt() && this.energy < 100 && this.energy > 50) {
                this.deadAnimation = false;
                this.playAnimation(this.IMAGES_ATTACK)
            } else if (this.isHurt() && this.energy < 49 && !this.isDead()) {
                this.deadAnimation = false;
                this.playAnimation(this.IMAGES_HURT)
            } else if (this.isDead() && !this.deadAnimation) {
                this.playAnimation(this.IMAGES_DEAD)
                this.deadAnimation = true;
            } else if (!this.isDead() && !hadFirstEndbossContact) {
                this.playAnimation(this.IMAGES_ALERT)
            } 
            i++;

            if (world.character.x > 400 && !hadFirstEndbossContact) {
                i = 0
                hadFirstEndbossContact = true
            }
           




        }, 200)
    }


}
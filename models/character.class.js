class Character extends MovableObject {
    y = 160;
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
    world;
    walking_sound = new Audio('audio/running.mp3');
    // new Audio('audio/bottle.mp3')

   

    //Dadurch dass wir nen neuen Charakter erstellen wird loadimages aufgerufen 
    // super muss nur einmal gemacht werden danach kann man this sagen
    // von movable object wird loadimage aufgerufen
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0])
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    //jede Sekunde ändert sich die Grafik
    animate() {

        setInterval(()=>{
            this.walking_sound.pause();
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.x += this.speed;
                this.otherDirection = false;
                this.walking_sound.play();
            }

            if(this.world.keyboard.LEFT && this.x > 0 ){
                this.x -= this.speed;
                this.otherDirection = true;
                this.walking_sound.play();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        // modulu = hebt Rest auf
        setInterval(() => {
            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT ){
                // Walk animation
                this.playAnimation(this.IMAGES_WALKING)
            }        
        }, 50)
    }


    //Constructur wird immer aufgerufen bei new
    jump() {

    }
}
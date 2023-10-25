class Character extends MovableObject {
    y = 140;
    height = 290;
    width = 120;
    speed = 10;
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
    currentImage = 0;

    //Dadurch dass wir nen neuen Charakter erstellen wird loadimages aufgerufen 
    // super muss nur einmal gemacht werden danach kann man this sagen
    // von movable object wird loadimage aufgerufen
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }


    //jede Sekunde ändert sich die Grafik
    animate() {

        setInterval(()=>{
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){
                this.x += this.speed;
                this.otherDirection = false;
            }

            if(this.world.keyboard.LEFT && this.x > 0 ){
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)

        // modulu = hebt Rest auf
        setInterval(() => {

            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT ){
                // Walk animation
                let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6, => 1, Rest 1
                // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5,
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }

           
        }, 50)

    }


    //Constructur wird immer aufgerufen bei new
    jump() {

    }
}
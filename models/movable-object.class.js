class MovableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;

    /**
     * 
     * @param {string} path -  der Pfad zu unserem Bild 'img/2_character_pepe/2_walk/W-21.png'
     */
    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image(); //this.img = document.getElementById('image') <img id="image">
        this.img.src = path; // es fehlt noch src
    }

    /**
     * Bilder werden  ins JSON imageCache geladen
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     * 6 mal durch die schleife durch da wird variable angelegt mit einem neuen Bild (img = new Image)
     * dann wird das bild ins img objekt geladen
     * dann wird imageCache geuptdatet
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        })

    }

    moveRight() {
        console.log('Moving right')
    }

    moveLeft(){
        // 60 mal Pro Sekunde werden Pixel um 0,15 verringert
        setInterval(() => {
           this.x -= this.speed;
       }, 1000 / 60);
   }

}
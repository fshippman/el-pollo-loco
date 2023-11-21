 class DrawableObject {
    x = 120;
    y = 280;
    width = 100;
    height = 150;
    offsetY = 0;
    img;
    imageCache = {};
    currentImage = 0;
   
    /**
      * This function
      * 
      * @param {string} path -  der Pfad zu unserem Bild 'img/2_character_pepe/2_walk/W-21.png'
      */
     // loadImage('img/test.png');
     loadImage(path) {
         this.img = new Image(); //this.img = document.getElementById('image') <img id="image">
         this.img.src = path; // es fehlt noch src
     }

     draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
           
        } catch(e){
            console.warn('Error loading image', e);
            console.log('Could not load image', this.img.src);

        }
           
     }
        /**
     * This function draws a frame of movable objects if they are an instance of character or chicken
     * 
     * @param {context} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Endboss || this instanceof Character) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
         }
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

     
   

    // gibt Wert zwischen 0 und 5 zurück basierend auf Prozentwerd weil 6 Balkenbilder vorhanden
    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
 }
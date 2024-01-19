 class DrawableObject {
     x = 120;
     y = 280;
     width = 100;
     height = 150;
     offsetXL; //The horizontal offset on the left side.
     offsetXR; //The horizontal offset on the right side.
     offsetYU; //The vertical offset on the upper side.
     offsetYD; //The vertical offset on the lower side.
     img;
     imageCache = {};
     currentImage = 0;


     /**
      * Loads an image for the object.
      * @param {string} path - The path to the image file.
      */
     loadImage(path) {
         this.img = new Image(); //this.img = document.getElementById('image') <img id="image">
         this.img.src = path;
     }


     /**
      * Loads multiple images and stores them in an image cache.
      * @param {string[]} arr - An array of image file paths.
      */
     loadImages(arr) {
         arr.forEach((path) => {
             let img = new Image();
             img.src = path;
             this.imageCache[path] = img;
         })
     }


     /**
      * Resolves the index of an image based on a percentage value.
      * This is used for elements that change appearance based on a percentage.
      * @param {number} percentage - The percentage value used to determine the image index.
      * @returns {number} The index of the corresponding image.
      */
     resolveImageIndex(percentage) {
         if (percentage == 100) {
             return 5;
         } else if (percentage > 80) {
             return 4;
         } else if (percentage > 60) {
             return 3;
         } else if (percentage > 30) {
             return 2;
         } else if (percentage > 10) {
             return 1;
         } else {
             return 0;
         }
     }


     /**
      * Draws the object on the canvas.
      * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas where the object will be drawn.
      */
     draw(ctx) {
         try {
             ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
         } catch (e) {
             console.warn('Error loading image', e);
             console.log('Could not load image', this.img.src);
         }
     }

     
     /**
      * Draws the hitbox for the object, if applicable.
      * Only certain types of objects like characters or coins have a hitbox.
      * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas where the hitbox will be drawn.
      */
     drawHitBox(ctx) {
         if (this instanceof Character || this instanceof Coin) {
             ctx.beginPath();
             ctx.rect(
                 this.x + this.offsetXL,
                 this.y + this.offsetYU,
                 this.width - this.offsetXL - this.offsetXR,
                 this.height - this.offsetYU - this.offsetYD
             );
             ctx.lineWidth = 2;
             ctx.strokeStyle = 'black';
             ctx.stroke();
         }
     }

 }
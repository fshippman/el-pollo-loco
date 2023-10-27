class MovableObject {
    x = 120;
    y = 280;
    offsetY = 0;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 150
    }

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
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    }


    /**
     * This function draws a frame of movable objects if they are an instance of character or chicken
     * 
     * @param {context} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken) {
            ctx.beginPath();
            ctx.lineWidth = '4';
            ctx.strokeStyle = 'black';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * This function calculates colliding and returns it
     * 
     * @param {object} obj 
     * @returns colliding calclulation
     */
    isColliding(obj) {
        return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height);
            // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.

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

    playAnimation(images) {
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 7 % 6, => 1, Rest 1
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5,
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        // 60 mal Pro Sekunde werden Pixel um 0,15 verringert
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }
}
class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1;
    energy = 100;
    lastHit = 0;
    thisLeftOffset = 0; 
    thisRightOffset = 0;
    bottleCollision;
    attackDamage;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0)  {
           
                if (!this.bottleCollision) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
               
            }
        }, 1000 / 25);
    }
d
    /////----------------------------------------------------------------------------------------------------------------
    /**
     * Checks for a general collision with another object.
     * This method determines if there is any overlap between the current object and another object, considering their positions and dimensions.
     * 
     * @param {Object} object - The object to check for a collision with.
     * @returns {boolean} - True if a general collision is detected, false otherwise.
     */
    isColliding(object) {
        return this.x + this.thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - this.thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < object.y + object.height - object.offsetYD &&
            this.y + this.height - this.offsetYD > object.y + object.offsetYU;
    }

    /**
     * Determines the direction of the current object based on the direction of the character.
     * This method adjusts the object's left and right offsets depending on the character's orientation.
     */
    whatIsMyDirection() {
        // funktioniert
        if (world.character.otherDirection) {
            this.thisLeftOffset = this.offsetXR;
            this.thisRightOffset = this.offsetXL;
        } else {
            this.thisLeftOffset = this.offsetXL;
            this.thisRightOffset = this.offsetXR;
        }
    }


    /**
     * Determines if the object is colliding with another object.
     * It checks for general and falling collisions and returns the type of collision if any.
     * @param {Object} object - The object to check for collision with.
     */

    /////----------------------------------------------------------------------------------------------------------------



    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable object should always fall
            return true;
        } else {
            return this.y < 150; //150
        }
    }



    hit(attackDamage) {
        this.energy -= attackDamage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000 // Difference in s
        return timepassed < 1; // in den letzten 5 Sekunden getroffen return gibt true aus
    }

    isDead() {
        return this.energy == 0;
    }

    isAlive() {
        return !this.isDead();
    }

    isOnGround() {
        return this.speedY == 0;
    }

    isJumpingUp() {
        return this.speedY >= 0;
    }

    isFalling() {
        return this.speedY < 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 7 % 6, => 1, Rest 1
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

    /**
     * This function calculates colliding and returns it
     * 
     * @param {object} obj 
     * @returns colliding calclulation
     */
    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height);
    //     // && obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    // }

}

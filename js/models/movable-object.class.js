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


    /**
     * Applies gravity to the object.
     * This method creates a gravity effect by adjusting the object's vertical position.
     * It checks if the object is above the ground or moving upwards, and then updates its vertical position accordingly.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                if (!this.bottleCollision) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                }
            }
        }, 1000 / 25);
    }


    /**
     * Determines if this object is colliding with another object.
     * This method checks for collision by comparing the positions and dimensions of both objects,
     * taking into account their respective offsets to accurately determine overlapping areas.
     *
     * @param {MovableObject} object - The object to check for collision against.
     * @returns {boolean} True if this object is colliding with the provided object, false otherwise.
     */
    isColliding(object) {
        return this.x + this.thisLeftOffset < object.x + object.width - object.offsetXR &&
            this.x + this.width - this.thisRightOffset > object.x + object.offsetXL &&
            this.y + this.offsetYU < object.y + object.height - object.offsetYD &&
            this.y + this.height - this.offsetYD > object.y + object.offsetYU;
    }


    /**
     * Determines and sets the object's current directional offsets.
     * This method adjusts the left and right offsets based on the character's current direction (facing left or right).
     * It uses the `otherDirection` property from the world's character instance to set the appropriate offsets for collision detection.
     */
    whatIsMyDirection() {
        if (world.character.otherDirection) {
            this.thisLeftOffset = this.offsetXR;
            this.thisRightOffset = this.offsetXL;
        } else {
            this.thisLeftOffset = this.offsetXL;
            this.thisRightOffset = this.offsetXR;
        }
    }


    /**
     * Determines if the object is above the ground.
     * For throwable objects, this method always returns true, indicating they are always in a state of falling.
     * For other objects, it checks if the vertical position (y-coordinate) is less than a specific threshold (150 in this case),
     * which indicates that the object is above the ground.
     *
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable object should always fall
            return true;
        } else {
            return this.y < 150; //150
        }
    }


    /**
     * Stops the object's walking movement.
     * This method sets the object's speed to zero, effectively stopping its horizontal movement.
     */
    stopWalking() {
        this.speed = 0;
    }


    /**
     * Processes a hit on the object, reducing its energy.
     * This method decreases the object's energy by a specified amount of attack damage.
     * If the energy falls below zero, it is set to zero.
     * Additionally, the time of the last hit is recorded if the object is not yet defeated.
     *
     * @param {number} attackDamage - The amount of damage to reduce from the object's energy.
     */
    hit(attackDamage) {
        this.energy -= attackDamage;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Determines if the object has been hurt recently.
     * This method calculates the time elapsed since the last hit and checks if this duration is within a specified threshold.
     * It returns true if the object was hit within the last second, indicating a recent injury.
     *
     * @returns {boolean} True if the object was hit within the last second, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Calculates the elapsed time since the last hit in milliseconds
        timepassed = timepassed / 1000 // Converts the time to seconds
        return timepassed < 1; // Returns true if hit within the last second
    }
    

    /**
     * Checks if the object is dead.
     * This method evaluates the object's current energy level and returns true if the energy is depleted (zero).
     *
     * @returns {boolean} True if the object's energy is zero, indicating it is dead; otherwise, false.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * Determines if the object is alive.
     * This method checks the object's vitality by calling the isDead method and returns the opposite boolean value.
     *
     * @returns {boolean} True if the object is alive (i.e., not dead); otherwise, false.
     */
    isAlive() {
        return !this.isDead();
    }


    /**
     * Determines if the object is on the ground.
     *
     * @returns {boolean} True if the object's vertical speed is zero, indicating it is on the ground; otherwise, false.
     */
    isOnGround() {
        return this.speedY == 0;
    }


    /**
     * Checks if the object is in the upward phase of a jump.
     * A non-negative speedY typically indicates that the object is moving upwards or at the peak of its jump.
     *
     * @returns {boolean} True if the object's vertical speed is non-negative, suggesting an upward movement; otherwise, false.
     */
    isJumpingUp() {
        return this.speedY >= 0;
    }


    /**
     * Determines if the object is in a falling state.
     * indicating that the object is moving downwards, typically after reaching the peak of a jump.
     *
     * @returns {boolean} True if the object's vertical speed is negative, suggesting a downward movement; otherwise, false.
     */
    isFalling() {
        return this.speedY < 0;
    }

    /**
     * Cycles through a series of images to create an animation effect.
     * This method uses the modulo operation to loop through the array of images, creating a continuous animation.
     * The current image is updated in each call, ensuring the animation progresses through the sequence.
     *
     * @param {string[]} images - An array of image paths used for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length; //(e.g) let i = 7 % 6, => 1, Rest 1 
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right.
     * This method increments the object's horizontal position (x-coordinate) by its current speed,
     * effectively moving the object to the right on the screen.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     * This method decreases the object's horizontal position (x-coordinate) by its current speed,
     * effectively moving the object to the left on the screen.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Initiates a jump action for the object.
     *
     */
    jump() {
        this.speedY = 20;
    }

}

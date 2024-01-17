class World {
    character = new Character();
    statusbar = new StatusBar();
    bottlebar = new BottleBar();
    coinbar = new CoinBar();
    endbossbar = new EndbossBar();
    CHICKEN_DEAD = [];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    gameIsRunning = true;
    throwingTime;


    /**
     * Constructs the game world and sets up the main game loop.
     * Initializes the game world with the provided canvas and keyboard, then sets an interval for regularly checking interactions
     * like collisions, bottle throwing, item collections, and interactions with chickens.
     *
     * @param {HTMLCanvasElement} canvas - The canvas element where the game will be rendered.
     * @param {Keyboard} keyboard - The keyboard input handler for player controls.
     */
    constructor(canvas, keyboard) {
        this.initWorld(canvas, keyboard)
        setInterval(() => {
            this.checkCollisions();
            this.checkIfBottlethrowPossible();
            this.checkIfItemsCollected();
        }, 200);
    }


    /**
     * Sets up the game world, including the canvas, keyboard input, and initial level.
     * Initiates the render loop, character-world linkage, and throwing mechanics.
     *
     * @param {HTMLCanvasElement} canvas - The game's canvas element.
     * @param {Keyboard} keyboard - The handler for keyboard inputs.
     */
    initWorld(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
        this.draw();
        this.setWorld();
        this.setThrowingTimer();
    }


    /**
     * Manages collision detection across various elements in the game world.
     *
     */
    checkCollisions() {
        this.checkEnemyCollisions(this.level.enemies);
        this.checkEnemyCollisions(this.level.boss);
        this.checkThrownCollisions();
        this.checkJumpCollisions();
    }


    /**
     * Checks for and processes collisions between the character and enemies.
     * 
     */
    checkEnemyCollisions(enemies) {
        this.character.whatIsMyDirection();
        enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && (this.character.isOnGround() || this.character.isJumpingUp()) && enemy.isAlive()) {
                this.character.hit(enemy.attackDamage);
                this.statusbar.setPercentage(this.character.energy)
            }
        });
    }


    /**
     * Checks for and processes collisions of thrown bottles with enemies, the boss, or the ground.
     * Iterates through all throwable objects and calls specific collision handling methods for each interaction:
     * collisions with enemies, the boss, and the ground.
     */
    checkThrownCollisions() {
        this.throwableObjects.forEach((ThrowableObject, index) => {
            this.bottleCollisionEnemy(ThrowableObject, index);
            this.bottleCollisionBoss(ThrowableObject, index);
            this.bottleCollisionGround(ThrowableObject, index);
        });
    }


    /**
     * Handles the collision of a throwable bottle with any enemy.
     * Iterates through all enemies and checks for a collision with the throwable object.
     * If a collision occurs, it triggers the bottle smash effects and simulates the defeat of the collided enemy.
     *
     * @param {ThrowableObject} ThrowableObject - The throwable object (bottle) to check for collision with enemies.
     * @param {number} index - The index of the throwable object in the array.
     */
    bottleCollisionEnemy(ThrowableObject, index) {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isColliding(ThrowableObject)) {
                ThrowableObject.showBottlesmash(this.throwableObjects, index);
                this.killChicken(enemy);
            }
        });
    }


    /**
     * Handles the collision of a throwable bottle with the boss.
     * If the bottle collides with the boss during the end fight and the boss isn't already hurt, it triggers bottle smash effects,
     * applies damage to the boss, plays the corresponding sound effect, and updates the endboss's energy bar.
     *
     * @param {ThrowableObject} ThrowableObject - The throwable object (bottle) to check for collision with the boss.
     * @param {number} index - The index of the throwable object in the array.
     */
    bottleCollisionBoss(ThrowableObject, index) {
        if (ThrowableObject.isColliding(this.level.boss[0]) && this.level.boss[0].endfightStart) {
            ThrowableObject.showBottlesmash(this.throwableObjects, index);
            if (!this.level.boss[0].isHurt()) {
                this.level.boss[0].hit(ThrowableObject.attackDamage)
                CHICKEN_SOUND.play();
                this.endbossbar.setPercentage(this.level.boss[0].energy)
            }
        }
    }


    /**
     * Checks if a throwable object (bottle) has collided with the ground and processes the collision.
     * If the bottle hits the ground, it triggers the bottle smash visual and auditory effects, 
     * and sets the bottle's position to the ground level.
     *
     * @param {ThrowableObject} ThrowableObject - The throwable object (bottle) to check for ground collision.
     * @param {number} index - The index of the throwable object in the array.
     */
    bottleCollisionGround(ThrowableObject, index) {
        if (ThrowableObject.hitsGround()) {
            ThrowableObject.showBottlesmash(this.throwableObjects, index);
            let groundLevel = 380
            ThrowableObject.y = groundLevel;
        }
    }

    
     /**
     * Simulates the effect of the character jumping on a chicken, leading to the chicken's defeat.
     *
     */
     checkJumpCollisions() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isAboveGround && this.character.isColliding(enemy, index) && this.character.isFalling() && enemy.isAlive()) {
                this.killChicken(enemy);
            }
        });
    }


    /**
     * Checks if throwing a bottle is possible and initiates the throw if conditions are met.
     * Verifies the 'D' key press, sufficient bottle inventory, appropriate throw timing, and the game's running state.
     * Adjusts the bottle's throw offset based on the character's direction and calls throwBottle if conditions are satisfied.
     */
    checkIfBottlethrowPossible() {
        if (this.keyboard.D && this.character.inventoryCounter > 0 && this.throwTime() && this.gameIsRunning) {
            let throwableObjectOffset = 50;
            if (this.character.otherDirection) {
                throwableObjectOffset = 0
            }
            this.throwBottle(throwableObjectOffset)
        }
    }


    /**
     * Handles the action of the character throwing a bottle.
     * Creates a new ThrowableObject, updates the character's bottle inventory, adds the bottle to throwable objects array,
     * initiates the bottle's throwing animation, updates the throwing timer, and plays the throwing sound.
     *
     * @param {number} throwableObjectOffset - The horizontal offset to determine the bottle's initial position relative to the character.
     */
    throwBottle(throwableObjectOffset) {
        let bottle = new ThrowableObject(this.character.x + throwableObjectOffset, this.character.y + 100);
        this.character.inventoryCounter--;
        this.bottlebar.setPercentage(this.character.calculateInventoryPercentage());
        this.throwableObjects.push(bottle)
        bottle.throw(this.character.otherDirection);
        this.setThrowingTimer();
        playThrowingSound();
    }


    /**
     * Checks and processes the collection of bottles and coins.
     * Calls methods to handle the collection of bottles and coins by the character during the game.
     */
    checkIfItemsCollected() {
        this.collectBottles();
        this.collectCoins();
    }


    /**
     * Manages bottle collection by the character.
     * Iterates through bottles, checks for collisions, and if inventory space is available, it increments the inventory count,
     * removes the bottle, updates the bottle bar percentage, and plays the collection sound.
     */
    collectBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle, index) && this.character.checkInventorySpace()) {
                playBottleCollectSound()
                this.character.inventoryCounter++;
                this.level.bottles.splice(index, 1)
                this.bottlebar.setPercentage(this.character.calculateInventoryPercentage());
            }
        });
    }


    /**
     * Manages coin collection by the character.
     * Iterates through coins, checking for collisions. If a coin is collected, it's removed, the character's coin count is updated,
     * the coin bar display is refreshed, and the collection sound is played.
     */
    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin, index)) {
                this.character.coinInventory++;
                this.level.coins.splice(index, 1);
                this.coinbar.setPercentage(this.character.calculateCoinPercentage());
                COIN_SOUND.play();
            }
        });
    }


    /**
     * Sets the reference to the current world instance for the main character.
     * 
     */
    setWorld() {
        this.character.world = this;
        // The Variable "character" which I know, knows a "world" and this world I am (this)
    }


    /**
     * This function triggers the animation sequences for all enemies, the main character, and the boss.
     * It also starts the background game sound. 
     */
    startAnimations() {
        this.level.enemies.forEach((enemy) => {
            enemy.animate();
        })
        playGameSound();
        this.character.animate();
        this.level.boss[0].animate();
    }


    /**
     * Initializes the throwing timer for the character.
     * 
     */
    setThrowingTimer() {
        this.throwingTime = new Date().getTime();
    }


    /**
     * Calculates if a specified time duration has passed since the last throw.
     * @returns {boolean} Returns true if more than 3 seconds have passed since the last throw, otherwise false.
     */
    throwTime() {
        let throwTimePassed = new Date().getTime() - this.throwingTime;
        throwTimePassed = throwTimePassed / 1000;
        return throwTimePassed > 3;
    }


    /**
     * This function is marking the given chicken as defeated.
     *
     * @param {MovableObject} enemy - The chicken object that is to be killed.
     */
    killChicken(enemy) {
        CHICKEN_SOUND.play();
        enemy.speed = 0;
        enemy.energy = 0;
    }


    /**
     * Renders the game world.
     * This function is drawing all visible components of the game.
     * It clears the canvas for each frame, applies camera transformations for scrolling, and uses createRenderLoop
     * to continuously render the next frame. It ensures that all game elements are drawn relative to the camera's current position.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // Clears the canvas
        this.ctx.translate(this.camera_x, 0); // Translates the canvas for camera movement
        this.addCloudsAndBackground();
        this.addBars();
        this.addToMap(this.character);
        this.addEnemies();
        this.addCollectable();
        this.ctx.translate(-this.camera_x, 0); // Resets the translation for the next frame
        this.createRenderLoop()
    }


    /**
     * Initiates the render loop for the game world.
     * Self is used because "this" doesn't work, it is not known in this function. 
     * The requestAnimationFrame is a callback function that continuously schedules the draw method for the next frame.
     */
    createRenderLoop() {
        let self = this; 
        requestAnimationFrame(function () {
            self.draw(); 
        });
    }


    /**
     * Adds background objects and clouds to the game map.
     */
    addCloudsAndBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }


    /**
     * Adds enemies and boss to the game map.
     */
    addEnemies() {
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.boss);
    }


    /**
     * Adds collectables to the game map.
     */
    addCollectable() {
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);
    }


    /**
     * Adds all bars to the game map.
     */
    addBars() {
        this.ctx.translate(-this.camera_x, 0); //Back
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.endbossbar);
        this.ctx.translate(this.camera_x, 0); // Forwards
    }


    /**
     * Adds multiple objects to the game map.
     * This method iterates through an array of MovableObjects, adding each one to the map by calling the addToMap method.
     * @param {MovableObject[]} objects - The array of MovableObjects to be added to the map and drawn on the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }


    /**
     * Adds a MovableObject to the game map and handles image flipping if necessary.
     * @param {MovableObject} mo - The MovableObject to be added to the map and drawn on the canvas.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx); 
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the rendering context horizontally to display mirrored images.
     * It saves the current context state, performs a translation and scaling to mirror the image, and adjusts the object's x-coordinate.
     *
     * @param {MovableObject} mo - The MovableObject whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save(); // Saves the current state of the context
        this.ctx.translate(mo.width, 0); // Translates the context by the object's width to prepare for mirroring
        this.ctx.scale(-1, 1); // Scales the context horizontally by -1, flipping the image
        mo.x = mo.x * -1; // Mirrors the x-coordinate of the object to ensure correct positioning in the flipped context
    }


    /**
     * Restores the MovableObject's x-coordinate and the canvas context to their original states after flipping.
     * @param {MovableObject} mo - The MovableObject whose image was flipped and needs to be restored.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }

}
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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
        this.draw();
        this.setWorld();

        setInterval(() => {

            this.checkEnemyCollisions();
            this.checkBossCollision();
            this.collectBottles();
            this.collectCoins(); 
            this.checkThrow();
            this.jumpOnChicken();
            this.resetCharacterSpeedY();
            this.checkThrownCollisions();

        }, 200);
    }

    // Die Variable "character" die ich kenne, die kennt eine "world" und diese Welt bin ich (this)
    setWorld() {
        this.character.world = this;
        // this.chicken.world = this;
        // WORLD.character.world = WORLD
        // world ist die Klasenvariable die in der Klasse Charakter ist: world;
    }


    startAnimations() {
        this.level.enemies.forEach((enemy) => {
            enemy.animate();
        })
        this.character.playGameSound();
        this.character.animate();
        this.level.boss[0].animate();
    }


    checkThrownCollisions() {
        this.throwableObjects.forEach((ThrowableObject, index) => {

            this.level.enemies.forEach((enemy) => {
                if (enemy.isColliding(ThrowableObject)) {
                    ThrowableObject.showBottlesmash(this.throwableObjects, index);
                    this.killChicken(enemy);
                }
            });


            if (ThrowableObject.isColliding(this.level.boss[0]) && this.level.boss[0].endfightStart) {
                ThrowableObject.showBottlesmash(this.throwableObjects, index);

                if (!this.level.boss[0].isHurt()) {
                    this.level.boss[0].hit(ThrowableObject.attackDamage)
                    this.level.boss[0].chicken_sound.play();
                    this.endbossbar.setPercentage(this.level.boss[0].energy)
                }
            }

            if (ThrowableObject.hitsGround()) {
                ThrowableObject.showBottlesmash(this.throwableObjects, index);
                let groundLevel = 380
                ThrowableObject.y = groundLevel;
            }

        });

    }


    checkThrow() {
        if (this.keyboard.D && this.character.inventoryCounter > 0 && this.character.throwTime()) {

            let throwableObjectOffset = 50;
            if (this.character.otherDirection) {
                throwableObjectOffset = 0
            }

            let bottle = new ThrowableObject(this.character.x + throwableObjectOffset, this.character.y + 100);
            this.character.inventoryCounter--;
            this.bottlebar.setPercentage(this.character.calculateInventoryPercentage());
            this.throwableObjects.push(bottle)
            bottle.throw(this.character.otherDirection);
            this.character.setThrowingTimer();
            this.character.playThrowingSound();
        }
    }

    checkBossCollision() {
        this.character.whatIsMyDirection();
        this.level.boss.forEach((enemy) => {
            if (this.character.isColliding(enemy) && (this.character.isOnGround() || this.character.isJumpingUp()) && enemy.isAlive()) {
                this.character.hit(enemy.attackDamage);
                this.statusbar.setPercentage(this.character.energy)
            }
        });
    }


    checkEnemyCollisions() {
        this.character.whatIsMyDirection();
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && (this.character.isOnGround() || this.character.isJumpingUp()) && enemy.isAlive()) {
                this.character.hit(enemy.attackDamage);
                this.statusbar.setPercentage(this.character.energy)
            }
        });
    }

    jumpOnChicken() {
        let deleteIndex;
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isAboveGround && this.character.isColliding(enemy, index) && this.character.isFalling() && enemy.isAlive()) {
                this.killChicken(enemy);

                deleteIndex = index

            }
        });

        // console.log(deleteIndex)
        // if (deleteIndex != undefined) {
        // DESTROYS ARRAY!
        // this.clearDeadChicken(deleteIndex)
        // }

    }

    killChicken(enemy) {
        enemy.chicken_sound.play();
        enemy.speed = 0;
        enemy.energy = 0;
    }
    ///----------------DELETES WRONG CHICKEN!!!!-----------------------------
    /**
     * This function removes the dead chicken from the level after a delay
     * 
     * @param {number} index - The index of the dead chicken to remove
     */
    clearDeadChicken(index) {
        setTimeout(() => this.level.enemies.splice(index, 1), 5000);
    }
    ///----------------DELETES WRONG CHICKEN!!!!-----------------------------
    
    /**
     * This function reset the vertical speed of the character if it is -21
     * 
     */
    resetCharacterSpeedY() {
        if (this.character.speedY == -21) {
            this.character.speedY = 0
        }
    }
   

    // Die Bottle verschwindet weil die Welt ja ständig aktualisiert wird
    // Array mit Flaschen kleiner weil konkrete Flasche gespliced --> konkrete Flasche verschwindet
    collectBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle, index) && this.character.checkInventorySpace()) {
                bottle.bottle_sound.pause();
                bottle.bottle_sound.currentTime = 0;
                bottle.bottle_sound.play();
                this.character.inventoryCounter++;
                this.level.bottles.splice(index, 1) // Die richtige FLasche wird gelöscht
                this.bottlebar.setPercentage(this.character.calculateInventoryPercentage());
            }
        });
    }
   
    collectCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin, index)) {
                console.log('coin')
                this.character.coinInventory++;
                this.level.coins.splice(index,1)
                this.coinbar.setPercentage(this.character.calculateCoinPercentage());
                coin.coin_sound.play();
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); //Verschieben Position an der wir zeichnen / Koordinatensystem
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0); //Back
        // --------------- Space for fixed objects ---------------
        this.addToMap(this.statusbar);
        this.addToMap(this.coinbar);
        this.addToMap(this.bottlebar);
        this.addToMap(this.endbossbar);

        this.ctx.translate(this.camera_x, 0); // Forwards


        this.addToMap(this.character);


        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.boss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);



        this.ctx.translate(-this.camera_x, 0);


        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        // draw wird so oft aufgerufen wie die Grafikkarte hergibt
        // self weil this in der function nicht mehr funktioniert (this kennt er nicht mehr)
    }


    //der Befehl wird für jedes Element ausgeführt
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        });
    }
    // hat objekt andere Richtung wenn ja 
    // aktuelle Einstellungen von Kontext werden gespeichert (f[r spaeter])
    // Veraendern mehtode wie bilder einfuegen spiegeln alles 
    // und fuegen eine bild gespiegelt an 
    // alles rueckgaengig
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        // mo.drawHitBox(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    // ctx = eine Sammlung von Funktionen um unserem Canvas was hinzuzufügen 
    //     diese Sammlung hat Eigenschaften (alle Bilder sollen normal eingefügt werden)
    //     Eigenschaften werden gespeichert
    //     Ab jetzt wird in diesem Kontext alles gespiegelt
    //     x Koordinate muss gespielgelt werden
    //ranslate macht die verschiebung des bilden und scale spiegelt es dann.
    //Durch das spiegel wird das bild aber nochmal verschoben. Auf den achse an der du spiegelst. 
    //Daher muss man es erst verschieben damit dann wieder am ende auf der gleichen stelle ist.
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); //Verschiebung um die Breite des Objekts (Weils ja gespiegelt wird!)
        // [ Quadrat ]
        //           [ Quadrat ]

        this.ctx.scale(-1, 1); //Spiegelung
        mo.x = mo.x * -1; //  spiegelst du die x-Koordinate des Objekts mo selbst
        // da das Bild gespiegelt ist sicherstellen dass Position des Objekts im gespiegelten Bild korrekt ist
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1
        this.ctx.restore();
    }


}
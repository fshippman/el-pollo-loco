class World {
    character = new Character();
    statusbar = new StatusBar();
    bottlebar = new BottleBar();
    coinbar = new CoinBar();
    bottle_sound = new Audio('assets/audio/bottle.mp3');
    chicken_sound = new Audio('assets/audio/chicken.mp3');
    CHICKEN_DEAD = [];
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    throwableObjects = [];
    gamestart = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

        setInterval(() => {
        
            this.checkCollisions();
            this.collectBottles();
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

    
    startEnemyMovement() {
        // if (this.gamestart) {
        this.level.enemies.forEach((enemy) => {
            enemy.animate();
        })
        console.log(this.level.boss, "BOSS")
        this.level.boss[0].animate();

    }

  
    checkThrownCollisions() {
        this.throwableObjects.forEach((ThrowableObject, index) => {
            // console.log(ThrowableObject)
            if (ThrowableObject.isColliding(this.level.boss[0])){
                console.log("COLLIDING", ThrowableObject)
                console.log(this.level.boss[0],"boss")
                this.throwableObjects.splice(index, 1);
            }
        });
    }

    checkCollisions() {
        this.character.whatIsMyDirection();
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && (this.character.isOnGround() || this.character.isJumpingUp()) && enemy.isAlive()) {
                this.character.hit();
                this.statusbar.setPercentage(this.character.energy)
            }
        });
    }

    jumpOnChicken() {
        let deleteIndex;
        this.level.enemies.forEach((enemy, index) => {
            if (this.character.isAboveGround && this.character.isColliding(enemy, index) && this.character.isFalling() && enemy.isAlive()) {
                this.chicken_sound.play();
                enemy.speed = 0;
                enemy.energy = 0;

                deleteIndex = index

            }
        });

        // console.log(deleteIndex)
        // if (deleteIndex != undefined) {
        // DESTROYS ARRAY!
        // this.clearDeadChicken(deleteIndex)
        // }

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
                this.bottle_sound.pause();
                this.bottle_sound.currentTime = 0;
                this.bottle_sound.play();
                this.character.inventoryCounter++;
                this.level.bottles.splice(index, 1) // Die richtige FLasche wird gelöscht
                this.bottlebar.setPercentage(this.character.calculateInventoryPercentage());
            }
        });
    }

    checkThrow() {
        if (this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100);
            this.throwableObjects.push(bottle)
            bottle.throw();
        }
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

        this.ctx.translate(this.camera_x, 0); // Forwards


        this.addToMap(this.character);


        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.boss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);



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
        // mo.drawFrame(this.ctx);
        mo.drawHitBox(this.ctx);

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
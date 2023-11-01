class World {
    character = new Character();
    statusbar = new StatusBar();
    bottlebar = new BottleBar();
    coinbar = new CoinBar();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    // Die Variable "character" die ich kenne, die kennt eine "world" und diese Welt bin ich (this)
    setWorld() {
        this.character.world = this;

        // WORLD.character.world = WORLD
        // world ist die Klasenvariable die in der Klasse Charakter ist: world;
    }


    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbar.setPercentage(this.character.energy)
                }
            });
        }, 200);
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
        mo.drawFrame(this.ctx);

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
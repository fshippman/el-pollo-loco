class World {

    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ]
    canvas;
    ctx;
    keyboard;

    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0)
    ]
    
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    // Die Variable "character" die ich kenne, die kennt eine "world" und diese Welt bin ich (this)
    setWorld(){
        this.character.world = this;
        // WORLD.character.world = WORLD
        // world ist die Klasenvariable die in der Klasse Charakter ist: world;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        

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
        if(mo.otherDirection){
            this.flipImage(mo);
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if(mo.otherDirection){
            this.flipImageBack(mo);
        }
    }
    // ctx = eine Sammlung von Funktionen um unserem Canvas was hinzuzufügen 
    //     diese Sammlung hat Eigenschaften (alle Bilder sollen normal eingefügt werden)
    //     Eigenschaften werden gespeichert
    //     Ab jetzt wird in diesem Kontext alles gespiegelt
    //     x Koordinate muss gespielgelt werden

    flipImage(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0); //Verschiebung um die Breite des Objekts (Weils ja gespiegelt wird!)
        // [ Quadrat ]
        //           [ Quadrat ]
    
        this.ctx.scale(-1, 1); //Spiegelung
        mo.x = mo.x * -1; //  spiegelst du die x-Koordinate des Objekts mo selbst
        // da das Bild gespiegelt ist sicherstellen dass Position des Objekts im gespiegelten Bild korrekt ist
    }

    flipImageBack(mo){
        mo.x = mo.x * -1
        this.ctx.restore();
    }
}



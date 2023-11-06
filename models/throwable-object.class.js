class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20
    x = 200;
    y = 100;
    world;

    constructor() {
        super();
        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5; //0.25
    }

    
}
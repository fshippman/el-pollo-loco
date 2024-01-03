class Cloud extends MovableObject {
    x = Math.random() * 2800
    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

    constructor() {
        super();
        this.loadImage('./assets/img/5_background/layers/4_clouds/1.png');
        this.speed = 0.15 + Math.random() * 0.15; //0.25
        this.animate();
    }

    /**
     * This function animates the clouds
     * 
     */
    animate() {
        setInterval(() => {
            // if (world.gameIsRunning) {
                this.moveLeft();
            // }
           
           
        }, 1000 / 60);
    }



}
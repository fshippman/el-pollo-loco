class StatusBar extends DrawableObject {
    percentage = 100;

    ENERGY_BAR = [
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        './assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

   
    /**
     * Constructs a new StatusBar instance.
     * Initializes the status bar with a series of images representing different fill levels.
     * Sets the initial position, dimensions, and the starting percentage of the status bar to full (100%).
     */
    constructor() {
        super();
        this.loadImages(this.ENERGY_BAR);
        this.x = 20; //50
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * Sets the fill percentage of the status bar and updates the displayed image accordingly.
     * @param {number} percentage - The percentage to set for the status bar, ranging from 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.ENERGY_BAR[this.resolveImageIndex(percentage)]
        this.img = this.imageCache[path];
    }
}
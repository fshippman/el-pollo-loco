class BottleBar extends DrawableObject {

    BOTTLE_BAR = [
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        './assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];


    /**
     * The current percentage of the bottle bar filled.
     * @type {number}
     */
    percentage;


    /**
     * The maximum count of bottles that can be shown in the bottle bar.
     * @type {number}
     */
    maxBottle = 8;


    /**
     * Creates a new BottleBar instance.
     * Initializes the bottle bar with no fill and sets its position and dimensions.
     */
    constructor() {
        super();
        this.loadImages(this.BOTTLE_BAR);
        this.x = 20;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }


    /**
     * Sets the fill percentage of the bottle bar and updates the displayed image accordingly.
     * @param {number} percentage - The percentage to set for the bottle bar, ranging from 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.BOTTLE_BAR[this.resolveImageIndex(percentage)]; 
        this.img = this.imageCache[path];
    }
    
}
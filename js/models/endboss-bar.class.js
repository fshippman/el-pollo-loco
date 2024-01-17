class EndbossBar extends DrawableObject {
    percentage = 100;

    ENDBOSS_ENERGY_BAR = [
        './assets/img/7_statusbars/2_statusbar_endboss/green.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange.png',
    ];


    /**
     * Constructs a new EndbossBar instance.
     * Initializes the endboss energy bar with a series of images representing different energy levels.
     * Sets the initial position, dimensions, and the starting percentage of the energy bar to full (100%).
     */
    constructor() {
        super();
        this.loadImages(this.ENDBOSS_ENERGY_BAR);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }


    /**
     * Sets the energy level of the endboss bar and updates the displayed image accordingly.
     * @param {number} percentage - The energy level percentage of the endboss, ranging from 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.ENDBOSS_ENERGY_BAR[this.resolveBossBarImageIndex(percentage)];
        this.img = this.imageCache[path];
    }


    /**
     * Resolves the index of an image for the endboss bar based on the current energy level percentage.
     * This method is used to select the appropriate energy bar image reflecting the endboss's current state.
     * @param {number} percentage - The current energy level percentage of the endboss.
     * @returns {number} The index of the corresponding energy bar image.
     */
    resolveBossBarImageIndex(percentage) {
        if (percentage > 65) {
            return 0;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 2;
        }
    }
    
}
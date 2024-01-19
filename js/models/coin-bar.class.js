class CoinBar extends DrawableObject {
    percentage;

    COIN_BAR = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];


    /**
     * Constructs a new CoinBar instance.
     * Initializes the coin bar with a series of images representing different fill levels.
     * Sets the initial position, dimensions, and the starting percentage of the coin bar to zero.
     */
    constructor() {
        super();
        this.loadImages(this.COIN_BAR);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);

    }


    /**
     * Sets the fill percentage of the coin bar and updates the displayed image accordingly.
     * @param {number} percentage - The percentage of coins collected, ranging from 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.COIN_BAR[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
    
}
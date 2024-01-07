class CoinBar extends DrawableObject {

    COIN_BAR = [
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        './assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ];
    percentage;
    constructor() {
        super();
        this.loadImages(this.COIN_BAR);
        this.x = 20;
        this.y = 50 ;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
       
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.COIN_BAR[this.resolveImageIndex(percentage)]
        this.img = this.imageCache[path];
    }
}
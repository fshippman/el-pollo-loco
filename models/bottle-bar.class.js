class BottleBar extends DrawableObject {

    BOTTLE_BAR = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
    ];
    percentage = 100;
    constructor() {
        super();
        this.loadImages(this.BOTTLE_BAR);
        this.x = 50;
        this.y = 100;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
        
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.BOTTLE_BAR[this.resolveImageIndex(percentage)]
        this.img = this.imageCache[path];
    }
}
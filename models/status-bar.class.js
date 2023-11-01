class StatusBar extends DrawableObject {

    ENERGY_BAR = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.ENERGY_BAR);
        this.x = 50;
        this.y = 50;
        this.width = 200;
        this.height = 60 ;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.ENERGY_BAR[this.resolveImageIndex(percentage)]
        this.img = this.imageCache[path];
    }
}

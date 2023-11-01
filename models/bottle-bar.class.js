class BottleBar extends DrawableObject {

    BOTTLES = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.BOTTLES);
        this.x = 50;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        // this.setPercentage(100);
        
    }
}
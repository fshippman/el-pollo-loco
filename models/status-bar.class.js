class StatusBar extends DrawableObject {

    ENERGY_BAR = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];
    world;

    percentage = 100;

    constructor() {
        super();
        this.test();
        // this.world.camera_x = -this.x + 100;
        this.loadImages(this.ENERGY_BAR);
        this.x = 50;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
       
        // console.log(this.world)
    }
    character;
    //setPercentage(50)
    setPercentage(percentage) {
        // console.log(this.world.camera_x)

        this.percentage = percentage; // => 0 ... 5
        let path = this.ENERGY_BAR[this.resolveImageIndex(percentage)]
        this.img = this.imageCache[path];
    }


    test() {
        setInterval(() => {
            this.x = this.character.x;
            
        }, 1000 / 60 );
       
    }

    resolveImageIndex(percentage) {
        if (percentage == 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
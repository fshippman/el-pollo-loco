class EndbossBar extends DrawableObject {

    ENDBOSS_ENERGY_BAR = [
        './assets/img/7_statusbars/2_statusbar_endboss/green.png',
        './assets/img/7_statusbars/2_statusbar_endboss/blue.png',
        './assets/img/7_statusbars/2_statusbar_endboss/orange.png',
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.ENDBOSS_ENERGY_BAR);
        this.x = 500;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    //
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 100
        let path = this.ENDBOSS_ENERGY_BAR[this.resolveBossBarImageIndex(percentage)] // => 0 ... 5  => richtiges Bild aus dem ENERGY_BAR Array wird path zugewiesen
        this.img = this.imageCache[path];
    }

// 85 70  55 40  25 10

    // gibt Wert zwischen 0 und 2 zurück basierend auf Prozentwerd weil 3 Balkenbilder vorhanden
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
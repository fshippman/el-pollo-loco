class Level {
    // statusbar;
    enemies;
    boss;
    clouds;
    backgroundObjects;
    deadChicken;
    bottles; // Das Bottle Array aus level1
    coins;
    start_x = -600;
    end_x = 2200;


    constructor(enemies, boss, clouds, backgroundObjects, bottles, coins) {
        // this.statusbar = statusbar
        this.enemies = enemies
        this.boss = boss
        this.clouds = clouds
        this.backgroundObjects = backgroundObjects
        this.bottles = bottles
        this.coins = coins
    }
}
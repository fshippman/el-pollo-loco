class Level {
    enemies;
    boss;
    clouds;
    backgroundObjects;
    deadChicken;
    bottles; // Das Bottle Array aus level1
    coins;
    level_start_x = -600;
    level_end_x = 2200;


    constructor(enemies, boss, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies
        this.boss = boss
        this.clouds = clouds
        this.backgroundObjects = backgroundObjects
        this.bottles = bottles
        this.coins = coins
    }
}
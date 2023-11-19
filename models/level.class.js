class Level {
    enemies;
    clouds;
    backgroundObjects;
    deadChicken;
    bottles; // Das Bottle Array aus level1
    level_start_x = -600;
    level_end_x = 2200;

    constructor(enemies, clouds, backgroundObjects, bottles) {
        this.enemies = enemies
        this.clouds = clouds
        this.backgroundObjects = backgroundObjects
        this.bottles = bottles
    }
}
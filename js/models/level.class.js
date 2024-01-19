class Level {
    enemies;
    boss;
    clouds;
    backgroundObjects;
    deadChicken;
    bottles;
    coins;
    start_x = -600; //x-coordinate - start of the level.
    end_x = 2200; //x-coordinate - end of the level


    /**
     * Constructs a new Level instance.
     * @param {MovableObject[]} enemies - The array of enemies in the level.
     * @param {MovableObject} boss - The boss of the level.
     * @param {MovableObject[]} clouds - The array of clouds in the level.
     * @param {MovableObject[]} backgroundObjects - The array of background objects in the level.
     * @param {MovableObject[]} bottles - The array of bottles in the level.
     * @param {MovableObject[]} coins - The array of coins in the level.
     */
    constructor(enemies, boss, clouds, backgroundObjects, bottles, coins) {
        this.enemies = enemies
        this.boss = boss
        this.clouds = clouds
        this.backgroundObjects = backgroundObjects
        this.bottles = bottles
        this.coins = coins
    }
    
}
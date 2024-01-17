/**
 * Initializes and starts Level 1 of the game.
 * It creates a new Level instance with enemies, endboss, clouds, background objects, bottles, and coins.
 */
function startLevel1() {
    level1 = new Level(
        createEnemies(),
        createEndboss(),
        createClouds(),
        createBackgroundObjects(),
        createBottles(),
        createCoins(),
    );
}


/**
 * Creates a list of enemy characters for the level.
 * It returns an array of Chicken and SmallChicken instances.
 * @returns {Array} An array of Chicken and SmallChicken instances.
 */
function createEnemies() {
    return [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),

        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),

        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),

        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),

        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),

        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ];
}


/**
 * Creates the endboss character for the level.
 * It returns an array containing a single Endboss instance.
 * @returns {Array} An array containing a single Endboss instance.
 */
function createEndboss() {
    return [
        new Endboss(),
    ];
}


/**
 * Creates cloud objects for the level background.
 * It returns an array of Cloud instances.
 * @returns {Array} An array of Cloud instances.
 */
function createClouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ];
}


/**
 * Creates background objects for the level.
 * It returns an array of BackgroundObject instances, each initialized with an image path and a position.
 * @returns {Array} An array of BackgroundObject instances.
 */
function createBackgroundObjects() {
    return [
        new BackgroundObject('./assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ];
}

/**
 * Creates bottle collectibles for the level.
 * It returns an array of Bottle instances, each initialized with a specific position.
 * @returns {Array} An array of Bottle instances.
 */
function createBottles() {
    return [
        new Bottle(-600), 
        new Bottle(-400),
        new Bottle(-330),
        new Bottle(-300),
        new Bottle(-100),
        new Bottle(300),
        new Bottle(500),
        new Bottle(800),
        new Bottle(1500),
        new Bottle(2000),
        new Bottle(2100), 
    ];
}


/**
 * Creates coin collectibles for the level.
 * It returns an array of Coin instances, each initialized with a specific position.
 * @returns {Array} An array of Coin instances.
 */
function createCoins() {
    return [
        new Coin(-550),
        new Coin(-400),
        new Coin(-250),
        new Coin(-150),
        new Coin(0),
        new Coin(300),
        new Coin(500),
        new Coin(700),
        new Coin(850),
        new Coin(1000),
        new Coin(1200),
        new Coin(1800),
        new Coin(1900),
        new Coin(2000),
        new Coin(2100),
    ];
}
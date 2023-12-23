function startLevel1() {
    level1 = new Level(
        // createStatusbar(),
        createEnemies(),
        createEndboss(),
        createClouds(),
        createBackgroundObjects(),
        createBottles(),
        createCoins(),
    );
}


// statusbar = new StatusBar();
// bottlebar = new BottleBar();
// coinbar = new CoinBar();
// endbossbar = new EndbossBar();

function createStatusbar(){
    return [
        new StatusBar()
    ]
}

function createEnemies() {
    return [
        // new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        // new Chicken(),

        // new SmallChicken(),
        // new SmallChicken(),
        // new SmallChicken(),
        // new SmallChicken(),
        // new SmallChicken(),
    ]
}

function createEndboss() {
    return [
        new Endboss(),
    ]
}

function createClouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
    ]
}

function createBackgroundObjects() {
    return [
        new BackgroundObject('assets/img/5_background/layers/air.png', -719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('assets/img/5_background/layers/air.png', 0),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('assets/img/5_background/layers/air.png', 719),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
        new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719 * 3),
    ]
}

function createBottles() {
    return [
        new Bottle(-600), //  -600 max x left!
        new Bottle(-400),
        new Bottle(-330),
        new Bottle(-300),
        new Bottle(-100),
        new Bottle(300),
        // new Bottle(400),
        // new Bottle(500),
        new Bottle(800),
        new Bottle(1500),
        new Bottle(2000),
        new Bottle(2100), //  2100 max x right!
    ]
}

function createCoins() {
    return [
        new Coin(-550),
        new Coin(-250),
        new Coin(-150),
        new Coin(0),
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
    ]
}
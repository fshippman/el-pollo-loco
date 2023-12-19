const level1 = new Level(
    [ 
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
       
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),

        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),

        // new SmallChicken(),
        // new SmallChicken(),
        // new SmallChicken(),
        // new SmallChicken(),
        // new SmallChicken(),

        // new SmallChicken(),
        // new SmallChicken(),
        // new SmallChicken(),


     
    ],
    [
        new Endboss()
    ],
    [
        new Cloud(),
        // new Cloud(),
        // new Cloud(),
        // new Cloud()
    ],
    [
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

        new BackgroundObject('assets/img/5_background/layers/air.png', 719*2),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719*2),
        new BackgroundObject('assets/img/5_background/layers/air.png', 719*3),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719*3)
       
    ],
    //BOTTLE ARRAY
    [
        new Bottle(-600), //  -600 max x left!
        new Bottle(-400),
        new Bottle(-330),
        new Bottle(-100),
        new Bottle(300),
        new Bottle(300),
        new Bottle(300),
        new Bottle(300),
        new Bottle(300),
        new Bottle(300),
        new Bottle(500),
        new Bottle(800),
        new Bottle(1500),
        new Bottle(2000),
        new Bottle(2100), //  2100 max x right!

    ]
 
); 
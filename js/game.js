let canvas;
let world;
let keyboard = new Keyboard();

function init() {
console.log('init');
   
}

function loadingScreen(){
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('loadingscreen').classList.remove('d-none');
}

function start(){
    document.getElementById('startscreen').classList.add('d-none');
    // document.getElementById('loadingscreen').classList.add('d-none');
    // document.getElementById('canvas').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
    //  document.getElementById('canvas').classList.remove('d-none')
    setTimeout(() =>  

   
    world.startEnemyMovement(),
    document.getElementById('canvas').classList.remove('d-none')

    , 10000);
   
}

// mute Sound with Key M
document.addEventListener("keypress", (e) => {
    if (e.keyCode == 77) {
        //Code 77 = M
    }
});


document.addEventListener("keydown", (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
});

document.addEventListener("keyup", (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode ==68) {
        keyboard.D = false;
    }
});


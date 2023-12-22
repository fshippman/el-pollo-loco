let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
// let lose_music =
let victory_sound = new Audio('assets/audio/good_end_C0.mp3');
let menu_music = new Audio('assets/audio/menu_music.mp3');
let game_over_sound = new Audio('assets/audio/game_over.mp3'); // GAME OVER SOUND attribution https://freesound.org/people/AdamWeeden/sounds/157218/

function init() {
    menu_music.play();
    menu_music.volume = 0.5;
    menu_music.loop = true;
}

// not just quick and dirty
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

function pauseAllSounds() {
    pauseCharacterSounds();
}

function pauseCharacterSounds() {
    world.character.game_music.pause();
    world.character.boss_music.pause();
    world.character.walking_sound.pause();
    world.character.jumping_sound.pause();
    world.character.throwing_sound.pause();
    world.character.sleeping_sound.pause();
}

function restartGame() {
    clearAllIntervals();
    clearArrays();
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    startGame();
}

function stopGameWin() {
    pauseAllSounds();
    playWinningSound();
    setTimeout(() => {
        document.getElementById('winningScreen').classList.remove('d-none');
        document.getElementById('loseScreen').classList.add('d-none');
        document.getElementById('startScreen').classList.add('d-none');
        document.getElementById('loadingScreen').classList.add('d-none');
    }, 3000);
}

function stopGameLose() {
    pauseAllSounds();
    playLosingSound(); 
    document.getElementById('loseScreen').classList.remove('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('loadingScreen').classList.add('d-none');
}


function playLosingSound() {
    game_over_sound.play();
    game_over_sound.volume = 0.5;
}

function clearArrays() {
    world.level.bottles = []
    world.level.coins = []
    world.level.enemies = []
    world.level.backgroundObjects = []
    world.level.clouds = []
    world.statusbar = []
    world.coinbar = []
    world.bottlebar = []
    world.endbossbar = []
    world.character = []
}

function playWinningSound() {
    victory_sound.play();
    victory_sound.volume = 0.5;
}

function loadingScreen() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
}


function startGame() {
    startLevel1();
    menu_music.pause();
    menu_music.currentTime = 0;
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    loadingScreen();
    setTimeout(() => showWorld(), 10000);
}

function showWorld() {
    menu_music.pause();
    document.getElementById('loadingScreen').classList.add('d-none');
    canvas.classList.remove('d-none');
    world.startAnimations();
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
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
});
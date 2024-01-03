let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundsMuted = false;
let gamePaused = false;

function init() {
    bindBTsPressEvents();
    MENU_MUSIC.play();
    MENU_MUSIC.volume = 1;
    MENU_MUSIC.loop = true;
    document.getElementById('pauseButton').classList.add('d-none');
    document.getElementById('panelBottom').classList.add('d-none');
}

function startGame() {
    stopMenuSound();
    startLevel1();
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    loadingScreen();
    setTimeout(() => showWorld(), 10000); 
}

function stopMenuSound() {
    MENU_MUSIC.pause();
    MENU_MUSIC.currentTime = 0;
}

function loadingScreen() {
    document.getElementById('loadingScreen').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
}

function showWorld() {
    unMuteAllSounds();
    muteEndscreenSounds();
    MENU_MUSIC.pause();
    resetMusic();
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('pauseButton').classList.remove('d-none');
    document.getElementById('panelBottom').classList.remove('d-none')
    canvas.classList.remove('d-none');
    world.startAnimations();
}

function muteEndscreenSounds() {
    VICTORY_MUSIC.volume = 0;
    GAME_OVER_MUSIC.volume = 0;
}

function resetMusic() {
    GAME_OVER_MUSIC.currentTime = 0;
    VICTORY_MUSIC.currentTime = 0;
    MENU_MUSIC.currentTime = 0;
    GAME_MUSIC.currentTime = 0;
    BOSS_MUSIC.currentTime = 0;
}

function pauseGame() {
    document.getElementById('pauseGame').src = './assets/img/icons/play.png'
    world.gameIsRunning = false;
    muteAllSounds();
}

function unpauseGame() {
    document.getElementById('pauseGame').src = './assets/img/icons/pause.png'
    world.gameIsRunning = true;
    unMuteAllSounds();
}

///----------------SOUNDS-----------------------------
function toggleMute() {
    if (soundsMuted) {
        unMuteAllSounds();
    } else {
        muteAllSounds();
    }
    soundsMuted = !soundsMuted
}

function muteAllSounds() {
    document.getElementById('muteGame').src = './assets/img/icons/sound_on.png'
    muteGameSounds();
    muteMusic();
}

function unMuteAllSounds() {
    document.getElementById('muteGame').src = './assets/img/icons/sound_off.png'
    unMuteGameSounds();
    unMuteMusic();
}

function muteGameSounds() {
    WALKING_SOUND.volume = 0;
    JUMPING_SOUND.volume = 0;
    HIT_SOUND.volume = 0;
    SLEEPING_SOUND.volume = 0;
    THROWING_SOUND.volume = 0;
    BOTTLE_SOUND.volume = 0;
    BOTTLE_SMASH_SOUND.volume = 0;
    COIN_SOUND.volume = 0;
    CHICKEN_SOUND.volume = 0;
}

function muteMusic() {
    GAME_OVER_MUSIC.volume = 0;
    VICTORY_MUSIC.volume = 0;
    MENU_MUSIC.volume = 0;
    GAME_MUSIC.volume = 0;
    BOSS_MUSIC.volume = 0;
}

function unMuteGameSounds() {
    WALKING_SOUND.volume = 1;
    JUMPING_SOUND.volume = 1;
    HIT_SOUND.volume = 1;
    SLEEPING_SOUND.volume = 1;
    THROWING_SOUND.volume = 1;
    BOTTLE_SOUND.volume = 1;
    BOTTLE_SMASH_SOUND.volume = 1;
    COIN_SOUND.volume = 1;
    CHICKEN_SOUND.volume = 1;
}

function unMuteMusic() {
    GAME_OVER_MUSIC.volume = 1;
    VICTORY_MUSIC.volume = 1;
    MENU_MUSIC.volume = 1;
    GAME_MUSIC.volume = 0.5;
    BOSS_MUSIC.volume = 0.5;
}

function togglePause() {
    if (gamePaused) {
        unpauseGame();
    } else {
        pauseGame();
    }
    gamePaused = !gamePaused
}
// function toggleMute(){
//     if (!soundsMuted) {
//         muteAllSounds();
//         soundsMuted = true;
//     } else {
//         unMuteAllSounds();
//         soundsMuted = false;
//     }
// }

function stopGameWin() {
    muteAllSounds();
    stopBossMusic();
    stopGameMusic();
    playWinningSound();
    setTimeout(() => {
        document.getElementById('winningScreen').classList.remove('d-none');
        document.getElementById('loseScreen').classList.add('d-none');
        document.getElementById('startScreen').classList.add('d-none');
        document.getElementById('loadingScreen').classList.add('d-none');
        document.getElementById('pauseButton').classList.add('d-none');
        document.getElementById('panelBottom').classList.add('d-none');
    }, 3000);
}


function stopGameLose() {
    muteAllSounds();
    stopBossMusic();
    stopGameMusic();
    playLosingSound();
    document.getElementById('loseScreen').classList.remove('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('pauseButton').classList.add('d-none');
    document.getElementById('panelBottom').classList.add('d-none');
}


function playLosingSound() {
    GAME_OVER_MUSIC.play();
    GAME_OVER_MUSIC.volume = 1;
    GAME_OVER_MUSIC.loop = true;
}

function playWinningSound() {
    VICTORY_MUSIC.play();
    VICTORY_MUSIC.volume = 1;
    VICTORY_MUSIC.loop = true;
}

function stopBossMusic() {
    BOSS_MUSIC.pause();
    BOSS_MUSIC.currentTime = 0;
}

function stopGameMusic() {
    GAME_MUSIC.pause();
    GAME_MUSIC.currentTime = 0;
}

function restartGame() {
    clearAllIntervals();
    clearArrays();
    muteAllSounds(); 
    GAME_OVER_MUSIC.pause();
    VICTORY_MUSIC.pause();
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    startGame();
}

// not just quick and dirty
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
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

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// mute Sound with Key M
document.addEventListener("keypress", (e) => {
    if (e.keyCode == 77) {
        //Code 77 = M
    }
});

function bindBTsPressEvents() {
    document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById('btnLeft').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });
    document.getElementById('btnRight').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById('btnRight').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });
    document.getElementById('btnJump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById('btnJump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });
    document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById('btnThrow').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.D = false;
    });

}


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



let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundsMuted = false;
let gamePaused = false;
let gameStarted = false;
let fullscreenActive = false;

function init() {
    playMenuMusic();
    bindBTsPressEvents();
    document.getElementById('pauseButton').classList.add('d-none');
    document.getElementById('panelBottom').classList.add('d-none');
}


function playMenuMusic() {
    MENU_MUSIC.volume = 1;
    MENU_MUSIC.loop = true;
    MENU_MUSIC.play().catch(() => setTimeout(playMenuMusic, 500));
}

function startGame() {
    gameStarted = true;
    stopMenuMusic();
    startLevel1();
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    loadingScreen();
    setTimeout(() => showWorld(), 10000);
}

function openHelp() {
    document.getElementById('gameInstructions').classList.remove('d-none');
    document.getElementById('closeButton').classList.remove('d-none');

    document.getElementById('startScreen').style.filter = "blur(10px)";
    document.getElementById('canvas').style.filter = "blur(10px)";
    document.getElementById('panelBottom').style.filter = "blur(10px)";
    if (gameStarted) {
        document.getElementById('closeButton').classList.add('d-none');
    }
}

function closeHelp() {
    document.getElementById('gameInstructions').classList.add('d-none');
    document.getElementById('closeButton').classList.add('d-none');

    document.getElementById('startScreen').style.filter = "none";
    document.getElementById('canvas').style.filter = "none";
    document.getElementById('panelBottom').style.filter = "none";
}

function stopMenuMusic() {
    MENU_MUSIC.pause();
    MENU_MUSIC.currentTime = 0;
}

function loadingScreen() {
    stopMenuMusic();
    document.getElementById('loadingScreen').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
}

function showWorld() {
    muteEndscreenSounds();
    resetMusic();
    MENU_MUSIC.pause();
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
    document.getElementById('pauseGame').src = './assets/img/icons/play.png';
    world.gameIsRunning = false;
    stopSleepingSound();
    openHelp();
}

function unpauseGame() {
    document.getElementById('pauseGame').src = './assets/img/icons/pause.png'
    world.gameIsRunning = true;
    closeHelp();
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
    GAME_OVER_MUSIC.volume = 0.5;
    VICTORY_MUSIC.volume = 0.5;
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



function stopGameWin() {
    gameStarted = false;
    stopSleepingSound();
    stopMenuMusic();
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
    gameStarted = false;
    stopSleepingSound();
    stopMenuMusic();
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
function checkSoundStatus(musicSrc){
    if (soundsMuted) {
        muteAllSounds();
        musicSrc.volume = 0;
    } else {
        unMuteAllSounds();
        musicSrc.volume = 0.5;
    }
}

function playLosingSound() {
    GAME_OVER_MUSIC.play();
    GAME_OVER_MUSIC.loop = true;
    checkSoundStatus(GAME_OVER_MUSIC);
}

function playWinningSound() {
    VICTORY_MUSIC.play();
    VICTORY_MUSIC.loop = true;
    checkSoundStatus(VICTORY_MUSIC);
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

function toggleFullscreen() {

    if (fullscreenActive) {
        exitFullscreen();
    } else {
        fullscreen();
    }
    fullscreenActive = !fullscreenActive
}



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

document.addEventListener("keypress", (e) => {
    if (e.keyCode == 112) {
        if (gameStarted) {
            togglePause();
        } else {
            alert("You can't pause the game if it's not running!");
        }
    }
});


document.addEventListener("keypress", (e) => {
    if (e.keyCode == 109) {
        toggleMute();
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
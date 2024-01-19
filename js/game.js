let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
let soundsMuted = false;
let gamePaused = false;
let gameStarted = false;
let fullscreenActive = false;


/**
 * Initializes the game's main menu.
 * 
 */
function init() {
    playMenuMusic();
    bindBTsPressEvents();
    document.getElementById('pauseButton').classList.add('d-none');
    document.getElementById('panelBottom').classList.add('d-none');
}


/**
 * Initiates the game sequence.
 * Sets the game as started, stops the menu music, initiates the first level, hides the start and winning screens,
 * sets up the canvas and world, displays the loading screen, and then reveals the game world after a short delay.
 */
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

/**
 * Displays the help/instructions screen over the game.
 * 
 */
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


/**
 * Closes the help/instructions screen.
 * 
 */
function closeHelp() {
    document.getElementById('gameInstructions').classList.add('d-none');
    document.getElementById('closeButton').classList.add('d-none');
    document.getElementById('startScreen').style.filter = "none";
    document.getElementById('canvas').style.filter = "none";
    document.getElementById('panelBottom').style.filter = "none";
}


/**
 * Shows the loading screen.
 * 
 */
function loadingScreen() {
    stopMenuMusic();
    document.getElementById('loadingScreen').classList.remove('d-none');
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
}


/**
 * Transitions from the loading screen to the main game world.
 * Also initiates the animations for the game world elements.
 */
function showWorld() {
    muteEndscreenSounds();
    resetMusic();
    stopMenuMusic();
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('pauseButton').classList.remove('d-none');
    document.getElementById('panelBottom').classList.remove('d-none')
    canvas.classList.remove('d-none');
    world.startAnimations();
}


/**
 * Pauses the game and opens the help screen and prevents the character from snoring while doing so.
 * 
 */
function pauseGame() {
    document.getElementById('pauseGame').src = './assets/img/icons/play.png';
    world.gameIsRunning = false;
    stopSleepingSound();
    openHelp();
}


/**
 * Cancels the pause and closes the helping Screen.
 * 
 */
function unpauseGame() {
    document.getElementById('pauseGame').src = './assets/img/icons/pause.png'
    world.gameIsRunning = true;
    closeHelp();
}


/**
 * Toggles the mute state for all game sounds.
 * Checks the current mute state and either mutes all sounds or unmutes them based on that state.
 * The state is then toggled to reflect the new mute status.
 */
function toggleMute() {
    if (soundsMuted) {
        unMuteAllSounds();
    } else {
        muteAllSounds();
    }
    soundsMuted = !soundsMuted
}


/**
 * Mutes all game sounds and music.
 *
 */
function muteAllSounds() {
    document.getElementById('muteGame').src = './assets/img/icons/sound_on.png'
    muteGameSounds();
    muteMusic();
}


/**
 * Unmutes all game sounds and music.
 *
 */
function unMuteAllSounds() {
    document.getElementById('muteGame').src = './assets/img/icons/sound_off.png'
    unMuteGameSounds();
    unMuteMusic();
}


/**
 * Toggles the pause state for the game.
 * Checks the current state and either pauses or unpauses the game based on that state.
 * The state is then toggled to reflect the new game status.
 */
function togglePause() {
    if (gamePaused) {
        unpauseGame();
    } else {
        pauseGame();
    }
    gamePaused = !gamePaused
}


/**
 * Handles the game-winning scenario.
 * Marks the game as not started, stops all game-related sounds, plays the winning sound,
 * and after a short delay, displays the winning screen while hiding the losing screen
 * and other irrelevant UI elements.
 */
function stopGameWin() {
    gameStarted = false;
    stopGameRelatedSounds();
    playWinningSound();
    setTimeout(() => {
        document.getElementById('winningScreen').classList.remove('d-none');
        document.getElementById('loseScreen').classList.add('d-none');
        hideScreensAndButtons();
    }, 3000);
}


/**
 * Handles the game-losing scenario.
 * Marks the game as not started, stops all game-related sounds, plays the losing sound,
 * Displays the losing screen while hiding the winning screen and other irrelevant UI elements.
 */
function stopGameLose() {
    gameStarted = false;
    stopGameRelatedSounds();
    playLosingSound();
    document.getElementById('loseScreen').classList.remove('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    hideScreensAndButtons();
}


/**
 * Stops all game related sounds and music.
 * 
 */
function stopGameRelatedSounds() {
    stopSleepingSound();
    stopMenuMusic();
    stopBossMusic();
    stopGameMusic();
}


/**
 * Hides various game UI elements, including the start screen, loading screen, pause button, and bottom panel.
 * 
 */
function hideScreensAndButtons() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('pauseButton').classList.add('d-none');
    document.getElementById('panelBottom').classList.add('d-none');
}


/**
 * Adjusts the game's sound settings based on the current mute status.
 * If sounds are muted, it ensures all sounds are muted and sets the provided music source's volume to 0.
 * If sounds are not muted, it unmutes all sounds and sets the music source's volume to a medium level (0.5).
 *
 * @param {HTMLAudioElement} musicSrc - The music source element whose volume is adjusted based on mute status.
 */
function checkSoundStatus(musicSrc) {
    if (soundsMuted) {
        muteAllSounds();
        musicSrc.volume = 0;
    } else {
        unMuteAllSounds();
        musicSrc.volume = 0.2;
    }
}


/**
 * Resets and restarts the game.
 * Clears all set intervals and arrays, mutes all sounds, pauses any endgame music,
 * hides the losing and winning screens, and then calls the function to start the game anew.
 */
function restartGame() {
    clearAllIntervals();
    clearArrays();
    muteAllSounds();
    stopLosingSound();
    stopWinningSound();
    document.getElementById('loseScreen').classList.add('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    startGame();
}


/**
 * Clears all active interval timers.
 * 
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}


/**
 * Resets game-related arrays to ensure the game state is reset.
 * 
 */
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


/**
 * Triggers fullscreen mode for the game.
 * 
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}


/**
 * Requests fullscreen mode for a given element, handling different browser APIs.
 *
 * @param {HTMLElement} element - The DOM element to be displayed in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}


/**
 * Exits fullscreen mode.
 *
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


/**
 * Toggles the fullscreen state of the game.
 * If fullscreen mode is active, it exits fullscreen; if not, it enters fullscreen mode.
 * Updates the state to reflect the current fullscreen status.
 */
function toggleFullscreen() {
    if (fullscreenActive) {
        exitFullscreen();
    } else {
        fullscreen();
    }
    fullscreenActive = !fullscreenActive
}
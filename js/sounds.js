/* ------------------------- MUSIC -------------------------*/
const GAME_OVER_MUSIC = new Audio('./assets/audio/game_over.mp3'); //2.
const VICTORY_MUSIC = new Audio('./assets/audio/victory.mp3'); //https://freesound.org/people/Peanut_Shaman/sounds/581415/
const MENU_MUSIC = new Audio('./assets/audio/menu_music.mp3'); //https://freesound.org/people/Timbre/sounds/94564/
const GAME_MUSIC = new Audio('./assets/audio/game_music.mp3'); //https://freesound.org/people/Timbre/sounds/406894/
const BOSS_MUSIC = new Audio('./assets/audio/boss_music.mp3'); //https://freesound.org/people/Timbre/sounds/146903/
/* ------------------------- CHARACTER-SOUNDS-------------------------*/
const WALKING_SOUND = new Audio('./assets/audio/running.mp3');
const JUMPING_SOUND = new Audio('./assets/audio/jump.mp3');
const HIT_SOUND = new Audio('./assets/audio/hit.mp3'); //HIT SOUND attribution https://freesound.org/people/Cigaro30/sounds/420932/
const SLEEPING_SOUND = new Audio('./assets/audio/sleep.mp3');
const THROWING_SOUND = new Audio('./assets/audio/throwing.mp3');
/* ------------------------- OBJECTS-AND-ENEMY-SOUNDS -------------------------*/
const BOTTLE_SOUND = new Audio('./assets/audio/bottle.mp3');
const BOTTLE_SMASH_SOUND = new Audio('./assets/audio/bottlesmash.mp3');
const COIN_SOUND = new Audio('./assets/audio/coin.mp3');
const CHICKEN_SOUND = new Audio('./assets/audio/chicken.mp3');



function playBottleCollectSound() {
    BOTTLE_SOUND.pause();
    BOTTLE_SOUND.currentTime = 0;
    BOTTLE_SOUND.play();
}

function playThrowingSound() {
    THROWING_SOUND.play();
}

/**
 * Plays the sound effect for a bottle smash.
 * 
 */
function playBottlesmashSound() {
    BOTTLE_SMASH_SOUND.play();
}

function playWalkingSound() {
    WALKING_SOUND.play();
}

function pauseWalkingSound() {
    WALKING_SOUND.pause();
}

function playHitSound() {
    HIT_SOUND.play();
}

function playSleepingSound() {
    SLEEPING_SOUND.play();
}

function playJumpingSound() {
    JUMPING_SOUND.play();
}

function stopSleepingSound() {
    SLEEPING_SOUND.pause();
    SLEEPING_SOUND.currentTime = 0;
}

function playChickenSound() {
    CHICKEN_SOUND.play();
}

function playCoinSound() {
    COIN_SOUND.play();
}


function playBossMusic() {
    GAME_MUSIC.pause();
    BOSS_MUSIC.play();
    BOSS_MUSIC.loop = true;
    checkSoundStatus(BOSS_MUSIC);
}

function stopBossMusic() {
    BOSS_MUSIC.pause();
    BOSS_MUSIC.currentTime = 0;
}

function playGameSound() {
    MENU_MUSIC.pause();
    GAME_MUSIC.play();
    GAME_MUSIC.loop = true;
    checkSoundStatus(GAME_MUSIC);
}

function stopGameMusic() {
    GAME_MUSIC.pause();
    GAME_MUSIC.currentTime = 0;
}

function playMenuMusic() {
    MENU_MUSIC.volume = 1;
    MENU_MUSIC.loop = true;
    MENU_MUSIC.play().catch(() => setTimeout(playMenuMusic, 500));
}

function stopMenuMusic() {
    MENU_MUSIC.pause();
    MENU_MUSIC.currentTime = 0;
}

function muteEndscreenSounds() {
    VICTORY_MUSIC.volume = 0;
    GAME_OVER_MUSIC.volume = 0;
}

function playWinningSound() {
    VICTORY_MUSIC.play();
    VICTORY_MUSIC.loop = true;
    checkSoundStatus(VICTORY_MUSIC);
}

function stopWinningSound() {
    VICTORY_MUSIC.pause();
    VICTORY_MUSIC.currentTime = 0;
}

function playLosingSound() {
    GAME_OVER_MUSIC.play();
    GAME_OVER_MUSIC.loop = true;
    checkSoundStatus(GAME_OVER_MUSIC);
}

function stopLosingSound() {
    GAME_OVER_MUSIC.pause();
    GAME_MUSIC.currentTime = 0;
}

function resetMusic() {
    GAME_OVER_MUSIC.currentTime = 0;
    VICTORY_MUSIC.currentTime = 0;
    MENU_MUSIC.currentTime = 0;
    GAME_MUSIC.currentTime = 0;
    BOSS_MUSIC.currentTime = 0;
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
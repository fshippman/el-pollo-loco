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


/**
 * Plays the throwing sound effect
 * 
 */
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


/**
 * Plays the walking sound.
 * 
 */
function playWalkingSound() {
    WALKING_SOUND.play();
}


/**
 * Pauses the walking sound.
 * 
 */
function pauseWalkingSound() {
    WALKING_SOUND.pause();
}


/**
 * Plays hitting sound.
 * 
 */
function playHitSound() {
    HIT_SOUND.play();
}


/**
 * Plays sleeping sound.
 * 
 */
function playSleepingSound() {
    SLEEPING_SOUND.play();
}


/**
 * Plays jumping sound.
 * 
 */
function playJumpingSound() {
    JUMPING_SOUND.play();
}


/**
 * This function pauses the sleeping sound and resets its current time to the start.
 * 
 */
function stopSleepingSound() {
    SLEEPING_SOUND.pause();
    SLEEPING_SOUND.currentTime = 0;
}


/**
 * Plays chicken sound.
 * 
 */
function playChickenSound() {
    CHICKEN_SOUND.play();
}


/**
 * Plays coin collecting sound.
 * 
 */
function playCoinSound() {
    COIN_SOUND.play();
}


/**
 * This function pauses the bottle sound, resets its current time to the start 
 * and plays it again to simulate the collecting sound of several bottles in a row.
 * 
 */
function playBottleCollectSound() {
    BOTTLE_SOUND.pause();
    BOTTLE_SOUND.currentTime = 0;
    BOTTLE_SOUND.play();
}


/**
 * This function pauses the general game music, plays the boss music, sets it to loop continuously,
 * and checks the current sound settings to ensure the boss music volume is correctly adjusted.
 */
function playBossMusic() {
    GAME_MUSIC.pause();
    BOSS_MUSIC.play();
    BOSS_MUSIC.loop = true;
    checkSoundStatus(BOSS_MUSIC);
}


/**
 * This function pauses the boss music and resets its current time to the start.
 * 
 */
function stopBossMusic() {
    BOSS_MUSIC.pause();
    BOSS_MUSIC.currentTime = 0;
}


/**
 * This function pauses the menu music, plays the game music, sets it to loop continuously,
 * and checks the current sound settings to ensure the game music volume is correctly adjusted.
 */
function playGameSound() {
    MENU_MUSIC.pause();
    GAME_MUSIC.play();
    GAME_MUSIC.loop = true;
    checkSoundStatus(GAME_MUSIC);
}


/**
 * This function pauses the game music and resets its current time to the start.
 * 
 */
function stopGameMusic() {
    GAME_MUSIC.pause();
    GAME_MUSIC.currentTime = 0;
}


/**
 * Begins playing the menu music.
 * Sets the volume to full, ensures the music loops continuously, and starts playing the music.
 * If playing the music fails, retries after a brief delay.
 */
function playMenuMusic() {
    MENU_MUSIC.volume = 0.2;
    MENU_MUSIC.loop = true;
    MENU_MUSIC.play().catch(() => setTimeout(playMenuMusic, 500));
}


/**
 * This function pauses the menu music and resets its current time to the start.
 * 
 */
function stopMenuMusic() {
    MENU_MUSIC.pause();
    MENU_MUSIC.currentTime = 0;
}


/**
 * Mutes the victory and game-over music.
 * 
 */
function muteEndscreenSounds() {
    VICTORY_MUSIC.volume = 0;
    GAME_OVER_MUSIC.volume = 0;
}


/**
 * This function plays the victory music, sets it to loop continuously,
 * and checks the current sound settings to ensure the victory music volume is correctly adjusted.
 */
function playWinningSound() {
    VICTORY_MUSIC.play();
    VICTORY_MUSIC.loop = true;
    checkSoundStatus(VICTORY_MUSIC);
}


/**
 * This function pauses the winning music and resets its current time to the start.
 * 
 */
function stopWinningSound() {
    VICTORY_MUSIC.pause();
    VICTORY_MUSIC.currentTime = 0;
}


/**
 * This function plays the game over music, sets it to loop continuously,
 * and checks the current sound settings to ensure the game over music volume is correctly adjusted.
 */
function playLosingSound() {
    GAME_OVER_MUSIC.play();
    GAME_OVER_MUSIC.loop = true;
    checkSoundStatus(GAME_OVER_MUSIC);
}


/**
 * This function pauses the game over music and resets its current time to the start.
 * 
 */
function stopLosingSound() {
    GAME_OVER_MUSIC.pause();
    GAME_MUSIC.currentTime = 0;
}


/**
 * Resets the current time of various game music tracks.
 * 
 */
function resetMusic() {
    GAME_OVER_MUSIC.currentTime = 0;
    VICTORY_MUSIC.currentTime = 0;
    MENU_MUSIC.currentTime = 0;
    GAME_MUSIC.currentTime = 0;
    BOSS_MUSIC.currentTime = 0;
}


/**
 * This function mutes the game sounds.
 * 
 */
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


/**
 * This function mutes all music.
 * 
 */
function muteMusic() {
    GAME_OVER_MUSIC.volume = 0;
    VICTORY_MUSIC.volume = 0;
    MENU_MUSIC.volume = 0;
    GAME_MUSIC.volume = 0;
    BOSS_MUSIC.volume = 0;
}


/**
 * This function unmutes the game sounds.
 * 
 */
function unMuteGameSounds() {
    WALKING_SOUND.volume = 0.2;
    JUMPING_SOUND.volume = 0.2;
    HIT_SOUND.volume = 0.2;
    SLEEPING_SOUND.volume = 0.2;
    THROWING_SOUND.volume = 0.2;
    BOTTLE_SOUND.volume = 0.2;
    BOTTLE_SMASH_SOUND.volume = 0.2;
    COIN_SOUND.volume = 0.2;
    CHICKEN_SOUND.volume = 0.2;
}


/**
 * This function unmutes all music.
 * 
 */
function unMuteMusic() {
    GAME_OVER_MUSIC.volume = 0.2;
    VICTORY_MUSIC.volume = 0.2;
    MENU_MUSIC.volume = 0.2;
    GAME_MUSIC.volume = 0.2;
    BOSS_MUSIC.volume = 0.2;
}
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

function playGameSound() {
    MENU_MUSIC.pause();
    GAME_MUSIC.play();
    GAME_MUSIC.loop = true;
    checkSoundStatus(GAME_MUSIC);
}

function playThrowingSound() {
    THROWING_SOUND.play();
}

function stopSleepingSound() {
    SLEEPING_SOUND.pause();
    SLEEPING_SOUND.currentTime = 0;
}

function playBossMusic() {
    GAME_MUSIC.pause();
    BOSS_MUSIC.play();
    BOSS_MUSIC.loop = true;
    checkSoundStatus(BOSS_MUSIC);
}
/**
 * Binds touch events to on-screen control buttons for mobile or touch-enabled devices.
 * Sets up event listeners for 'touchstart' and 'touchend' on directional, jump, and throw buttons,
 * preventing default behavior and updating the keyboard state to reflect the current input.
 */
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


/**
 * Listens for keypress events and toggles the game's pause state when the 'P' key (keyCode 112) is pressed.
 * Displays an alert if an attempt is made to pause the game when it's not running.
 */
document.addEventListener("keypress", (e) => {
    if (e.keyCode == 112) {
        if (gameStarted) {
            togglePause();
        } else {
            alert("You can't pause the game if it's not running!");
        }
    }
});


/**
 * Listens for keypress events and toggles the game's mute state when the 'M' key (keyCode 109) is pressed.
 * Activates or deactivates the game's audio based on the current mute state.
 */
document.addEventListener("keypress", (e) => {
    if (e.keyCode == 109) {
        toggleMute();
    }
});


/**
 * Listens for keydown events to handle player movement and actions.
 * Updates the keyboard state based on arrow keys for movement, the space bar for jumping, and the 'D' key for an action (e.g., throwing).
 */
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


/**
 * Listens for keyup events to update the keyboard state when player movement or action keys are released.
 * Resets the corresponding state in the keyboard object for arrow keys, space bar, and 'D' key to false, indicating the key is no longer pressed.
 */
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
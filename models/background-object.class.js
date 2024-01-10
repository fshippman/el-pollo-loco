class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;

    /**
     * Creates a new BackgroundObject instance.
     * It loads an image for the background object and sets its initial position.
     * @param {string} imagePath - The path to the image file for the background object.
     * @param {number} x - The x-coordinate for the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height; // Set the y-coordinate based on the height.
    }
}
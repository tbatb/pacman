/**
 * Represents a Pacman character in the game.
 */
class Pacman {
    constructor(x, y, direction, speed, score) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.direction = DIRECTIONS.DIRECTION_RIGHT;
        this.newDirection = 4;
        this.speed = speed;
        this.frameCount = 7;
        this.score = score;
        this.currentFrameCount = 4;
        setInterval(() = > {
            this.changeAnimation();
        }, 1000);
    }

    eat() {


    }

    /**
     * Controls the movement of an object by changing its direction and moving it from left to right.
     * If a collision with a ghost is detected, it reverses the movement from right to left.
     *
     * @return {void}
     */
    movement() {
        this.changeDirection();
        this.moveLeft2Right(); // moving ---->
        if (this.checkCollisionWithGhost()) {
            this.moveRight2Left(); // <---
        }
    }

    /**
     * Moves an object in one of four directions (left, right, up, down) based on the current direction and speed.
     *
     * @return {void} This method does not return a value.
     */
    moveLeft2Right() {
        switch (this.direction) {
            case DIRECTIONS.DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTIONS.DIRECTION_LEFT:
                this.x += this.speed;
                break;
            case DIRECTIONS.DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTIONS.DIRECTION_DOWN:
                this.y -= this.speed;
                break;

        }

    }

    moveRight2Left() {
        switch (this.direction) {
            case DIRECTIONS.DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTIONS.DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTIONS.DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTIONS.DIRECTION_DOWN:
                this.y += this.speed;
                break;

        }
    }

    moveUp() {

    }

    moveDown() {

    }

    changeDirection() {

    }

    checkCollisionWithGhost() {

    }

    changeAnimation() {

    }

    draw() {

    }

}
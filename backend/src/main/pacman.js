/**
 * Represents a Pacman character in the game.
 */
class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.score = score;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.frameCount = 7;
        this.newDirection = 4;
        this.currentFrameCount = 1;
        this.direction = DIRECTIONS.DIRECTION_RIGHT;

        setInterval(() => {
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
        let ifCollision = false;
        if (
              sampleBoard[this.getBoardY()][this.getBoardX()] === 1
              || sampleBoard[this.getBoardYRightside()][this.getBoardX()] === 1
              || sampleBoard(this.getBoardY())[this.getBoardXRightside()] === 1
              || sampleBoard[this.getBoardYRightside()][this.getBoardXRightside()] === 1
        ) {
            return true;

        }
        return false;

    }

    changeAnimation() {
        this.currentFrameCount = this.currentFrameCount ? 1 : this.currentFrameCount + 1;


    }

    draw() {
        canvasContext.save();
        canvasContext.translate(
              this.x + oneBlockSize / 2,
              this.y + oneBlockSize / 2
        );
        canvasContext.rotate((this.direction * 90 *  Math.PI) / 180);
        canvasContext.translate(
              -this.x - oneBlockSize / 2,
              this.y + oneBlockSize / 2
        );
        canvasContext.restore();

    }

    getBoardX() {
        return parseInt(this.x / oneBlockSize);
    }

    getBoardY() {
        return parseInt(this.y / oneBlockSize);
    }


    getBoardXRightside() {
        const epsilon = 0.9999;
        return parseInt((this.x + epsilon * oneBlockSize) / oneBlockSize);
    }

    getBoardYRightside() {
        const epsilon = 0.9999;
        return parseInt((this.y + epsilon * oneBlockSize) / oneBlockSize);
    }


}
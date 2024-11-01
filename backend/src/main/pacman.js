class Pacman {
    constructor(x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = DIRECTION_RIGHT;
        this.frameCount = 7;
        this.currentFrameCount = 1;

        // Handle animation frame changes
        setInterval(() => {
            this.changeAnimation();
        }, 100);
    }

    eat() {
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                if (
                      matrix[i][j] === 2 &&
                      this.getBoardX() === j &&
                      this.getBoardY() === i
                ) {
                    matrix[i][j] = 3;
                    score++;
                }
            }
        }
    }

    movement() {
        this.changeDirection();
        this.moveForwards(); // moving ---->
        if (this.checkCollisions()) {
            this.moveBackwards(); // <---
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_DOWN:
                this.y += this.speed;
                break;
        }
    }

    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_LEFT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTION_DOWN:
                this.y -= this.speed;
                break;
        }
    }

    changeDirection() {
        if (this.nextDirection !== this.direction) {
            // Check if the next direction is possible
            let prospectiveDirection = this.nextDirection;
            let canChange = this.canChangeDirection(prospectiveDirection);
            if (canChange) {
                this.direction = prospectiveDirection;
            }
        }
    }

    canChangeDirection(direction) {
        let prospectiveX = this.x;
        let prospectiveY = this.y;

        switch (direction) {
            case DIRECTION_RIGHT:
                prospectiveX += this.speed;
                break;
            case DIRECTION_LEFT:
                prospectiveX -= this.speed;
                break;
            case DIRECTION_UP:
                prospectiveY -= this.speed;
                break;
            case DIRECTION_DOWN:
                prospectiveY += this.speed;
                break;
            default:
                return false;
        }

        // Check map boundaries
        if (
              matrix[parseInt(prospectiveY / oneBlockSize)][parseInt(prospectiveX / oneBlockSize)] === 1
        ) {
            return false;
        }

        return true;
    }

    checkCollisions() {
        const epsilon = 0.9999;
        return (
              matrix[parseInt(this.y / oneBlockSize)][parseInt(this.x / oneBlockSize)] === 1 ||
              matrix[parseInt((this.y + epsilon * oneBlockSize) / oneBlockSize)][parseInt(this.x / oneBlockSize)] === 1 ||
              matrix[parseInt(this.y / oneBlockSize)][parseInt((this.x + epsilon * oneBlockSize) / oneBlockSize)] === 1 ||
              matrix[parseInt((this.y + epsilon * oneBlockSize) / oneBlockSize)][parseInt((this.x + epsilon * oneBlockSize) / oneBlockSize)] === 1
        );
    }

    checkCollisionsWithGhosts(ghosts) {
        for (let ghost of ghosts) {
            if (
                  ghost.getBoardX() === this.getBoardX() &&
                  ghost.getBoardY() === this.getBoardY()
            ) {
                return true;
            }
        }
        return false;
    }

    changeAnimation() {
        this.currentFrameCount =
              this.currentFrameCount === this.frameCount ? 1 : this.currentFrameCount + 1;
    }

    draw() {
        canvasContext.save();
        canvasContext.translate(
              this.x + oneBlockSize / 2,
              this.y + oneBlockSize / 2
        );
        canvasContext.rotate((this.direction * 90 * Math.PI) / 180);
        canvasContext.translate(
              -this.x - oneBlockSize / 2,
              -this.y - oneBlockSize / 2
        );
        canvasContext.drawImage(
              pacmanFrames,
              (this.currentFrameCount - 1) * oneBlockSize,
              0,
              oneBlockSize,
              oneBlockSize,
              this.x,
              this.y,
              this.width,
              this.height
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
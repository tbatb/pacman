class Ghost {
    constructor(x, y, width, height, speed, imageX, imageY, imageWidth, imageHeight, range) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.imageX = imageX;
        this.imageY = imageY;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.direction = DIRECTION_RIGHT;
        this.range = range;
        this.randomTargetIndex = parseInt(Math.random() * 4);
        //this.target = randomTargetsForGhosts[this.randomTargetIndex];
        this.frameCount = 4; // Assuming 4 frames for ghost animation
        this.currentFrameCount = 1;
        setInterval(() => {
            this.changeRandomDirection();
        }, 10000);
        setInterval(() => {
            this.changeAnimation();
        }, 200); // Adjust animation speed as needed
    }

    isInRange() {
        let xDistance = Math.abs(pacman.getBoardX() - this.getBoardX());
        let yDistance = Math.abs(pacman.getBoardY() - this.getBoardY());
        return Math.sqrt(xDistance * xDistance + yDistance * yDistance) <= this.range;
    }

    changeRandomDirection() {
        this.randomTargetIndex = (this.randomTargetIndex + 1) % randomTargetsForGhosts.length;
        this.target = randomTargetsForGhosts[this.randomTargetIndex];
    }

    moveProcess() {
        if (this.isInRange()) {
            this.target = pacman;
        } else {
            this.target = randomTargetsForGhosts[this.randomTargetIndex];
        }
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollisions()) {
            this.moveBackwards();
            return;
        }
    }

    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTION_LEFT:
                this.x += this.speed;
                break;
            case DIRECTION_DOWN:
                this.y -= this.speed;
                break;
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
            case DIRECTION_DOWN:
                this.y += this.speed;
                break;
        }
    }

    checkCollisions() {
        let isCollided = false;
        const epsilon = 0.9999;
        if (
              matrix[parseInt(this.y / oneBlockSize)]
                    [parseInt(this.x / oneBlockSize)]
              === 1 ||
              matrix[parseInt(this.y / oneBlockSize + epsilon)]
                    [parseInt(this.x / oneBlockSize)] 
              === 1 ||
              matrix[parseInt(this.y / oneBlockSize)]
                    [parseInt(this.x / oneBlockSize + epsilon)] 
              === 1 ||
              matrix[parseInt(this.y / oneBlockSize + epsilon)]
                    [parseInt(this.x / oneBlockSize + epsilon)] 
              === 1
        ) {
            isCollided = true;
        }
        return isCollided;
    }

    changeDirectionIfPossible() {
        let tempDirection = this.direction;
        this.direction = this.calculateNewDirection(
              matrix,
              pacman.getBoardX(),
              pacman.getBoardY()
        );
        if (typeof this.direction === "undefined") {
            this.direction = tempDirection;
            return;
        }
        // Adjust direction based on board positions
        if (
              this.getBoardY() !== this.getBoardYRightside() &&
              (this.direction === DIRECTION_LEFT || this.direction === DIRECTION_RIGHT)
        ) {
            this.direction = DIRECTION_UP;
        }
        if (
              this.getBoardX() !== this.getBoardXRightside() &&
              this.direction === DIRECTION_UP
        ) {
            this.direction = DIRECTION_LEFT;
        }
        this.moveForwards();
        if (this.checkCollisions()) {
            this.moveBackwards();
            this.direction = tempDirection;
        } else {
            this.moveBackwards();
        }
        console.log(this.direction);
    }

    calculateNewDirection(matrix, destX, destY) {
        let mp = [];
        for (let i = 0; i < matrix.length; i++) {
            mp[i] = matrix[i].slice();
        }

        let queue = [
            {
                x: this.getBoardX(),
                y: this.getBoardY(),
                rightX: this.getBoardXRightside(),
                rightY: this.getBoardYRightside(),
                moves: [],
            },
        ];
        while (queue.length > 0) {
            let popped = queue.shift();
            if (popped.x === destX && popped.y === destY) {
                return popped.moves[0];
            } else {
                mp[popped.y][popped.x] = 1;
                let neighborList = this.addNeighbors(popped, mp);
                for (let i = 0; i < neighborList.length; i++) {
                    queue.push(neighborList[i]);
                }
            }
        }

        return DIRECTION_DOWN; // Default direction if no path found
    }

    addNeighbors(popped, mp) {
        let neighbors = [];
        let numOfRows = mp.length;
        let numOfColumns = mp[0].length;

        // Left
        if (
              popped.x - 1 >= 0 &&
              popped.x - 1 < numOfColumns &&
              mp[popped.y][popped.x - 1] !== 1
        ) {
            let tempMoves = popped.moves.slice();
            tempMoves.push(DIRECTION_LEFT);
            neighbors.push({ x: popped.x - 1, y: popped.y, moves: tempMoves });
        }
        // Right
        if (
              popped.x + 1 >= 0 &&
              popped.x + 1 < numOfColumns &&
              mp[popped.y][popped.x + 1] !== 1
        ) {
            let tempMoves = popped.moves.slice();
            tempMoves.push(DIRECTION_RIGHT);
            neighbors.push({ x: popped.x + 1, y: popped.y, moves: tempMoves });
        }
        // Up
        if (
              popped.y - 1 >= 0 &&
              popped.y - 1 < numOfRows &&
              mp[popped.y - 1][popped.x] !== 1
        ) {
            let tempMoves = popped.moves.slice();
            tempMoves.push(DIRECTION_UP);
            neighbors.push({ x: popped.x, y: popped.y - 1, moves: tempMoves });
        }
        // Down
        if (
              popped.y + 1 >= 0 &&
              popped.y + 1 < numOfRows &&
              mp[popped.y + 1][popped.x] !== 1
        ) {
            let tempMoves = popped.moves.slice();
            tempMoves.push(DIRECTION_DOWN);
            neighbors.push({ x: popped.x, y: popped.y + 1, moves: tempMoves });
        }
        return neighbors;
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

    changeAnimation() {
        this.currentFrameCount =
              this.currentFrameCount === this.frameCount ? 1 : this.currentFrameCount + 1;
    }

    draw() {
        canvasContext.save();
        // Handle ghost animation frames if applicable
        // Assuming ghostFrames sprite sheet has multiple frames horizontally
        canvasContext.drawImage(
              ghostFrames,
              this.imageX + (this.currentFrameCount - 1) * this.imageWidth,
              this.imageY,
              this.imageWidth,
              this.imageHeight,
              this.x,
              this.y,
              this.width,
              this.height
        );
        canvasContext.restore();

        // Optional: Draw range circle for debugging
        /*
        canvasContext.beginPath();
        canvasContext.strokeStyle = "red";
        canvasContext.arc(
            this.x + oneBlockSize / 2,
            this.y + oneBlockSize / 2,
            this.range * oneBlockSize,
            0,
            2 * Math.PI
        );
        canvasContext.stroke();
        */
    }
}

// Ensure that `randomTargetsForGhosts` is defined in your code.
// Example:
const randomTargetsForGhosts = [
    { x: 1, y: 1 },
    { x: 19, y: 1 },
    { x: 1, y: 19 },
    { x: 19, y: 19 },
];

// Update `createGhosts` function to match any changes if necessary
let createGhosts = () => {
    ghosts = [];
    for (let i = 0; i < ghostCount; i++) { // Adjusted to ghostCount instead of ghostCount * 2
        let newGhost = new Ghost(
              9 * oneBlockSize + (i % 2 === 0 ? 0 : 1) * oneBlockSize,
              10 * oneBlockSize + (i % 2 === 0 ? 0 : 1) * oneBlockSize,
              oneBlockSize,
              oneBlockSize,
              pacman.speed / 2,
              ghostImageLocation[i % ghostImageLocation.length].x,
              ghostImageLocation[i % ghostImageLocation.length].y,
              124, // Adjust imageWidth if needed
              116, // Adjust imageHeight if needed
              6 + i // Range
        );
        ghosts.push(newGhost);
    }
};
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById('animations');
const ghostFrames = document.getElementById('ghosts');

let fps = 30;
let oneBlockSize = 20;
let wallColor = '#342DCA';
let blockLineWidth = 2;
let wallSpaceWidth = oneBlockSize / blockLineWidth;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = 'black';

// define directions
const DIRECTIONS = {
    DIRECTION_RIGHT: 4,
    DIRECTION_UP: 3,
    DIRECTION_LEFT: 2,
    DIRECTION_DOWN: 1
};


let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};

let sampleBoard = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];


let createPacman = () => {
    pacman = new Pacman(
          oneBlockSize,
          oneBlockSize,
          oneBlockSize,
          oneBlockSize / 5
    );
};

let gameLoop = () => {
    update();
    draw();
}

let update = () => {
    //todo
}
let draw = () => {
    createRect(0, 0, canvas.width, canvas.height, "black");

    drawWallMatrix();
};

let gameLength = setInterval(gameLoop, 1000 / fps);

let drawWallMatrix = () => {
    for (let i = 0; i < sampleBoard.length; i++) {
        for (let j = 0; j < sampleBoard[0].length; j++) {
            if (sampleBoard[i][j] === 1) {
                createRect(
                      j * oneBlockSize,
                      i * oneBlockSize,
                      oneBlockSize,
                      oneBlockSize,
                      wallColor
                );

                if (j > 0 && sampleBoard[i][j - 1] === 1) {
                    createRect(
                          j * oneBlockSize,
                          i * oneBlockSize + wallOffset,
                          wallSpaceWidth + wallOffset, 
                          wallSpaceWidth,
                          wallInnerColor,
                    );
                }
                if (j < sampleBoard[0].length - 1 && sampleBoard[i][j + 1] === 1) {
                    createRect(
                          j * oneBlockSize + wallOffset,
                          i * oneBlockSize + wallOffset,
                          wallSpaceWidth + wallOffset, 
                          wallSpaceWidth,
                          wallInnerColor,
                    );
                }
                if (i > 0 && sampleBoard[i-1][j] === 1) {
                    createRect(
                          j * oneBlockSize + wallOffset,
                          i * oneBlockSize,
                          wallSpaceWidth,
                          wallSpaceWidth + wallOffset,
                          wallInnerColor,
                    );
                }
                if (i < sampleBoard.length - 1 && sampleBoard[i+1][j] === 1) {
                    createRect(
                          j * oneBlockSize + wallOffset,
                          i * oneBlockSize + wallOffset,
                          wallSpaceWidth,
                          wallSpaceWidth + wallOffset,
                          wallInnerColor,
                    );
                }
            }
        }
    }
};


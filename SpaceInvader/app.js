const squares = document.querySelectorAll('.grid div');
const resultDisplay = document.querySelector('#result');
const message = document.querySelector('#message');
const startBtn = document.querySelector('#start');
let width = 15;

let currentShooterIndex = 202;
let currentInvaderIndex = 0;
let alienInvadersTakenDown = [];
let result = 0;
let direction = 1;
let invaderId;
let gameOver = false;
let alienInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
];
alienInvaders.forEach((invader) => {
    squares[currentInvaderIndex + invader].classList.add('invader');
})
squares[currentShooterIndex].classList.add('shooter');
document.addEventListener('keydown', moveShooter);
invaderId = setInterval(moveInvaders, 500);
document.addEventListener('keydown', shoot);
startBtn.addEventListener('click', reset);

function reset() {
    clearInterval(invaderId);
    squares.forEach((squares) => {
        squares.classList.remove('shooter', 'invader', 'boom', 'laser');
    })
    currentShooterIndex = 202;
    currentInvaderIndex = 0;
    alienInvadersTakenDown = [];
    result = 0;
    direction = 1;
    invaderId;
    gameOver = false;
    alienInvaders = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
        30, 31, 32, 33, 34, 35, 36, 37, 38, 39
    ];
    alienInvaders.forEach((invader) => {
        squares[currentInvaderIndex + invader].classList.add('invader');
    })
    squares[currentShooterIndex].classList.add('shooter');
    document.addEventListener('keydown', moveShooter);
    invaderId = setInterval(moveInvaders, 500);
    document.addEventListener('keydown', shoot);
    message.textContent = "";
    startBtn.textContent = "RESET";
    resultDisplay.textContent = 0;
}

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter');
    switch (e.keyCode) {
        case 37: {
            if (currentShooterIndex % width != 0 && !gameOver) {
                currentShooterIndex -= 1;
            } break;
        }
        case 39: {
            if (currentShooterIndex % width < width - 1 && !gameOver) {
                currentShooterIndex += 1;
            }
            break;
        }
    }
    squares[currentShooterIndex].classList.add('shooter');
}

function moveInvaders() {
    const leftEdge = alienInvaders[0] % width == 0;
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width == width - 1;

    if ((leftEdge && direction == -1) || (rightEdge && direction == 1)) {
        direction = width;
    }
    else if (direction == width) {
        if (leftEdge) {
            direction = 1;
        }
        else {
            direction = -1;
        }
    }

    for (let i = 0; i < alienInvaders.length && !gameOver && alienInvaders[i] < 225; i++) {
        squares[alienInvaders[i]].classList.remove('invader');
    }

    for (let i = 0; i < alienInvaders.length && !gameOver; i++) {
        alienInvaders[i] += direction;
    }

    for (let i = 0; i < alienInvaders.length && !gameOver; i++) {
        if (!alienInvadersTakenDown.includes(i)) {
            squares[alienInvaders[i]].classList.add('invader');
        }
    }

    if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        gameOver = true;
        message.textContent = "GAME OVER!";
        startBtn.textContent = "PLAY AGAIN?";
        squares[currentShooterIndex].classList.add('boom');
        clearInterval(invaderId);
    }

    for (let i = 0; i < alienInvaders.length && !gameOver; i++) {
        if (alienInvaders[i] < 225 && squares[alienInvaders[i]].classList.contains('invader') && alienInvaders[i] > 209) {
            gameOver = true;
            startBtn.textContent = "PLAY AGAIN?";
            message.textContent = "GAME OVER!";
            clearInterval(invaderId);
        }
    }

    if (alienInvadersTakenDown.length == alienInvaders.length) {
        gameOver = true;
        startBtn.textContent = "PLAY AGAIN?";
        message.textContent = "GAME OVER!";
        clearInterval(invaderId);
    }

}

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove('laser');
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add('laser');

        if (squares[currentLaserIndex].classList.contains('invader')) {
            squares[currentLaserIndex].classList.remove('laser');
            squares[currentLaserIndex].classList.remove('invader');
            squares[currentLaserIndex].classList.add('boom');
            setTimeout(() => {
                squares[currentLaserIndex].classList.remove('boom')
            }, 250);
            clearInterval(laserId);

            const alienTakenDown = alienInvaders.indexOf(currentLaserIndex);
            alienInvadersTakenDown.push(alienTakenDown);
            result++;
            resultDisplay.textContent = result;

        }
        if (currentLaserIndex < width) {
            clearInterval(laserId);
            setTimeout(() => { squares[currentLaserIndex].classList.remove('laser') }, 100);
        }
    }

    switch (e.keyCode) {
        case 32: {
            if (!gameOver) {
                laserId = setInterval(moveLaser, 100);
                break;
            }
        }
    }
}
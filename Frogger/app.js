const squares = document.querySelectorAll('.grid div');
const timeLeft = document.querySelector('#time-left');
const result = document.querySelector('#result');
const startBtn = document.querySelector('#button');
const width = 9;
const carLeft = document.querySelectorAll('.car-left');
const carRight = document.querySelectorAll('.car-right');
const logLeft = document.querySelectorAll('.log-left');
const logRight = document.querySelectorAll('.log-right');

let currentIndex = 76;
let currentTime = 20;
let timerId;
squares[currentIndex].classList.add('frog');
startBtn.addEventListener('click', reset)

function reset() {
    clearInterval(timerId);
    squares[currentIndex].classList.remove('frog');
    currentIndex = 76;
    currentTime = 20;
    timeLeft.textContent = currentTime;
    timerId = setInterval(movePieces, 1000);
    squares[currentIndex].classList.add('frog');
    document.addEventListener('keyup', moveFrog);
    result.textContent = "";
    startBtn.textContent = "RESET";
}


function moveFrog(e) {
    squares[currentIndex].classList.remove('frog');
    switch (e.keyCode) {
        case 37: {
            if (currentIndex % width !== 0) {
                currentIndex -= 1;
            }
            break;
        }
        case 38: {
            if (currentIndex - width >= 0) {
                currentIndex -= width;
            }
            break;
        }
        case 39: {
            if (currentIndex % width !== width - 1) {
                currentIndex += 1;
            }
            break;
        }
        case 40: {
            if (currentIndex + width < 81) {
                currentIndex += width;
            }
            break;
        }
    }
    squares[currentIndex].classList.add('frog');
    lose();
    win();
}

function autoMoveCars() {
    carLeft.forEach((car) => { moveCarLeft(car); });
    carRight.forEach((car) => { moveCarRight(car); });
}

function moveCarLeft(car) {
    switch (true) {
        case car.classList.contains('c1'): {
            car.classList.remove('c1');
            car.classList.add('c2');
            break;
        }
        case car.classList.contains('c2'): {
            car.classList.remove('c2');
            car.classList.add('c3');
            break;
        }
        case car.classList.contains('c3'): {
            car.classList.remove('c3');
            car.classList.add('c1');
            break;
        }
    }
}

function moveCarRight(car) {
    switch (true) {
        case car.classList.contains('c1'): {
            car.classList.remove('c1');
            car.classList.add('c3');
            break;
        }
        case car.classList.contains('c2'): {
            car.classList.remove('c2');
            car.classList.add('c1');
            break;
        }
        case car.classList.contains('c3'): {
            car.classList.remove('c3');
            car.classList.add('c2');
            break;
        }
    }
}


function autoMoveLogs() {
    logLeft.forEach((log) => { moveLogLeft(log); });
    logRight.forEach((log) => { moveLogRight(log); });
}

function moveLogLeft(log) {
    switch (true) {
        case log.classList.contains('l1'): {
            log.classList.remove('l1');
            log.classList.add('l2');
            break;
        }
        case log.classList.contains('l2'): {
            log.classList.remove('l2');
            log.classList.add('l3');
            break;
        }
        case log.classList.contains('l3'): {
            log.classList.remove('l3');
            log.classList.add('l4');
            break;
        }
        case log.classList.contains('l4'): {
            log.classList.remove('l4');
            log.classList.add('l5');
            break;
        }
        case log.classList.contains('l5'): {
            log.classList.remove('l5');
            log.classList.add('l1');
            break;
        }
    }
}

function moveLogRight(log) {
    switch (true) {
        case log.classList.contains('l1'): {
            log.classList.remove('l1');
            log.classList.add('l5');
            break;
        }
        case log.classList.contains('l2'): {
            log.classList.remove('l2');
            log.classList.add('l1');
            break;
        }
        case log.classList.contains('l3'): {
            log.classList.remove('l3');
            log.classList.add('l2');
            break;
        }
        case log.classList.contains('l4'): {
            log.classList.remove('l4');
            log.classList.add('l3');
            break;
        }
        case log.classList.contains('l5'): {
            log.classList.remove('l5');
            log.classList.add('l4');
            break;
        }
    }
}

function win() {
    if (squares[4].classList.contains('frog')) {
        result.textContent = "YOU WON!";
        startBtn.textContent = "PLAY AGAIN?";
        squares[currentIndex].classList.remove('frog');
        clearInterval(timerId);
        document.removeEventListener('keyup', moveFrog);
    }
}

function lose() {
    if (currentTime === 0 || squares[currentIndex].classList.contains('c1') || squares[currentIndex].classList.contains('l5') || squares[currentIndex].classList.contains('l4')) {
        result.textContent = "YOU LOST!";
        startBtn.textContent = "PLAY AGAIN?";
        squares[currentIndex].classList.remove('frog');
        clearInterval(timerId);
        document.removeEventListener('keyup', moveFrog);
    }
}

function moveWithLogLeft() {
    if (currentIndex >= 27 && currentIndex <= 35) {
        squares[currentIndex].classList.remove('frog');
        currentIndex += 1;
        squares[currentIndex].classList.add('frog');
    }
}

function moveWithLogRight() {
    if (currentIndex >= 18 && currentIndex <= 26) {
        squares[currentIndex].classList.remove('frog');
        currentIndex -= 1;
        squares[currentIndex].classList.add('frog');
    }
}

function movePieces() {
    currentTime--;
    timeLeft.textContent = currentTime;
    autoMoveLogs();
    autoMoveCars();
    moveWithLogLeft();
    moveWithLogRight();
    lose();
}


$("#rules").click(function () {
    let div = $(`<div class="modal">
        <div id="close">EXIT</div>
        <div class="modal-rules-heading">
            <h1>HOW TO PLAY</h1>
        </div>
        <div class="modal-rules-list">
            <ul>
                <li>You have 20 seconds from pressing the start/reset button to get to your home to win the game.</li>
                <li>You will lose if the time runs out.</li>
                <li>You will lose if you get hit by a car.</li>
                <li>You will lose if you fall into the river.</li>
                <li>You will be safe on the road.</li>
                <li>You will be safe on the logs.</li>
                <li>You will move with the logs when on them.</li>
                <li>Use arrow keys to control the frog.</li>
            </ul>
        </div>
    </div>`);
    $('body').append(div);
    $('#close').click(function () {
        $('.modal').remove();
    })
})



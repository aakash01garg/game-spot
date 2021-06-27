const square = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
let timeLeft = document.querySelector("#time-left");
const message = document.querySelector("#message");
const reset = document.querySelector("#reset");
let score = document.querySelector("#score");
let result = 0;
let hitPosition;
let currentTime = timeLeft.textContent;
let moleId, timerId;
resetFunc();

square.forEach((id) => {
    id.addEventListener('mouseup', () => {
        if (id.id == hitPosition) {
            result++;
            score.textContent = result;
        }
    })
})

function resetFunc() {
    clearInterval(timerId);
    clearInterval(moleId);
    message.innerHTML = `TIME LEFT :&nbsp;<span id="time-left">30</span>&nbsp;SECONDS`;
    timeLeft = document.querySelector("#time-left");
    reset.textContent = "RESET";
    score.textContent = 0;
    currentTime = 30;
    timeLeft.textContent = currentTime;
    result = 0;
    moveMole();
}

reset.addEventListener('click', resetFunc);

function randomSquare() {
    square.forEach((ele) => {
        ele.classList.remove("mole");
    })
    if (currentTime > 0) {
        let randomPosition = square[Math.floor(Math.random() * 9)];
        randomPosition.classList.add("mole");
        hitPosition = randomPosition.id;
    }
    else {
        hitPosition = -1;
    }
}

function countDown() {
    currentTime--
    timeLeft.textContent = currentTime;
    if (currentTime === 0) {
        clearInterval(timerId);
        clearInterval(moleId);
        message.innerHTML = "";
        message.textContent = "GAME OVER!"
        reset.textContent = "PLAY AGAIN?"
        randomSquare();
    }
}

function moveMole() {
    moleId = setInterval(randomSquare, 750);
    timerId = setInterval(countDown, 1000);
}
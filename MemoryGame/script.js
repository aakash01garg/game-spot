let cardArray = [
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
];

const grid = document.querySelector(".grid");
const result = document.querySelector('#result');
const resetButton = document.querySelector("#reset");
const message = document.querySelector("#message");

let cardChosen = [];
let cardsChosenId = [];
let cardsWon = [];

resetButton.addEventListener('click', reset);

reset();

function reset() {
    cardChosen = [];
    cardsChosenId = [];
    cardsWon = [];
    cardArray = shuffle(cardArray);
    grid.innerHTML = '';
    createBoard();
    result.textContent = 0;
    message.textContent = "";
    resetButton.textContent = "RESET";
}


function shuffle(array) {
    var currentIndex = array.length, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement("img");
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    }
}

function flipCard() {
    let cardId = this.getAttribute('data-id');
    if (!cardsChosenId.includes(cardId) && !cardsWon.includes(cardArray[cardId].name)) {
        cardChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);
        if (cardChosen.length == 2) {
            setTimeout(checkForMatch, 500);
        }
    }
}

function checkForMatch() {
    let cards = document.querySelectorAll('img');
    let optionOneId = cardsChosenId[0];
    let optionTwoId = cardsChosenId[1];
    if (cardChosen[0] === cardChosen[1]) {
        cards[optionOneId].setAttribute('src', 'images/white.png');
        cards[optionTwoId].setAttribute('src', 'images/white.png');
        cardsWon.push(cardChosen[0]);
    }
    else {
        cards[optionOneId].setAttribute('src', 'images/blank.png');
        cards[optionTwoId].setAttribute('src', 'images/blank.png');
    }
    cardChosen = [];
    cardsChosenId = [];
    result.textContent = cardsWon.length;
    if (cardsWon.length == cardArray.length / 2) {
        message.textContent = "YOU WON!";
        resetButton.textContent = "PLAY AGAIN?";
    }
}
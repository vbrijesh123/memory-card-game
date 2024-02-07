document.addEventListener('DOMContentLoaded', function() {
    const cardValues = ['+', '-', '*', '%', '#', '|', '||', '!'];
    const cards = cardValues.concat(cardValues);
    let flippedCards = [];
    let matchedCards = [];

    const gameContainer = document.querySelector('.memory-game');

    function shuffle(array) {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function createCard(value) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerHTML = value;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    }

    function createBoard() {
        const shuffledCards = shuffle(cards);
        shuffledCards.forEach(createCard);
    }

    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;
        const isMatch = card1.dataset.value === card2.dataset.value;

        if (isMatch) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedCards.push(card1, card2);
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];

        if (matchedCards.length === cards.length) {
            alert('Congratulations! You won!');
        }
    }

    createBoard();
});
const sequenceEl = document.getElementById('sequence');
const startButton = document.getElementById('start');
const nextButton = document.getElementById('next');
const guessForm = document.getElementById('guessForm');
const guessInput = document.getElementById('guess');
const messageEl = document.getElementById('message');

let currentSequence = '';
let userGuess = '';

function generateSequence(length) {
    let sequence = '';
    for (let i = 0; i < length; i++) {
        sequence += Math.floor(Math.random() * 10);
    }
    return sequence;
}


let sequenceDisplayTimeout;

function clearSequenceDisplayTimeout() {
    if (sequenceDisplayTimeout) {
        clearTimeout(sequenceDisplayTimeout);
    }
}


function displaySequence(sequence) {
    clearSequenceDisplayTimeout();
    sequenceEl.textContent = sequence;

    sequenceDisplayTimeout = setTimeout(() => {
        sequenceEl.textContent = '';
    }, 4000);
}



function startGame() {
    currentSequence = generateSequence(1);
    displaySequence(currentSequence);
    startButton.disabled = true;
    nextButton.disabled = false;
    guessForm.hidden = false;
    guessInput.maxLength = currentSequence.length;

    setTimeout(() => {
        guessInput.focus();
    }, 4000);
}


function nextRound() {
    messageEl.textContent = ''; // Clear the message

    currentSequence += Math.floor(Math.random() * 10);
    displaySequence(currentSequence);
    userGuess = '';
    guessInput.value = '';
    guessInput.maxLength = currentSequence.length;

    setTimeout(() => {
        guessInput.focus();
    }, 4000);
}


function checkGuess(e) {
    e.preventDefault();
    clearSequenceDisplayTimeout();
    userGuess += guessInput.value;

    if (userGuess === currentSequence) {
        messageEl.textContent = 'Correct! Click Next for a new sequence.';
        nextButton.disabled = false;
    } else if (userGuess.length === currentSequence.length) {
        messageEl.textContent = `Incorrect! The correct sequence was ${currentSequence}. Try again or click Start to reset.`;
        startButton.disabled = false;
        nextButton.disabled = true;
    } else {
        messageEl.textContent = '';
    }
    guessInput.value = '';
}



startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextRound);
guessForm.addEventListener('submit', checkGuess);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) => console.log('Error registering Service Worker:', error));
}


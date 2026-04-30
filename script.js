let secretNumber;
let attempts;
let guessHistory;

// Initialize the game
function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    guessHistory = [];
    
    document.getElementById('guessInput').value = '';
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('attempts').textContent = '0';
    document.getElementById('guessHistory').innerHTML = '';
    document.getElementById('guessInput').focus();
}

// Make a guess
function makeGuess() {
    const input = document.getElementById('guessInput');
    const guess = parseInt(input.value);
    const feedbackEl = document.getElementById('feedback');
    
    // Validation
    if (isNaN(guess)) {
        feedbackEl.textContent = '⚠️ Please enter a valid number';
        feedbackEl.className = 'feedback error';
        return;
    }
    
    if (guess < 1 || guess > 100) {
        feedbackEl.textContent = '⚠️ Number must be between 1 and 100';
        feedbackEl.className = 'feedback error';
        return;
    }
    
    if (guessHistory.includes(guess)) {
        feedbackEl.textContent = '⚠️ You already guessed that number!';
        feedbackEl.className = 'feedback error';
        return;
    }
    
    // Record the guess
    attempts++;
    guessHistory.push(guess);
    document.getElementById('attempts').textContent = attempts;
    
    // Update history display
    updateHistory();
    
    // Check the guess
    if (guess === secretNumber) {
        feedbackEl.innerHTML = `🎉 <strong>Correct!</strong> You found it in ${attempts} attempt${attempts === 1 ? '' : 's'}!`;
        feedbackEl.className = 'feedback correct';
        document.getElementById('guessInput').disabled = true;
        document.getElementById('guessBtn').disabled = true;
    } else if (guess < secretNumber) {
        feedbackEl.textContent = '📈 Too low! Try a higher number';
        feedbackEl.className = 'feedback too-low';
    } else {
        feedbackEl.textContent = '📉 Too high! Try a lower number';
        feedbackEl.className = 'feedback too-high';
    }
    
    input.value = '';
    input.focus();
}

// Update history display
function updateHistory() {
    const historyEl = document.getElementById('guessHistory');
    
    if (guessHistory.length === 0) {
        historyEl.innerHTML = '';
        return;
    }
    
    let html = '<div class="history-title">Your guesses:</div>';
    guessHistory.forEach(num => {
        html += `<div class="history-item">${num}</div>`;
    });
    
    historyEl.innerHTML = html;
}

// Reset the game
function resetGame() {
    initGame();
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
}

// Allow guessing with Enter key
document.addEventListener('DOMContentLoaded', function() {
    initGame();
    
    document.getElementById('guessInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            makeGuess();
        }
    });
});

let secretNumber;
let attempts;
let guessHistory;
let currentDifficulty = 'medium';
let difficultyRanges = { easy: 50, medium: 100, hard: 1000 };
let hintsUsed = 0;
let hintsAvailable = 3;
let streak = 0;
let bestScore = localStorage.getItem('bestScore') ? parseInt(localStorage.getItem('bestScore')) : null;

// Initialize the game
function initGame() {
    const range = difficultyRanges[currentDifficulty];
    secretNumber = Math.floor(Math.random() * range) + 1;
    attempts = 0;
    guessHistory = [];
    hintsUsed = 0;
    hintsAvailable = 3;
    
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').max = range;
    document.getElementById('feedback').textContent = '';
    document.getElementById('feedback').className = 'feedback';
    document.getElementById('attempts').textContent = '0';
    document.getElementById('guessHistory').innerHTML = '';
    document.getElementById('guessInput').focus();
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessBtn').disabled = false;
    document.getElementById('hintBtn').disabled = false;
    document.getElementById('progressContainer').style.display = 'none';
    
    updateHintsDisplay();
    updateBestScore();
}

// Set difficulty level
function setDifficulty(level) {
    currentDifficulty = level;
    
    // Update button styling
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-difficulty="${level}"]`).classList.add('active');
    
    // Update range display
    const range = difficultyRanges[level];
    const rangeText = {
        easy: 'Guess a number between 1 and 50',
        medium: 'Guess a number between 1 and 100',
        hard: 'Guess a number between 1 and 1000'
    };
    document.getElementById('rangeDisplay').textContent = rangeText[level];
    
    // Reset game with new difficulty
    initGame();
}

// Get a hint
function getHint() {
    if (hintsUsed >= hintsAvailable) {
        alert('No more hints available!');
        return;
    }
    
    const feedbackEl = document.getElementById('feedback');
    const range = difficultyRanges[currentDifficulty];
    const quarter = Math.ceil(range / 4);
    let hintText = '';
    
    if (secretNumber <= quarter) {
        hintText = `💡 The number is in the lower quarter (1 - ${quarter})`;
    } else if (secretNumber <= quarter * 2) {
        hintText = `💡 The number is in the lower-middle quarter (${quarter + 1} - ${quarter * 2})`;
    } else if (secretNumber <= quarter * 3) {
        hintText = `💡 The number is in the upper-middle quarter (${quarter * 2 + 1} - ${quarter * 3})`;
    } else {
        hintText = `💡 The number is in the upper quarter (${quarter * 3 + 1} - ${range})`;
    }
    
    feedbackEl.textContent = hintText;
    feedbackEl.className = 'feedback hint';
    hintsUsed++;
    updateHintsDisplay();
}

// Update hints display
function updateHintsDisplay() {
    const remaining = hintsAvailable - hintsUsed;
    document.getElementById('hintsRemaining').textContent = `${remaining} hints left`;
    
    if (remaining === 0) {
        document.getElementById('hintBtn').disabled = true;
        document.getElementById('hintBtn').style.opacity = '0.5';
    }
}

// Update best score
function updateBestScore() {
    const element = document.getElementById('bestScore');
    if (bestScore !== null) {
        element.textContent = bestScore;
    } else {
        element.textContent = '-';
    }
}

// Make a guess
function makeGuess() {
    const input = document.getElementById('guessInput');
    const guess = parseInt(input.value);
    const feedbackEl = document.getElementById('feedback');
    const range = difficultyRanges[currentDifficulty];
    
    // Validation
    if (isNaN(guess)) {
        feedbackEl.textContent = '⚠️ Please enter a valid number';
        feedbackEl.className = 'feedback error';
        return;
    }
    
    if (guess < 1 || guess > range) {
        feedbackEl.textContent = `⚠️ Number must be between 1 and ${range}`;
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
    
    // Update progress bar
    updateProgressBar(guess);
    
    // Update history display
    updateHistory();
    
    // Check the guess
    if (guess === secretNumber) {
        feedbackEl.innerHTML = `🎉 <strong>Correct!</strong> You found it in ${attempts} attempt${attempts === 1 ? '' : 's'}!`;
        feedbackEl.className = 'feedback correct';
        document.getElementById('guessInput').disabled = true;
        document.getElementById('guessBtn').disabled = true;
        document.getElementById('hintBtn').disabled = true;
        
        // Update streak and best score
        streak++;
        document.getElementById('streak').textContent = streak;
        
        if (bestScore === null || attempts < bestScore) {
            bestScore = attempts;
            localStorage.setItem('bestScore', bestScore);
            updateBestScore();
        }
    } else if (guess < secretNumber) {
        feedbackEl.textContent = `📈 Too low! Try a higher number`;
        feedbackEl.className = 'feedback too-low';
    } else {
        feedbackEl.textContent = `📉 Too high! Try a lower number`;
        feedbackEl.className = 'feedback too-high';
    }
    
    input.value = '';
    input.focus();
}

// Update progress bar
function updateProgressBar(guess) {
    const range = difficultyRanges[currentDifficulty];
    const container = document.getElementById('progressContainer');
    const fill = document.getElementById('progressFill');
    const text = document.getElementById('progressText');
    
    container.style.display = 'block';
    
    if (guess < secretNumber) {
        const progress = (guess / range) * 100;
        fill.style.width = progress + '%';
        text.textContent = `You're guessing in the lower range (${guess} - ${range})`;
    } else {
        const progress = ((range - guess) / range) * 100;
        fill.style.width = progress + '%';
        text.textContent = `You're guessing in the upper range (1 - ${guess})`;
    }
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
        let className = 'history-item';
        if (num === secretNumber) {
            className += ' correct';
        } else if (num < secretNumber) {
            className += ' low';
        } else {
            className += ' high';
        }
        html += `<div class="${className}">${num}</div>`;
    });
    
    historyEl.innerHTML = html;
}

// Reset the game
function resetGame() {
    initGame();
}

// Allow guessing with Enter key
document.addEventListener('DOMContentLoaded', function() {
    // Set initial difficulty
    setDifficulty('medium');
    document.querySelector('[data-difficulty="medium"]').classList.add('active');
    
    document.getElementById('guessInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            makeGuess();
        }
    });
});

# 🎮 Number Quest - Guessing Game

A modern, interactive number guessing game with multiple difficulty levels, hints, and score tracking. Built with HTML, CSS, and JavaScript.

## ✨ Features

### 🎯 Difficulty Levels
- **Easy**: Guess a number between 1-50
- **Medium**: Guess a number between 1-100
- **Hard**: Guess a number between 1-1000

### 💡 Hint System
- Get up to **3 hints per game**
- Hints provide quarter-range information to help narrow down the number
- Visual hint counter shows remaining hints

### 📊 Statistics & Tracking
- **Attempts Counter**: Track how many guesses you've made
- **Streak Counter**: Keep track of consecutive wins
- **Best Score**: Automatically saves your best attempt count using localStorage
- **Progress Bar**: Visual indicator showing the range you're guessing in

### 🎨 Modern UI/UX
- Beautiful gradient background with animated floating elements
- Smooth animations and transitions
- Color-coded feedback messages
- Responsive design for mobile and desktop
- Interactive history of all guesses with color-coding

### 🎯 Smart Feedback
- Real-time feedback: "Too High" or "Too Low"
- Duplicate guess detection
- Input validation
- Celebratory message on correct guess

## 🚀 How to Play

1. **Select Difficulty**: Choose from Easy, Medium, or Hard
2. **Make Your Guess**: Enter a number within the specified range
3. **Get Feedback**: The game tells you if your guess is too high or too low
4. **Use Hints** (Optional): Click "Get Hint" to narrow down the range (3 available)
5. **Find the Number**: Keep guessing until you find the secret number
6. **Play Again**: Click "Play Again" to start a new game

### 🎮 Controls
- Type a number and press **Enter** or click **Guess**
- Click **Get Hint** for quarter-range information
- Click **Play Again** to reset the game
- Select a new difficulty level anytime

## 📁 File Structure

```
First pro/
├── index.html      # HTML structure and game layout
├── style.css       # Styling and animations
├── script.js       # Game logic and interactivity
└── README.md       # This file
```

## 💻 Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with gradients, animations, and flexbox
- **JavaScript (Vanilla)**: Game logic, DOM manipulation, localStorage API

## 🎨 Design Highlights

- **Color Palette**: Modern purple (#7e22ce), blue gradients, and neutral grays
- **Animations**: 
  - Slide-in effects for cards
  - Floating background bubbles
  - Smooth hover transitions
- **Typography**: Clean, readable fonts with proper hierarchy
- **Accessibility**: Semantic HTML, clear labels, and readable contrast ratios

## 💾 Data Persistence

- **Best Score**: Saved in browser localStorage
- **Streak**: Resets on page refresh (session-based)

## 📱 Responsive Design

- Fully responsive layout
- Optimized for desktop, tablet, and mobile screens
- Touch-friendly button sizes and spacing

## 🎯 Difficulty Algorithms

The game uses the following ranges based on difficulty:

| Difficulty | Range | Hints | Strategy |
|-----------|-------|-------|----------|
| Easy | 1-50 | 3 | Good for learning |
| Medium | 1-100 | 3 | Balanced challenge |
| Hard | 1-1000 | 3 | For experts |

## 🔧 How to Run

1. Clone or download the project files
2. Open `index.html` in any modern web browser
3. Start playing!

**No installation or dependencies required** - runs entirely in the browser!

## 🎯 Tips for Better Scores

1. **Use Binary Search Strategy**: Always guess the middle of the remaining range
2. **Track Your Guesses**: Look at the history to see what you've already tried
3. **Use Hints Wisely**: Save hints for when you're really stuck
4. **Study the Progress Bar**: Use it to understand remaining possibilities

## 📊 Example Gameplay

```
Difficulty: Medium (1-100)
Attempt 1: 50 → Too High
Attempt 2: 25 → Too Low
Attempt 3: 37 → Too High
Attempt 4: 31 → Too Low
Attempt 5: 34 → Correct! 🎉
```

## 🌟 Best Practices

- The optimal strategy uses logarithmic guessing (binary search)
- For Medium difficulty, you can find any number in ~7 guesses
- For Hard difficulty, you can find any number in ~10 guesses

## 🔮 Future Enhancements

- Multiplayer mode
- Leaderboard system
- Sound effects
- Different themes
- Time-based challenges
- Share score on social media

## 📝 License

This project is open source and available for personal use and modification.

## 🤝 Contributing

Feel free to fork, modify, and improve this game!

---

**Enjoy the game and happy guessing! 🎮✨**

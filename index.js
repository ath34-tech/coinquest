// script.js

// Coin Gallery Hover Effect
const coins = document.querySelectorAll('.coin');

const popup = document.createElement('div');

popup.id = 'popup';
popup.style.position = 'absolute';
popup.style.backgroundColor = '#f0e68c';
popup.style.color = '#000';
popup.style.border = '2px solid #000';
popup.style.borderRadius = '8px';
popup.style.padding = '10px';
popup.style.fontFamily = 'monospace';
popup.style.fontSize = '14px';
popup.style.boxShadow = '4px 4px 10px rgba(0, 0, 0, 0.5)';
popup.style.opacity = '0';
popup.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
popup.style.pointerEvents = 'none';
popup.style.transform = 'scale(0.8)';
document.body.appendChild(popup);

coins.forEach(coin => {
    coin.addEventListener('mouseover', (event) => {
      const fact = coin.dataset.fact;
      popup.textContent = `Fun Fact: ${fact}`;
      popup.style.opacity = '1';
      popup.style.transform = 'scale(1)';
      popup.style.left = `${event.pageX + 10}px`;
      popup.style.top = `${event.pageY + 10}px`;
    });
  
    coin.addEventListener('mousemove', (event) => {
      popup.style.left = `${event.pageX + 10}px`;
      popup.style.top = `${event.pageY + 10}px`;
    });
  
    coin.addEventListener('mouseout', () => {
      popup.style.opacity = '0';
      popup.style.transform = 'scale(0.8)';
    });
  });

// Interactive Map Fact Display
const mapFacts = document.querySelectorAll('area');
const mapFactDisplay = document.getElementById('map-coin-fact');

mapFacts.forEach(area => {
  area.addEventListener('click', (e) => {
    e.preventDefault();
    const fact = area.dataset.fact;
    mapFactDisplay.textContent = fact;
  });
});



// game code

let currentScore = 0;
let highScore = localStorage.getItem('highScore') || 0;

// DOM Elements for Coin Toss Game
const coin = document.querySelector('.coin-game');
const gameMessage = document.getElementById('game-message');
const currentScoreDisplay = document.getElementById('current-score');
const highScoreDisplay = document.getElementById('high-score');
const headsButton = document.getElementById('heads');
const tailsButton = document.getElementById('tails');

// Initialize High Score
highScoreDisplay.textContent = highScore;

// Function: Toss Coin
function tossCoin(userGuess) {
  const outcome = Math.random() < 0.5 ? 'Heads' : 'Tails';
  const outcomeEmoji = outcome === 'Heads' ? '🪙' : '⚪';
  
  // Update Coin Display
  coin.textContent = outcomeEmoji;

  // Check User Guess
  if (userGuess === outcome) {
    currentScore++;
    gameMessage.textContent = `You guessed ${userGuess}! It's ${outcome}. You win! 🎉`;
  } else {
    currentScore = 0;
    gameMessage.textContent = `You guessed ${userGuess}. It's ${outcome}. You lose! 😢`;
  }

  // Update Scores
  updateScores();
}

// Function: Update Scores
function updateScores() {
  currentScoreDisplay.textContent = currentScore;

  if (currentScore > highScore) {
    highScore = currentScore;
    localStorage.setItem('highScore', highScore);
  }

  highScoreDisplay.textContent = highScore;
}

// Event Listeners for Game
headsButton.addEventListener('click', () => tossCoin('Heads'));
tailsButton.addEventListener('click', () => tossCoin('Tails'));

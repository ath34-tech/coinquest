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

const coins_slider = [
  { 
    head: './images/game-coin/10_coin_india.png', 
    tail: './images/game-coin/10_coin_india_tail.png',
    fact: 'This is a 10 rupee Indian coin, representing modern India’s economic growth.' 
  },
  { 
    head: './images/game-coin/2_coin_india_head.png', 
    tail: './images/game-coin/2_coin_india_tail.png',
    fact: 'This 2 rupee coin from India symbolizes diversity with its design.'
  },
  { 
    head: './images/game-coin/coin_china_head.png', 
    tail: './images/game-coin/coin_china_tail.png',
    fact: 'This Chinese coin is known for its intricate traditional motifs.' 
  },
  { 
    head: './images/game-coin/coin_england_head.png', 
    tail: './images/game-coin/coin_england_tail.png',
    fact: 'This English coin commemorates a historical milestone in the monarchy.' 
  },
  { 
    head: './images/game-coin/coin_japan_head.png', 
    tail: './images/game-coin/coin_japan_tail.png',
    fact: 'This Japanese coin features cherry blossoms, a symbol of peace and renewal.' 
  }
];

let currentCoinIndex = 0;

// DOM Elements for Coin Slider
const coinImage = document.getElementById('coin-image');
const prevCoinButton = document.getElementById('prev-coin');
const nextCoinButton = document.getElementById('next-coin');

// Function: Update Coin Image
function updateCoinImage() {
  coinImage.src = coins_slider[currentCoinIndex].head;
}

// Event Listeners for Slider
prevCoinButton.addEventListener('click', () => {
  currentCoinIndex = (currentCoinIndex - 1 + coins_slider.length) % coins_slider.length;
  updateCoinImage();
});

nextCoinButton.addEventListener('click', () => {
  currentCoinIndex = (currentCoinIndex + 1) % coins_slider.length;
  updateCoinImage();
});


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
  const outcomeImage = outcome === 'Heads' ? coins_slider[currentCoinIndex].head : coins_slider[currentCoinIndex].tail;
  
  // Update Coin Display
  coin.textContent = ''; // Clear emoji
  coin.style.backgroundImage = `url(${outcomeImage})`;
  coin.style.backgroundSize = 'contain';
  coin.style.backgroundRepeat = 'no-repeat';
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


const sliderPopup = document.createElement('div');
sliderPopup.id = 'slider-popup';
sliderPopup.style.position = 'absolute';
sliderPopup.style.backgroundColor = '#f8f9fa';
sliderPopup.style.color = '#333';
sliderPopup.style.border = '1px solid #ccc';
sliderPopup.style.borderRadius = '5px';
sliderPopup.style.padding = '8px';
sliderPopup.style.fontSize = '12px';
sliderPopup.style.boxShadow = '2px 2px 6px rgba(0, 0, 0, 0.2)';
sliderPopup.style.opacity = '0';
sliderPopup.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
sliderPopup.style.pointerEvents = 'none';
sliderPopup.style.transform = 'scale(0.8)';
document.body.appendChild(sliderPopup);

// Event Listener for Hovering Over Slider Coin
coinImage.addEventListener('mouseover', (event) => {
  const fact = coins_slider[currentCoinIndex].fact;
  sliderPopup.textContent = fact;
  sliderPopup.style.opacity = '1';
  sliderPopup.style.transform = 'scale(1)';
  sliderPopup.style.left = `${event.pageX + 10}px`;
  sliderPopup.style.top = `${event.pageY + 10}px`;
});

coinImage.addEventListener('mousemove', (event) => {
  sliderPopup.style.left = `${event.pageX + 10}px`;
  sliderPopup.style.top = `${event.pageY + 10}px`;
});

coinImage.addEventListener('mouseout', () => {
  sliderPopup.style.opacity = '0';
  sliderPopup.style.transform = 'scale(0.8)';
});

// Event Listeners for Game
headsButton.addEventListener('click', () => tossCoin('Heads'));
tailsButton.addEventListener('click', () => tossCoin('Tails'));

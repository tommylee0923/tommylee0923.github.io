// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById('instructionText');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');
const gameboardBackground = document.getElementById('game-board-background');

board.addEventListener("click", () => {
    if (!gameStarted) startGame();
})

// Control pads for mobile users
document.getElementById("up").addEventListener("click", () => direction = 'up');
document.getElementById("down").addEventListener("click", () => direction = 'down');
document.getElementById("left").addEventListener("click", () => direction = 'left');
document.getElementById("right").addEventListener("click", () => direction = 'right');
function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
}

document.addEventListener("DOMContentLoaded", () => {
    if (isMobileDevice()) {
        document.querySelector(".controls").style.display = "flex";
    } else {
        document.querySelector(".controls").style.display = "none";
    }
});

// Color picker
document.querySelectorAll(".color-block").forEach(block => {
    block.addEventListener("click", function() {
        gameboardBackground.style.backgroundColor = this.dataset.color;
    });
});

const themes = {
    red: {
        "--color3": "#FDD4CE", // 1st border
        "--color2": "#F7B2A5", // 2nd border
        "--color4": "#D1A9AE", // 3rd border
        "--color1": "#FFBEC2" // Board background
    },
    blue: {
        "--color3": "#9BD1D1",
        "--color2": "#3899AA",
        "--color4": "#1188A0",
        "--color1": "#B2D9D6"
    },
    green: {
        "--color3": "#595f43",
        "--color2": "#abb78a",
        "--color4": "#8b966c",
        "--color1": "#c4cfa3"
    }
};

// Function to apply theme
function applyTheme(theme) {
    const themeColors = themes[theme];
    if (themeColors) {
        Object.keys(themeColors).forEach(key => {
            document.documentElement.style.setProperty(key, themeColors[key]);
        });
    }
}

// Event listener for theme buttons
document.querySelectorAll(".theme-btn").forEach(button => {
    button.addEventListener("click", function() {
        const selectedTheme = this.dataset.theme;
        applyTheme(selectedTheme);
    });
});



// Define game variables
const gridSize = 30;  //If changed, make sure to change the number in css too
const xStart = 15;
const yStart = 15;
let snake = [{ x: xStart, y: yStart},
             { x: xStart, y: yStart + 1}]; // The snake's starting position
let food = generateFood();
let highScore = 0;
let direction = 'up';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Press space to start the game
document.addEventListener('keydown', handleKeyPress);

// Draw game map, snake, food
function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

// Draw snake
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatGameElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    })
}

// Create a snake or food cube/div
function creatGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

// Set the position of the snake or the food
function setPosition(element, position) {
    element.style.gridColumn = position.x;
    // position.x is the x value inside the snake array
    element.style.gridRow = position.y;
}

// Draw food
function drawFood() {
    if (gameStarted) {
        const foodElement = creatGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

// Generate random position for the food
function generateFood() {

    const x = Math.floor((Math.random() * gridSize)) + 1;
    const y = Math.floor((Math.random() * gridSize)) + 1;
    return { x, y };
}

// Moving the snake
function moveSnake() {
    const head = { ...snake[0] };
    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            moveSnake();
            checkCollision();
            draw();
        }, gameSpeedDelay);
    } else snake.pop();
}

// Start game function
function startGame() {
    gameStarted = true; // Keep track of a running game
    logo.style.display = 'none';
    instructionText.style.display = 'none';
    gameInterval = setInterval(() => {
        checkCollision();
        moveSnake();
        draw();
    }, gameSpeedDelay);
}

// Keypress event listener
function handleKeyPress(event) {
    if (
        (!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.code === ' ')
    ) {
        startGame();
    } else {
        switch (event.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
        }
    }
}


function increaseSpeed() {
    if (gameSpeedDelay >= 150) {
        gameSpeedDelay -= 25;
    } else if (gameSpeedDelay >= 100) {
        gameSpeedDelay -= 3;
    } else if (gameSpeedDelay >= 50) {
        gameSpeedDelay -= 2;
    } else if (gameSpeedDelay >= 25) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision() {
    const head1 = snake[0];

    if (head1.x < 1 || head1.x > gridSize - 1 || head1.y < 1 || head1.y > gridSize - 1) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head1.x === snake[i].x && head1.y === snake[i].y) {
            resetGame();
        }
    }
    updateHighScore();
}

function resetGame() {
    updateHighScore();
    stopGame();
    gameSpeedDelay = 200;
    snake = [{ x: xStart, y: yStart},
             { x: xStart, y: yStart + 1}];
    food = generateFood();
    direction = 'right';
    updateScore();
}

function updateScore() {
    const currentScore = snake.length - 2; // Snake's length starts with 1
    score.textContent = currentScore.toString().padStart(3, '0');
    // Triple digit number, will add 0 if the number is not big enough
}

function stopGame() {
    clearInterval(gameInterval);
    gameStarted = false;
    instructionText.style.display = 'block';
    logo.style.display = 'block';
}

function updateHighScore() {
    const currentScore = snake.length - 2;
    if (currentScore > highScore) {
        highScore = currentScore;
        highScoreText.textContent = highScore.toString().padStart(3, '0');
    }
}
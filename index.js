//Initial setup
const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const scoreList = document.getElementById('scoreList')
const width = 10;
let cheats = false;
let highScores = [];
let user = document.getElementById('user');
let squares = [];
let currentSnake = [2, 1, 0];
let currentIndex = 1;
let direction = 1;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

const upArrow = document.getElementById('upArrow');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const downArrow = document.getElementById('downArrow');

function createGrid () {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
    }
}

user.focus();

createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))

//New game
function startGame () {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    scoreDisplay.innerHTML = score;
    direction = 1;
    intervalTime = 1000;
    generateApple();
    currentSnake.forEach(index => squares[index].classList.add('snake'));   
    timerId = setInterval (move, intervalTime);
    startButton.innerHTML = 'RESET'
    startButton.style.background = '#b22222';
}

//Movement rules
function move () {

    if (
           (currentSnake[0] + width >= width * width && direction === width) 
        || (currentSnake[0] % width === width-1 && direction === 1) //Disable this line for infinite side walls
        || (currentSnake[0] % width === 0 && direction === -1) 
        || (currentSnake[0] - width < 0 && direction === -width) 
        || squares[currentSnake[0] + direction].classList.contains('snake')
        )
        { 
            //Game finished
            alert('GAME OVER! You died, try again!');
            highScores.push(`<li>${user.value}\'s score: ${score}</li>`);
            scoreList.innerHTML = `${highScores.join('')}`;
            user.focus();
            return clearInterval(timerId);
        } 
        
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction)
        
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            generateApple();
            score++;
            scoreDisplay.innerHTML = score;
            clearInterval(timerId)
            intervalTime = intervalTime * speed;
            timerId = setInterval (move, intervalTime);   
        }
        
    squares[currentSnake[0]].classList.add('snake')
} 

//New apples
function generateApple () {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);

    } while (squares[appleIndex].classList.contains('snake'))squares[appleIndex].classList.add('apple');
}
generateApple();

//Key controls
function control (e) {
    squares[currentIndex].classList.remove('snake')

    switch (e.keyCode) {
        case 39: 
            direction = 1; //Right
            break;
        case 38:
            direction = -width; //Up
            break;
        case 37:
            direction = -1; //Left
            break;
        case 40:
            direction = +width; //Down
        default:
            undefined;
    }
}

function arrowControl (e) {
    squares[currentIndex].classList.remove('snake')
    console.log(`arrowControl(${e})`)
    switch (e) {
        case rightArrow: 
            direction = 1; //Right
            break;
        case upArrow:
            direction = -width; //Up
            break;
        case leftArrow:
            direction = -1; //Left
            break;
        case downArrow:
            direction = +width; //Down
            console.log('ARROW');
            break;
        default:
            console.log(undefined);
    }
}


//Listeners
document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);
user.addEventListener('keyup', function (e) {
    if (e.key == 'Enter') {
        startGame();
    } e.preventDefault();
});

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

//Arrows for devices without keyboards
upArrow.addEventListener('click', arrowControl);
leftArrow.addEventListener('click', arrowControl);
rightArrow.addEventListener('click', arrowControl);
downArrow.addEventListener('click', arrowControl);


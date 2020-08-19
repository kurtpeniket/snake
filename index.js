//Initial setup
const grid = document.querySelector('.grid');
const startButton = document.getElementById('start');
const scoreDisplay = document.getElementById('score');
const scoreList = document.getElementById('scoreList')
const width = 10;
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



function createGrid () {
    for (let i = 0; i < 100; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
    }
}

createGrid()
currentSnake.forEach(index => squares[index].classList.add('snake'))



//New game
function startGame () {
    // user = prompt('Please enter your name')
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
        (currentSnake[0] + width >= width*width && direction === width) 
        || (currentSnake[0] % width === width-1 && direction === 1) 
        || (currentSnake[0] % width === 0 && direction === -1) 
        || (currentSnake[0] - width < 0 && direction === -width) 
        || squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
            //Game finished
            alert('GAME OVER! You died, better luck next time.');
            highScores.push(`${user.value}\'s score: ${score}`);
            scoreList.innerHTML = `${highScores.join('<br>')}`;
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

//Listeners
document.addEventListener('keyup', control);
startButton.addEventListener('click', startGame);
document.addEventListener('keydown', function () {
    if (keyCode === 13) {
        return false;
    }
});
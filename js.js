const holes = document.querySelectorAll('.hole') /*( . ) here to recognize the element*/ 
console.log(holes);

const scoreBoard = document.querySelector('.score')
console.log(scoreBoard);

const moles = document.querySelectorAll('.mole')
console.log(moles);

const countDown = document.querySelector('.countdown')
console.log(countDown);

const startBtn = document.querySelector('.start')

  const highscoreBoard = document.querySelector(".highscore");


let lastHole;
let timeUp = false;
let timeLimit = 20000;
let score = 0;
let countdown;
let highscore = localStorage.getItem("gameHighScore") || 0;

  highscoreBoard.textContent = "HIGH SCORE:" + highscore;


function pickRandomHole(holes) {
    const randomHole = Math.floor(Math.random() * holes.length);
    const hole = holes[randomHole];
    if (hole === lastHole) {
    return pickRandomHole(holes)
    }
    lastHole = hole; /* will not pick that spot again*/
    return hole;
}


function popOut() {
    const time = Math.random() * 1300 + 400;
    const hole = pickRandomHole(holes) /*callback function*/ 
    hole.classList.add('up');
    setTimeout(function () {
        hole.classList.remove('up');
        if(!timeUp) popOut()
    }, time )
}
popOut();

function startGame() {
    countdown = timeLimit / 1000;
    scoreBoard.textContent = 0;
    scoreBoard.style.display = 'block';
    countDown.textContent = countdown;
    timeUp = false;
    score = 0;
    popOut();
    
    setTimeout(function() {
        timeUp = true;

    }, timeLimit);

    let startCountdown = setInterval(function () {
        countdown -= 1;
        countDown.textContent = countdown;
        if (countdown < 0) {
            countdown = 0;
            clearInterval(startCountdown);
            checkHighScore()
            countDown.textContent= 'TIME IS UP! WELL DONE EHICKING THE STARS'
        }
    } , 1000);
}


startBtn.addEventListener('click', startGame);

function startwhack(e) {
    score++;
    this.style.backgroundImage = 'url("imgs/star1.jpg")';
    this.style.pointerEvents = 'none';
    setTimeout( ()=> {
        this.style.backgroundImage = 'url("imgs/star2.jpg")';
        this.style.pointerEvents = 'all'; /*if you click the score will increase*/

    }, 800)

    scoreBoard.textContent = score;
    
}

moles.forEach(mole => mole.addEventListener('click', startwhack));


 function checkHighScore() {
    if (score > localStorage.getItem("gameHighScore")) {
      localStorage.setItem("gameHighScore", score);
      highscore = score;
      highscoreBoard.textContent = 'HIGH SCORE:' + highscore;
    }
  }


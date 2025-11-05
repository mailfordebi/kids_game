const gameArea = document.getElementById('game-area');
const scoreSpan = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let score = 0;
let gameInterval = null;
let characterTimeout = null;
let gameActive = false;

const colors = ['#ff4e50', '#f9d423', '#24c6dc', '#a8e063', '#fcb045', '#fd6e6a', '#43cea2', '#185a9d', '#f7971e', '#c33764'];
const faces = ['😀','😃','😄','😁','😆','😎','😍','🥳','🤩','😺'];

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createCharacter() {
    const char = document.createElement('div');
    char.className = 'character';
    char.style.background = colors[randomInt(0, colors.length - 1)];
    char.style.left = randomInt(0, gameArea.offsetWidth - 60) + 'px';
    char.style.top = randomInt(0, gameArea.offsetHeight - 60) + 'px';
    char.innerText = faces[randomInt(0, faces.length - 1)];
    char.onclick = () => {
        if (!gameActive) return;
        score++;
        scoreSpan.textContent = score;
        char.remove();
        showCharacter();
    };
    return char;
}

function showCharacter() {
    if (!gameActive) return;
    gameArea.innerHTML = '';
    const char = createCharacter();
    gameArea.appendChild(char);
    characterTimeout = setTimeout(() => {
        if (gameActive) {
            gameArea.innerHTML = '';
            showCharacter();
        }
    }, 1200);
}

function startGame() {
    score = 0;
    scoreSpan.textContent = score;
    gameActive = true;
    startBtn.disabled = true;
    showCharacter();
    gameInterval = setTimeout(endGame, 30000); // 30 seconds
}

function endGame() {
    gameActive = false;
    startBtn.disabled = false;
    gameArea.innerHTML = '<h2 style="color:#ff4e50;">Game Over!<br>Your Score: ' + score + '</h2>';
    clearTimeout(characterTimeout);
}

startBtn.onclick = startGame;

window.addEventListener('resize', () => {
    if (!gameActive) return;
    // reposition character if window size changes
    showCharacter();
});

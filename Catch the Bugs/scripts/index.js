const delay = 0.6; // в сек.
const numberOfBugs = 20;
const gameField = document.getElementById('game-field');
const restartBtn = document.getElementById('play-again');
const timeDisplay = document.getElementById('time');
const counter = document.getElementById('counter');
var catched = 0;
var bugs;
var minutes = 0;
var seconds = 0;
let intervalId;
let moveIntervalId;
restartBtn.textContent = 'Старт'; 

counter.textContent = `Поймано 0/${numberOfBugs} жуков`;


function updateTime() {
    seconds++;
    if(seconds>=60){
        seconds = 0;
        minutes++;
    }
    const minutesStr = minutes.toString().padStart(2, '0');
    const secondsStr = seconds.toString().padStart(2, '0');
    timeDisplay.textContent = `${minutesStr}:${secondsStr}`;
}

restartBtn.addEventListener('click', ()=>{
    if(restartBtn.textContent ==='Старт'){
        restartBtn.textContent = 'Заново';
        start();
    }
    else{
    timeDisplay.textContent = "00:00";
    minutes = 0;
    seconds = 0;
    bugs.splice(0, bugs.length);
    gameField.innerHTML = '';
    clearInterval(intervalId);
    clearInterval(moveIntervalId);
    start();
    }
});

function start(){
    intervalId = setInterval(updateTime, 1000);
    moveIntervalId = setInterval(moving, delay*1000);
    bugs = new Array(numberOfBugs);

    for(let i =0;i<numberOfBugs;i++){
        const bug = document.createElement('div');
        bug.className = 'bug';
        bug.innerHTML = '<img src="img/bug.png" alt="bug.png">';
        bug.style.zIndex = i+1;
        gameField.appendChild(bug);
        bug.addEventListener('click',()=>{
            deleteBug(bug, i);
        });
        bugs[i] = bug;
    }
    console.log(bugs);

    function deleteBug(bug, i){
        //alert(`Удаление bug ${i}`,);
        catched++;
        counter.textContent = `Поймано ${catched}/${numberOfBugs} жуков`;
        console.log(bugs);
        bug.style.display = 'none';
        bugs[i] = null;
        if(checkIsEmpty()){
            clearInterval(intervalId);
            catched = 0;
            counter.textContent = `Поймано ${catched}/${numberOfBugs} жуков`;
            timeDisplay.textContent = "00:00";
            alert(`Вы поймали всех жуков за ${minutes} минут и ${seconds} секунд!`);
        }
    }

    function checkIsEmpty(){
        for(let i of bugs){
            if(i!==null){
                return false;
            }
        }
        return true;
    }
}

function moving(){
    for(let bug of bugs){
        if(bug!==null){
            move(bug, gameField);
        }
    }
}

function move(bug, field){
    const fieldRect = field.getBoundingClientRect();
    const fieldWidth = fieldRect.width-890; // по сути костыль
    const fieldHeight = fieldRect.height;
    console.log(`fieldWidth = ${fieldWidth}`);
    const x = random(0, fieldWidth - bug.offsetWidth);
    const y = random(0, fieldHeight - bug.offsetHeight);
    const deg = random(0, 360);

    bug.style.transition = 'transform 0.2s ease-in-out';
    bug.style.transform = `translate(${x}px, ${y}px) rotate(${deg}deg)`;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}
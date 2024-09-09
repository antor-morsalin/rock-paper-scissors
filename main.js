let score = JSON.parse(localStorage.getItem('score')) ||
{
    win: 0,
    tie: 0,
    loss: 0
}

localStorage.setItem('score', JSON.stringify(score));

document.querySelector('.score').innerHTML = `
    Wins : ${score.win} , Ties : ${score.tie} , Losses : ${score.loss}
`;

let isAuto = false ;
let intervalId;

function autoPlay()
{
    if(!isAuto)
    {
        intervalId = setInterval(function (){
            let userChoice = getPcChoice();
            play(userChoice);
        }, 1200);
        isAuto = true;
        document.querySelector('.auto-game').innerHTML = `Manual Mode`;
    }
    else 
    {
        clearInterval(intervalId);
        isAuto = false;
        document.querySelector('.auto-game').innerHTML = `Auto Mode`;
    }
}

function play(userChoice) {
    let pcCHoice = getPcChoice();
    let verdict = getVerdict(userChoice, pcCHoice);

    document.querySelector('.info-container').innerHTML = `
            <p class="verdict"></p>
           
            <p class="choice">
                <span class="user-choice">
                    
                </span>

                <span class="pc-choice">

                </span>
            </p>

            <p class="score"></p>
    `;

    document.querySelector('.score').innerHTML = `
    Wins : ${score.win} , Ties : ${score.tie} , Losses : ${score.loss}
    `;

    setChoice(userChoice, pcCHoice);

    document.querySelector('.verdict').innerHTML = `${verdict}`;

    localStorage.setItem('score', JSON.stringify(score));

    if(verdict == 'You Win')
    {
        document.querySelector('.verdict').classList.remove('lose');
        document.querySelector('.verdict').classList.remove('tie');
        document.querySelector('.verdict').classList.add('win');
    }
    else if(verdict == 'Tie')
    {
        document.querySelector('.verdict').classList.remove('lose');
        document.querySelector('.verdict').classList.remove('win');
        document.querySelector('.verdict').classList.add('tie');
    }
    else 
    {
        document.querySelector('.verdict').classList.remove('tie');
        document.querySelector('.verdict').classList.remove('win');
        document.querySelector('.verdict').classList.add('lose');
    }
}

function getPcChoice() {
    let choice = Math.floor(Math.random() * 3);
    if (choice == 0) {
        return 'rock';
    }
    else if (choice == 1) {
        return 'paper';
    }
    else {
        return 'scissor';
    }
}

function getVerdict(userChoice, pcCHoice) {
    if (userChoice == pcCHoice) {
        score.tie++;
        return 'Tie';
    }
    else {
        if (pcCHoice == 'rock') {
            if (userChoice == 'paper') {
                score.win++;
                return 'You Win';
            }
            else {
                score.loss++;
                return 'You Lose';
            }
        }
        else if (pcCHoice == 'paper') {
            if (userChoice == 'scissor') {
                score.win++;
                return 'You Win';
            }
            else {
                score.loss++;
                return 'You Lose';
            }
        }
        else if (pcCHoice == 'scissor') {
            if (userChoice == 'rock') {
                score.win++;
                return 'You Win';
            }
            else {
                score.loss++;
                return 'You Lose';
            }
        }
    }
}

function reset() {
    score = {
        win: 0,
        tie: 0,
        loss: 0
    }
    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.info-container').innerHTML = `
            
            <p class="score"></p>
    `;

    document.querySelector('.score').innerHTML = `
    Wins : ${score.win} , Ties : ${score.tie} , Losses : ${score.loss}
    `;

    document.querySelector('.verdict').classList.remove('tie');
    document.querySelector('.verdict').classList.remove('win');
    document.querySelector('.verdict').classList.remove('lose');
}

function setChoice(userChoice, pcCHoice) {
    if (userChoice == 'rock') {
        document.querySelector('.user-choice').innerHTML =
            `You <img src="icons/rock-emoji.png" class="choice-icon">
            `;
    }
    else if(userChoice=='paper')
    {
        document.querySelector('.user-choice').innerHTML =
        `You 
        <span>
            <img src="icons/paper-emoji.png" class="choice-icon">
        </span>`;   
    }
    else 
    {
        document.querySelector('.user-choice').innerHTML =
        `You 
        <span>
            <img src="icons/scissors-emoji.png" class="choice-icon">
        </span>`;    
    }

    if(pcCHoice=='rock')
    {
        document.querySelector('.pc-choice').innerHTML =
            `<img src="icons/rock-emoji.png" alt="" class="choice-icon"> PC`;
    }
    else if(pcCHoice=='paper')
    {
        document.querySelector('.pc-choice').innerHTML =
            `<img src="icons/paper-emoji.png" alt="" class="choice-icon"> PC`;
    }
    else 
    {
        document.querySelector('.pc-choice').innerHTML =
            `<img src="icons/scissors-emoji.png" alt="" class="choice-icon"> PC`;   
    }
}

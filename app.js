/*
 -------------> GAME INSTRUCTIONS: <-------------

1. Player must guess a number between a min and max.
2. Player gets a certain amount of guesses
3. Notify Player og guesses Remaining
4. Notify the player of the correct answer if loose
5. let player choose to paly again
*/

let min = 1,
    max = 10,
    winningNumber = randWinNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessBtn = document.querySelector('#guess-btn');
const guessInput = document.querySelector('#guess-input');
const message = document.querySelector('.message');
const progress = document.querySelector('.progress-bar');
const loading = document.querySelector('#loading');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for Guess
guessBtn.addEventListener('click', function (e) {
    let guess = parseInt(guessInput.value);
    loading.style.display = 'block';

    //After 2 seconds
    setTimeout(function () {
        loading.style.display = 'none';

            //Validation
        if(isNaN(guess) || guess < min || guess > max){
            setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        }
        else{
            // Check if win
            if(guess === winningNumber){
                // after win, game will be overed
                gameOver(true,`Congratulations ! ${guess} is Correct Number & You Win.`);

                //Progress Bar
                showProgress('progress-bar', '100%', '20px', 'WIN', 'bg-success');
                // progress.className = 'progress-bar';
                // progress.style.width = '100%';
                // progress.parentElement.style.height = '20px';
                // progress.textContent = 'WIN !';
                // progress.classList.add('bg-success');
            }
            else{
                //If entered a wrong number as input
                guessesLeft -=1;
                if(guessesLeft ===0){
                    //Game over and lost
                    gameOver(false,`Sorry, game over & you lost ! Correct number was ${winningNumber}`);

                    //Progress Bar
                    showProgress('progress-bar', '100%', '20px', 'LOST', 'bg-danger');
                    // progress.className = 'progress-bar';
                    // progress.style.width = '100%';
                    // progress.parentElement.style.height = '20px';
                    // progress.textContent = 'LOST !';
                    // progress.classList.add('bg-danger');
                }
                else{
                    // Try again
                    setMessage(`Sorry ${guess} is worng input & please try again !
                    Remainder of amount of guesses left: ${guessesLeft}`, 'red');

                    switch(guessesLeft){
                        case 2:
                            //Progress Bar
                            showProgress('progress-bar', '33%', '20px', '2 Guesses left', 'bg-info');
                            break;
                        case 1:
                            //Progress Bar
                            showProgress('progress-bar', '66%', '20px', 'Wrong! 1-Guess Left', 'bg-warning');
                            break;
                    }
                }
            }
        }

    },2000);

    e.preventDefault();
});
// Message
function setMessage(text,color){
    message.textContent  = text;
    message.style.color = color;
}

//Game Over
function gameOver(win, msg){
    let color;

    //Using ternary operator
    win === true ? color = 'green' : color='red';

    //Disable Input
    guessInput.disabled = true;

    //change the input border color after disable input
    guessInput.style.borderColor = color;

    //message Set
    setMessage(msg, color);

    //Play again
    guessBtn.innerHTML = "Play Again";
    guessBtn.className = ' play-again';
}

//Pay again
game.addEventListener('mousedown',function(e){
    if(e.target.classList.contains('play-again')){
        window.location.reload();
    }
});


//Show progress
function showProgress(setClass, width, height, msg, alertClass){
    progress.className = setClass;
    progress.style.width = width;
    progress.parentElement.style.height = height;
    progress.textContent = msg;
    progress.classList.add(alertClass);
}

// Generate random winning number
function randWinNum(min, max){
    return Math.floor(Math.random()*(max - min + 1));
}
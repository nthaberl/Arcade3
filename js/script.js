//global scoped variable needed for each function
let playerName, gamesPlayed = 0, sessionWins = 0;

//default to have goodbye message div hidden
document.getElementById("goodbye").style.display = "none"

//helper function that will display a goodbye screen if player no longer wishes to play any more games
//otherwise leaves display the same
function endPlaySession() {
    let quitSession = prompt(`${playerName}, Would you like to pick another game to play?  y/n`);
    switch (true) {
        case quitSession.toUpperCase() === "N":
            document.getElementById("welcome").style.display = "none";
            document.getElementById("goodbye").style.display = "block";
            document.getElementById("result").innerHTML =
                `<tr>
            <th> Total Games</th>
            <th>Total Wins </th>
            <th> Average Wins </th>
            </tr>
            <tr>
            <td>${gamesPlayed}</td>
            <td>${sessionWins}</td>
            <td>${((sessionWins / gamesPlayed) * 100).toFixed(2)}%</td>`;
            getBadge();
            break;
        default:
            document.getElementById("welcome").style.display = "block";
            document.getElementById("goodbye").style.display = "none";
            break;
    }
}

//helper function to get player name to use throughout playing session
function getPlayerName() {
    playerName = prompt(`Welcome to your first game! Please enter your name to get started: `)
    while (playerName === null || playerName.length === 0) {
        playerName = prompt('Please enter your name! ');
    }
    return playerName
}

//helper function to determine which badge the player will receive via switch
function getBadge() {
    let sessionAvg = (sessionWins / gamesPlayed) * 100
    switch (true) {
        case sessionAvg > 75:
            document.getElementById("player-badge").src = "images/silicon.jpg";
            document.getElementById("badge-info").innerHTML =
                `Congrats ${playerName}! <br> You've earned the silicon badge!`
            break;
        case sessionAvg > 50:
            document.getElementById("player-badge").src = "images/iron.jpg";
            document.getElementById("badge-info").innerHTML =
                `Congrats ${playerName}! <br> You've earned the iron badge!`
            break;
        case sessionAvg > 25:
            document.getElementById("player-badge").src = "images/bronze.jpg";
            document.getElementById("badge-info").innerHTML =
                `Congrats ${playerName}! <br> You've earned the bronze badge!`
            break;
        default:
            document.getElementById("player-badge").src = "images/stone.jpg";
            document.getElementById("badge-info").innerHTML =
                `Alright ${playerName} ... <br> You've earned the stone badge ... <br> It's better than nothing`
            break;
    }
}

//Guessing Game with Function Declaration
function guessingGame() {
    let playAgain;
    if (!playerName) {
        playerName = getPlayerName();
    }
    do {
        gamesPlayed++;

        //initializing counter for number of guesses it will take
        let numOfGuesses = 1;

        //generating random number between 1 and 10
        let randomNumber = Math.floor(Math.random() * 10) + 1;

        //using prompt to grab user input
        let playerNumber = prompt(`Guess a number between 1 and 10.`);

        //using while loop to repeat prompt for user input as long as their guess does 
        //not match the random number
        while (playerNumber != randomNumber) {
            if (playerNumber > randomNumber) {
                numOfGuesses++;
                playerNumber = prompt("Guess was too high, guess again.")
            } else {
                numOfGuesses++;
                playerNumber = prompt("Guess was too low, guess again.")
            }
        }

        //code will only reach this point once a correct guess has been made
        //when it has, display how many guesses it took
        if (numOfGuesses === 1) {
            alert(`You guessed it in 1 guess!`)
        } else {
            alert(`You guessed it in ${numOfGuesses} guesses!`)
        }

        // finishing the guessing game always results in a win, so a win will be added to the counter 
        //on completion of the game
        sessionWins++;

        //prompting user if they'd like to play again, otherwise loop will end
        playAgain = prompt(`${playerName}, Would you like to keep playing this game? y/n`)
    } while (playAgain.toUpperCase() === "Y")
    endPlaySession();
}

//Magic Eightball with Function Expression
const magicEightBall = function () {
    let playAgain;
    if (!playerName) {
        playerName = getPlayerName();
    }
    const fortunesArray = [
        "Soon.",
        "Oh, a good omen!",
        "Perhaps, with great power of will.",
        "That sounds like a question for a crystal ball.",
        "What? Sorry, I wasn't listening.",
        "No, not even through a miracle.",
        "No, but I know you're going to try anyway.",
        "You don't want to know, trust me.",
    ]
    do {
        gamesPlayed++;

        //random number between 0 and 8 which will be used to access the phrases stored in the fortunesArray
        let randomizer = Math.floor(Math.random() * 8);

        //randomizer is used to access indices of array, first 3 indices are considered "wins"
        if (randomizer == 0 || randomizer == 1 || randomizer == 2) {
            sessionWins++;
        }
        prompt("Ask the Magical Eight Ball fortune teller yes or no questions for accurate predictions about your future!")
        alert(`${fortunesArray[randomizer]}`)
        playAgain = prompt(`${playerName}, Would you like to keep playing this game? y/n`);
    } while (playAgain.toUpperCase() === "Y");
    alert("Be careful out there");
    endPlaySession();
}

//Bear, Hunter, Ninja with Arrow Function
const bnh = () => {

    //initializing array that holds possible choices for the game
    let gameChoices = ["Bear", "Hunter", "Ninja"]

    //initializing variables that necessitate function scope
    let wins = 0, losses = 0, ties = 0, totalGames = 0;

    //boolean flags that will switch to true based on outcome of the game
    let playerWin, playerLose, playerTie;
    let winMessage = (`You Win!!`);
    let loseMessage = (`You Lose :(`);
    let tieMessage = (`It's a tie!`);

    if (!playerName) {
        playerName = getPlayerName();
    }
    alert("Hi " + playerName + " Let\'s play!");

    //begin gameplay loop
    do {
        gamesPlayed++;
        //resetting the boolean flags for each game session
        playerWin = false, playerTie = false, playerLose = false;

        //randomly choosing computer's choice from array of possible choices
        //random numbers will be from 0 - 2, which reference the indices of the array
        let computerChoice = gameChoices[Math.floor(Math.random() * 2)];

        //grabbing player's choice variable via prompted user input
        let playerInput = prompt("Who are you: Bear, Ninja, or Hunter?");

        //ensuring the user input is capitalized
        let playerChoice = playerInput.toLowerCase();
        playerChoice = playerChoice[0].toUpperCase() + playerChoice.slice(1);

        //keeping tally of total games played
        totalGames++

        //more concise version of switch statement handling wins/losses/ties
        switch (true) {
            case playerChoice === computerChoice:
                ties++;
                playerTie = true;
                break;
            case playerChoice === "Bear" && computerChoice === "Ninja":
            case playerChoice === "Ninja" && computerChoice === "Hunter":
            case playerChoice === "Hunter" && computerChoice === "Bear":
                wins++;
                sessionWins++;
                playerWin = true;
                break;
            case playerChoice === "Bear" && computerChoice === "Hunter":
            case playerChoice === "Ninja" && computerChoice === "Bear":
            case playerChoice === "Hunter" && computerChoice === "Ninja":
                losses++;
                playerLose = true;
                break;
            default:
                break;
        }

        //outputting in an alert, and html page based on outcome of game
        switch (true) {
            case playerWin === true:
                alert(`${playerName}, you chose ${playerChoice}!\nThe computer chose ${computerChoice}!\n${winMessage}`)
                break;
            case playerLose === true:
                alert(`${playerName}, you chose ${playerChoice}!\nThe computer chose ${computerChoice}!\n${loseMessage}`)
                break;
            case playerTie === true:
                alert(`${playerName}, you chose ${playerChoice}!\nThe computer chose ${computerChoice}!\n${tieMessage}`)
            default:
                break;
        }
        playAgain = prompt(`${playerName}, Would you like to keep playing this game? y/n`)
    } while (playAgain.toUpperCase() === "Y")
    endPlaySession();
}
// Requires the nmp inquirer and the javascript files: word and letter
let Word = require("./word.js");
let Letter = require("./letter.js");
let inquirer = require("inquirer");

// Global letiables
let wordBank = ["frozen", "maleficent", "mulan", "cinderella", "aladdin", "enchanted", "tangled", "brave", "cars", "hercules", "ratatouille", "tarzan", "dinosaur", "pocahontas"];
let guessesRemaining = 9;
let currentWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);

/////////////////////////////////////////////////////////////////////////

console.log("");
console.log("Welcome to this 1970's DOS style Disney Hangman!");
console.log("---------------------------------------------");

function game() {
    console.log(currentWord.renderWord());
    console.log("");

    // Prompt user to guess a letter
    let prompt = (
        inquirer.prompt([{
            type: "input",
            message: "Guess a letter.",
            name: "userGuessLetter"

        }]).then(function(userResponse) {
            let userLetter = userResponse.userGuessLetter
            currentWord.checkLetter(userLetter);

            // If the user's guessed letter is already guessed
            if (currentWord.valid) {
                console.log("****************************************");
                console.log("You've already guessed this letter, guess again.");
                game();
                // Otherwise, if the word is completed log You Win and reset
            } else {
                if (currentWord.isWordCompleted()) {
                    console.log("------------------------------------------");
                    console.log("You Win! The word is " + currentWord.renderWord());
                    console.log("------------------------------------------");
                    // console.log("Next Game: Pick a letter");
                    reset();
                    newPrompt();
                    // Otherwise, if the user has no guesses left, then they lose
                } else if (guessesRemaining === 0) {
                    console.log("------------------------------------------");
                    console.log("Sorry, but you are out of guesses.");
                    console.log("------------------------------------------");
                    // console.log("Next Game: Pick a letter");
                    reset();
                    newPrompt();
                    // If the user has guesses left, then they keep going
                } else {
                    console.log("****************************************");
                    console.log("You have " + guessesRemaining + " guesses left!");
                    console.log("Already guessed: " + currentWord.guesses);

                    guessesRemaining--;
                    game();
                }
            }

        })
    );
};
game();

// Function to allow user to choose if they want to play again
function newPrompt() {
    (
        inquirer.prompt(
            [{
                type: "list",
                message: "Would you like to play again?",
                choices: ["Yes", "No"],
                name: "playAgain"

            }]
            // If the user chooses yes, run the game again
        ).then(function(info) {
            if (info.playAgain === "Yes") {
                newGame();
                // Otherwise print thanks for playing and end game
            } else {
                console.log("");
                console.log("------------------------------------------");
                console.log("Thanks for Playing!");
                console.log("------------------------------------------");
                console.log("");
            }
        })
    )
};

// Function to determine if to start a new game or continue with the current game
function newGame() {
    if (guessesRemaining > 0) {
        game();
    } else {
        console.log("Sorry, you have no guesses left.");
        reset();
        newGame();
    }
};

// Function that resets the number of guesses and the random word
function reset() {
    guessesRemaining = 9;
    currentWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);

};
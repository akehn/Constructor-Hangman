// Requires the letter.js file
let Letter = require("./letter.js");

// Word constuctor that chooses word
let Word = function(letters) {
    // Array to hold letters of random word
    this.lettersArray = [];
    // Array to hold letters the user has guessed
    this.guesses = [];
    // Begins game with 10 guesses
    this.guessesRemaining = 9;

    this.getLetters = function() {

        // Runs through all the letters in the randomly chosen word
        for (let i = 0; i < letters.length; i++) {
            // New instance of each letter
            let individualLetter = new Letter(letters[i]);
            this.lettersArray.push(individualLetter);
        }
    };
    this.getLetters();
};

// Prototype method for Word Constructor: checks if each letter is right
Word.prototype.checkLetter = function(param) {
    this.notCorrect = true;
    this.valid = false;
    // Param must be lower case
    var param = param.toLowerCase();
    // Letter chosen is valid
    if (this.guesses.indexOf(param) != -1) {
        this.valid = true;
        // Letter chosen is incorrect
    } else {
        // Push letter to the guesses array

        this.guesses.push(param);
        for (let i = 0; i < this.lettersArray.length; i++) {
            if (this.lettersArray[i].character == param) {
                this.notCorrect = false;
                this.lettersArray[i].show = true
            }
        }
        if (this.notCorrect) {
            this.guessesRemaining--;
        }
    }
};

// Prototype method for showing word
Word.prototype.renderWord = function() {
    let display = "";
    for (let i = 0; i < this.lettersArray.length; i++) {
        display += this.lettersArray[i].renderLetter();
    }
    return display;
};

// Prototype to see if the word has been completely guessed
Word.prototype.isWordCompleted = function() {
    for (let i = 0; i < this.lettersArray.length; i++) {

        if (this.lettersArray[i].show === false) {
            return false;
        }
    }
    return true;
};

module.exports = Word;

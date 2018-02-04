// Letter Constructor
let Letter = function(character) {
    this.character = character;
    this.show = false;

    // Prints the letter if it is valid
    this.renderLetter = function() {

        if (this.show === true) {
            return this.character;
        } else {
            return " _ ";
        }
    };
};

module.exports = Letter;
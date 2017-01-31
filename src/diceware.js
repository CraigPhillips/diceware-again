var fileSystem = require("fs"),
    wordList = require("./eff-word-list");

module.exports = {
    /**
     * Prints a generated password out to the command line.
     * 
     * @param wordCount The number of words to use in the password.
     * @param separator The separate to use in between words in the password.
     * 
     * @returns The generated password.
     */
    generate: function(wordCount, separator) {
        var words = [];

        if(!wordCount)
            throw new Error("Word count is required and must not be 0");

        for(var wordsBuilt=0; wordsBuilt<wordCount; wordsBuilt++) {
            var key = "";

            for(var i=1; i<=5; i++) {
                var min = Math.ceil(1),
                    max = Math.floor(6),
                    roll = Math.floor(Math.random() * (max - min)) + min;

                key += roll.toString();
            }

            if(!wordList[key])
                throw new Error("Dictionary missing entry for key ", key);

            words.push(wordList[key]);
        }

        return words.join(separator);
    },
};
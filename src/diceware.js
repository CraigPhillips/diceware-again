var fileSystem = require("fs");

module.exports = {
    dictionary: {},

    /**
     * Initializes the dictionary used to generate passwords. Only done once
     * to avoid lots of file reading in the event multiple passwords will be
     * generated.
     */
    buildDictionary: function() {
        var contents = fileSystem.readFileSync(
            "eff-word-list.txt",
            "utf8"),
            pairs = contents.split("\n");

        for(var i = 0; i<pairs.length; i++) {
            var parts = pairs[i].split("\t");

            if(parts.length<2) {
                throw new Error(
                    "Unable to build diceware dictionary." +
                    "Bad word data on line " + (i+1));
            }

            this.dictionary[parts[0].trim()] = parts[1].trim();
        }
    },

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

            if(!this.dictionary[key])
                throw new Error("Dictionary missing entry for key ", key);

            words.push(this.dictionary[key]);
        }

        return words.join(separator);
    },
};

module.exports.buildDictionary();
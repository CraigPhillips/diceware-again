#!/usr/bin/env node
var diceware = require("./src/diceware");

try {
    var badWordCountValue = false, 
        usageError = "",
        wordsInPassword, 
        wordsInPasswordArg;

    if(process.argv.length < 3)
        usageError = "usage: diceware-again [number of words in password]";
    
    wordsInPasswordArg = process.argv[2];

    try{
        wordsInPassword = parseInt(wordsInPasswordArg);
    }
    catch(parseError) {
        badWordCountValue = true;
    }

    if(badWordCountValue || wordsInPassword.toString() != wordsInPasswordArg)
        usageError = 
            "usage: diceware-again [number of words in password]\n" +
            "number of words must be an integer";

    if(usageError)
        console.error(usageError);
    else {
        console.log(diceware.generate(wordsInPassword, "-"));
    }
}
catch(error) {
    console.error(
        "Something went wrong generating a password: ",
        error);
}
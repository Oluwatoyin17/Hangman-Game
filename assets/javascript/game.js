// GLOBAL VARIABLES
// -------------------------------------------------------------
// Arrays and Variables for holding data
var wordOptions = ["rose", "tulip", "carnation", "daisy","dandelion","edelweiss", "hibiscus", "iris", "lily","orchid","violet","sunflower"];
var selectedWord ="";
var lettersinWord=[];
var numBlanks = 0;
var blanksAndSuccesses = []; // j _ _ _
var wrongLetters = [];

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS (Reusable blocks of codes that I will call upon when needed)
// --------------------------------------------------------------

function startGame () {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersinWord = selectedWord.split("");
    numBlanks = lettersinWord.length;

    //Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // Populate blanks and successes with right number of blanks.
    for (var i=0; i<numBlanks; i++){
        blanksAndSuccesses.push("_");
    }

    // Change HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // Testing / Debugging
    console.log(selectedWord);
    console.log(lettersinWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter){
    // Check if letter exists in code at all
    var isLetterInWord = false;

    for (var i=0; i<numBlanks; i++){
        if(selectedWord[i]===letter){
            isLetterInWord = true;
        }
    }
    // Check where in the word the letter exists, then populate out blanksAndSuccesses array.
    if (isLetterInWord){
        for (var i=0; i<numBlanks;i++){
            if(selectedWord[i]==letter){
                blanksAndSuccesses[i]=letter;
            }
        }

    }
    else{
        wrongLetters.push(letter);
        guessesLeft--
    }

    console.log(blanksAndSuccesses);

}

function roundComplete(){
    console.log("Win Count: "+ winCount + " | Loss Count: "+ lossCount + " | Guesses Left" + guessesLeft);
 
    // Update the HTML to reflect the most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
    // Check if user won
    if(lettersinWord.toString()== blanksAndSuccesses.toString()){
        winCount++;
        alert("Yay!!! You Won!");

        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame(); 

    }
    // Check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You lost, better luck next time");

        //Update the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame();
    }
}  


// MAIN PROCESS
// --------------------------------------------------------------

// Initiates the code the first time
startGame();

// Register keyclicks

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    //Testing / Debugging
    console.log(letterGuessed);
}
// Hangman Game

// VARIABLES

// Numbers
var lives = 10; // number of lives when game starts & decreases if letters are incorrect
var wins = 0;   // number of wins increases if the word is guessed
var losses = 0; // number of losses increases if live is 0

// Arrays
var guessWord = ["forest", "Yellowstone", "Grand Canyon", "Glacier", "Zion", "river", "mountains", "hiking boots", "nature"];
var chosenWord = [];		// randomly chosen word
var targetWord = [];		// guessed word
var guessedLetters = [];	// guessed letters (incorrect & correct)
var failedGuesses = [];		// incorrect guessed letters

// HTML elements that are manipulated / text displayed on the screen
var myLetterElem = document.getElementById("my-letter");
var guessedLettersElem = document.getElementById("guessed-letters");
var guessWordElem = document.getElementById("guess-word");
var livesElem = document.getElementById("lives-count");
var winsElem = document.getElementById("wins-count");
var lossesElem = document.getElementById("losses-count");
var pressAnyKeyElem = document.getElementById("press-any-key");


//FUNCTIONS

// ************** START GAME **************
function startGame(){
	// resetting variables and HTML text
	lives = 10;
	wins = 0;
	losses = 0;
	livesElem.textContent = lives;
	// Calling functions
	addNewWord();
	populateLine();

} // ************** END START GAME **************


// ************** ADD NEW WORD **************
function addNewWord () {
	// resetting HTML text
	guessedLetters = [];
	myLetterElem.textContent = "";
	guessedLettersElem.textContent = "";
	

	// Randomly chooses a word from the guessWord array. This is the chosenWord.
	chosenWord = guessWord[Math.floor(Math.random() * guessWord.length)].toUpperCase();
	console.log(chosenWord);

} // E************** END ADD NEW WORD **************


// ************** POPULATE LINE **************
function populateLine(){
	// reset targetWord Array
	targetWord.length = 0;

	// populates targetWord to have the proper number of underscores
	for (var i = 0; i < chosenWord.length; i++) {
		// checks for spaces in the chosenWord
		if (chosenWord[i] === " "){
			targetWord.push("&nbsp;"); // adds a space (HTML) if the chosenWord has a space at that i index
		} else {
			targetWord.push("_"); // adds an "_" to the end of targetWord array
		}
		// displays the current number of _ 
		guessWordElem.innerHTML = targetWord.join(" ");
	}

} // ************** END POPULATE LINE **************


// ************** LIVES COUNT **************
function livesCount(){
	// if guessed letter is incorrect, lives = lives -1
	lives--;
	// display number of lives on the screen
	livesElem.textContent = lives;
	console.log("you lost one/another life! " + lives );

	// you loose if lives = 0;
	if (lives === 0) {
		// alert a message
		alert("Sorry, you lost!");
		// Call lossesCount function
		lossesCount();
	}

} // ************** END LIVES COUNT **************


// ************** WIN COUNT **************
function winCount(){
	// number of wins increase once you guess the word
	wins++;
	// display number of wins
	winsElem.textContent = wins;
	console.log(wins);

	// reset game / guess a new word
	addNewWord();
	populateLine();

} // ************** END WIN COUNT **************


// ************** LOSSES COUNT **************
function lossesCount(){
	// number of losses decrese if the guessed letter is incorrect
	losses++;
	// display number of losses
	lossesElem.textContent = losses;
	console.log("yay, this is number of losses: " + losses);

	// reset lives and HTML text
	lives = 10;
	livesElem.textContent = lives;
	console.log(lives + "check for new set of lives");

	// reset game / guess a new word
	addNewWord();
	populateLine();

} // ************** END LOSSES COUNT **************


// ************** RESET GAME **************
function resetGame(){
	// resetting variables
	lives = 10;
	wins = 0;
	losses = 0;

	//resettig  HTML text
	winsElem.textContent = wins;
	lossesElem.textContent = losses;
	livesElem.textContent = lives;

	// Calling functions
	addNewWord();
	populateLine();
} // ************** END RESET GAME **************


// ************** onkeyup EVENT HANDLER **************

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {
	// input local variable
	var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	// Determines which key was pressed.
	var myLetter = event.key.toUpperCase();

	// hide the Press Any Key to start message box.
	pressAnyKeyElem.className = "hide"
	
	// pressAnyKeyElem.style.backgroundColor="";
	// pressAnyKeyElem.style.opacity="";

	// Check if key pressed is a valid letter
	if (alphabet.indexOf(myLetter.toLowerCase()) > -1) {
		// display the typed letter
		myLetterElem.textContent = myLetter;
		console.log("MyLetter: " + myLetter);

		// Check if the letter was already guessed
		if (guessedLetters.indexOf(myLetter) === -1) {
			// add them in an array
			guessedLetters.push(myLetter);
			// display on the screen
			guessedLettersElem.textContent = guessedLetters;

		} // End Check if the letter was already guessed

		// validation: check is the guessed letter is incorrect/correct
		if (chosenWord.indexOf(myLetter) === -1) {

			// for incorrect guesses take one life
			if(failedGuesses.indexOf(myLetter) > -1) {
				console.log(failedGuesses + "I'm already in it.");

			} else {
				// Call function
				livesCount();
				failedGuesses.push(myLetter);

			}
		} else {
			// for corrrect guesses display the letters
			for (var j = 0; j < chosenWord.length; j++){

				if(chosenWord[j] === myLetter){
					targetWord[j] = myLetter;
					console.log(targetWord);
					guessWordElem.innerHTML = targetWord.join(" ");

				}

			}

		} // end of validation


		// check if word was completly guessed
		if (targetWord.indexOf("_") === -1) {
			// set delay on alert
			setTimeout(function() {
				alert("You guessed the word: " + guessWordElem.textContent);
				//Call win fucntion
				winCount();
			}, 500);
			

		} // end check if word was completly guessed
 
	} // End check if key pressed is a valid letter

} // ************** END onkeyup EVENT HANDLER **************


// ************** START GAME **************
startGame();

// ************** RESET GAME **************
document.getElementById("reset").addEventListener("click", resetGame);





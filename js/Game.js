/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
	this.missed = 0;						// counts missed guesses
	this.phrases = this.createPhrases();	// contains all the phrases
	this.activePhrase = null;				// randomly selected phrase to be used for the game.
    }	// END constructor

    createPhrases() {
    /* Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game*/
		let phrases = [
            new Phrase('Life is like a box of chocolates'),
            new Phrase('There is no trying'),
            new Phrase('May the Force be with you'),
            new Phrase('You have to see the Matrix for yourself'),
            new Phrase('Are you talking to ME')
        ];
        return phrases
    }	// END createPhrases
	
	getRandomPhrase() {
	/* Selects random phrase from phrases property
	* @return {Object} Phrase object chosen to be used*/
		let randomNumber = Math.floor(Math.random() * this.phrases.length );
		return this.phrases[randomNumber];
	}	// END getRandomPhrase
	
	startGame() {
	/* Begins game by selecting a random phrase and displaying it to user */
		const startScreen = document.querySelector('#overlay');	// hide the start screen overlay
		startScreen.style.display = 'none';
		this.activePhrase = this.getRandomPhrase();	// randomly select a phrase from stored phrase array and make it the Active Phrase for the game.
		this.activePhrase.addPhraseToDisplay();	// add the active phrase to the gameboard
	//	handleInteraction();
	}	// END startGame
	
	checkForWin() {
	/* check to see if the player has revealed all of the letters in the active phrase. */	
	/* @return {boolean} True if game has been won, false if game wasn't won */
		let phraseLettersList = document.querySelectorAll('.letter');	// all letters in the phrase
		let matchedLettersList = document.querySelectorAll('.show');	// only letters that have been guessed correctly in the phrase
        if(matchedLettersList.length === phraseLettersList.length) {
            return true;
        } else {
            return false;
        }
	}	// END checkForWin
	
	removeLife(){
		/* Increases the value of the missed property */
		this.missed += 1;
		/* removes a life from the scoreboard */
		let liveHeart = document.querySelector('.tries');	// get the first available live heart.
		let liveHeartImg = liveHeart.firstChild;
		liveHeart.classList.remove('tries');		// remove this heart from the "tries" list
		liveHeartImg.src = "images/lostHeart.png";	// replace the blue Live Heart image with the greyed-out Lost Heart image.
		/* Checks if player has remaining lives and ends game if player is out */
		if(this.missed === 5) {
			this.gameOver(false);
		}
	}	// END removeLife
	
	gameOver(gameWon) {
	/* Displays the original start screen overlay and updates the overlay with a friendly win or loss message */	
	/* @param {boolean} gameWon - Whether or not the user won the game */
		const startScreen = document.querySelector('#overlay');	
		startScreen.style.display = 'flex';	
		const h1 = document.querySelector('#game-over-message');
		startScreen.classList.remove('start');
		if (gameWon) {
			startScreen.classList.add('win');
			let msgText = "Hooray! you Win!";
			h1.textContent = msgText;
		} else {
			startScreen.classList.add('lose');
			let msgText = "Sorry, better luck next time!";
			h1.textContent = msgText;
		}
	}	// END gameOver
	
	resetGame () {
		/* reset the gameboard between games: */
		/* Reset the Start screen with original background color */
		/* Remove all `li` elements from the Phrase `ul` element. */
		/* Enable all of the onscreen keyboard buttons and update each to use the `key` CSS class, and not use the `chosen` or `wrong` CSS classes. */
		/* Reset all of the heart images (i.e. the player's lives) in the scoreboard */
		const startScreen = document.querySelector('#overlay');	
		startScreen.classList.remove('win', 'lose');
		startScreen.classList.add('start');
		
		const ul = document.querySelector('#phrase ul');	
		ul.innerHTML = "";	
		
		const listKeys = document.querySelectorAll('.key');
      	for (let i = 0; i < listKeys.length; i++) {
		listKeys[i].classList.remove('chosen', 'wrong');
		listKeys[i].disabled = false;
		}
		
		const hearts = document.querySelectorAll('#scoreboard ol li');
		for (let i = 0; i < hearts.length; i++) {
			if (hearts[i].classList != 'tries')	{
				hearts[i].classList.add('tries');
				hearts[i].firstChild.src = 'images/liveHeart.png';
			}	   
		}
	}	// END resetGame
	
	handleInteraction(keySel) {
		keySel.disabled = true;					// disable key once it's been clicked
		let letter = keySel.textContent;
		/* If the phrase includes the guessed letter, show the letter in the phrase box(es). Check to see if player has won yet. */
		/* If the phrase does not include the guessed letter, highlight the key on the keyboard and lose a life (Live Heart). */
		if(this.activePhrase.checkLetter(letter)){
			keySel.classList.add('chosen');
			this.activePhrase.showMatchedLetter(letter);
			if(this.checkForWin()) {
        		this.gameOver(true);
			}
        } else {
			keySel.classList.add('wrong');
			this.removeLife();
        }

	}	// END handleInteraction
	
}







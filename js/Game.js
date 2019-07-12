/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor() {
	this.missed = 0;						// counts missed guesses
	this.phrases = this.createPhrases();	// contains all the phrases
	this.activePhrase = null;				// randomly selected phrase to be used for the game.
    }	

    createPhrases() {
    /* Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game*/
		let phrases = [
            new Phrase('I have a dream'),
            new Phrase('Inconceivable'),
            new Phrase('Why did the chicken cross the road'),
            new Phrase('We all live in a Yellow Submarine'),
            new Phrase('Live long and prosper'),
			new Phrase('You and I remember Budapest very differently'),
			new Phrase('My Precious')
        ];
        return phrases
    }	
	
	getRandomPhrase() {
	/* Selects random phrase from phrases property
	* @return {Object} Phrase object chosen to be used*/
		let randomNumber = Math.floor(Math.random() * this.phrases.length );
		return this.phrases[randomNumber];
	}	
	
	startGame() {
	/* Begins game by selecting a random phrase and displaying it to user */
		const startScreen = document.querySelector('#overlay');	
		startScreen.style.display = 'none';
		this.activePhrase = this.getRandomPhrase();	
		this.activePhrase.addPhraseToDisplay();	
	}	
	
	checkForWin() {
	/* check to see if the player has revealed all of the letters in the active phrase. */	
	/* @return {boolean} True if game has been won, false if game wasn't won */
		let phraseLettersList = document.querySelectorAll('.letter');	
		let matchedLettersList = document.querySelectorAll('.show');	
        if(matchedLettersList.length === phraseLettersList.length) {
            return true;
        } else {
            return false;
        }
	}	
	
	removeLife(){
		/* Increases the value of the missed property */
		/* removes a life from the scoreboard */
		/* Checks if player has remaining lives and ends game if player is out */
		this.missed += 1;
		let liveHeart = document.querySelector('.tries');
		let liveHeartImg = liveHeart.firstChild;
		liveHeart.classList.remove('tries');
		liveHeartImg.src = "images/lostHeart.png";	
		if(this.missed === 5) {
			this.gameOver(false);
		}
	}	
	
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
	}	
	
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
	}	
	
	handleInteraction(keySel) {
		/* disable key once it's been clicked */
		/* If the phrase includes the guessed letter, show the letter in the phrase box(es). Check to see if player has won yet. Otherwise, highlight the key on the keyboard and lose a life (Live Heart). */
		keySel.disabled = true;					
		let letter = keySel.textContent;
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
	}	
	
}







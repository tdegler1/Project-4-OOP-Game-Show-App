/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
	constructor(phrase) {
		this.phrase = phrase.toLowerCase();
	}
	
	addPhraseToDisplay() {
	/* Display phrase on game board */
		const ul = document.querySelector('#phrase ul');
		ul.innerHTML = '';	// initialize list contents
		const piece = this.phrase.split("");	
		piece.forEach( letter => {	
            let li = document.createElement('li');
			let liText = document.createTextNode(letter);
			li.appendChild(liText);
			if (letter === ' ' ) {   
               li.classList.add('space');
            } else {
				li.classList.add('hide', 'letter',`${letter}`);
			}
			ul.appendChild(li);
		});
	}
	
	checkLetter(letter) {
	/* Check to see if the letter selected by the player matches a letter in the phrase. */
	/* @param (string) letter - Letter to check*/	
        if(this.phrase.includes(letter)){
            return true;
        } else {
            return false;
        }
	}
	
	showMatchedLetter(letter) {
	/* Reveal the letter(s) on the board that matches the player's selection. */
	/* @param (string) letter - Letter to display */
		const listBoxes = document.querySelectorAll(`.${letter}`);	
		if(this.checkLetter(letter)) {
			for (let i = 0; i < listBoxes.length; i++) {
				listBoxes[i].classList.add('show');	
				listBoxes[i].classList.remove('hide');	
			}
		}
	}	

}



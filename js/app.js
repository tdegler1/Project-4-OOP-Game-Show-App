/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


/* Begin a new Game when Start Button is selected. */
let game;	
const resetBtn = document.querySelector('#btn__reset');
resetBtn.addEventListener('click', () => {
	game = new Game();
	game.resetGame();
	game.startGame();
}); 

/* Listen for letters to be selected on the keyboard; hand off to process the interaction. */
const keySelect = document.querySelector('#qwerty');
keySelect.addEventListener('click', (event) => {
	const e = event.target;
	if (e.classList.contains('key')) {
       game.handleInteraction(e)
    };   
});
	
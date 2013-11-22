// var game = ;
var startButton = document.querySelector('.start-game')

startButton.addEventListener('click', function(e) {
	var currentGame = new Game(
		document.querySelector('.game'),
		document.getElementById('pong'), 1, [
		document.getElementsByClassName('player1')[0],
		document.getElementsByClassName('player2')[0]
	]);
	currentGame.start();
	startButton.style.display = 'none';
});

var Manager = function() {
	this.currentGame = null;
};

Manager.prototype.playGame = function() {
	this.currentGame = new Game(
		document.querySelector('.game'),
		document.getElementById('pong'), 1, [
		document.getElementsByClassName('player1')[0],
		document.getElementsByClassName('player2')[0]
	]);
	this.currentGame.start();
	gameUI.hide();
};

Manager.prototype.endGame = function() {
	this.currentGame = null;
	gameUI.show();
};

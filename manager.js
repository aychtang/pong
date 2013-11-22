var Manager = function(eventSystem) {
	this.currentGame = null;
	this.events = eventSystem;
	this.serListeners();
};

Manager.prototype.serListeners = function() {
	this.events.on('start', this.playGame.bind(this));
};

Manager.prototype.playGame = function() {
	this.currentGame = new Game(
		document.querySelector('.game'),
		document.getElementById('pong'), 1, [
		document.getElementsByClassName('player1')[0],
		document.getElementsByClassName('player2')[0]
	]);
	this.currentGame.start();
	this.events.trigger('hideUI');
};

Manager.prototype.endGame = function() {
	this.currentGame = null;
	this.events.trigger('showUI');
};

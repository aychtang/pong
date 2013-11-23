var Manager = function(eventSystem) {
	this.currentGame = null;
	this.events = eventSystem;
	this.setListeners();
};

Manager.prototype.setListeners = function() {
	this.events.on('start', this.playGame.bind(this));
	this.events.on('end', this.endGame.bind(this));
};

Manager.prototype.makeGame = function() {
	return new Game(
		document.querySelector('.game'),
		document.getElementById('pong'),
		1,
		[
			document.querySelector('.player1'),
			document.querySelector('.player2')
		],
		this.events
	);
};

Manager.prototype.playGame = function() {
	this.currentGame = this.makeGame();
	this.currentGame.start();
	this.events.trigger('hideUI');
};

Manager.prototype.endGame = function() {
	this.currentGame = null;
	this.events.trigger('showUI');
};

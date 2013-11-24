var Manager = function(eventSystem) {
	this.currentGame = null;
	this.user = null;
	this.events = eventSystem;
	this.setListeners();
};

Manager.prototype.setListeners = function() {
	this.events.on('start', this.playGame.bind(this));
	this.events.on('end', this.endGame.bind(this));
	this.events.on('usernameEntered', function(name) {
		if (name !== '') {
			this.registerUsername(name);
		}
	}.bind(this));
};

Manager.prototype.setUser = function(username) {
	this.user = username;
};

// Eventually set which player from game start event.
Manager.prototype.makeGame = function() {
	return new Game(document.querySelector('.game'), 1, this.events);
};

Manager.prototype.registerUsername = function(username) {
	var that = this;
	cloak.registerUsername(username, function(success) {
		if (success) {
			cloak.joinLobby(function(success) {
				if (success) {
					cloak.listUsers(function(users) {
						console.log(users);
						that.events.trigger('lobbyChange', users);
					});
				}
			});
		}
	});
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

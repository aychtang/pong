var Events = function() {
	this.callbacksByEvent = {};	
};

Events.prototype.on = function(ev, callback) {
	if (!this.callbacksByEvent[ev]) {
		this.callbacksByEvent[ev] = [];
	}
	this.callbacksByEvent[ev].push(callback);
};

Events.prototype.trigger = function(ev, data) {
	setTimeout(function() {
		if (this.callbacksByEvent[ev]) {
			this.run(ev, data);
		}
	}.bind(this), 0);
};

Events.prototype.run = function(ev, data) {
	for (var i = 0; i < this.callbacksByEvent[ev].length; i++) {
		this.callbacksByEvent[ev][i](data);
	}
};

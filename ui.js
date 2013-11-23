var UI = function(el, startButton, eventSystem) {
	this.el = el;
	this.startButton = startButton;
	this.events = eventSystem;
	this.open = true;
	this.setListeners();
};

UI.prototype.setListeners = function() {
	this.events.on('showUI', this.show.bind(this));
	this.events.on('hideUI', this.hide.bind(this));
	this.startButton.addEventListener('click', function() {
		this.events.trigger('start');
	}.bind(this));
};

UI.prototype.hide = function() {
	this.open = false;
	this.el.style.display = 'none';
};

UI.prototype.show = function() {
	this.open = true;
	this.el.style.display = 'block';
};

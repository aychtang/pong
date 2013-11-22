var UI = function(el, startButton) {
	this.el = el;
	this.startButton = startButton;
	this.setListener();
};

UI.prototype.setListener = function() {
	this.startButton.addEventListener('click', function(e) {
		manager.playGame();
	});
};

UI.prototype.hide = function() {
	this.el.style.display = 'none';
};

UI.prototype.show = function() {
	this.el.style.display = 'block';
};

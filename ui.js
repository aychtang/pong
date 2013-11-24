var UI = function(el, eventSystem) {
	this.el = el;
	this.mainEl = el.querySelector('.main');
	this.nameEl = el.querySelector('.name');
	this.nameInput = el.querySelector('.username');
	this.nameSubmit = el.querySelector('.submit-name');
	this.startButton = el.querySelector('.start-game');
	this.events = eventSystem;
	this.open = true;
	this.setListeners();
	this.setDOMListeners();
};

UI.prototype.setListeners = function() {
	this.events.on('showUI', this.show.bind(this));

	this.events.on('hideUI', this.hide.bind(this));

	this.events.on('joinLobby', function() {
		this.showLobby();
		this.hideNameUI();
	}.bind(this));

};

UI.prototype.setDOMListeners = function() {

	this.startButton.addEventListener('click', function() {
		this.events.trigger('start');
	}.bind(this));

	this.nameSubmit.addEventListener('click', function() {
		var name = this.nameInput.value;
		this.events.trigger('usernameEntered', name);
	}.bind(this));

};

UI.prototype.hide = function() {
	this.open = false;
	this.el.style.display = 'none';
};

UI.prototype.renderUsername = function(data) {
	var template = DOMBars.compile('<h2>Hello there, {{username}}.</h2>')(data);
	this.mainEl.insertBefore(template, this.mainEl.firstChild);
};

UI.prototype.show = function() {
	this.open = true;
	this.el.style.display = 'block';
};

UI.prototype.showLobby = function() {
	this.mainEl.style.display = 'block';
};

UI.prototype.hideNameUI = function() {
	this.nameEl.style.display = 'none';
};
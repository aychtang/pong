var Game = function(el, player, eventSystem) {
	this.gameEl = el;
	this.canvas = el.querySelector('#pong');
	this.context = this.canvas.getContext('2d');
	this.player = player;
	this.scoreEls = el.querySelectorAll('.scores > div > span');
	this.events = eventSystem;
	this.scores = [0, 0];
};

Game.prototype.init = function() {
	this.gameState = undefined;
	this.gameLoop = undefined;
	this.canvas.height = 500;
	this.canvas.width = 1024;
	this.centerHeight = this.canvas.height / 2;
	this.centerWidth = this.canvas.width / 2;
};

Game.prototype.end = function(player) {
	// Display end content for winner and loser.
	clearInterval(this.gameLoop);
	console.log('player ' + player + ' has won the game.');
	this.gameEl.style.display = 'none';
	this.events.trigger('end');
};

Game.prototype.drawBoard = function() {
	this.context.fillStyle = 'pink';
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

Game.prototype.render = function(puck, paddles) {
	this.drawBoard();
	this.drawPaddles(paddles);
	this.draw(puck, 'black');
};

// Works as long as obj has x, y, width, height props.
Game.prototype.draw = function(obj, color) {
	this.context.fillStyle = color;
	this.context.fillRect(
		obj.x,
		obj.y,
		obj.width,
		obj.height
	);
};

Game.prototype.drawPaddles = function(paddles) {
	for (var i = 0; i < paddles.length; i++) {
		var current = paddles[i];
		this.draw(current, 'black');
	}
};

Game.prototype.movePaddle = function(player, y) {
	var paddle = this.gameState.paddles[player];
	if (y >= 0 && y <= this.canvas.height - paddle.get('height')) {
		paddle.y = y;
	}
};

Game.prototype.reset = function(gameState) {
	gameState.puck = makePuck(this.centerWidth, this.centerHeight);
};

// Scores incremented server-side.
Game.prototype.goal = function(player) {
	this.scores[player]++;
	this.renderScores();
};

// This will all be done server side.
// With client side prediction.
Game.prototype.checkCollision = function(puck, paddles) {

	for (var i = 0; i < paddles.length; i++) {
		var current = paddles[i];
		var wallCollision = puck.y < 0 || puck.y > this.canvas.height;
		var playerOneConcede = puck.x < 0;
		var playerTwoConcede = puck.x > this.canvas.width;
		var paddleCollision = puck.x > current.x && puck.x < current.x + 10 && puck.y > current.y && puck.y < current.y + current.height;

		if (paddleCollision) {
			puck.vx = -puck.vx;
			return;
		}
		else if (wallCollision) {
			puck.vy = -puck.vy;
			return;
		}
		else if (playerOneConcede) {
			this.reset(this.gameState);
			this.goal(1);
			return;
		}
		else if (playerTwoConcede) {
			this.reset(this.gameState);
			this.goal(0);
			return;
		}
	}

};

Game.prototype.updatePuck = function(puck, paddles) {
	this.checkCollision(puck, paddles);
	puck.x += puck.vx;
	puck.y += puck.vy;
};

// This will be done server side and dispatch the event.
Game.prototype.checkWin = function(scores) {
	var p1Win = scores[0] >= 3;
	var p2Win = scores[1] >= 3;
	if (p1Win || p2Win) {
		this.end(p1Win ? 1 : 2);
	}
};

Game.prototype.main = function() {
	var paddles = this.gameState.paddles;
	var puck = this.gameState.puck;
	this.updatePuck(puck, paddles);
	this.checkWin(this.scores);
	this.render(puck, paddles);
};

Game.prototype.renderScores = function() {
	this.scoreEls[0].textContent = this.scores[0];
	this.scoreEls[1].textContent = this.scores[1];
};

Game.prototype.start = function() {
	this.init();
	this.renderScores();
	this.gameState = makeGameState(this.centerHeight, this.centerWidth, this.canvas.height / 5, this.canvas);
	this.gameLoop = setInterval(this.main.bind(this), 14);
	this.gameEl.style.display = 'block';
	this.setMouseListener(this.player);
};

// Run movepaddle and send event to server.
Game.prototype.setMouseListener = function(player) {
	this.canvas.addEventListener('mousemove', function(e) {
		this.movePaddle(player, e.y - this.canvas.offsetTop);
	}.bind(this));
};

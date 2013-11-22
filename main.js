
var Game = function(gameEl, canvas, player, scoreEls) {
	this.gameEl = gameEl;
	this.canvas = canvas;
	this.player = player;
	this.score1 = scoreEls[0];
	this.score2 = scoreEls[1];
	this.context = canvas.getContext('2d');

	this.gameState = undefined;
	this.gameLoop = undefined;
};

Game.prototype.init = function() {
	this.canvas.height = 500;
	this.canvas.width = 1024;
	this.centerHeight = this.canvas.height / 2;
	this.centerWidth = this.canvas.width / 2;
};

Game.prototype.end = function(player) {
	clearInterval(this.gameLoop);
	console.log('player ' + player + ' has won the game');
	this.gameEl.style.display = 'none';
	manager.endGame();
};

Game.prototype.drawBoard = function() {
	this.context.fillStyle = 'turquoise';
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

Game.prototype.checkCollision = function(puck, paddles) {
	for (var i = 0; i < paddles.length; i++) {
		var current = paddles[i];
		var wallCollision = puck.y < 0 || puck.y > this.canvas.height;
		var playerOneConcede = puck.x < 0;
		var playerTwoConcede = puck.x > this.canvas.width;
		var paddleCollision = puck.x > current.x && puck.x < current.x + 10 && puck.y > current.y && puck.y < current.y + current.height;

		if (paddleCollision) {
			puck.set('vx', -puck.vx);
			return;
		}
		else if (wallCollision) {
			puck.set('vy', -puck.vy);
			return;
		}
		else if (playerOneConcede) {
			this.reset(this.gameState);
			this.score2.textContent = +this.score2.textContent + 1;
			return;
		}
		else if (playerTwoConcede) {
			this.reset(this.gameState);
			this.score1.textContent = +this.score1.textContent + 1;
			return;
		}
	}
};

Game.prototype.updatePuck = function(puck, paddles) {
	this.checkCollision(puck, paddles);
	puck.x += puck.vx;
	puck.y += puck.vy;
};

Game.prototype.checkWin = function(score1, score2) {
	var p1Win = score1 >= 3;
	var p2Win = score2 >= 3;
	if (p1Win || p2Win) {
		this.end(p1Win ? 1 : 2);
	}
};

Game.prototype.main = function() {
	var paddles = this.gameState.paddles;
	var puck = this.gameState.puck;
	this.updatePuck(puck, paddles);
	this.checkWin(+this.score1.textContent, +this.score2.textContent);
	this.render(puck, paddles);
};

Game.prototype.start = function() {
	this.init();
	this.gameEl.style.display = 'block';
	this.score1.textContent = 0;
	this.score2.textContent = 0;
	this.gameState = makeGameState(this.centerHeight, this.centerWidth, this.canvas.height / 5, this.canvas);
	this.gameLoop = setInterval(this.main.bind(this), 14);
	this.setMouseListener(this.player);
};

Game.prototype.setMouseListener = function(player) {
	this.canvas.addEventListener('mousemove', function(e) {
		this.movePaddle(player, e.y - this.canvas.offsetTop);
	}.bind(this));
};

// Game Model definitions and makeGameState helper fn.

var Paddle = function(x, y, height, width) {
		this.x = x;
		this.y = y;
		this.height = height;
		this.width = width;
};

var Puck = function(x, y, vx, vy) {
	this.x = x;
	this.y = y;
	this.vx = vx;
	this.vy = vy;
};

var GameState = function(puck, paddles, players) {
	this.puck = puck;
	this.paddles = paddles;
	// if (players) {
	// 	this.players = players;
	// }
};

var makePuck = function(x, y) {
	return new Puck(x, y, Math.random() * 1 > 0.49 ? 5: -5 , 10)
};

var makeGameState = function(centerHeight, centerWidth, paddleHeight) {
	var paddleStartY = centerHeight - paddleHeight / 2;
	var paddles = [
		new Paddle(0, paddleStartY, paddleHeight, 10),
		new Paddle(canvas.width - 10, paddleStartY, paddleHeight, 10)
	];
	var puck = makePuck(centerWidth, centerHeight);
	return new GameState(puck, paddles);
};

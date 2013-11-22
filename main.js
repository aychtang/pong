//TODO: modularise game code.

var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');
var player = 0;
canvas.height = 500, canvas.width = 1024;
var centerHeight = canvas.height / 2;
var centerWidth = canvas.width / 2;
var score1 = document.getElementsByClassName('player1')[0];
var score2 = document.getElementsByClassName('player2')[0];
var gameState, gameLoop;

var endGame = function(player) {
	clearInterval(gameLoop);
	console.log('player ' + player + ' has won the game');
	game.style.display = 'none';
	startButton.style.display = 'block';
};

var drawBoard = function() {
	context.fillStyle = 'turquoise';
	context.fillRect(0, 0, canvas.width, canvas.height);
};

var render = function(puck, paddles) {
	drawBoard();
	drawPaddles(paddles);
	drawPuck(puck);
};

// Works as long as obj has x, y, width, height props.
var draw = function(obj, color) {
	context.fillStyle = color;
	context.fillRect(
		obj.x,
		obj.y,
		obj.width,
		obj.height
	);
};

var drawPaddles = function(paddles) {
	for (var i = 0; i < paddles.length; i++) {
		var current = paddles[i];
		draw(current, 'black');
	}
};

var drawPuck = function(puck) {
	draw(puck, 'black');
};

var movePaddle = function(player, y) {
	var paddle = gameState.paddles[player];
	if (y >= 0 && y <= canvas.height - paddle.get('height')) {
		paddle.y = y;
	}
};

var reset = function(gameState) {
	gameState.puck = makePuck(centerWidth, centerHeight);
};


var checkCollision = function(puck, paddles) {
	for (var i = 0; i < paddles.length; i++) {
		var current = paddles[i];
		var wallCollision = puck.y < 0 || puck.y > canvas.height;
		var playerOneConcede = puck.x < 0;
		var playerTwoConcede = puck.x > canvas.width;
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
			reset(window.gameState);
			score2.textContent = +score2.textContent + 1;
			return;
		}
		else if (playerTwoConcede) {
			reset(window.gameState);
			score1.textContent = +score1.textContent + 1;
			return;
		}
	}
};

var updatePuck = function(puck, paddles) {
	checkCollision(puck, paddles);
	puck.x += puck.vx;
	puck.y += puck.vy;
};

var checkWin = function(score1, score2) {
	var p1Win = score1 >= 3;
	var p2Win = score2 >= 3;
	if (p1Win || p2Win) {
		endGame(p1Win ? 1 : 2);
	}
};

var main = function() {
	var paddles = gameState.paddles;
	var puck = gameState.puck;
	updatePuck(puck, paddles);
	checkWin(+score1.textContent, +score2.textContent);
	render(puck, paddles);
};

var init = function() {
	game.style.display = 'block';
	gameState = makeGameState(centerHeight, centerWidth, canvas.height / 5);
	gameLoop = setInterval(main, 14);
};

canvas.addEventListener('mousemove', function(e) {
	movePaddle(player, e.y - canvas.offsetTop);
});

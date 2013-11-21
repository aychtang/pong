var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');
var player = 1;
canvas.height = 500;
canvas.width = 1024;
var centerHeight = canvas.height / 2;
var centerWidth = canvas.width / 2;
var score1 = document.getElementsByClassName('player1')[0];
var score2 = document.getElementsByClassName('player2')[0];
var gameState;
var gameLoop;

var endGame = function(player) {
	clearInterval(gameLoop);
	console.log('player ' + player + ' has won the game');
};

var drawBoard = function() {
	context.fillStyle = 'yellow';
	context.fillRect(0, 0, canvas.width, canvas.height);
};

var main = function(puck, paddles) {
	drawBoard();
	drawPaddles(paddles);
	updatePuck(puck, paddles);
	drawPuck(puck);
};

var drawPaddles = function(paddles) {
	context.fillStyle = 'black';
	for (var i = 0; i < paddles.length; i++) {
		var current = paddles[i];
		context.fillRect(current.x, current.y, current.width, current.height);
	}
};

var drawPuck = function(puck) {
	context.fillStyle = 'black';
	context.fillRect(puck.x, puck.y, 10, 10);
};

var startPuck = function(puck, vx, vy) {
	puck.vx = vx;
	puck.vy = vy;
};

var movePaddle = function(player, y) {
	if (gameState) {
		gameState.paddles[player].y = y;
	}
};

var checkCollision = function(puck, paddles) {
	for (var i = 0; i < paddles.length; i++) {
		var current = paddles[i];
		if (puck.x > current.x && puck.x < current.x + 10 && puck.y > current.y && puck.y < current.y + current.height) {
			var yDiff = (puck.y - current.y - current.height / 2) / 100;
			puck.vx = - puck.vx;
			return;
		}
		else if (puck.y < 0 || puck.y > canvas.height) {
			puck.vy = - puck.vy;
			return;
		}
		else if (puck.x < 0) {
			score2.textContent = +score2.textContent + 1;
			reset(window.gameState);
			return;
		}
		else if (puck.x > canvas.width) {
			score1.textContent = +score1.textContent + 1;
			reset(window.gameState);
			return;
		}
	}
};

var updatePuck = function(puck, paddles) {
	if (puck != undefined) {
		checkCollision(puck, paddles);
		puck.x += puck.vx;
		puck.y += puck.vy;
	}
};

function reset(gameState) {
	gameState.puck = makePuck(centerWidth, centerHeight);
}

var renderGame = function() {
	var paddles = gameState.paddles;
	var puck = gameState.puck;
	main(puck, paddles);
	var p1Win = +score1.textContent >= 3;
	var p2Win = +score2.textContent >= 3
	if (p1Win|| p2Win) {
		endGame(p1Win ? 1 : 2);
	}
};

var init = function() {
	game.style.display = 'block';
	gameState = makeGameState(centerHeight, centerWidth, canvas.height / 5);
	gameLoop = setInterval(renderGame, 14);
};

canvas.addEventListener('mousemove', function(e) {
	movePaddle(player, e.y);
});

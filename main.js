var canvas = document.getElementById('pong');
var context = canvas.getContext('2d');
var paddles = [];
var player = 1;
var puck;
canvas.height = 500;
canvas.width = 1024;
var score1 = document.getElementsByClassName('player1')[0];
var score2 = document.getElementsByClassName('player2')[0];

var drawBoard = function() {
	context.fillStyle = 'yellow';
	context.fillRect(0, 0, canvas.width, canvas.height);
};

var makePaddle = function(x) {
	return {
		x: x,
		y: canvas.height / 2,
		height: canvas.height / 5,
		width: 10
	};
};

var makePuck = function(x, y) {
	return {
		x: x,
		y: y,
		vx: 0,
		vy: 0
	};
};

var main = function() {
	drawBoard();
	drawPaddles(paddles, context);
	updatePuck(puck);
	drawPuck(puck);
};

var drawPaddles = function(paddles, context) {
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

var movePaddle = function(paddle, y) {
	paddle.y = y;
};

var checkCollision = function(puck, paddles) {
	for (var i = 0; i < paddles.length; i++) {
		var current = paddles[i];
		if (puck.x > current.x && puck.x < current.x + 10 && puck.y > current.y && puck.y < current.y + current.height) {
			var yDiff = (puck.y - current.y - current.height / 2) / 100;
			puck.vx = - puck.vx;
			// puck.vy = - puck.vy + yDiff;
			return;
		}
		else if (puck.y < 0 || puck.y > canvas.height) {
			puck.vy = - puck.vy;
			return;
		}
		else if (puck.x < 0) {
			score1.textContent = +score1.textContent + 1;
			reset();
			return;
		}
		else if (puck.x > canvas.width) {
			score2.textContent = +score2.textContent + 1;
			reset();
			return;
		}
	}
};

var updatePuck = function(puck) {
	checkCollision(puck, paddles);
	puck.x += puck.vx;
	puck.y += puck.vy;
};

function reset() {
	window.puck = makePuck(canvas.width/2, canvas.height/2);
	startPuck(window.puck, Math.random() * 1 > 0.49 ? 5: -5, ~~(Math.random() * 15));
}

var init = function() {
	paddles.push(makePaddle(0));
	paddles.push(makePaddle(canvas.width - 10));
	var paddleHeight = paddles[0].height;
	movePaddle(paddles[0], paddles[0].y - paddleHeight / 2);
	movePaddle(paddles[1], paddles[1].y - paddleHeight / 2);
	reset();
	setInterval(main, 14);
};

canvas.addEventListener('mousemove', function(e) {
	movePaddle(paddles[player], e.y);
});

init();

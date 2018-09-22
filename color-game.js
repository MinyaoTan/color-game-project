const brandColor = "#6997e0";
const bodyColor = "#2a2d33";

var levels = document.querySelectorAll('.level');
var resetGame = document.querySelector('.reset');
var displayColor = document.querySelector('#target-color');
var squares = document.querySelectorAll('.active');
var statusText = document.querySelector('.status');
var header = document.querySelector('header');
var hardButton = document.querySelector('#hard');
var easyButton = document.querySelector('#easy');
var hardRow = document.querySelector('.row:nth-child(2)');
var isHard = true;
var correctColor;
var r;
var g;
var b;
var correctSquareIndex;
var correctSquare;
var enableClick = true;

getColor();

resetGame.addEventListener('click', getColor);

levels.forEach(level => level.addEventListener('click', function() {
	if ((isHard && this.getAttribute('id') === "easy") || (! isHard && this.getAttribute('id') === "hard")) {
		switchMode();
		getColor();
	}

	resetNavColors();
	this.style.background = brandColor;
	this.style.color = "white";
}))

squares.forEach(square => square.addEventListener('click', function() {
	if (this === correctSquare) {
		enableClick = false;
		statusText.innerHTML = "Correct!";
		squares.forEach(square => square.style.background = correctColor);
		header.style.background = correctColor;
	} else if (enableClick) {
		statusText.innerHTML = "Try again!";
		this.style.background = bodyColor;
	}
}))

function resetNavColors() {
	for (let i = 0; i < levels.length; i ++) {
		levels[i].style.background = "white";
		levels[i].style.color = brandColor;
	}
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getColor() {
	header.style.background = brandColor;
	r = getRandomInt(256);
	g = getRandomInt(256);
	b = getRandomInt(256);
	displayColor.innerHTML = "RGB(" + r + ", " + g + ", " + b + ")";
	statusText.innerHTML = "";

	if (isHard) {
		correctSquareIndex = getRandomInt(6);
	} else {
		correctSquareIndex = getRandomInt(3);
	}

	for (let i = 0; i < squares.length; i ++) {
		if (i === correctSquareIndex) {
			correctSquare = squares[i];
			correctColor = "rgb(" + r + ", " + g + ", " + b + ")";
			squares[i].style.background = correctColor;
		} else {
			let tmpR = getRandomInt(256);
			let tmpG = getRandomInt(256);
			let tmpB = getRandomInt(256);
			squares[i].style.background = "rgb(" + tmpR + ", " + tmpG + ", " + tmpB + ")";
		}
	}

	enableClick = true;
}

function switchMode() {
	if (isHard) {
		isHard = false;
	} else {
		isHard = true;
	}

	hardRow.classList.toggle('hard');
	hardRow.classList.toggle('easy');
}

function intRandom(m, n) {
	return Math.floor(Math.random() * (n - m)) + m;
}
function cap(string) {
	return string[0].toUpperCase() + string.substr(1, string.length - 1);
}

var gamePlaying = false;
var score = 0;
var timeLeft = 0;
var maxTime = 0;
var colors = [
	["green", "#008000"],
	["blue", "#0000ff"],
	["red", "#ff0000"],
	["black", "#000000"],
	["yellow", "#eeee00"]
];
var realColor = -1;
var fakeColor = -1;

function setColor() {
	realColor = intRandom(0, colors.length)
	fakeColor = intRandom(0, colors.length)
	/*while (realColor == fakeColor) {
		fakeColor = intRandom(0, colors.length);
	}*/
	// 
	$("#word").css("color", colors[realColor][1]);
	$("#word").text( cap(colors[fakeColor][0]) );
}
function clearColor() {
	realColor = fakeColor = -1;
}
var proof = [];
$(document).ready(function() {
	// Start
	$("#start-bttn").click(function() {
		$(this).slideUp();
		gamePlaying = true;
		timeLeft = maxTime = 5;
		score = 0;
		setColor();
	});
	
	$(".guess").click(function() {
		// check the game is playing
		if (gamePlaying) {
			var i = $(this).attr("id");
			if (i == colors[realColor][0]) {
				proof.push(i);
				score += 100;
				maxTime -= 0.1;
				timeLeft = maxTime;
				$("#score").text(score);
				setColor();
			} else {
				gamePlaying = false;
				window.alert("You lost!\n\nYour score: " + score);
				$("#start-bttn").slideDown();
			}
		}
	});
	
	setInterval(function() {
		if (gamePlaying) {
			timeLeft -= 0.1;
			$("#timer").text(timeLeft.toFixed(1));
			if (timeLeft <= 0) {
				window.alert("You lost!\n\nYour score: " + score);
				gamePlaying = false;
				$("#start-bttn").slideDown();
			}
			
			if (proof.length * 100 != score) {
				score = 0;
			}
		}
	}, 100);
});
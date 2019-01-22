const PI = Math.PI;

var canvas = document.querySelector('canvas');
var body = document.querySelector('body');
canvas.width = body.clientWidth;
canvas.height = body.clientHeight;
var width = canvas.width;
var height = canvas.height;

console.log(window);

var c = canvas.getContext('2d');

var avatar = document.querySelector('#avatar').getBoundingClientRect();

var centerEyeX = avatar.x+avatar.width/3;
	centerEyeY = avatar.y+avatar.height/3.5;

function randomIntFromRange(min,max) {
	return Math.floor(Math.random() * (max - min) + min);
}

canvas.onmousemove = function(e) {
	var x = e.offsetX;
	var y = e.offsetY;
	c.beginPath();
	var isRemoved = randomIntFromRange(1,2);
	var radius = Math.pow(Math.pow(x-centerEyeX, 2)+Math.pow(y-centerEyeY, 2),0.5);
	var startAngle = randomIntFromRange(0,359);
	var endAngle = randomIntFromRange(0,359);
	c.arc(centerEyeX,centerEyeY,radius,startAngle,endAngle, true);
	c.lineWidth = .4;
	c.strokeStyle="#ffffff12";
	c.stroke();
}

window.addEventListener('resize',()=>{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	width = canvas.width;
	height = canvas.height;
	avatar = document.querySelector('#avatar').getBoundingClientRect();
	centerEyeX = avatar.x+avatar.width/2;
	centerEyeY = avatar.y+avatar.height/2;

});
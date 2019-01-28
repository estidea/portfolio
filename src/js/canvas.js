import utils from "./utils.js";
// Todo: mobile - autocreate stars
var colors = ['#ffffff07','#ffffff05','#ffffff09','#ffffff11'],
	minLine = 1,
	maxLine = 2,
	maxStars = 800,
	minSpeed = -1.3,
	maxSpeed = 1.3;

const PI = Math.PI;

window.onload = function() {

	var canvas = document.querySelector('canvas');
	var body = document.querySelector('body');
	canvas.width = body.clientWidth;
	canvas.height = body.clientHeight;
	var width = canvas.width;
	var height = canvas.height;

	var c = canvas.getContext('2d');

	// Eye position
	var avatar = document.querySelector('#avatar').getBoundingClientRect();
	var centerEyeX = avatar.x+avatar.width/3.3,
		centerEyeY = avatar.y+avatar.height/3.5;

	window.addEventListener('resize',()=>{
		starsArray = [];
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		width = canvas.width;
		height = canvas.height;
		avatar = document.querySelector('#avatar').getBoundingClientRect();
		centerEyeX = avatar.x+avatar.width/2;
		centerEyeY = avatar.y+avatar.height/2;
	});

	function Star(x,y,radius,startAngle,endAngle,width,speed) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
		this.width = width;
		this.color = utils.randomColor(colors);
		this.end = startAngle;
		this.speed = speed;

		this.draw = function() {
			c.beginPath();
			c.arc(this.x,this.y,this.radius,this.startAngle,this.end, false);
			c.lineWidth = this.width;
			c.strokeStyle=this.color;
			c.stroke();
		}

		this.update = function() {

			if(this.speed > 0 && this.end > this.endAngle) {
				this.startAngle += this.speed;
				this.endAngle += this.speed;
			} else if (this.speed <= 0 && this.end < this.endAngle) {
				this.startAngle += this.speed;
				this.endAngle += this.speed;
			} else {
				this.end += this.speed;
			}
			
			this.draw();
		}
	}

	var starsArray = [];

	setInterval(function(){
		var x = utils.randomIntFromRange(0,width);
		var y = utils.randomIntFromRange(0,height);
		var radius = Math.pow(Math.pow(x-centerEyeX, 2)+Math.pow(y-centerEyeY, 2),0.5);
		var startAngle = utils.randomIntFromRange(0,359)*PI/180;
		var endAngle = startAngle + utils.randomIntFromRange(60,180)*PI/180;
		var lineWidth = utils.randomFloatFromRange(minLine,maxLine);
		var speed = utils.randomFloatFromRange(minSpeed,maxSpeed)*PI/180/10;
		if (starsArray.length<maxStars) {
			starsArray.push(new Star(centerEyeX,centerEyeY,radius, startAngle,endAngle,lineWidth,speed));
		} 
	},100);

	function animate() {
		requestAnimationFrame(animate);
		c.clearRect(0,0,width,height);

		for(var i=0;i<starsArray.length;i++){
			starsArray[i].update();
		}
	}

	animate();
}
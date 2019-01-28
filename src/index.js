import style from "./scss/style.scss";
import $ from 'jquery';
import utils from "./js/utils.js";
import "./js/canvas.js";
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
var blocks = ["#first-block","#second-block","#third-block"];
var tlLoader = new TimelineMax(),
	tlScroller = new TimelineMax(),
	body = $('body'),
	scrolledCol = $('.scrolled-col'),
	avatar = $('#avatar'),
	firstBlock = $('#first-block'),
	secondBlock = $('#second-block'),
	thirdBlock = $('#third-block'),
	el1 = $('*[data-order="1"]'),
	el2 = $('*[data-order="2"]'),
	el3 = $('*[data-order="3"]'),
	el4 = $('*[data-order="4"]');

var HEIGHT = window.screen.height;
var speed = .5;
var scrollPosition = 0;
var blockHeight = firstBlock.outerHeight(true);
var position = HEIGHT/2 - blockHeight/2 - parseInt(firstBlock.css("margin-top"));
var currentIndex = 0;
var blockY = position;

tlLoader
	.set(scrolledCol, {y:position})
	.set(secondBlock, {autoAlpha:0, scale:.4})
	.set(thirdBlock, {autoAlpha:0, scale:.4})
	.fromTo(body,2,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeOut})
	.fromTo(avatar,1,	{autoAlpha:0}, {autoAlpha:1, ease:Power0.easeNone})
	.fromTo(el1,0.7,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone})
	.fromTo(el2,0.7,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone})
	.fromTo(el3,0.5,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone}, "+=0.6")
	.fromTo(el4,0.8,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone})
	.to(secondBlock, 2, {autoAlpha:0.3} )
	.to(thirdBlock, 2, {autoAlpha:0.3},'+=-1.3' )
	

$(document).ready(function(){
    body.bind('mousewheel', function(e){
    	var direction = null;
    	scrollPosition += e.originalEvent.wheelDelta/120;
    	if (e.originalEvent.wheelDelta/120 == -1) {
    		direction = 'down';
    	}

    	if (e.originalEvent.wheelDelta/120 == 1) {
    		direction = 'up';
    	}

    	if(scrollPosition<=-3 && direction == 'down') {
    		scrollPosition = 0;
    		if (currentIndex==2) {
				// Stop down scroll
	    		return;
	    	}
	    	currentIndex++;
    		loadBlock(direction);
    	} 

    	if(scrollPosition>=3 && direction == 'up') {

    		scrollPosition = 0;
    		if (currentIndex==0) {
	    		// Stop up scroll
	    		return;
	    	}
	    	currentIndex--;
    		loadBlock(direction);
    	} 
    });
});

function loadBlock(direction) {
	if(direction=='up') {
		blockY += blockHeight;
	} else {
		blockY -= blockHeight;
	}
	var prevBlock = $(blocks[currentIndex-1]),
		currentBlock = $(blocks[currentIndex]),
		nextBlock = $(blocks[currentIndex+1]);
	
	tlScroller
		.to(scrolledCol, speed, {y:blockY, ease: Power2.easeOut})
		.to(prevBlock, speed, {autoAlpha:0.3, scale:.4, ease: Power2.easeOut},'-='+speed)
		.to(currentBlock, speed, {autoAlpha:1, scale:1, ease: Power2.easeOut},'-='+speed)
		.to(nextBlock, speed, {autoAlpha:0.3, scale:.4, ease: Power2.easeOut},'-='+speed)
}
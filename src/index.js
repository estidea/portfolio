import style from "./scss/style.scss";
import $ from 'jquery';
import * as Hammer from 'hammerjs';
import utils from "./js/utils.js";
import "./js/canvas.js";
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";
var blocks = ["#first-block","#second-block","#third-block"],
	miniPills = ["#first-pill",'#pill11','#pill12','#pill13',"#second-pill",'#pill21','#pill22','#pill23',"#third-pill"];

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
var miniPillIndex = 0;
var blockY = position;
var begin = true;
var end = false;

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
	.to(thirdBlock, 2, {autoAlpha:1},'+=-1.3' )
	
// var hammertime = new Hammer(window, {});
// hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
// hammertime.on('panup pandown', function(e) {
// 	var direction = null;
// 	if(e.type=='panup'){
// 		if(end!=true) scrollPosition += -1;
//     		direction = 'down';
//     		fillMiniPills(direction);
//     		begin = false;
// 	}

// 	if(e.type=='pandown'){
// 		if(end!=true) scrollPosition += 1;
//     		direction = 'down';
//     		fillMiniPills(direction);
//     		begin = false;
// 	}

// 	if(scrollPosition<=-4 && direction == 'down') {
//     		scrollPosition = 0;
//     		if (currentIndex==1) {
//     			// for miniPills stop
//     			end = true;
//     		}
//     		if (currentIndex==2) {
// 				// Stop down scroll
// 	    		return;
// 	    	}
// 	    	currentIndex++;
//     		loadBlock(direction);
//     	} 

//     	if(scrollPosition>=4 && direction == 'up') {
//     		if (currentIndex==1) {
//     			// for miniPills stop
//     			begin = true;
//     		}
//     		scrollPosition = 0;
//     		if (currentIndex==0) {
// 	    		// Stop up scroll
// 	    		return;
// 	    	}
// 	    	currentIndex--;
//     		loadBlock(direction);
//     	}

// });

$(document).ready(function(){
	// body.bind('touchmove', carouselPage);
    body.bind('mousewheel', carouselPage);
});



function carouselPage(e) {
    	var direction = null;
    	if (e.originalEvent.wheelDelta/120 == -1) {
    		if(end!=true) scrollPosition += e.originalEvent.wheelDelta/120;
    		direction = 'down';
    		fillMiniPills(direction);
    		begin = false;
    	}

    	if (e.originalEvent.wheelDelta/120 == 1) {
    		if(begin!=true) scrollPosition += e.originalEvent.wheelDelta/120;
    		direction = 'up';
    		fillMiniPills(direction);
    		end = false;
    	}
    	if(scrollPosition<=-4 && direction == 'down') {
    		scrollPosition = 0;
    		if (currentIndex==1) {
    			// for miniPills stop
    			end = true;
    		}
    		if (currentIndex==2) {
				// Stop down scroll
	    		return;
	    	}
	    	currentIndex++;
    		loadBlock(direction);
    	} 

    	if(scrollPosition>=4 && direction == 'up') {
    		if (currentIndex==1) {
    			// for miniPills stop
    			begin = true;
    		}
    		scrollPosition = 0;
    		if (currentIndex==0) {
	    		// Stop up scroll
	    		return;
	    	}
	    	currentIndex--;
    		loadBlock(direction);
    	} 
    }

function loadBlock(direction) {
	var prevBlock = $(blocks[currentIndex-1]),
		currentBlock = $(blocks[currentIndex]),
		nextBlock = $(blocks[currentIndex+1]);

	if(direction=='up') {
		blockY += blockHeight;
	} else if(direction=='down'){
		blockY -= blockHeight;
	}

	tlScroller
		.to(scrolledCol, speed, {y:blockY, ease: Power2.easeOut})
		.to(prevBlock, speed, {autoAlpha:0.3, scale:.4, ease: Power2.easeOut},'-='+speed)
		.to(currentBlock, speed, {autoAlpha:1, scale:1, ease: Power2.easeOut},'-='+speed)
		.to(nextBlock, speed, {autoAlpha:0.3, scale:.4, ease: Power2.easeOut},'-='+speed)
}

function fillMiniPills(direction) {
	if(direction=='up') {
		if(miniPillIndex>0) miniPillIndex--;

	} else if(direction=='down') {
		if(miniPillIndex<miniPills.length-1) miniPillIndex++;
	}

	var currentMiniPill = $(miniPills[miniPillIndex]),
		nextMiniPill = $(miniPills[miniPillIndex+1]);

	tlScroller
		.set(currentMiniPill, {autoAlpha:1})

	if(direction=='up') {
		tlScroller
			.set(nextMiniPill, {autoAlpha:.2})
	}
}

$('#first-pill-zone').on("click",()=>{
	begin = true;
	end = false;
	for(var i=1;i<9;i++) {
		var MiniPill = $(miniPills[i]);
		tlScroller
			.set(MiniPill, {autoAlpha:.2});
	}
	miniPillIndex = 0;
	currentIndex = 0;
	blockY = position;
	loadBlock(null);
	scrollPosition = 0;
})

$('#second-pill-zone').on("click",()=>{
	begin = false;
	end = false;
	for(var i=1;i<5;i++) {
		var MiniPill = $(miniPills[i]);
		tlScroller
			.set(MiniPill, {autoAlpha:1});
	}
	for(var i=5;i<9;i++) {
		var MiniPill = $(miniPills[i]);
		tlScroller
			.set(MiniPill, {autoAlpha:.2});
	}
	miniPillIndex = 4;
	currentIndex = 1;
	blockY = position-blockHeight;
	loadBlock(null);
	scrollPosition = 0;
})

$('#third-pill-zone').on("click",()=>{
	begin = false;
	end = true;
	for(var i=0;i<9;i++) {
		var MiniPill = $(miniPills[i]);
		tlScroller
			.set(MiniPill, {autoAlpha:1});
	}
	miniPillIndex = 8;
	currentIndex = 2;
	blockY = position-2*blockHeight;
	loadBlock(null);
	scrollPosition = 0;
})

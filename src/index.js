import style from "./scss/style.scss";
import $ from 'jquery';
import utils from "./js/utils.js";
import {portfolioArray} from "./js/portfolio-items.js";
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
	el4 = $('*[data-order="4"]'),
	close = $('#close'),
	portfolio = $('#portfolio'),
	portfolioMenu = $('#topmenu-portfolio'),
	portfolioLink = $('.link-to-portfolio');

var HEIGHT = window.screen.height;
var speed = .5;
var scrollPosition = 0;
var blockHeight = firstBlock.outerHeight(true)-parseInt(firstBlock.css("margin-bottom"));
var position = HEIGHT/2 - blockHeight/2 -2*parseInt(firstBlock.css("margin-bottom"));
var currentIndex = 0;
var miniPillIndex = 0;
var blockY = position;
var begin = true;
var end = false;
var mobile = false;
var overlayOpened = false;
var scaleVal, opacitySecond;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
    scaleVal = 1;
    opacitySecond = 1;
} else {
	scaleVal = .4;
	opacitySecond = .3;
}

tlLoader
	.set(scrolledCol, {y:position})
	.set(secondBlock, {autoAlpha:0, scale:scaleVal})
	.set(thirdBlock, {autoAlpha:0, scale:scaleVal})
	.fromTo(body,1,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeOut})
	.fromTo(avatar,1,	{autoAlpha:0}, {autoAlpha:1, ease:Power0.easeNone})
	.fromTo(el1,0.7,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone})
	.fromTo(el2,0.7,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone})
	.fromTo(el3,0.5,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone}, "+=0.6")
	.fromTo(el4,0.8,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone})
	.to(secondBlock, 2, {autoAlpha:opacitySecond} )
	.to(thirdBlock, 2, {autoAlpha:1},'+=-1.3' )
	

$(document).ready(function(){
    body.bind('mousewheel', carouselPage);
    close.bind('click',togglePortfolio);
    portfolioLink.bind('click',togglePortfolio);

    /* Filling the portfolio */
    for(var i=0;i<portfolioArray.length;i++){
    	var newItem = `<div class="row row-10 portfolio-item">
					<div class="col col-1 centered">
						<div class="p-16 colored portfolio-date">${portfolioArray[i].date}</div>
					</div>
					<div class="col col-11 column">
						<div class="p-16 portfolio-category">${portfolioArray[i].category}</div>
						<div class="p-32 portfolio-title">${portfolioArray[i].title}</div>`;
						if(portfolioArray[i].images) {
							for(var j=0;j<portfolioArray[i].images.length;j++){
							newItem += `<div class="portfolio-image"><img src="/public/img/portfolio/${portfolioArray[i].images[j]}"></div>`;
							}
						}
						if(portfolioArray[i].videos) {
							for(var j=0;j<portfolioArray[i].videos.length;j++){
								newItem += `<div class="portfolio-image">${portfolioArray[i].videos[j]}</div>`;
							}
						}
						newItem +=`<div class="p-16 portfolio-links">`;
						for(var j=0;j<portfolioArray[i].links.length;j++){
							newItem += `<a href="${portfolioArray[i].links[j].link}" target="_blank" class="portfolio-links-item">
											${portfolioArray[i].links[j].linkCaption}
										</a>`;
						}	
						newItem += `</div>
					</div>
				</div>`
    	$('#portfolio-inner').append(newItem);
    	
    }
    var width = $('iframe').width();
    $('iframe').css("height",width/1.77777);
});

$( window ).resize(function() {
	var width = $('iframe').width();
    $('iframe').css("height",width/1.77777);
});


function carouselPage(e) {
	if (overlayOpened == true) return;
	var direction = null;
	if (e.originalEvent.wheelDelta/120 == -1) {
		if(end!=true) scrollPosition += e.originalEvent.wheelDelta/120;
		direction = 'down';
		fillMiniPills(direction);
		fillMiniPills(direction);
		begin = false;
	}

	if (e.originalEvent.wheelDelta/120 == 1) {
		if(begin!=true) scrollPosition += e.originalEvent.wheelDelta/120;
		direction = 'up';
		fillMiniPills(direction);
		fillMiniPills(direction);
		end = false;
	}
	if(scrollPosition<=-2 && direction == 'down') {
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

	if(scrollPosition>=2 && direction == 'up') {
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
		.set(prevBlock, {css:{cursor:"pointer"}})
		.set(currentBlock, {css:{cursor:"default"}})
		.set(nextBlock, {css:{cursor:"pointer"}})
		.to(prevBlock, speed, {autoAlpha:0.3, scale:scaleVal, ease: Power2.easeOut},'-='+speed)
		.to(currentBlock, speed, {autoAlpha:1, scale:1, ease: Power2.easeOut},'-='+speed)
		.to(nextBlock, speed, {autoAlpha:0.3, scale:scaleVal, ease: Power2.easeOut},'-='+speed)
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

$('#first-pill-zone, #first-block').on("click",()=>{
	if (overlayOpened == true) return;
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

$('#second-pill-zone, #second-block').on("click",()=>{
	if (overlayOpened == true) return;
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

$('#third-pill-zone, #third-block').on("click",()=>{
	if (overlayOpened == true) return;
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

function togglePortfolio() {
	if(overlayOpened == false) {
		overlayOpened = true;
		// open portfolio
		tlScroller
			.set(close,{autoAlpha:1})
			.to(portfolio, .4, {autoAlpha:1});
			
	} else {
		overlayOpened = false;
		// close portfolio
		tlScroller
			.set(close,{autoAlpha:0})
			.to(portfolio, .4, {autoAlpha:0});
			
	}
	

}

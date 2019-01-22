import style from "./scss/style.scss";
import $ from 'jquery';
import "./js/canvas.js";
import {TweenMax, Power2, TimelineLite} from "gsap/TweenMax";

var tlLoader = new TimelineMax(),
	body = $('body'),
	avatar = $('#avatar'),
	el1 = $('*[data-order="1"]'),
	el2 = $('*[data-order="2"]'),
	el3 = $('*[data-order="3"]'),
	el4 = $('*[data-order="4"]');

// Loader TimeLine
tlLoader
	.fromTo(body,2,	{autoAlpha:0}, {autoAlpha:1, ease: Expo.easeOut})
	.fromTo(avatar,1,	{autoAlpha:0}, {autoAlpha:1, ease:Power0.easeNone})
	.fromTo(el1,0.7,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone})
	.fromTo(el2,0.7,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone})
	.fromTo(el3,0.5,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone}, "+=0.6")
	.fromTo(el4,0.8,{autoAlpha:0, y:-10}, {autoAlpha:1, y:0, ease:Power0.easeNone});

function loadSecond() {

}

window.onmousemove = function(e) {
	var x = e.clientX;
	var y = e.clientY;
	console.log(x,y);
}
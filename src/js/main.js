'use strict';

var Handlebars = require('hbsfy/runtime');
var Scrawler = require('scrawler');
var $ = require('jquery');

var T_header = require('./templates/partials/header.hbs');
var T_app = require('./templates/app.hbs');

if (document.readyState !== 'loading') init();
else document.addEventListener('DOMContentLoaded', init);

function init() {

	setTimeout(function(){
		window.scrollTo(0,0);
	},1000)

	const bg = document.querySelector('.bg');
	const lb = document.querySelector('.lightbox');
	const prg = document.querySelector('.prg-pn');
	const lb_close = lb.querySelector('.close');
	const prg_close = prg.querySelector('.close');
	const prg_min = document.querySelector('.prg-min');
	const signin = document.querySelector('.signin');
	const loggedout = document.querySelector('.loggedout');

	lb.addEventListener('click', function(e){
		document.querySelector('.overlay.lb').classList.remove('on');
		goSignIn(true);
	});

	lb_close.addEventListener('click', function(e){
		e.stopPropagation();
		document.querySelector('.overlay.lb').classList.remove('on');
	});

	prg_close.addEventListener('click', function(e){
		e.stopPropagation();
		prg.classList.remove('on');
		prg_min.classList.add('on');
	});

	prg_min.addEventListener('click', function(e){
		e.stopPropagation();
		prg.classList.add('on');
		prg_min.classList.remove('on');
	});

	$('.loggedout').click(function(){
		goSignIn(true);
		$('.loggedout').hide();
	});

	signin.addEventListener('click', function(e){
		$('.loggedout').hide();
		goSignIn(false);
		window.scrollTo(0,0);
	});

	bg.addEventListener('click', function(e){

		if (bg.getAttribute('src').indexOf('home') > -1) {
			goArticle();
		} else {
			goHome();
		}
	});

	$('.prg.all').click(function(){
		done();
	});

	$('.numbers li:last-child').click(function(){
		done();
	});

	$('.congrats').click(function(){
		undone();
	});

	const s = new Scrawler({baseline:0});
	s.add({
		el:'.bg-article',
		baseline: 0,
		range: ['0f','1f']
	}, function(){

		const article = document.querySelector('.bg-article');

		if (document.querySelector('#hack').classList.contains('article')) {
			const prg = document.querySelector('.prg.now .after');
			const prga = document.querySelector('.prg.all .after');
			prg.style.width = `${this.f()*100}%`;

			if (this.f() === 0) {
				document.querySelector('.numbers ul li:first-child h1').innerHTML = '8';
				prga.style.width = '35%';
			}

			if (Math.abs(article.getBoundingClientRect().bottom - window.innerHeight) < 20 ) {
				prg.style.width = '100%';
				document.querySelector('.numbers ul li:first-child h1').innerHTML = '9';
				prga.style.width = '36%';
			}
		}
	}).run();

	const img_article = new Image();
	img_article.src = 'assets/img/article.jpg';
}

function goSignIn(show = true) {
	if (show) document.querySelector('.signin-pn').classList.add('on');
	else document.querySelector('.signin-pn').classList.remove('on');
}

function goHome(){
	window.scrollTo(0,0);
	document.querySelector('#hack').classList.remove('article');
	document.querySelector('#hack').classList.add('home');
	// document.querySelector('.bg').setAttribute('src','assets/img/home.png');
	document.querySelector('.bg-article').classList.remove('on');
	document.querySelector('.bg-home').classList.add('on');
}


function goArticle(){
	window.scrollTo(0,0);
	document.querySelector('#hack').classList.remove('home');
	document.querySelector('#hack').classList.add('article');
	// document.querySelector('.bg').setAttribute('src','assets/img/article.png');
	document.querySelector('.bg-article').classList.add('on');
	document.querySelector('.bg-home').classList.remove('on');

	document.querySelector('.prg-pn').classList.add('on');
}

function done() {
	$('.prg-pn').addClass('done');
	$('.numbers li:eq(0) h1').html('10');
	$('.numbers li:eq(1) h1').html('10');
	$('.numbers li:eq(2) h1').html('10');
	$('.numbers li:eq(3) h1').html('10');
}

function undone() {
	$('.prg-pn').removeClass('done');
	$('.numbers li:eq(0) h1').html('8');
	$('.numbers li:eq(1) h1').html('6');
	$('.numbers li:eq(2) h1').html('5');
	$('.numbers li:eq(3) h1').html('3');
}

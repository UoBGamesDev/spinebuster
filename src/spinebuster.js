'use strict';

var SB = {};

(function () {

	this.main = function () {

		var canvas = document.getElementById('canvas');
		var ctx = this.ctx = canvas.getContext('2d');

		// TODO: Decide game dimensions; fullscreen for now.
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		window.addEventListener('resize', function(){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}, false);


		console.log('Starting game.')

		delete this.main;
	};

}).call(SB);
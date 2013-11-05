'use strict';

var SB = {
	DEBUG: true,
	TICK_STEP_MS: 1000.0/60.0,
	PHYS_STEP_MS: 1.0/60.0
};

(function () {

	var game = this.game = {};

	this.main = function () {
		var canvas = this.canvas = document.getElementById('canvas');
		var ctx = this.ctx = canvas.getContext('2d');

		// Set canvas dims
		// TODO: Decide game dimensions; fullscreen for now.
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		window.addEventListener('resize', function(){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}, false);


		var lastTick = Date.now();
		function tick () {
			// FIXME: Chrome throttles the interval down to 1s on inactive tabs.
			setTimeout(tick, this.TICK_STEP_MS);
			
			var now = Date.now();
			game.currentScene.tick(now - lastTick);
			lastTick = now;
		}

		function render () {
			requestAnimFrame(render);

			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Render scene
			game.currentScene.render(ctx);
		}


		console.log('Starting game.');

		// Instantiate current scene (can be triggered from main menu later)
		game.currentScene =  new SB.SceneFall('level0');

		// Start update and render loop

		setTimeout(tick, this.TICK_STEP_MS);

		window.requestAnimFrame = window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				function(callback){
					window.setTimeout(callback, 1000/60);
				};
		requestAnimFrame(render);

		delete this.main;
	};

}).call(SB);
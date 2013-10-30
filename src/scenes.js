/**
 * Contains scene classes.
 * Every scene is a level that can update and render.
 */


/**
 * Base class for scenes.
 * Handles user input, updates game state and renderes entities.
 */
SB.Scene = function() {
	this.entityManager = new SB.EntityManager(this);
};

SB.Scene.prototype.add = function (entity) {
	this.entityManager.add(entity);
};

SB.Scene.prototype.mouseDown = function (x, y, event) {
};

SB.Scene.prototype.mouseMove = function (x, y) {
};

SB.Scene.prototype.mouseUp = function (x, y, event) {
};

SB.Scene.prototype.keyDown = function (code) {
};

SB.Scene.prototype.keyUp = function (code) {
};

SB.Scene.prototype.tick = function (delta) {
	this.entityManager.tick(delta);
};

SB.Scene.prototype.render = function (ctx) {
	this.entityManager.render(ctx);
};

SB.SceneFall = function() {
	SB.Scene.call(this);

	/* Temporary hacky code to create the ground */
	this.add({
		x: SB.canvas.width/2,
		y: 0,
		init: (function () {
			var groundSd = new b2BoxDef();
			groundSd.extents.Set(SB.canvas.width/2, 50);
			groundSd.restitution = 0.2;
			var groundBd = new b2BodyDef();
			groundBd.AddShape(groundSd);
			groundBd.position.Set(SB.canvas.width/2, SB.canvas.height/2);
			
			return function (physSim) {
				physSim.CreateBody(groundBd);
			};
		})(),
		render: function (ctx) {
			ctx.fillStyle = 'blue';
			ctx.fillRect(0, SB.canvas.height/2 - 50, SB.canvas.width, 100);
			return true;
		}
	});


	this.add(this.player = new SB.Player(this, SB.canvas.width/2, 0));
};

SB.SceneFall.prototype = Object.create(SB.Scene.prototype);
SB.SceneFall.prototype.superClass = SB.Scene.prototype;

SB.SceneFall.prototype.keyDown = function (code) {
	// if (code === 65 || code === 37)
	// 	this.player.keys.a = true;
	// else if (code === 68 || code === 39)
	// 	this.player.keys.d = true;
	// else if (code === 87 || code === 38)
	// 	this.player.keys.w = true;
	// else if (code === 83 || code === 40)
	// 	this.player.keys.s = true;
};

SB.SceneFall.prototype.keyUp = function (code) {
	// if (code === 65 || code === 37)
	// 	this.player.keys.a = false;
	// else if (code === 68 || code === 39)
	// 	this.player.keys.d = false;
	// else if (code === 87 || code === 38)
	// 	this.player.keys.w = false;
	// else if (code === 83 || code === 40)
	// 	this.player.keys.s = false;
};

SB.SceneFall.prototype.tick = function (delta) {
	this.superClass.tick.call(this, delta);

	// this.camera.moveTowards(this.player);


};

SB.SceneFall.prototype.render = function (ctx) {
	ctx.save();

	// this.camera.applyTransform(ctx);

	this.superClass.render.call(this, ctx);


	ctx.restore();
};
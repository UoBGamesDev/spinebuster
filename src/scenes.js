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

SB.SceneFall = function(levelName) {
	SB.Scene.call(this);

	var scene = this;
	var cenX = SB.canvas.width>>1;
	var cenY = SB.canvas.height>>1;

	this.camera = {
		x: 0,
		y: 0,
		moveTowards: function (entity, speed) {
			speed = speed || 0.05;
			this.x += speed * (entity.x-cenX-this.x);
			this.y += speed * (entity.y-cenY-this.y);
		},
		applyTransform: function (ctx) {
			ctx.translate(-this.x, -this.y);
		}
	};

	function initScene (data) {
		data = JSON.parse(data);

		scene.name = data.name;
		scene.desc = data.desc;

		scene.w = data.w;
		scene.h = data.h;

		scene.add(new SB.Rectangle(scene, cenX-50-(scene.w>>1), (scene.h>>1)+100, 100, scene.h));
		scene.add(new SB.Rectangle(scene, cenX+50+(scene.w>>1), (scene.h>>1)+100, 100, scene.h));
		scene.add(new SB.Rectangle(scene, cenX, scene.h+150, scene.w+200, 100));

		scene.add(scene.player = new SB.Player(this, cenX, 0));
	}

	// TODO: Handle potential errors.
	loadAsync('res/scenes/'+levelName+'.json', initScene);
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

	this.camera.moveTowards(this.player);
};

SB.SceneFall.prototype.render = function (ctx) {
	ctx.save();

	this.camera.applyTransform(ctx);

	this.superClass.render.call(this, ctx);


	ctx.restore();
};
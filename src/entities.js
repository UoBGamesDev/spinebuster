SB.EntityManager = function (scene) {
	this.scene = scene;

	this.tickQueue = new List();
	this.renderQueue = new List();

	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(0, 0);
	worldAABB.maxVertex.Set(SB.canvas.width, SB.canvas.height);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;

	this.physSim = new b2World(worldAABB, gravity, doSleep);
};

SB.EntityManager.prototype.add = function (entity) {
	('tick' in entity) && this.tickQueue.add(entity);
	('render' in entity) && this.renderQueue.add(entity);

	('init' in entity) && entity.init(this.physSim);
};

SB.EntityManager.prototype.tick = function (delta) {
	for (var i = 0, size = this.tickQueue.size; i < size; i++) {
		var entity = this.tickQueue.poll();
		entity.tick(delta) && this.tickQueue.add(entity);
	}

	this.physSim.Step(SB.PHYS_STEP_MS, 1);	

	// NOTE: An entity can have a collider (body) and a collider can have a bunch of shapes.
	//		 Every physical entity is responsible for handling its own collider.
};

SB.EntityManager.prototype.render = function (ctx) {
	for (var i = 0, size = this.renderQueue.size; i < size; i++) {
		var entity = this.renderQueue.poll();
		entity.render(ctx) && this.renderQueue.add(entity);
	}

	// if (SB.DEBUG) {
	// 	for (var body = this.physSim.m_bodyList; body; body = body.m_next) {	
	// 		for (var shape = body.GetShapeList(); shape != null; shape = shape.GetNext()) {
	// 			// TODO: Draw simple shapes in the physics world when in debug mode.
	// 		}
	// 	}
	// }
};

SB.Circle = function (scene, x, y, radius) {
	this.scene = scene;

	this.x = x || 0;
	this.y = y || 0;
	this.radius = radius || 10;

	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = radius;
	circleSd.restitution = 0.5;
	circleSd.friction = 0;
	var circleBd = new b2BodyDef();
	circleBd.AddShape(circleSd);
	circleBd.position.Set(x, y);
	this.colliderDef = circleBd;

	this.collider = scene.entityManager.physSim.CreateBody(circleBd);
};

SB.Circle.prototype.render = function (ctx) {
	ctx.beginPath();
	ctx.arc(this.collider.m_position.x, this.collider.m_position.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	return true;
};


SB.Rectangle = function (scene, x, y, w, h) {
	this.scene = scene;

	// TODO: Update entity position with collider position.
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 1;
	this.h = h || 1;
};

SB.Rectangle.prototype.init = function (physSim) {
	var boxSd = new b2BoxDef();
	boxSd.extents.Set(this.w>>1, this.h>>1);
	boxSd.restitution = 0.2;
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(this.x, this.y);

	this.collider = physSim.CreateBody(boxBd);
};

SB.Rectangle.prototype.render = function (ctx) {
	ctx.fillStyle = 'red';
	ctx.fillRect(this.collider.m_position.x - (this.w>>1), this.collider.m_position.y - (this.h>>1), this.w, this.h);
	return true;
};



/**
 * A template of an entity class.
 * Can be made into a base class for entities but would introduce unnecessary complexity. This isn't Java.
 */
SB.Template = function (scene, x, y, arg) {
	this.scene = scene;

	this.pos = {
		x: x || 0,
		y: y || 0
	}
	this.arg = arg;
};

/**
 * Runs once an entity is added to a scene.
 * This method is where all physics bodies should be instatiated, and not in the constructor.
 * This ensures that an object will only start physic interaction on entering a scene and not on creation.
 *
 * @param physSim The scene's physics world.
 *
 */
SB.Template.prototype.init = function (physSim) {
};

/**
 * Updates an entity.
 *
 * @param delta Time in milliseconds since last tick.
 *
 * @return Returns true to reneter the tick queue, false to remain out (e.g. on death).
 *
 */
SB.Template.prototype.tick = function (delta) {
	return true;
};

/**
 * Renders an entity.
 *
 * @param delta Time in milliseconds since last tick.
 *
 * @return Returns true to reneter the tick queue, false to remain out (e.g. on death).
 *
 */
SB.Template.prototype.render = function (ctx) {
	return true;
};
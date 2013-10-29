SB.EntityManager = function (scene) {
	this.scene = scene;

	this.tickQueue = new List();
	this.renderQueue = new List();
	this.physList = new List();

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

	if (!entity.hasOwnProperty('collider') && ('colliderDef' in entity)) {
		entity.collider = this.physSim.CreateBody(entity.colliderDef);
		this.physList.add(entity);
	}
};

SB.EntityManager.prototype.tick = function (delta) {
	for (var i = 0, size = this.tickQueue.size; i < size; i++) {
		var entity = this.tickQueue.poll();
		entity.tick(delta) && this.tickQueue.add(entity);
	}

	this.physSim.Step(SB.PHYS_STEP_MS, 1);

	for (var node = this.physList.head; node; node = node.next) {
		var entity = node.e;
		entity.x = entity.collider.m_position.x;
		entity.y = entity.collider.m_position.y;
	}
	

	// for (var body = this.physSim.m_bodyList; body; body = body.m_next) {	
	// 	for (var shape = body.GetShapeList(); shape != null; shape = shape.GetNext()) {
	// 	}
	// }
};

SB.EntityManager.prototype.render = function (ctx) {
	for (var i = 0, size = this.renderQueue.size; i < size; i++) {
		var entity = this.renderQueue.poll();
		entity.render(ctx) && this.renderQueue.add(entity);
	}
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
};

SB.Circle.prototype.render = function (ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	return true;
};
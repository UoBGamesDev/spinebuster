SB.Player = function (scene, x, y) {
	this.scene = scene;

	this.startX = x || 0;
	this.startY = y || 0;
};

Object.defineProperty(SB.Player.prototype, 'x', {
	get: function () {
		return this.torso.m_position.x;
	}
});

Object.defineProperty(SB.Player.prototype, 'y', {
	get: function () {
		return this.torso.m_position.y;
	}
});

Object.defineProperty(SB.Player.prototype, 'r', {
	get: function () {
		return this.torso.m_R;
	}
});

SB.Player.prototype.init = function (physSim) {
	// Torso
	var boxSd = new b2BoxDef();
	boxSd.extents.Set(15, 25);
	boxSd.density = 1.0;
	boxSd.restitution = 0.5;
	boxSd.friction = 0;
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(this.startX, this.startY);
	this.torso = physSim.CreateBody(boxBd);

	// Head
	var circleSd = new b2CircleDef();
	circleSd.density = 1.0;
	circleSd.radius = 15;
	circleSd.restitution = 0.5;
	circleSd.friction = 0;
	var circleBd = new b2BodyDef();
	circleBd.AddShape(circleSd);
	circleBd.position.Set(this.startX, this.startY-40);
	this.colliderDef = circleBd;
	this.head = physSim.CreateBody(circleBd);

	// Neck
	var jointDef = new b2DistanceJointDef();
	jointDef.anchorPoint1 = this.head.m_position;
	jointDef.anchorPoint2 = this.torso.m_position;
	jointDef.body1 = this.head;
	jointDef.body2 = this.torso;
	physSim.CreateJoint(jointDef);
};

SB.Player.prototype.render = function (ctx) {
	ctx.save();
	ctx.setTransform(this.r.col1.x, this.r.col1.y, this.r.col2.x, this.r.col2.y, this.x, this.y);	
	ctx.fillStyle = 'blue';
	ctx.fillRect(-15, -25, 30, 50);
	ctx.beginPath();
	ctx.arc(0, -40, 15, 0, 2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	ctx.restore();

	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	return true;
};
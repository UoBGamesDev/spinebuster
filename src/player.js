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
	// TODO: Figure out a more elegant way to do this.

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
	var jointDef = new b2RevoluteJointDef();
	jointDef.anchorPoint.Set(this.startX, this.startY-25);
	jointDef.body1 = this.torso;
	jointDef.body2 = this.head;
	jointDef.lowerAngle = -0.2*Math.PI;
	jointDef.upperAngle = 0.2*Math.PI;
	jointDef.enableLimit = true;
	physSim.CreateJoint(jointDef);

	// ArmR
	var boxSd = new b2BoxDef();
	boxSd.extents.Set(5, 15);
	boxSd.density = 1.0;
	boxSd.restitution = 0.5;
	boxSd.friction = 0;
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(this.startX-15, this.startY-10);
	this.armR = physSim.CreateBody(boxBd);

	// ShoulderR
	var jointDef = new b2RevoluteJointDef();
	jointDef.anchorPoint.Set(this.startX-15, this.startY-10-15);
	jointDef.body1 = this.torso;
	jointDef.body2 = this.armR;
	physSim.CreateJoint(jointDef);

	// ArmL
	var boxSd = new b2BoxDef();
	boxSd.extents.Set(5, 15);
	boxSd.density = 1.0;
	boxSd.restitution = 0.5;
	boxSd.friction = 0;
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(this.startX+15, this.startY-10);
	this.armL = physSim.CreateBody(boxBd);

	// ShoulderL
	var jointDef = new b2RevoluteJointDef();
	jointDef.anchorPoint.Set(this.startX+15, this.startY-10-15);
	jointDef.body1 = this.torso;
	jointDef.body2 = this.armL;
	physSim.CreateJoint(jointDef);

	// LegR
	var boxSd = new b2BoxDef();
	boxSd.extents.Set(5, 15);
	boxSd.density = 1.0;
	boxSd.restitution = 0.5;
	boxSd.friction = 0;
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(this.startX-10, this.startY+40);
	this.legR = physSim.CreateBody(boxBd);

	// HipR
	var jointDef = new b2RevoluteJointDef();
	jointDef.anchorPoint.Set(this.startX-10, this.startY+40-15);
	jointDef.body1 = this.torso;
	jointDef.body2 = this.legR;
	jointDef.lowerAngle = -0.5*Math.PI;
	jointDef.upperAngle = 0.5*Math.PI;
	jointDef.enableLimit = true;
	physSim.CreateJoint(jointDef);

	// LegL
	var boxSd = new b2BoxDef();
	boxSd.extents.Set(5, 15);
	boxSd.density = 1.0;
	boxSd.restitution = 0.5;
	boxSd.friction = 0;
	var boxBd = new b2BodyDef();
	boxBd.AddShape(boxSd);
	boxBd.position.Set(this.startX+10, this.startY+40);
	this.legL = physSim.CreateBody(boxBd);

	// HipL
	var jointDef = new b2RevoluteJointDef();
	jointDef.anchorPoint.Set(this.startX+10, this.startY+40-15);
	jointDef.body1 = this.torso;
	jointDef.body2 = this.legL;
	jointDef.lowerAngle = -0.5*Math.PI;
	jointDef.upperAngle = 0.5*Math.PI;
	jointDef.enableLimit = true;
	physSim.CreateJoint(jointDef);
};

SB.Player.prototype.render = function (ctx) {
	ctx.save();
	
	// TODO: And this.

	ctx.setTransform(this.r.col1.x, this.r.col1.y, this.r.col2.x, this.r.col2.y, this.x, this.y);
	ctx.fillStyle = 'red';
	ctx.fillRect(-15, -25, 30, 50);

	ctx.beginPath();
	ctx.setTransform(this.head.m_R.col1.x, this.head.m_R.col1.y, this.head.m_R.col2.x, this.head.m_R.col2.y, this.head.m_position.x, this.head.m_position.y);
	ctx.arc(0, 0, 15, 0, 2*Math.PI);
	ctx.fillStyle = 'pink';
	ctx.fill();

	ctx.setTransform(this.armR.m_R.col1.x, this.armR.m_R.col1.y, this.armR.m_R.col2.x, this.armR.m_R.col2.y, this.armR.m_position.x, this.armR.m_position.y);
	ctx.fillStyle = 'orange';
	ctx.fillRect(-5, -15, 10, 30);
	
	ctx.setTransform(this.armL.m_R.col1.x, this.armL.m_R.col1.y, this.armL.m_R.col2.x, this.armL.m_R.col2.y, this.armL.m_position.x, this.armL.m_position.y);
	ctx.fillStyle = 'orange';
	ctx.fillRect(-5, -15, 10, 30);

	ctx.setTransform(this.legR.m_R.col1.x, this.legR.m_R.col1.y, this.legR.m_R.col2.x, this.legR.m_R.col2.y, this.legR.m_position.x, this.legR.m_position.y);
	ctx.fillStyle = 'green';
	ctx.fillRect(-5, -15, 10, 30);

	ctx.setTransform(this.legL.m_R.col1.x, this.legL.m_R.col1.y, this.legL.m_R.col2.x, this.legL.m_R.col2.y, this.legL.m_position.x, this.legL.m_position.y);
	ctx.fillStyle = 'green';
	ctx.fillRect(-5, -15, 10, 30);

	ctx.restore();

	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	return true;
};
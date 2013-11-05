SB.Player = function (scene, x, y) {
	this.scene = scene;

	this.startX = x || 0;
	this.startY = y || 0;
};

SB.Player.textures = {
	// TODO: Run all these in some kind of loading phase and use "onload".
	// TODO: Load textures that have been scaled down in advanced for added speed.
	// TODO: Don't hardcode texture sizes in.

	armL: (function () {
		var img = new Image();
		img.src = 'res/textures/player/arm-left.png';
		img.width = 10;
		img.height = 30;
		return img;
	})(),
	armR: (function () {
		var img = new Image();
		img.src = 'res/textures/player/arm-right.png';
		img.width = 10;
		img.height = 30;
		return img;
	})(),
	body: (function () {
		var img = new Image();
		img.src = 'res/textures/player/body.png';
		img.width = 30;
		img.height = 50;
		return img;
	})(),
	head: (function () {
		var img = new Image();
		img.src = 'res/textures/player/head.png';
		img.width = 30;
		img.height = 30;
		return img;
	})(),
	hips: (function () {
		var img = new Image();
		img.src = 'res/textures/player/hips.png';
		return img;
	})(),
	legL: (function () {
		var img = new Image();
		img.src = 'res/textures/player/leg-left.png';
		img.width = 10;
		img.height = 30;
		return img;
	})(),
	legR: (function () {
		var img = new Image();
		img.src = 'res/textures/player/leg-right.png';
		img.width = 10;
		img.height = 30;
		return img;
	})()
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

	var texs = SB.Player.textures;

	ctx.setTransform(this.r.col1.x, this.r.col1.y, this.r.col2.x, this.r.col2.y, this.x, this.y);
	ctx.drawImage(texs.body, -texs.body.width/2, -texs.body.height/2, texs.body.width, texs.body.height);

	ctx.setTransform(this.head.m_R.col1.x, this.head.m_R.col1.y, this.head.m_R.col2.x, this.head.m_R.col2.y, this.head.m_position.x, this.head.m_position.y);
	ctx.drawImage(texs.head, -texs.head.width/2, -texs.head.height/2, texs.head.width, texs.head.height);
	
	ctx.setTransform(this.armR.m_R.col1.x, this.armR.m_R.col1.y, this.armR.m_R.col2.x, this.armR.m_R.col2.y, this.armR.m_position.x, this.armR.m_position.y);
	ctx.drawImage(texs.armR, -texs.armR.width/2, -texs.armR.height/2, texs.armR.width, texs.armR.height);
	
	ctx.setTransform(this.armL.m_R.col1.x, this.armL.m_R.col1.y, this.armL.m_R.col2.x, this.armL.m_R.col2.y, this.armL.m_position.x, this.armL.m_position.y);
	ctx.drawImage(texs.armL, -texs.armL.width/2, -texs.armL.height/2, texs.armL.width, texs.armL.height);

	ctx.setTransform(this.legR.m_R.col1.x, this.legR.m_R.col1.y, this.legR.m_R.col2.x, this.legR.m_R.col2.y, this.legR.m_position.x, this.legR.m_position.y);
	ctx.drawImage(texs.legR, -texs.legR.width/2, -texs.legR.height/2, texs.legR.width, texs.legR.height);

	ctx.setTransform(this.legL.m_R.col1.x, this.legL.m_R.col1.y, this.legL.m_R.col2.x, this.legL.m_R.col2.y, this.legL.m_position.x, this.legL.m_position.y);
	ctx.drawImage(texs.legL, -texs.legL.width/2, -texs.legL.height/2, texs.legL.width, texs.legL.height);

	ctx.restore();

	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	return true;
};
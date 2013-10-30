SB.Player = function (scene, x, y) {
	this.scene = scene;

	this.x = x || 0;
	this.y = y || 0;

	var c1 = new SB.Circle(scene, SB.canvas.width/2, 10, 5);
	var c2 = new SB.Circle(scene, SB.canvas.width/2+1, 0, 5);

	scene.add(c1);
	scene.add(c2);

	var jointDef = new b2DistanceJointDef();
	jointDef.anchorPoint1 = c1.collider.m_position;
	jointDef.anchorPoint2 = c2.collider.m_position;
	jointDef.body1 = c1.collider;
	jointDef.body2 = c2.collider;
	scene.entityManager.physSim.CreateJoint(jointDef);
};

SB.Player.prototype.render = function (ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
	ctx.fillStyle = 'red';
	ctx.fill();
	return true;
};
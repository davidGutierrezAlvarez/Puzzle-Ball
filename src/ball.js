class Ball extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, type) {
		super(scene, x, y, type);
		scene.add.existing(this);
		scene.physics.world.enable(this);
		//this.body.immovable = true;
		this.body.setCollideWorldBounds(true);//collisionbordes
		this.body.setBounce(1);//rebote
		//this.body.allowGravity = true;
		//this.addCollision(scene, this);
	}

	addCollision(scene, t) {
		var balls = scene.Balls;
		
		Object.keys(balls).forEach(function(ball) {
		    //scene.physics.add.collider(t, ball);
        	scene.physics.world.collide(t, ball);
		});
		
	}

}


export default Ball;
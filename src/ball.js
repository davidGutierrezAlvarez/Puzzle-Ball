class Ball extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, type) {
		//x = Phaser.Math.Between(0, 500);
		//y = Phaser.Math.Between(0, 1000);
		super(scene, x, y, type);
		scene.add.existing(this);
		scene.physics.world.enable(this);
		//this.body.immovable = true;
		this.body.setCollideWorldBounds(true);//collisionborder
		//this.body.setBounce(.9);//rebote
		//this.body.setFriction(1);
		//this.body.setCircle();
		this.body.setCircle();
        this.body.setFriction(0.5);
        this.body.setBounce(1);
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
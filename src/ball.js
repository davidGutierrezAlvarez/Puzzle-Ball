class Ball extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, type) {
		//x = Phaser.Math.Between(0, 500);
		//y = Phaser.Math.Between(0, 1000);
		super(scene, x, y, type);
		scene.add.existing(this);
		scene.physics.world.enable(this);
		//this.body.immovable = true;
		this.body.setCollideWorldBounds(true);//collisionborder
		this.body.setBounce(0.9);//rebote
		//this.body.setFriction(1);
		this.body.isCircle = true;
		console.log(this.setInteractive());
	}

}


export default Ball;
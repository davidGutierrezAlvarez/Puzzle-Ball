class Ball extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, type) {
		//x = Phaser.Math.Between(0, 500);
		//y = Phaser.Math.Between(0, 1000);
		super(scene, x, y, type);
		scene.add.existing(this);
		scene.physics.world.enable(this);
		//this.body.immovable = true;
		this.body.setCollideWorldBounds(true);//collisionborder
		this.body.world.bounds.top = -600;// = false;
		this.body.setBounce(.95);//rebote
		//this.body.setFriction(1);
		this.body.isCircle = true;
		//this.setInteractive();
		this.depth = 1;
		this.setScale(3);
		//this.body.setMaxSpeed(165);
		//this.body.setFriction(10, 10);
		//console.log(scene.add);
		//var v = scene.add.Circle(x, y, 30);//0x000000
        
	}

}


export default Ball;
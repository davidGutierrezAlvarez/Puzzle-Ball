class Beaker extends Phaser.GameObjects.Sprite {
	constructor(scene, x, y, type, group) {
		super(scene, x, y, type);
		scene.add.existing(this);
		scene.physics.world.enable(this);
		this.body.immovable = true;
		this.body.setCollideWorldBounds(true);//collisionborder
		this.body.moves = false;//permite mantenerlo estatico
		this.setInteractive();
		this.setScale(0.7);


        var rect = scene.add.rectangle(x-28, y, 1, 225, 0x000000, 1000);//0x000000
        this.createBorder(x, y, rect, group, scene);
        var rect = scene.add.rectangle(x+28, y, 1, 225, 0x000000, 1000);
        this.createBorder(x, y, rect, group, scene);
        var rect = scene.add.rectangle(x, y+107, 60, 1, 0x000000, 1000);
        this.createBorder(x, y, rect, group, scene);
        
	}

	createBorder(x, y, rect, group, scene) {
		scene.physics.world.enable(rect);
		//rect.body.setCollideWorldBounds(true);//collisionborder
		rect.body.immovable = true;
		rect.body.moves = false;
		rect.depth = -1;

		group.add(rect);
	}

}


export default Beaker;
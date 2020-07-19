import Ball from './ball.js';





class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {

        this.load.setPath('./assets/');

        this.load.image('logo_gamma', 'logo_gamma.png');

        this.load.on('complete', () => {
            console.log('Load complete');
        });
        //this.Balls = [];
        this.Balls = this.add.group();
    }

    create() {
        //var ball = new Ball(this, this.scale.width/2, this.scale.height/2, 'logo_gamma');
        //var ball2= new Ball(this, this.scale.width/2, 250, 'logo_gamma');
        //this.ball3= new Ball(this, this.scale.width/2, 0, 'logo_gamma');
        
        this.Balls.add(new Ball(this, this.scale.width/2, 750, 'logo_gamma'));
        this.Balls.add(new Ball(this, this.scale.width/2-30, this.scale.height/2, 'logo_gamma'));
        this.Balls.add(new Ball(this, this.scale.width/2, 250, 'logo_gamma'));
        this.Balls.add(new Ball(this, this.scale.width/2, 0, 'logo_gamma'));
        
        
        this.physics.add.collider(this.Balls, this.Balls);

        this.pointer = this.input.activePointer;


        this.input.on('pointerdown', function () {
            //var worldPoint = this.input.activePointer;//.positionToCamera(this.cameras.main);

            console.log(this.pointer, this.pointer);
            //this.Balls.add(new Ball(this, this.scale.width/2, 0, 'logo_gamma'));
        });
        console.log(this.pointer.x, this.pointer.y);
        

    }

    update() {
        //this.physics.world.collide(this.Balls, this.Balls);

        
        //console.log(this.input.addPointer());
    }

    addCollision() {

    }
}
export default Bootloader;
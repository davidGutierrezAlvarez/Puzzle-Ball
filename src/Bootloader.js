import Ball from './ball.js';
import Beaker from './beaker.js';
class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {

        this.load.setPath('./assets/');

        this.load.image('fondo1', '1.png');
        this.load.image('fondo2', '2.png');
        this.load.image('fondo3', '3.png');
        this.load.image('beaker', 'beaker.png');
        this.load.image('base', 'base.png');
        this.load.image('logo_gamma', 'logo_gamma.png');

        this.load.on('complete', () => {
            console.log('Load complete');
        });

        this.Balls = this.add.group();
        this.Beakers = this.add.group();
        this.BeakersColl = this.add.group();
    }

    create() {
        //var fondo = this.add.image(this.scale.width/2, this.scale.height/2, "fondo2");
        
        this.Beakers.add(new Beaker(this, 460, 350, 'beaker', this.BeakersColl));
        
        this.Beakers.add(new Beaker(this, 260, 350, 'beaker', this.BeakersColl));
        this.Beakers.add(new Beaker(this, 260, 650, 'beaker', this.BeakersColl));


        this.Balls.add(new Ball(this, 460, 260, "logo_gamma"));
        this.Balls.add(new Ball(this, 460, 200, "logo_gamma"));
        this.Balls.add(new Ball(this, 460, 140, "logo_gamma"));
        this.Balls.add(new Ball(this, 460, 80, "logo_gamma"));
        this.Balls.add(new Ball(this, 460, 20, "logo_gamma"));


        this.Balls.add(new Ball(this, 260, 260, "logo_gamma"));
        this.Balls.add(new Ball(this, 260, 200, "logo_gamma"));
        this.Balls.add(new Ball(this, 260, 140, "logo_gamma"));
        this.Balls.add(new Ball(this, 260, 80, "logo_gamma"));
        this.Balls.add(new Ball(this, 260, 20, "logo_gamma"));
        


        //fondo.setScale(0.77);


        /*this.physics.pause();
        this.input.on('pointerdown', function (pointer) {
            var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            this.Balls.add(new Ball(this, worldPoint.x, worldPoint.y, 'logo_gamma'));
            console.log(this.physics.resume());

        }, this);*/


        this.input.on('pointerdown',this.startDrag, this);




        /*console.log(this.Beakers.getChildren());
        this.Beakers.getChildren().forEach(item => {
            console.log("ja!", item.on);
            item.on('pointerover', function () {
                item.setTint(0x7878ff);
            });
        });*/
        /*.on('pointerover', function () {
            console.log("ja!");
        });*/
        
        /*this.input.on('pointermove', function () {
            var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
            //this.Balls.add(new Ball(this, worldPoint.x, worldPoint.y, 'logo_gamma'));

            //this.physics.add.collider(this.Balls, worldPoint);
        }, this);*/

        this.physics.add.collider(this.Balls, this.Balls);
        this.physics.add.collider(this.Balls, this.BeakersColl);
    }

    update() {
        //this.physics.world.collide(this.Balls, this.Beakers);

        
        //console.log(this.input.addPointer());
    }

    startDrag(pointer, targets) {
        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj = targets[0];
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
    }

    doDrag(pointer) {
        this.dragObj.x = pointer.x;
        this.dragObj.y = pointer.y;
    }

    stopDrag() {
        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
    }
}
export default Bootloader;
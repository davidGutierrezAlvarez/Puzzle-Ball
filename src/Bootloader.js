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
        this.active = false;
        this.ball = undefined;
    }

    create() {
        //var fondo = this.add.image(this.scale.width/2, this.scale.height/2, "fondo2");
        
        //crear lista interna de balls...
        //para cada beaker
        this.beaker = new Beaker(this, 460, 350, 'beaker', this.BeakersColl);
        this.beaker.box = []
        for (var i = 0; i < 4; i++) {
            var ball = new Ball(this, this.beaker.x, this.beaker.y-i*55, "logo_gamma");
            this.beaker.box.push(ball);
        }
        this.Balls.addMultiple(this.beaker.box);
        this.Beakers.add(this.beaker);



        this.beaker = new Beaker(this, 260, 350, 'beaker', this.BeakersColl);
        this.beaker.box = []
        for (var i = 0; i < 3; i++) {
            var ball = new Ball(this, this.beaker.x, this.beaker.y-i*55, "logo_gamma");
            this.beaker.box.push(ball);
        }
        this.Balls.addMultiple(this.beaker.box);
        this.Beakers.add(this.beaker);


        
        this.beaker = new Beaker(this, 260, 650, 'beaker', this.BeakersColl);
        this.beaker.box = []
        for (var i = 0; i < 2; i++) {
            var ball = new Ball(this, this.beaker.x, this.beaker.y-i*55, "logo_gamma");
            this.beaker.box.push(ball);
        }
        this.Balls.addMultiple(this.beaker.box);
        this.Beakers.add(this.beaker);

        //this.ball = new Ball(this, 260, 20, "logo_gamma");
        //this.ball.body.moves = false;
        //console.log(this.beaker.box);
        //console.log(this.Beakers.getChildren());


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

        //this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.stopDrag, this);
    }


    stopDrag() {
        if(this.dragObj) {
            /*si se ha seleccionado un objeto*/
            //console.log(this.dragObj.box.pop());
            if(!this.active) {
                this.ball = this.dragObj.box.pop();
                if (this.ball != undefined) {
                    //si hay un elemento...
                    this.ball.body.moves = false;
                    this.ball.x = this.dragObj.x;
                    this.ball.y = this.dragObj.y-140;
                    this.active = true;
                    console.log(this.ball);
                }
            } else {
                this.ball.body.moves = true;
                this.ball.x = this.dragObj.x;
                this.ball.y = this.dragObj.y-140;
                this.active = false;

                this.dragObj.box.push(this.ball);   
            }
        }

        this.input.on('pointerdown', this.startDrag, this);
        //this.input.off('pointermove', this.stopDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
    }

}
export default Bootloader;
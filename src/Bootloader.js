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
        //fondo.setScale(0.77);

        //crear lista interna de balls...
        //para cada beaker
        this.newBeaker(85, 350, 4);
        this.newBeaker(210, 350, 4);
        this.newBeaker(335, 350, 4);
        this.newBeaker(460, 350, 4);
        this.newBeaker(210, 660, 4);
        this.newBeaker(335, 660, 0);
       


        //this.ball = new Ball(this, 260, 20, "logo_gamma");
        //this.ball.body.moves = false;
        //console.log(this.beaker.box);
        //console.log(this.Beakers.getChildren());





        this.input.on('pointerdown',this.startDrag, this);




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
        this.input.on('pointerup', this.stopDrag, this);
    }


    stopDrag() {
        if(this.dragObj) {
            /*si se ha seleccionado un objeto*/
            if(!this.active) {
                this.ball = this.dragObj.box.pop();
                if (this.ball != undefined) {
                    //si hay un elemento...
                    this.ball.body.moves = false;
                    this.ball.x = this.dragObj.x;
                    this.ball.y = this.dragObj.y-140;
                    this.active = true;
                }
            } else {
                if(this.dragObj.box.length < 4) {
                    this.ball.body.moves = true;
                    this.ball.x = this.dragObj.x;
                    this.ball.y = this.dragObj.y-140;
                    this.active = false;

                    this.dragObj.box.push(this.ball);   
                }
            }
        }

        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
    }


    newBeaker(x, y, length) {
        var beaker = new Beaker(this, x, y, 'beaker', this.BeakersColl);
        beaker.box = []
        for (var i = 0; i < length; i++) {
            var ball = new Ball(this, beaker.x, beaker.y-i*55, "logo_gamma");
            beaker.box.push(ball);
        }
        this.Balls.addMultiple(beaker.box);
        this.Beakers.add(beaker);
    }



}
export default Bootloader;
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
        this.load.image('beaker', 'beaker2.png');
        this.load.image('a', 'a.png');
        this.load.image('b', 'b.png');
        this.load.image('c', 'c.png');
        this.load.image('d', 'd.png');
        this.load.image('e', 'e.png');

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

        this.createLevel(7);






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


    newBeaker(x, y, length, pelota) {
        var beaker = new Beaker(this, x, y, 'beaker', this.BeakersColl);
        beaker.box = []
        for (var i = 0; i < length; i++) {
            var ball = new Ball(this, beaker.x, beaker.y-i*55, pelota);
            beaker.box.push(ball);
        }
        this.Balls.addMultiple(beaker.box);
        this.Beakers.add(beaker);
    }

    createLevel(elements) {
        var l = ['a', 'b', 'c', 'd', 'e'];

        var h = this.scale.height/2
        if(elements < 5) {
            var w = this.scale.width/(elements+1);
            for (var i = 1; i <= elements; i++) {
                this.newBeaker(w*i, h, 4, l[i%5]);
            }
        } else if(elements < 13) {
            var row = Math.floor(elements/2) + (elements%2 != 0 ? 1 : 0);
            var w = this.scale.width/(row+1);
            var col=1;
            var x;
            var y;
            h -= 350;

            for (var i = 0; i < elements; i++) {
                col = Math.floor((i)/row);
                x = w*(i%row+1) + (elements%2 != 0 ? (col*w/2) : 0);
                y = h+(300*(col+1));
                this.newBeaker(x, y,  i < elements-1 ? 4 : 0, l[i%5]);
            }
        } else {
            this.add.text(  45,
                            this.scale.height/2,
                            'Elementos no soportados', 
                            { font: "40px Arial", fill: "#fff" });
        }
    }



}
export default Bootloader;
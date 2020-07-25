import Ball from '../ball.js';
import Beaker from '../beaker.js';

class Level extends Phaser.Scene {
    constructor(level) {
        super({key: 'Level', active: true});
    }

    preload() {
        this.Balls = this.add.group();
        this.Beakers = this.add.group();
        this.BeakersColl = this.add.group();
        this.active = false;
        this.ball = undefined;
    }

    create() {
        var back = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x282923, 1);//0x000000
        back.setOrigin(0,0);

        var rect = this.add.rectangle(80, 50, 150, 75, 0xffffff, 1000);//0x000000
        rect.return = true;
        rect.setInteractive();
        this.add.text(  20,
                        25,
                        'Atras', 
                        { font: "43px Arial", fill: "#000" });

        this.add.text(  180,
                        150,
                        'NIVEL ' + this.value, 
                        { font: "37px Arial", fill: "#fff" });
        
            
        this.createLevel(Math.floor(this.value/4)+2);

        this.input.on('pointerdown',this.startDrag, this);


        this.physics.add.collider(this.Balls, this.Balls);
        this.physics.add.collider(this.Balls, this.BeakersColl);
    }

    update(time, delta) {

    }

    up(value) {
        this.value = value;
         this.scene.restart();
    }


    startDrag(pointer, targets) {
        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj = targets[0];
        this.input.on('pointerup', this.stopDrag, this);
    }


    stopDrag() {
        if(this.dragObj) {
            /*si se ha seleccionado un objeto*/
            if (this.dragObj.return) {
                this.scene.moveDown();
                //this.scene.start("Menu");
                //console.log(delete(this.scene));
                //this.scene.Level.value++;
                //this.scene.restart();
            }else if(!this.active) {
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
            ball.body.setBounce(.75);
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
                this.newBeaker(w*i, h, i < elements ? 4 : 0, l[i%5]);
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

export default Level;

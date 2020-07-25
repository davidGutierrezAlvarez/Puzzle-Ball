import Ball from '../ball.js';

class Load extends Phaser.Scene {
    constructor() {
        super({key: 'Load'});
    }

    preload() {
        this.pelota = ['a', 'b', 'c', 'd', 'e'];
        this.Balls = this.add.group();
        this.continue = false;
    }

    create() {
        //this.body.setMaxSpeed(165);
        var text = this.add.text(  70,
                        125,
                        'JUEGO DE PRUEBA', 
                        { font: "43px Arial", fill: "#fff" });

        var x;
        var y;
        for (var i = 0; i < 60; i++) {
            x = i%7;
            y = Math.floor(i/7);
            var ball = new Ball(this, x*70 +(Math.random()*100),y*50- 550+(Math.random()*100), this.pelota[i%5]);
            this.Balls.add(ball);
        }
        this.physics.add.collider(this.Balls, this.Balls);
        
        this.input.on('pointerdown', function (event) {
            if (this.continue) {
                //this.scene.bringToTop('Menu');
                this.scene.start('Menu');
            }
        }, this);

    }

    update(time, delta) {
        if (Math.floor(time/1000+1)%8 == 0) {
            this.continue = true;
            var text = this.add.text(  120,
                        425,
                        'click para continuar', 
                        { font: "34px Arial", fill: "#f1f1f1" });

        }
    }
}

export default Load;

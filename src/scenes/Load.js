import Ball from '../ball.js';

class Load extends Phaser.Scene {
    constructor() {
        super({key: 'Load'});
    }

    preload() {
        this.pelota = ['a', 'b', 'c', 'd', 'e'];
        this.Balls = this.add.group();
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
        
            

    }

    update(time, delta) {
        if (Math.floor(time/1000+1)%8 == 0) {
            this.scene.start("Menu");
        }
    }
}

export default Load;

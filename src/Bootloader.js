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
        this.load.image('a', 'purple_ball.png');
        this.load.image('b', 'red_ball.png');
        //this.load.image('c', 'shinyball.png');
        this.load.image('d', 'yellow_ball.png');
        this.load.image('e', 'aqua_ball.png');
        this.load.image('f', 'pangball.png');
        this.load.image('g', 'green_ball.png');
        this.load.image('c', 'blue_ball.png');

        this.load.on('complete', () => {
            console.log('Load complete');
        });

    }

    create() {

        //for (var i = 0; i < 37; i++) {
        //this.scene.add("Level", level);
        //console.log(this.level, "mamalon");
        //}
        this.scene.start("Load");
    }

    update() {
        //this.physics.world.collide(this.Balls, this.Beakers);

        
        //console.log(this.input.addPointer());
    }

}
export default Bootloader;
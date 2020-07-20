import Ball from './ball.js';
import Beaker from './beaker.js';
import Level from './scenes/Level.js';

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

    }

    create() {

        for (var i = 0; i < 37; i++) {
            this.scene.add("Level"+(i+1), new Level(i+1));
        }
        this.scene.start("Load");
    }

    update() {
        //this.physics.world.collide(this.Balls, this.Beakers);

        
        //console.log(this.input.addPointer());
    }

}
export default Bootloader;
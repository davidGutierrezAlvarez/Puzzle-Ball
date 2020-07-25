import Level from './Level.js';

class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    preload() {
        this.level = new Level;
        console.log("carga menu");
        this.y = 0;
        this.cameraPosition =  {x: 280, y: 500 };
        this.move = false;
        this.scene.add("Level", this.level);
        this.scene.bringToTop("Menu");
    }

    create() {
        var back = this.add.rectangle(0, 0, this.scale.width, this.scale.height*3, 0x282923, 1);//0x000000
        back.setOrigin(0,0);


        this.add.text(  90,
                        125,
                        'TEXTO MAMALON', 
                        { font: "43px Arial", fill: "#fff" });
        
        var x;//pos x
        var y;//pos y
        var size = 75;//altura y anchura del cuadro
        var sep = 25;//separacion entre cuadros
        var x_i = 75;//inicio donde se colocan las x
        var y_i = 275;//inicio donde se colocan las y
        for (var i = 0; i < 52; i++) {
            x = i%5;
            y = Math.floor(i/5);
            var rect = this.add.rectangle((size+sep)*x+x_i, (size+sep)*y+y_i, size, size, 0xC0A66D, 1000);//0x000000
            rect.value = i+1;
            this.add.text(  (size+sep)*x+(x_i-25),
                            (size+sep)*y+(y_i-25),
                            i < 9 ? ' ' + (i+1) : i+1, 
                            { font: "40px Arial", fill: "#fff" });
            rect.setInteractive();
        }

        this.input.on('pointerdown',this.startDrag, this);
        
        this.input.on('pointermove', function(pointer) {
            //console.log(Math.floor(pointer.x), Math.floor(pointer.y));
            this.y -= pointer.y;
            this.cameraPosition.y += this.y;
            this.y = pointer.y;

            if (this.cameraPosition.y < 500) {
                /*evita salir de la pantalla por la parte superior*/
                this.cameraPosition.y = 500;
            }

            if (this.cameraPosition.y > 1700) {
                /*evita salir de la pantalla por la parte inferior*/
                this.cameraPosition.y = 1700;
            }

            this.move = true;
            

        }, this);
        
        this.cameras.main.startFollow(this.cameraPosition);
    }

    update(time, delta) {

    }

    startDrag(pointer, targets) {
        this.y = pointer.y;

        this.input.off('pointerdown', this.startDrag, this);
        this.dragObj = targets[0];
        this.input.on('pointerup', this.stopDrag, this);
    }


    stopDrag() {
        if(this.dragObj) {
            /*si se ha seleccionado un objeto*/
            if(!this.active && !this.move) {
                if (this.dragObj.value != undefined) {
                    

                    this.level.up(this.dragObj.value);

                    this.scene.bringToTop("Level");
                }
            }
            this.move = false;
        }

        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
    }
}

export default Menu;

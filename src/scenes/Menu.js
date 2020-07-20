class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    preload() {

    }

    create() {
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
        for (var i = 0; i < 37; i++) {
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
        

    }

    update(time, delta) {

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
                if (this.dragObj.value != undefined) {
                    this.scene.start("Level"+this.dragObj.value);
                }
            }
        }

        this.input.on('pointerdown', this.startDrag, this);
        this.input.off('pointerup', this.stopDrag, this);
    }
}

export default Menu;

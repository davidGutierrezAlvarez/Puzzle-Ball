import Options from './scenes/Options.js';
import Menu from './scenes/Menu.js';
import Load from './scenes/Load.js';
import Bootloader from './Bootloader.js';

const config = {
    title: "ball puzzle",
    version: "0.0.2",
    type: Phaser.CANVAS,
    scale: {
        parent: "phaser_container",
        width: 540,
        height: 1000,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#282923",
    pixelArt: false,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            }
        }
    },
    scene: [Bootloader, Load, Menu, Options]
};

new Phaser.Game(config);
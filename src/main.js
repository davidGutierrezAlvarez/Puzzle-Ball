import Ball from './ball.js';
import Bootloader from './Bootloader.js';


const config = {
    title: "ball puzzle",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 500,
        height: 1000,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#f9ca24",
    pixelArt: false,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            }
        }
    },
    scene: [
        Bootloader
    ]
};

new Phaser.Game(config);
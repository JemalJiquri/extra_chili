
import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import FireworkItem from './FireworkItem'


class Firework extends PIXI.Sprite {

    colours = ["#ff0000", "#ff00d5", "#ae00ff", "#3300ff", "#006fff", "#00ffee", "#00ff48", "#8cff00", "#eaff00", "#ff7b00"]


    build() {
        for (let index = 0; index < 3 + parseInt(Math.random() * 4); index++) {
            var fwi = new FireworkItem()
            fwi.build(this.colours[Math.floor(Math.random() * this.colours.length)],this.colours[Math.floor(Math.random() * this.colours.length)])
            fwi.fall()
            this.addChild(fwi)
        }
    }
}


export default Firework;

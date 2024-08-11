import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';



class Bubble extends PIXI.Sprite {

    init(color, radius) {
        this.alpha = 0.7
        var circle = new PIXI.Graphics();
        circle.beginFill(color, 1);
        circle.drawCircle(0, 9 * Math.random() + 2, radius)
        circle.endFill()
        this.addChild(circle)
        new TWEEN.Tween(this)
            .to({ alpha: 0 }, 100 + 300 * Math.random())
            .easing(TWEEN.Easing.Linear.None)
            .delay(parseInt(100 + 150 * Math.random()))
            .onComplete(function () {
                this.parent.removeChild(this)
            }.bind(this)).start()
    }
}


export default Bubble

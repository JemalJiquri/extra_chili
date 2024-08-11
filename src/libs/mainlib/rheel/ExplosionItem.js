
import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import RheelConfig from './RheelConfig'


class ExplosionItem extends PIXI.Sprite {
    fg_texture = null
    fg = null
    onComplete = null

    p0 = { x: 0, y: 0 }
    c0 = { x: 0, y: 0 }
    c1 = { x: 0, y: 0 }
    p1 = { x: 0, y: 0 }


    build(_fg_texture) {
        this.fg_texture = _fg_texture
        this.fg = PIXI.Sprite.from(PIXI.Texture.from(this.fg_texture));
        this.fg.x = -this.fg.width / 2
        this.fg.y = -this.fg.height / 2
        this.rotation = Math.random() * Math.PI
        this.addChild(this.fg)
    }

    fall() {
        this.p0.x = this.x
        this.p0.y = this.y

        var direction = (Math.random() < 0.5 ? 1 : -1)

        this.c0.x = this.x + 50 * direction
        this.c0.y = this.y - 50

        this.c1.x = this.c0.x
        this.c1.y = this.c0.y

        this.p1.x = this.c0.x
        this.p1.y = 1000


        var rotationSpeed = Math.random() * 0.4


        var twObj = { progress: 0 }
        new TWEEN.Tween(twObj)
            .to({ progress: 1 }, 1000)
            .easing(TWEEN.Easing.Linear.None)
            //delay(1000).
            .onUpdate(function () {
                var p = RheelConfig.RheelUtils.Bezier(this.p0, this.c0, this.c1, this.p1, twObj.progress);
                this.x = p.x;
                this.y = p.y;
                this.rotation += rotationSpeed
            }.bind(this))
            .onComplete(function () {
                if (this.onComplete) {
                    this.onComplete()
                }
            }.bind(this))
            .start()
    }



}


export default ExplosionItem;


import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import RheelConfig from './RheelConfig'


class WinCoin extends PIXI.Sprite {
    fg_texture = null
    fg = null
    animationSprite = null
    p0 = { x: 0, y: 0 }
    c0 = { x: 0, y: 0 }
    c1 = { x: 0, y: 0 }
    p1 = { x: 0, y: 0 }


    build(_index,_type,_count) {
        this.animationSprite = RheelConfig.RheelUtils.getAnimatedSprite(`DB_${_type}_Spin_0${_index}_AE/DB_${_type}_Spin_0${_index}_AE_%frame%`, 0, _count)
        this.animationSprite.gotoAndPlay(parseInt(Math.random()*_count))
        this.animationSprite.loop = true
        this.animationSprite.animationSpeed = .44
        this.animationSprite.scale.x = this.animationSprite.scale.y = 1
        this.addChild(this.animationSprite)
        this.alpha = 0
    }

    fall(_height,_delay) {
        
        this.p0.x = this.x
        this.p0.y = this.y

        var direction = (Math.random() < 0.5 ? 1 : -1)

        this.c0.x = this.x + (50+200*Math.random()) * direction
        this.c0.y = this.y - RheelConfig.RheelUtils.RHEEL_HEIGHT*_height*1.9

        this.c1.x = this.c0.x
        this.c1.y = this.c0.y

        this.p1.x = this.c0.x
        this.p1.y = RheelConfig.RheelUtils.RHEEL_HEIGHT

        


        var twObj = { progress: 0 }
        new TWEEN.Tween(twObj)
            .to({ progress: 1 }, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .delay(_delay)
            .onStart(function () {
                this.alpha = 1
            }.bind(this))
            .onUpdate(function () {
                var p = RheelConfig.RheelUtils.Bezier(this.p0, this.c0, this.c1, this.p1, twObj.progress);
                this.x = p.x;
                this.y = p.y;
            }.bind(this))
            .onComplete(function () {
                this.parent.removeChild(this)
            }.bind(this))
            .start()
    }



}


export default WinCoin;

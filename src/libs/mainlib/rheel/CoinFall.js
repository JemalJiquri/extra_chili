
import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import RheelConfig from './RheelConfig'

class CoinFall extends PIXI.Sprite {
    caller = null
    p0 = { x: 0, y: 0 }
    c0 = { x: 0, y: 0 }
    c1 = { x: 0, y: 0 }
    p1 = { x: 0, y: 0 }
    coinanim = null
    coinHolder = null
    parent_obj = null

    build(_caller,_parent) {
        //FeatureDrop/FeatureDrop_Symbols/FDBed_06/FDBed_06_00004
        this.caller = _caller
        this.parent_obj = _parent
        console.log(this.caller)
        this.coinHolder = new PIXI.Sprite()
        this.coinHolder.scale.x = this.coinHolder.scale.y = this.caller.fall.scale

        var explosion = RheelConfig.RheelUtils.getAnimatedSprite(`SYM_Main_BG_${_caller.height}_Reaction/SYM_Main_BG_${_caller.height}_Reaction_%frame%`, 19, 39)
        explosion.play()
        explosion.loop = false
        explosion.animationSpeed = 0.25
        explosion.blendMode = PIXI.BLEND_MODES.ADD
        explosion.anchor.set(.5)
        explosion.width = 1.2 * this.caller.size.width
        explosion.height = 1.2 * this.caller.size.height

        this.addChild(explosion)

        explosion.onComplete = function () {
            this.removeChild(explosion)
        }.bind(this);





        var bganim = RheelConfig.RheelUtils.getAnimatedSprite(`FeatureDrop/FeatureDrop_Symbols/FDBed_0${_caller.height}/FDBed_0${_caller.height}_%frame%`, 0, 5)
        bganim.loop = false
        bganim.animationSpeed = 0.1
        bganim.anchor.set(.5)
        bganim.scale.x = bganim.scale.y = this.caller.fall.scale
        this.addChild(bganim)
        new TWEEN.Tween(bganim)
            .to({ width: 1.2 * this.caller.size.width, height: 1.2 * this.caller.size.height }, 200)
            .easing(TWEEN.Easing.Cubic.Out)
            .onComplete(function () {
                bganim.play()
                new TWEEN.Tween(bganim)
                    .to({ width: this.caller.size.width, height: this.caller.size.height }, 200)
                    .easing(TWEEN.Easing.Cubic.Out)
                    .onComplete(function () {
                        //this.removeChild(star)
                    }.bind(this))
                    .start()
            }.bind(this))
            .start()
        bganim.onComplete = function () {
            this.removeChild(bganim)
        }.bind(this);



        var star = PIXI.Sprite.from(PIXI.Texture.from("FeatureDrop/FDStar_01"));
        star.anchor.set(.5)
        this.addChild(star)
        new TWEEN.Tween(star)
            .to({ width: 1.5 * this.caller.size.width, height: 1.5 * this.caller.size.height }, 200)
            .easing(TWEEN.Easing.Back.Out)
            .delay(10)
            .onComplete(function () {
                new TWEEN.Tween(star)
                    .to({ width: 10, height: 10 }, 200)
                    .easing(TWEEN.Easing.Back.Out)
                    .delay(10)
                    .onComplete(function () {
                        this.removeChild(star)
                    }.bind(this))
                    .start()
            }.bind(this))
            .start()



        //FeatureDrop/FD_CoinSpin/FD_CoinSpin_
        this.coinanim = RheelConfig.RheelUtils.getAnimatedSprite(`FeatureDrop/FD_CoinSpin/FD_CoinSpin_%frame%`, 0, 9)
        this.coinanim.loop = false
        this.coinanim.play()
        this.coinanim.animationSpeed = 0.2
        this.coinanim.anchor.set(.5)
        this.coinHolder.addChild(this.coinanim)
        this.addChild(this.coinHolder)
        new TWEEN.Tween(this.coinanim.scale)
            .to({ x: 2, y: 2 }, 500)
            .easing(TWEEN.Easing.Cubic.In)
            .delay(10)
            .onComplete(function () {
                new TWEEN.Tween(this.coinanim.scale)
                    .to({ x: 0.5, y: 0.5 }, 500)
                    .easing(TWEEN.Easing.Cubic.In)
                    .start()
            }.bind(this))
            .start()
        this.fall()
    }


    fall() {
        this.p0.x = 0
        this.p0.y = 0



        this.c0.x = this.caller.fall.x / 2
        this.c0.y = -200

        this.c1.x = this.c0.x
        this.c1.y = this.c0.y

        this.p1.x = this.caller.fall.x
        this.p1.y = this.caller.fall.y




        var twObj = { progress: 0 }
        new TWEEN.Tween(twObj)
            .to({ progress: 1 }, 1000)
            .easing(TWEEN.Easing.Linear.None)
            //delay(1000).
            .onUpdate(function () {
                var p = RheelConfig.RheelUtils.Bezier(this.p0, this.c0, this.c1, this.p1, twObj.progress);
                this.coinHolder.x = p.x;
                this.coinHolder.y = p.y;
            }.bind(this))
            .onComplete(function () {
                if (this.parent_obj.eventHandler) {
                    this.parent_obj.eventHandler('coinfall', this)
                }
            }.bind(this))
            .start()

    }


}


export default CoinFall;

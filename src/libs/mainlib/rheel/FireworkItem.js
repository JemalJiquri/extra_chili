
import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import RheelConfig from './RheelConfig'
import * as particles from '@pixi/particle-emitter'

class FireworkItem extends PIXI.Sprite {
    p0 = { x: 0, y: 0 }
    c0 = { x: 0, y: 0 }
    c1 = { x: 0, y: 0 }
    p1 = { x: 0, y: 0 }
    emmiter = null


    build(color, endcolour) {
        var STAR_PARTICLE = {
            "alpha": {
                "start": 0.4,
                "end": 0.0
            },
            "scale": {
                "start": 0.3,
                "end": 0.01,
                "minimumScaleMultiplier": 1
            },
            "color": {
                "start": color,
                "end": '0xffffff'
            },
            "speed": {
                "start": 0,
                "end": 0,
                "minimumSpeedMultiplier": 0.001
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 0,
                "max": 0
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 0.2,
                "max": 0.5
            },
            "blendMode": "normal",
            "frequency": 0.001,
            "emitterLifetime": 5,
            "maxParticles": 200,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "point"
        }

        //SQ_Glow_01 StarBurst
        this.emmiter = new particles.Emitter(this, particles.upgradeConfig(STAR_PARTICLE, [PIXI.Texture.from("StarBurst")]));
        this.emmiter.playOnceAndDestroy()
        this.fg = PIXI.Sprite.from(PIXI.Texture.from("StarBurst"));
        this.fg.tint = Number(color.replace('#', '0x'))
        this.fg.scale.x = this.fg.scale.y = 0.8
        this.fg.anchor.set(0.5, 0.5);
        this.addChild(this.fg)
        this.fg.alpha = 0.5

    }


    fall() {
        this.p0.x = 0
        this.p0.y = 0

        var rnd = (Math.random() - 0.5)


        this.c0.x = 200 * rnd
        this.c0.y = - 150 * Math.random() - 100

        this.c1.x = this.c0.x
        this.c1.y = this.c0.y

        this.p1.x = this.c0.x + 350 * rnd
        this.p1.y = Math.random() * 100 + 200




        var twObj = { progress: 0 }
        new TWEEN.Tween(twObj)
            .to({ progress: 1 }, 1500)
            .easing(TWEEN.Easing.Linear.None)
            //delay(1000).
            .onUpdate(function () {
                var p = RheelConfig.RheelUtils.Bezier(this.p0, this.c0, this.c1, this.p1, twObj.progress);
                this.fg.x = p.x;
                this.fg.y = p.y;
                this.emmiter.updateOwnerPos(parseInt(p.x), parseInt(p.y))

            }.bind(this))
            .start()

        new TWEEN.Tween(this.fg)
            .to({ alpha: 0 }, 200)
            .easing(TWEEN.Easing.Linear.None)
            .delay(1300)
            .onComplete(function () {
                this.parent.removeChild(this)
            }.bind(this))
            .start()
    }






}


export default FireworkItem;

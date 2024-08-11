import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';


class Wheel extends PIXI.Sprite {
    callback_function = null
    wheel = null
    arrow = null
    holderMask = null
    dwnPanel = null
    currentArrowIndex = 0
    arrowOpenTime = 50
    tweenArr1 = null
    tweenArr2 = null
    andgleAnimCompleted = true
    firstAngleFix = true

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.arrow = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/Clacker"));
        this.arrow.x = 288
        this.arrow.y = -110
        this.arrow.anchor.set(0.5, 0);
        this.addChild(this.arrow)
        this.setWheel(1)
    }

    setWheel(mode) {
        if (this.dwnPanel) {
            this.dwnPanel.setMode(mode)
        }
        if (this.wheel) {
            this.wheel.mask = null
            this.removeChild(this.wheel)
        }
        if (this.holderMask) {
            this.removeChild(this.holderMask)
        }
        var index = 1
        switch (mode) {
            case 8:
                index = 1
                break;
            case 12:
                index = 2
                break;
            case 16:
                index = 3
                break;
            case 20:
                index = 4
                break;
            case 24:
                index = 4
                break;
            default:
                break;
        }

        this.currentArrowIndex = 0
        this.firstAngleFix = true
        this.wheel = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/Wheel_0" + index));
        this.wheel.x = this.wheel.width / 2
        this.wheel.y = this.wheel.height / 2
        this.wheel.rotation = Math.PI * ((18) / 180)
        this.wheel.anchor.set(0.5, 0.5);
        this.addChild(this.wheel)

        this.wheelGoldCenter = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_WhelGoldCenter"));
        this.wheelGoldCenter.x = this.wheel.width / 2
        this.wheelGoldCenter.y = this.wheel.height / 2
        this.wheelGoldCenter.anchor.set(0.5, 0.5);
        this.addChild(this.wheelGoldCenter)


        var height = 443
        this.holderMask = new PIXI.Graphics();
        this.holderMask.beginFill(0x8bc5ff, 1);
        this.holderMask.moveTo(0, 0);
        this.holderMask.lineTo(this.wheel.width, 0);
        this.holderMask.lineTo(this.wheel.width, height);
        this.holderMask.lineTo(0, height);
        this.holderMask.lineTo(0, 0);

        this.addChild(this.holderMask)
        this.wheel.mask = this.holderMask
        this.addChild(this.arrow)
        if (this.dwnPanel) {
            this.dwnPanel.setGambleMode(false)
        }

    }

    gambleTo(index) {
        this.dwnPanel.setGambleMode(true)
        var prevDegree = -1
        new TWEEN.Tween(this.wheel)
            .to({ rotation: (Math.PI / 180) * 10 }, 1000)
            .easing(TWEEN.Easing.Cubic.Out)
            .delay(200)
            .onComplete(function () {
                new TWEEN.Tween(this.wheel)
                    .to({ rotation: (Math.PI / 180) * (5 * 360 + index * 36 + 18 + 10) }, 8000)
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .onComplete(function () {
                        new TWEEN.Tween(this.wheel)
                            .to({ rotation: (Math.PI / 180) * (5 * 360 + index * 36 + 18) }, 2000)
                            .easing(TWEEN.Easing.Cubic.Out)
                            .onComplete(function () {
                                if (this.callback_function) {
                                    this.callback_function()
                                }
                            }.bind(this))
                            .start()
                    }.bind(this))
                    .onUpdate(function () {
                        if (prevDegree === -1) {
                            prevDegree = this.wheel.rotation * 180 / Math.PI;
                        }
                        var rot = this.wheel.rotation;
                        var rotDegrees = rot * 180 / Math.PI;
                        var speed = rotDegrees - prevDegree
                        
                        prevDegree = rotDegrees


                        var currentDegre = (this.currentArrowIndex * 36)

                        if (rotDegrees >= currentDegre) {
                            this.currentArrowIndex++
                            this.arrowOpenTime = 10 + this.currentArrowIndex * 5
                            if (speed < 4) {
                                this.rotateArrow()
                            } else {
                                this.angleArrow()
                            }

                        }
                        var currentAngle360 = parseInt(rotDegrees % 360 / 36)
                        this.dwnPanel.setActiveMode(currentAngle360 % 2, 1 - currentAngle360 % 2)
                    }.bind(this))
                    .start()
            }.bind(this))
            .start()
    }
    
    angleArrow() {
        console.log('angleArrow')
        window.SoundManager.play({name:"Clacker1",loop:false})
        if(this.firstAngleFix){
            this.firstAngleFix = false
            return
        }
        var _this = this
        if (!_this.andgleAnimCompleted) {
            return
        }
        _this.andgleAnimCompleted = false
        if (this.tweenArr1) {
            this.tweenArr1.stop()
        }
        if (this.tweenArr2) {
            this.tweenArr2.stop()
        }
        //this.arrow.rotation = 0;
        var _arrow = this.arrow;
        var time = 50;
        

        this.tweenArr1 = new TWEEN.Tween(_arrow)
            .to({ rotation: -(Math.PI / 180) * 20 }, time)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                
                _this.tweenArr2 = new TWEEN.Tween(_arrow)
                    .to({ rotation: -(Math.PI / 180) * 10 }, time)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        _this.andgleAnimCompleted = true
                    })
                    .start()
            })
            .start()
    }

    rotateArrow() {
        console.log('angleArrow')
        window.SoundManager.play({name:"Clacker1",loop:false})
        if(this.firstAngleFix){
            this.firstAngleFix = false
            return
        }
        var _this = this
        if (this.tweenArr1) {
            this.tweenArr1.stop()
        }
        if (this.tweenArr2) {
            this.tweenArr2.stop()
        }
        this.arrow.rotation = 0;
        var _arrow = this.arrow;
        var time = 200;
        this.tweenArr1 = new TWEEN.Tween(_arrow)
            .to({ rotation: -(Math.PI / 180) * 20 }, time)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                _this.tweenArr2 = new TWEEN.Tween(_arrow)
                    .to({ rotation: 0 }, time)
                    .easing(TWEEN.Easing.Linear.None)
                    .start()
            })
            .start()
    }

    get_size() {
        if (this.bg) {
            return { width: this.bg.width, height: this.bg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default Wheel;

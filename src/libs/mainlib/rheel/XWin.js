
import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import RheelConfig from './RheelConfig'
import WinNumber from './WinNumber'
import Particles from './Particles'


class XWin extends PIXI.Sprite {
    WIN_NUMBERS = {
        "0": "DB_Numbers_01/0",
        "1": "DB_Numbers_01/1",
        "2": "DB_Numbers_01/2",
        "3": "DB_Numbers_01/3",
        "4": "DB_Numbers_01/4",
        "5": "DB_Numbers_01/5",
        "6": "DB_Numbers_01/6",
        "7": "DB_Numbers_01/7",
        "8": "DB_Numbers_01/8",
        "9": "DB_Numbers_01/9",
        "d": "DB_Numbers_01/dot",
        "x": "DB_Numbers_01/x"
    }

    number = 0
    numSprite = null
    xSprite = null
    startScale = 3
    mainDelay = 2500
    numbersHolder = null
    parent_obj = null

    build(_parent, _number) {
        this.parent_obj = _parent
        this.number = _number
        setTimeout(function () {
            var particle = new Particles()
            particle.build()
            this.addChild(particle)
            this.addChild(this.numbersHolder)
        }.bind(this), this.mainDelay);

        this.numbersHolder = new PIXI.Sprite()
        this.addChild(this.numbersHolder)
        this.setNumbers("x" + _number)

        setTimeout(function () {
            new TWEEN.Tween(this.numbersHolder)
                .to({ alpha: 0 }, 300)
                .easing(TWEEN.Easing.Cubic.In)
                .delay(400)
                .start()
        }.bind(this), this.mainDelay + 1000);

        setTimeout(function () {
            if (this.parent_obj.eventHandler) {
                this.parent_obj.eventHandler('xwin', this)
            }
            this.parent.removeChild(this)
        }.bind(this), this.mainDelay + 2000);

    }

    setNumbers(wstr) {
        console.dir(wstr)
        while (this.numbersHolder.children[0]) {
            this.numbersHolder.removeChild(this.numbersHolder.children[0]);
        }


        //WinNumber
        var currentX = 0;
        for (let index = 0; index < wstr.length; index++) {
            var number = wstr.charAt(index)
            var digit = new WinNumber()
            digit.build(this.WIN_NUMBERS[number], 1)
            digit.scale.x = digit.scale.y = this.startScale
            digit.alpha = 0
            if (number == 'x') {
                digit.x = currentX - digit.getWidth() / 4
                currentX = currentX + digit.getWidth() / 2
            } else {
                digit.x = currentX
                currentX = currentX + digit.getWidth() / 1.4
            }


            new TWEEN.Tween(digit)
                .to({ alpha: 1 }, 300)
                .easing(TWEEN.Easing.Cubic.In)
                .delay(this.mainDelay + index * 100)
                .onUpdate(function (digit) {
                    digit.scale.x = digit.scale.y = 1 + (this.startScale * (1 - digit.alpha))
                }.bind(this)).start()

            this.numbersHolder.addChild(digit)
        }
        this.numbersHolder.x = RheelConfig.RheelUtils.RHEEL_WIDTH / 2 - 30
        if (wstr.length == 3) {
            this.numbersHolder.x = RheelConfig.RheelUtils.RHEEL_WIDTH / 2 - 150
        }

        this.numbersHolder.y = RheelConfig.RheelUtils.RHEEL_HEIGHT / 2

    }



}


export default XWin;


import * as PIXI from 'pixi.js'
import DynamicIcon from './DynamicIcon'
import RheelConfig from './RheelConfig'
import TWEEN from '@tweenjs/tween.js';


class DynamicHorizontalRheel extends PIXI.Sprite {
    holder = null
    iconsAnimated = 0
    parentHolder = null
    currentData = null
    iconWidth = 0

    build(data, _parent) {
        console.dir(data)
        this.parentHolder = _parent

        this.currentData = []
        this.holder = new PIXI.Sprite()
        var currentX = 0
        for (let index = 0; index < data.length; index++) {
            var icon = new DynamicIcon()
            var icnObj = RheelConfig.RheelUtils.getIconSettings(data[index], 3, true, this.parentHolder.bonusMode)
            icon.init(3, icnObj, false)
            this.iconWidth = icon.getWidth()
            icon.x = currentX
            currentX = currentX + icon.getWidth()
            this.holder.addChildAt(icon, 0)
            this.currentData.push({ iconName: data[index], icon: icon, active: true })
        }
        this.addChild(this.holder)
    }

    iconAnimationCompleted() {
        this.iconsAnimated++

        if (this.iconsAnimated === this.currentData.length) {
            console.log("finished animation")
            if (this.parentHolder) {
                this.parentHolder.animationFinished(this)
            }
        }
    }

    iconRespinCompleted() {
        this.iconsAnimated++
        if (this.iconsAnimated === this.currentData.length) {
            console.log("finished respinFinished")
            if (this.parentHolder) {
                this.parentHolder.respinFinished(this)
            }
        }
    }

    finishAnimation(data) {
        this.currentData = []
        var currentX = this.iconWidth * data.length + 100
        var currentXFinal = 0
        for (let index = 0; index < data.length; index++) {
            var icon = new DynamicIcon()
            var icnObj = RheelConfig.RheelUtils.getIconSettings(data[index], 3, true, this.parentHolder.bonusMode)
            icon.init(3, icnObj, this.parentHolder.bonusMode)
            icon.x = currentX
            currentX = currentX + icon.getWidth()

            var delay = 100 + index * 50
            if (this.parentHolder.scatterMode || this.parentHolder.multiplierMode) {
                //delay = 3500
            }
            console.log("this.parentHolder.data[index] " + data[index])

            if (data[index] == 'SC') {
                icon.animateEntered()
            }
            this.holder.addChildAt(icon, 0)
            this.currentData.push({ iconName: data[index], icon: icon, active: true })
            new TWEEN.Tween(icon)
                .to({ x: currentXFinal }, 500)
                .easing(TWEEN.Easing.Back.Out)
                .delay(delay)
                .onComplete(function () {
                    this.iconAnimationCompleted()
                }.bind(this)).start()
            currentXFinal = currentXFinal + icon.getWidth()
        }
    }

    animateTo(data) {
        var currentX = this.iconWidth * data.length + 100
        //Elastic.Out Back.Out
        this.iconsAnimated = 0
        for (let index = 0; index < data.length; index++) {
            const icon = this.currentData[index].icon
            new TWEEN.Tween(icon)
                .to({ x: -(icon.x + currentX) }, 500)
                .easing(TWEEN.Easing.Back.In)
                .onComplete(function () {
                    this.holder.removeChild(icon)
                }.bind(this)).start()
        }
    }



    respinTo(data, lockedSymbols) {
        var currentPos = 0;
        var newCurrentData = []
        for (let index = 0; index < this.currentData.length; index++) {
            const element = this.currentData[index]
            if (element.iconName === lockedSymbols[currentPos]) {
                currentPos++;
                newCurrentData.push(element)
            } else {
                element.icon.removeWithExplosion()
            }
        }
        var currentX = this.iconWidth * data.length + 100
        for (let index = newCurrentData.length; index < data.length; index++) {
            const element = data[index];
            var icon = new DynamicIcon()
            var icnObj = RheelConfig.RheelUtils.getIconSettings(element, 3, true, this.parentHolder.bonusMode)
            icon.init(3, icnObj, this.parentHolder.bonusMode)
            icon.x = currentX
            currentX = currentX + icon.getWidth()
            this.holder.addChildAt(icon, 0)
            newCurrentData.push({ iconName: element, icon: icon, active: true })
        }
        this.iconsAnimated = 0
        var currentXFinal = 0
        for (let index = 0; index < newCurrentData.length; index++) {
            const element = newCurrentData[index];
            new TWEEN.Tween(element.icon)
                .to({ x: currentXFinal }, 500)
                .easing(TWEEN.Easing.Back.Out)
                .delay((this.parentHolder.bonusMode ? RheelConfig.RheelUtils.EXPLOSION_BONUS_TIME : RheelConfig.RheelUtils.EXPLOSION_TIME) + index * 50)
                .onComplete(function () {
                    this.iconRespinCompleted()
                }.bind(this))
                .start()
            currentXFinal = currentXFinal + element.icon.getWidth()
        }

        //console.log(newCurrentData)

        this.currentData = newCurrentData
    }

    elementEquals() {

    }
}


export default DynamicHorizontalRheel;

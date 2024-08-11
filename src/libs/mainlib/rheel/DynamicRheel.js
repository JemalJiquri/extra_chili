
import * as PIXI from 'pixi.js'
import DynamicIcon from './DynamicIcon'
import RheelConfig from './RheelConfig'
import TWEEN from '@tweenjs/tween.js';



class DynamicRheel extends PIXI.Sprite {
    holder = null
    rheelIndex = 0
    parentHolder = null
    currentData = null
    iconsAnimated = 0
    featureDrop = null
    rheelHeight = 0

    build(data, height, _rheelIndex, _parent) {
        this.parentHolder = _parent
        this.rheelIndex = _rheelIndex
        this.rheelHeight = height
        this.holder = new PIXI.Sprite()
        var currentY = 0
        this.currentData = []

        for (let index = 0; index < height; index++) {
            var icon = new DynamicIcon()
            //Scatter_BG_2
            var icnObj = RheelConfig.RheelUtils.getIconSettings(data[index], height, false, this.parentHolder.bonusMode)
            icon.init(height, icnObj, this.parentHolder.bonusMode)
            this.currentData.push({ iconName: data[index], icon: icon, active: true })
            icon.y = currentY
            currentY = currentY + icon.getHeight()
            this.holder.addChild(icon)
        }
        this.addChild(this.holder)

    }

    animateScattersFeature() {
        for (let index = 0; index < this.currentData.length; index++) {
            if (this.currentData[index].iconName == 'SC') {
                this.currentData[index].icon.highlight(true)
            }
        }

        setTimeout(function () {
            for (let index = 0; index < this.currentData.length; index++) {
                if (this.currentData[index].iconName == 'SC') {
                    this.currentData[index].icon.highlight(false)
                }
            }
        }.bind(this), 3000);
    }



    animateTo(data, height, _featureDrop) {
        this.rheelHeight = height
        this.featureDrop = _featureDrop
        this.currentData = []
        var fullHeight = 0;
        for (let floor = 0; floor < this.rheelIndex * 3; floor++) {
            var randomFloor = RheelConfig.RheelUtils.getRandomFloor(this.parentHolder.bonusMode)
            fullHeight = RheelConfig.RheelUtils.RHEEL_HEIGHT * (floor + 1)
            for (let index = 0; index < randomFloor.icons.length; index++) {
                const icon = randomFloor.icons[index];
                icon.y = -fullHeight;
                fullHeight = fullHeight - icon.getHeight()

                this.holder.addChildAt(icon, this.holder.children.length)
            }

        }
        fullHeight = RheelConfig.RheelUtils.RHEEL_HEIGHT * (this.rheelIndex * 3 + 1)
        var cnt = height
        if (this.featureDrop) {
            data.splice(this.featureDrop.y, 0, "FD");
            cnt++
            fullHeight += RheelConfig.RheelUtils.iconHeights[height]
        }
        console.log('animateTo ' + this.rheelIndex + " " + JSON.stringify(this.featureDrop) + " " + JSON.stringify(data))



        for (let index = 0; index < cnt; index++) {
            var icon = new DynamicIcon()
            var icnObj = RheelConfig.RheelUtils.getIconSettings(data[index], height, false, this.parentHolder.bonusMode)
            icon.init(height, icnObj, this.parentHolder.bonusMode)
            this.currentData.push({ iconName: data[index], icon: icon, active: true })
            icon.y = -fullHeight;
            fullHeight = fullHeight - icon.getHeight()
            this.holder.addChildAt(icon, this.holder.children.length)
        }
        if (this.featureDrop) {
            data.splice(this.featureDrop.y, 1);
        }



        var scatterPlayed = false
        fullHeight = RheelConfig.RheelUtils.RHEEL_HEIGHT * (this.rheelIndex * 3 + 1)
        new TWEEN.Tween(this.holder)
            .to({ y: -10 }, 200)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                new TWEEN.Tween(this.holder)
                    .to({ y: fullHeight }, RheelConfig.RheelUtils.ANIM_SPEED + this.rheelIndex * 150)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        new TWEEN.Tween(this.holder)
                            .to({ y: fullHeight - 20 }, 100)
                            .easing(TWEEN.Easing.Linear.None)
                            .onComplete(function () {
                                for (let index = 0; index < this.currentData.length; index++) {
                                    if (!scatterPlayed) {
                                        if (this.currentData[index].iconName == 'SC') {
                                            this.currentData[index].icon.animateEntered()
                                            scatterPlayed = true
                                            window.SoundManager.play({ name: "Diamond", loop: false })
                                        }
                                    }
                                }
                                new TWEEN.Tween(this.holder)
                                    .to({ y: fullHeight }, 400)
                                    .easing(TWEEN.Easing.Bounce.Out)
                                    .onComplete(function () {
                                        this.rheelAnimationCompleted()
                                    }.bind(this)).start()
                            }.bind(this)).start()
                    }.bind(this)).start()
            }.bind(this)).start()
    }


    respinTo(_data, height, _lockedSymbols) {

        var data = _data.slice(0, height)
        var lockedSymbols = _lockedSymbols.slice(0, height)

        var newCurrentData = []

        var currentPos = this.currentData.length - 1;
        for (let index = this.currentData.length - 1; index >= 0; index--) {
            const element = this.currentData[index]
            if (element.iconName === lockedSymbols[currentPos]) {
                currentPos--;
                newCurrentData.unshift(element)
            } else {
                element.icon.removeWithExplosion()
                element.active = false
            }
        }

        if (newCurrentData.length !== this.currentData.length) {
            for (let index = 0; index < this.currentData.length; index++) {
                const element = this.currentData[index]
                if (element.active === false) {
                    break
                }
                new TWEEN.Tween(element.icon)
                    .to({ y: element.icon.y - 15 }, 100)
                    .easing(TWEEN.Easing.Cubic.In)
                    .delay(this.parentHolder.bonusMode ? RheelConfig.RheelUtils.EXPLOSION_BONUS_TIME - 500 : RheelConfig.RheelUtils.EXPLOSION_TIME - 500)
                    .start()
            }
        }





        var newElementsCount = height - newCurrentData.length
        //var currentY = (-RheelConfig.RheelUtils.RHEEL_HEIGHT / height) * (height - newCurrentData.length)
        var currentY = (-RheelConfig.RheelUtils.RHEEL_HEIGHT / height)
        for (let index = this.currentData.length - 1; index >= 0; index--) {
            if (lockedSymbols[index] === "") {
                const element = data[index];
                var icon = new DynamicIcon()
                var icnObj = RheelConfig.RheelUtils.getIconSettings(element, height, false, this.parentHolder.bonusMode)
                icon.init(height, icnObj, this.parentHolder.bonusMode)
                icon.y = currentY
                currentY = currentY - icon.getHeight()
                this.holder.addChildAt(icon, 0)
                newCurrentData.unshift({ iconName: element, icon: icon, active: true })
            }

        }



        this.iconsAnimated = 0
        var currentYFinal = 0
        for (let index = 0; index < newCurrentData.length; index++) {
            const element = newCurrentData[index];
            var delay = (this.parentHolder.bonusMode ? RheelConfig.RheelUtils.EXPLOSION_BONUS_TIME - 500 : RheelConfig.RheelUtils.EXPLOSION_TIME) + (newElementsCount - index) * 20
            if (this.parentHolder.scatterMode || this.parentHolder.multiplierMode) {
                delay = 3500
                if (element.iconName == 'SC') {
                    element.icon.animateHighlight()
                }
            }

            if (element.icon.y !== currentYFinal) {
                new TWEEN.Tween(element.icon)
                    .to({ y: currentYFinal }, 500)
                    .easing(TWEEN.Easing.Bounce.Out)
                    .delay(delay)
                    //.delay(5000)
                    .onComplete(function () {
                        this.iconRespinCompleted()
                    }.bind(this))
                    .start()
            } else {
                this.iconsAnimated++
            }
            currentYFinal = currentYFinal + element.icon.getHeight()
        }
        if (this.iconsAnimated === this.currentData.length) {
            if (this.parentHolder) {
                this.parentHolder.respinFinished(this)
            }
        }

        this.currentData = newCurrentData
    }

    iconRespinCompleted() {
        this.iconsAnimated++

        if (this.iconsAnimated === this.currentData.length) {
            if (this.parentHolder) {
                for (let index = 0; index < this.currentData.length; index++) {
                    this.currentData[index].icon.animateOnspinFinished()
                }
                this.parentHolder.respinFinished(this)
            }
        }
    }

    dropFeature() {
        if (this.featureDrop) {
            var fdIndex = -1
            var fdIconData = null
            for (let index = 0; index < this.currentData.length; index++) {
                const element = this.currentData[index];
                console.log(element.iconName)
                if (element.iconName == 'FD') {
                    fdIndex = index
                    fdIconData = {
                        position: element.icon.toGlobal(new PIXI.Point(element.icon.getWidth()/2, element.icon.getHeight()/2)),
                        height: element.icon.rheelheight,
                        size: { width: element.icon.getWidth(), height: element.icon.getHeight() }
                    }
                    this.holder.removeChild(element.icon, 0)
                }
            }
            if (fdIndex >= 0) {
                this.currentData.splice(fdIndex, 1);
            }

            var currentY = 0
            for (let index = 0; index < this.currentData.length; index++) {
                var icon = this.currentData[index].icon
                //icon.y = currentY
                new TWEEN.Tween(icon)
                    .to({ y: currentY }, 500)
                    .easing(TWEEN.Easing.Bounce.Out)
                    .delay(600)
                    .start()
                currentY = currentY + icon.getHeight()
            }
            return fdIconData
        }
    }

    rheelAnimationCompleted() {
        var newHolder = new PIXI.Sprite()
        var currentY = 0
        if (this.featureDrop) {
            currentY -= RheelConfig.RheelUtils.iconHeights[this.rheelHeight]
            window.SoundManager.play({ name: "GetFeatureDrop", loop: false })
        }
        for (let index = 0; index < this.currentData.length; index++) {
            var icon = this.currentData[index].icon
            icon.y = currentY
            currentY = currentY + icon.getHeight()
            newHolder.addChild(icon)
        }

        this.removeChild(this.holder)
        this.holder = newHolder;
        this.addChild(this.holder)
        if (this.parentHolder) {
            for (let index = 0; index < this.currentData.length; index++) {
                this.currentData[index].icon.animateOnspinFinished()
            }
            this.parentHolder.animationFinished(this)
        }
    }

    getHeight() {
        var height = 0
        for (let index = 0; index < this.currentData.length; index++) {
            height += this.currentData[index].icon.getHeight()

        }
        return height
    }
    getWidth() {
        return this.currentData.length === 0 ? 0 : this.currentData[0].icon.getWidth()
    }

}


export default DynamicRheel;

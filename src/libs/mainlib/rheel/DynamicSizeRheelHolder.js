
import * as PIXI from 'pixi.js'
import DynamicRheel from './DynamicRheel'
import RheelConfig from './RheelConfig'
import DynamicHorizontalRheel from './DynamicHorizontalRheel'
import XWin from './XWin'

class DynamicSizeRheelHolder extends PIXI.Sprite {
    rheels = []
    holder = null
    holderMask = null
    horizontalRheelMask = null
    horizontalRheel = null
    currentData = null
    currentRespinIndex = 0
    rheelsAnimated = 0
    textSprite = null
    parent_obj = null
    bonusMode = false
    scatterMode = false
    multiplierMode = false
    currentMultiplier = 0
    currentSound = null
    megawaysTextNum = null
    currentMegawaysNum = 1
    xwinHolder = null

    build(data, _parent, _bonusMode) {
        RheelConfig.RheelUtils.scatterIndex = 0
        console.dir(data)
        this.bonusMode = _bonusMode
        //data = this.processScatters(data)
        this.parent_obj = _parent
        this.currentData = data
        this.holder = new PIXI.Sprite()
        this.xwinHolder = new PIXI.Sprite()
        this.addChild(this.xwinHolder)
        var currentX = 0
        for (let index = 0; index < this.currentData.symbols.length; index++) {
            var rheel = new DynamicRheel()
            rheel.build(this.currentData.symbols[index], this.currentData.reelHeights[index], index + 1, this)
            rheel.name = "Rheel_" + (index + 1)
            rheel.x = currentX
            currentX = currentX + rheel.getWidth()

            this.rheels.push(rheel)
        }

        for (let index = this.rheels.length - 1; index >= 0; index--) {
            this.holder.addChild(this.rheels[index])
        }


        //this.holder.addChild(rheel)


        this.addChild(this.holder)

        this.holderMask = RheelConfig.RheelUtils.createMask(
            RheelConfig.RheelUtils.RHEEL_WIDTH,
            RheelConfig.RheelUtils.RHEEL_HEIGHT
        );
        this.addChild(this.holderMask)
        this.holder.mask = this.holderMask

        if (this.currentData.secondaryReel != null) {
            this.horizontalRheel = new DynamicHorizontalRheel();
            this.horizontalRheel.name = "horizontalRheel"
            this.horizontalRheel.build(this.currentData.secondaryReel, this)
            this.horizontalRheel.x = RheelConfig.RheelUtils.SECONDARY_RHEEL_X
            this.horizontalRheel.y = RheelConfig.RheelUtils.SECONDARY_RHEEL_Y
            this.addChild(this.horizontalRheel)

            //horizontalRheelMask SECONDARY_RHEEL_HEIGHT SECONDARY_RHEEL_WIDTH 
            this.horizontalRheelMask = RheelConfig.RheelUtils.createMask(
                RheelConfig.RheelUtils.SECONDARY_RHEEL_WIDTH,
                RheelConfig.RheelUtils.SECONDARY_RHEEL_HEIGHT
            );
            this.addChild(this.horizontalRheelMask)
            this.horizontalRheelMask.x = RheelConfig.RheelUtils.SECONDARY_RHEEL_X
            this.horizontalRheelMask.y = RheelConfig.RheelUtils.SECONDARY_RHEEL_Y
            this.horizontalRheel.mask = this.horizontalRheelMask
        }


        //
        this.textSprite = new PIXI.Sprite()
        this.textSprite.x = RheelConfig.RheelUtils.TEXT_RHEEL_X
        this.textSprite.y = RheelConfig.RheelUtils.TEXT_RHEEL_Y
        this.textSprite.alpha = 0
        this.addChild(this.textSprite)

        this.tmText = new PIXI.BitmapText(window.Lang.default['LIB_TM'].str,
            {
                fontName: window.Lang.default['LIB_TM'].fontFamily,
                align: 'left',
                fontSize: 25

            });
        this.tmText.x = RheelConfig.RheelUtils.TEXT_RHEEL_WIDTH - this.tmText.textWidth
        this.tmText.y = 5
        this.textSprite.addChild(this.tmText)


        this.megawaysText = new PIXI.BitmapText(window.Lang.default['LIB_MEGAWAYS'].str,
            {
                fontName: window.Lang.default['LIB_MEGAWAYS'].fontFamily,
                align: 'left',
                fontSize: 53

            });
        this.megawaysText.x = RheelConfig.RheelUtils.TEXT_RHEEL_WIDTH - this.megawaysText.textWidth - this.tmText.textWidth
        this.textSprite.addChild(this.megawaysText)

        this.megawaysTextNum = new PIXI.BitmapText("",
            {
                fontName: window.Lang.default['LIB_MEGAWAYS'].fontFamily,
                align: 'left',
                fontSize: 53

            });
        this.megawaysTextNum.x = 0
        this.textSprite.addChild(this.megawaysTextNum)

    }

    animateScattersFeature() {
        var sccount = this.getScattersCount(this.currentData.symbols)
        if (sccount < 3 && this.currentData.respins.length > 0) {
            sccount = this.getScattersCount(this.currentData.respins[this.currentData.respins.length - 1].symbols)
        }

        console.log("animateScattersFeature " + sccount)

        if (sccount < 3) {
            return;
        }
        window.SoundManager.play({ name: "GetFeature", loop: false })
        for (let index = 0; index < this.rheels.length; index++) {
            const element = this.rheels[index];
            element.animateScattersFeature()
        }
    }

    animate(data) {
        if (!this.bonusMode) {
            this.currentSound = window.SoundManager.play({ name: "Spin" + parseInt(Math.random() * 6), loop: true })
        }
        console.log('featureDropTokens ' + JSON.stringify(data.featureDropTokens))
        this.textSprite.alpha = 0
        this.currentMegawaysNum = 1
        this.textSprite.removeChild(this.megawaysTextNum)
        this.megawaysTextNum = null
        RheelConfig.RheelUtils.scatterIndex = 0
        this.scatterMode = this.getScattersCount(data.symbols) == 2
        this.multiplierMode = false
        this.currentMultiplier = 1
        this.currentData = data
        for (let index = 0; index < this.rheels.length; index++) {
            const element = this.rheels[index];
            var fd = null
            if (data.featureDropTokens) {
                if (data.featureDropTokens.x == index + 1) {
                    fd = data.featureDropTokens
                }
            }
            element.animateTo(
                this.currentData.symbols[index],
                this.currentData.reelHeights[index],
                fd)
        }
        if (this.horizontalRheel != null) {
            this.horizontalRheel.animateTo(this.currentData.secondaryReel);
        }
    }


    getScattersCount(symbols) {
        var sccnt = 0
        for (let index = 0; index < symbols.length; index++) {
            const element = symbols[index];
            for (let k = 0; k < element.length; k++) {
                const sym = element[k];
                if (sym == 'SC') {
                    sccnt++
                }
            }
        }

        return sccnt
    }

    animationFinished(_rheel) {
        if (_rheel.name === ("Rheel_" + (this.rheels.length - 2))) {
            console.log('this.horizontalRheel.finishAnimation ' + this.multiplierMode)
            this.horizontalRheel.finishAnimation(this.currentData.secondaryReel);
        }

        if (_rheel.name === ("horizontalRheel")) {
            console.log('all spin finished')
            var offsetTime = 10
            if (this.currentData.featureDropTokens) {
                var icon = null
                for (let index = 0; index < this.rheels.length; index++) {
                    if (icon == null) {
                        const element = this.rheels[index];
                        icon = element.dropFeature()
                    }

                }
                offsetTime = 2500
                if (this.parent_obj.eventHandler) {
                    this.parent_obj.eventHandler('featuredrop', icon)
                }
            }

            if (this.parent_obj.eventHandler) {
                this.parent_obj.eventHandler('respinfinished', this.currentData)
            }
            setTimeout(function () {
                if (this.currentData.respins != null) {
                    if (this.currentData.respins.length > 0) {
                        this.currentRespinIndex = 0
                        this.respin()
                    } else {
                        this.spinFinished()
                    }
                } else {
                    this.spinFinished()
                }
            }.bind(this), offsetTime);
        } else {
            //this.currentData
            this.textSprite.alpha = 1
            var cdatalen = _rheel.currentData.length
            if (_rheel.rheelIndex > 1 && _rheel.rheelIndex < 6) {
                cdatalen += 1
            }
            this.currentMegawaysNum = this.currentMegawaysNum * cdatalen
            if (this.megawaysTextNum) {
                this.textSprite.removeChild(this.megawaysTextNum)
            }

            this.megawaysTextNum = new PIXI.BitmapText("" + this.currentMegawaysNum,
                {
                    fontName: window.Lang.default['LIB_MEGAWAYS'].fontFamily,
                    align: 'center',
                    fontSize: 53

                });
            this.megawaysTextNum.anchor.set(0.5, 0.5);
            this.megawaysTextNum.x = 100
            this.megawaysTextNum.y = 25
            this.textSprite.addChild(this.megawaysTextNum)
        }

    }

    spinFinished() {
        window.SoundManager.play({ name: "Cart123", loop: false, volume: 0.2 })
        this.parent_obj.spinFinished()
        if (this.currentSound) {
            this.currentSound.fadeOut(1000)
            this.currentSound = null
        }
    }


    respinFinished(_rheel) {

        window.SoundManager.play({ name: "Cart123", loop: false, volume: 0.2 })
        this.rheelsAnimated++
        if (this.rheelsAnimated === (this.currentData.symbols.length + 1)) {
            console.log('all respinFinished finished')
            if (this.currentData.respins != null && this.currentData.respins.length > 0) {
                this.currentRespinIndex++
                if (this.currentRespinIndex < this.currentData.respins.length) {
                    if (this.parent_obj.eventHandler) {
                        this.parent_obj.eventHandler('respinfinished', this.currentData.respins[this.currentRespinIndex])
                    }
                    this.respin()
                } else {
                    this.spinFinished()
                }
            }
        }

        


    }

    respin() {
        this.rheelsAnimated = 0
        var respinData = this.currentData.respins[this.currentRespinIndex]
        if (this.scatterMode && !this.bonusMode) {
            setTimeout(function () {
                window.SoundManager.mute()
                var snd = window.SoundManager.play({ name: "AnticipationB", loop: false, volume: 1 })
                setTimeout(function () {
                    window.SoundManager.unMute()
                    window.SoundManager.soundCompleted(snd)
                }.bind(this), 2200);
            }.bind(this), 1000);

        }
        console.dir(respinData)
        var lockedSymbols = []
        lockedSymbols.push(respinData.lockedSymbols[1][respinData.lockedSymbols[1].length - 1])
        lockedSymbols.push(respinData.lockedSymbols[2][respinData.lockedSymbols[2].length - 1])
        lockedSymbols.push(respinData.lockedSymbols[3][respinData.lockedSymbols[3].length - 1])
        lockedSymbols.push(respinData.lockedSymbols[4][respinData.lockedSymbols[4].length - 1])
        this.horizontalRheel.respinTo(respinData.secondaryReel, lockedSymbols)
        if (respinData.multiplier > 1) {
            if (respinData.multiplier > this.currentMultiplier) {
                this.currentMultiplier = respinData.multiplier
                this.multiplierMode = true
                this.addMultiplierAnimation()
            }
        }
        for (let index = 0; index < this.rheels.length; index++) {
            const element = this.rheels[index];
            element.respinTo(respinData.symbols[index], respinData.reelHeights[index], respinData.lockedSymbols[index])
        }

        if (!this.bonusMode) {
            window.SoundManager.play({ name: "Bang" + parseInt(Math.random() * 4), loop: false })
        } else {
            var spinwin = this.getWin(respinData);
            console.log('spinwin '+spinwin)
            if (100 <= spinwin) {
                window.SoundManager.play({ name: "Bang10", loop: false })
            } else if (50 <= spinwin) {
                window.SoundManager.play({ name: "Bang9", loop: false })
            } else if (25 <= spinwin) {
                window.SoundManager.play({ name: "Bang8", loop: false })
            } else if (15 <= spinwin) {
                window.SoundManager.play({ name: "Bang7", loop: false })
            } if (10 <= spinwin) {
                window.SoundManager.play({ name: "Bang6", loop: false })
            } else if (5 <= spinwin) {
                window.SoundManager.play({ name: "Bang5", loop: false })
            } else if (3 <= spinwin) {
                window.SoundManager.play({ name: "Bang4", loop: false })
            } else if (2 <= spinwin) {
                window.SoundManager.play({ name: "Bang3", loop: false })
            } else if (1 <= spinwin) {
                window.SoundManager.play({ name: "Bang2", loop: false })
            } else {
                window.SoundManager.play({ name: "Bang1", loop: false })
            }
        }
    }

    addMultiplierAnimation() {
        var xwin = new XWin()
        xwin.build(this, this.currentMultiplier)
        xwin.x = 0
        xwin.y = 0
        this.xwinHolder.addChild(xwin)
    }

    eventHandler(eventtype, caller) {
        if (this.parent_obj.eventHandler) {
            this.parent_obj.eventHandler(eventtype, caller)
        }
    }

    getWin(data) {
        if (data.winnings.length == 0) {
            return 0
        }

        var win = 0
        for (let index = 0; index < data.winnings.length; index++) {
            win = win + data.winnings[index][2]
        }
        return win
    }


}


export default DynamicSizeRheelHolder;

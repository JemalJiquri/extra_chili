
import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import RheelConfig from './RheelConfig'
import WinNumber from './WinNumber'
import WinCoinsHolder from './WinCoinsHolder'

class WinHolder extends PIXI.Sprite {
    winType = 0
    winTime = 0

    winAmount = 0
    winCoeff = 0
    active = true
    numbersHolder = null
    effectsHolder = null

    winNumbers = []
    winCoins = null
    currentSound = null
    currentWinType = 0
    currentWinText = null
    currentWinTextString = ''
    currentGodRays = null
    black = null

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


    build(_win, coeff, _black) {
        this.black = _black
        for (let index = 0; index < RheelConfig.RheelUtils.winMultipliers.length; index++) {
            if (coeff > RheelConfig.RheelUtils.winMultipliers[index]) {
                this.winType = index
            }

        }
        this.winTime = RheelConfig.RheelUtils.winmAnimTimes[this.winType] - (this.winType > 5 ? 1500 : 1000) * 2
        this.winAmount = _win
        this.winCoeff = coeff
        console.log(`this.winType ${this.winType}, this.coeff ${coeff}, this.winTime ${this.winTime}`)


        switch (this.winType) {
            case 0://mega
                this.currentSound = window.SoundManager.play({ name: "Win0", loop: false })
                break;
            case 1:
                this.currentSound = window.SoundManager.play({ name: "Win1", loop: false })
                break;
            case 2:
                this.currentSound = window.SoundManager.play({ name: "Win2", loop: false })
                break;
            case 3:
                this.currentSound = window.SoundManager.play({ name: "Win3", loop: false })
                break;
            case 4:
                this.currentSound = window.SoundManager.play({ name: "Win4", loop: false })
                break;
            case 5:
                this.currentSound = window.SoundManager.play({ name: "Win5", loop: false })
                break;
            case 6:
                this.currentSound = window.SoundManager.play({ name: "BigWin0", loop: false })
                break;
            case 7:
                this.currentSound = window.SoundManager.play({ name: "BigWin1", loop: false })
                break;
            case 8:
                this.currentSound = window.SoundManager.play({ name: "BigWin2", loop: false })
                break;
            case 9:
                this.currentSound = window.SoundManager.play({ name: "BigWin3", loop: false })
                break;
            case 10:
                this.currentSound = window.SoundManager.play({ name: "BigWin4", loop: false })
                break;
            case 11:
                this.currentSound = window.SoundManager.play({ name: "BigWin5", loop: false })
                break;
            default:
                break;
        }

        if (this.winType == 0) {
            return
        }



        setTimeout(function () {
            this.effectsHolder = new PIXI.Sprite()
            this.addChild(this.effectsHolder)

            this.winCoins = new WinCoinsHolder()
            this.winCoins.build(this.winType, this.winTime)
            this.effectsHolder.addChild(this.winCoins)


            this.numbersHolder = new PIXI.Sprite()
            this.numbersHolder.y = -270
            this.numbersHolder.alpha = 0
            this.addChild(this.numbersHolder)
            this.setNumbers(_win, 0, 0)

            var twObj = { progress: 0 }
            new TWEEN.Tween(twObj)
                .to({ progress: 1 }, this.winTime)
                .easing(TWEEN.Easing.Linear.None)
                .delay(1000)
                .onUpdate(function () {
                    this.setNumbers(parseInt(twObj.progress * _win), twObj.progress * this.winCoeff, twObj.progress < 0.95)
                }.bind(this))
                .onStart(function () {
                    this.numbersHolder.alpha = 1
                }.bind(this))
                .onComplete(function () {
                    this.setNumbers(this.winAmount, this.winCoeff, false)
                    //this.currentGodRays this.winCoins this.currentWinText
                    if (this.currentGodRays) {
                        new TWEEN.Tween(this.currentGodRays)
                            .to({ alpha: 0 }, 300)
                            .delay(200)
                            .easing(TWEEN.Easing.Linear.None)
                            .start()
                    }
                    if (this.currentWinText) {
                        new TWEEN.Tween(this.currentWinText)
                            .to({ alpha: 0 }, 300)
                            .delay(200)
                            .easing(TWEEN.Easing.Linear.None)
                            .start()
                    }
                    new TWEEN.Tween(this.black)
                        .to({ alpha: 0 }, 100)
                        .delay(100)
                        .easing(TWEEN.Easing.Linear.None)
                        .start()

                    new TWEEN.Tween(this.numbersHolder)
                        .to({ alpha: 0 }, 300)
                        .delay(200)
                        .easing(TWEEN.Easing.Linear.None)
                        .onComplete(function () {
                            setTimeout(function () {
                                if (!this.active) {
                                    return
                                }
                                this.parent.removeChild(this)
                                this.black.parent.removeChild(this.black)
                                if (this.currentSound) {
                                    this.currentSound.fadeOut(300)
                                }
                            }.bind(this), 3000);
                        }.bind(this))
                        .start()
                }.bind(this)).start()
        }.bind(this), this.winType > 5 ? 1500 : 0);


    }

    remove() {
        if (!this.active) {
            return
        }
        this.active = false

        new TWEEN.Tween(this)
            .to({ alpha: 0 }, 100)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                if (this.parent) {
                    this.parent.removeChild(this)
                }

                if (this.currentSound) {
                    this.currentSound.fadeOut(300)
                }
                if (this.black.parent) {
                    this.black.parent.removeChild(this.black)
                }

            }.bind(this))
            .start()
    }


    //GodRays_01/Godrays_01_00001
    addWinText(_coeff) {
        if (!this.active) {
            return
        }
        var winType = 0
        for (let index = 0; index < RheelConfig.RheelUtils.winMultipliers.length; index++) {
            if (_coeff > RheelConfig.RheelUtils.winMultipliers[index]) {
                winType = index
            }

        }

        if (winType > 5) {
            if (this.currentWinType != winType) {

                this.currentWinType = winType


                var text = "LIB_EPIC_WIN"
                if (winType < RheelConfig.RheelUtils.winTexts.length) {
                    text = RheelConfig.RheelUtils.winTexts[winType]
                }
                console.log(`text = ${text}`)

                if (this.currentGodRays == null) {
                    this.currentGodRays = RheelConfig.RheelUtils.getAnimatedSprite(`GodRays_01/Godrays_01_%frame%`, 0, 13)
                    this.currentGodRays.gotoAndPlay(0)
                    this.currentGodRays.loop = true
                    this.currentGodRays.blendMode = PIXI.BLEND_MODES.ADD
                    this.currentGodRays.animationSpeed = .44
                    this.currentGodRays.y = -340;
                    this.currentGodRays.anchor.set(0.5, 0.5);
                    this.currentGodRays.scale.x = this.currentGodRays.scale.y = 4
                    this.effectsHolder.addChild(this.currentGodRays)
                    this.effectsHolder.addChild(this.winCoins)
                }
                if (this.currentWinTextString != text) {
                    this.currentWinTextString = text

                    if (this.currentWinText != null) {
                        var ctext = this.currentWinText
                        new TWEEN.Tween(ctext)
                            .to({ alpha: 0 }, 100)
                            .delay(0)
                            .easing(TWEEN.Easing.Linear.None)
                            .onComplete(function () {
                                this.effectsHolder.removeChild(ctext)
                            }.bind(this))
                            .start()

                        new TWEEN.Tween(this.black)
                            .to({ alpha: 0.2 }, 100)
                            .delay(0)
                            .easing(TWEEN.Easing.Linear.None)
                            .start()
                    }
                    this.currentWinText = new PIXI.BitmapText(window.Lang.default[text].str,
                        {
                            fontName: window.Lang.default[text].fontFamily,
                            align: 'center',
                            fontSize: 170

                        });
                    this.currentWinText.x = -this.currentWinText.textWidth / 2;
                    this.currentWinText.y = -540;
                    this.effectsHolder.addChild(this.currentWinText)
                    this.currentWinText.alpha = 0
                    new TWEEN.Tween(this.currentWinText)
                        .to({ alpha: 1 }, 100)
                        .delay(100)
                        .easing(TWEEN.Easing.Linear.None)
                        .start()
                    new TWEEN.Tween(this.black)
                        .to({ alpha: 0.4 }, 100)
                        .delay(100)
                        .easing(TWEEN.Easing.Linear.None)
                        .start()
                }

            }
        }
    }


    setNumbers(_win, _coeff, _changeTxt) {
        if (!this.active) {
            return
        }
        while (this.numbersHolder.children[0]) {
            this.numbersHolder.removeChild(this.numbersHolder.children[0]);
        }
        var wstr = ("" + _win)
        while (wstr.length < 3) {
            wstr = "0" + wstr
        }
        if (wstr.length >= 3) {
            var position = wstr.length - 2;
            wstr = [wstr.slice(0, position), 'd', wstr.slice(position)].join('');
        }


        //WinNumber
        var currentX = 0;
        for (let index = 0; index < wstr.length; index++) {
            var number = wstr.charAt(index)
            var digit = new WinNumber()
            digit.build(this.WIN_NUMBERS[number], 0.5)
            if (number == 'd') {
                digit.x = currentX - digit.getWidth() / 4
                currentX = currentX + digit.getWidth() / 2
            } else {
                digit.x = currentX
                currentX = currentX + digit.getWidth()
            }

            this.numbersHolder.addChild(digit)
        }
        if (_changeTxt) {
            this.addWinText(_coeff)
        }

        this.numbersHolder.x = -currentX / 2 + 60
        // console.log(_win + " " + wstr.length + " " + wstr + " " + this.numbersHolder.width) 342

    }





}


export default WinHolder;

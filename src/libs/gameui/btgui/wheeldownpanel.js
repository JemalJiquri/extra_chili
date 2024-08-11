import * as PIXI from 'pixi.js'
import BTGButton from "./btgbutton"
import BTGUIConstants from "./constants"
import TWEEN from '@tweenjs/tween.js';

class WheelDownPanel extends PIXI.Sprite {
    callback_function = null
    bg = null
    gambleBtn = null
    collectBtn = null
    buttonsHolder = null
    singleButtonHolder = null
    button1ActiveBG = null
    button2ActiveBG = null

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }



        this.dwnPanel = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_Panel_02"));
        this.dwnPanel.x = 0
        this.dwnPanel.y = 0
        this.addChild(this.dwnPanel)

        this.buttonsHolder = new PIXI.Sprite()
        this.buttonsHolder.x = 170
        this.buttonsHolder.y = 32
        this.addChild(this.buttonsHolder)


        this.singleButtonHolder = new PIXI.Sprite()
        this.singleButtonHolder.x = 170
        this.singleButtonHolder.y = 32
        this.addChild(this.singleButtonHolder)

        //WHEEL_GAMBLE WHEEL_COLLECT
        this.gambleBtn = new BTGButton()
        this.gambleBtn.init({
            bg: { data: 'ExtraChilliScreen/ECS_Button_A', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'ExtraChilliScreen/ECS_Button_A_Pressed', alpha: 0, x: 0, y: 0 },
            text: window.Lang.default['GAMBLE'],
            callback_function: this.spinClicked.bind(this)
        })
        this.gambleBtn.name = BTGUIConstants.WHEEL_GAMBLE
        this.addChild(this.gambleBtn)
        this.gambleBtn.x = 17
        this.gambleBtn.y = 17


        this.collectBtn = new BTGButton()
        this.collectBtn.init({
            bg: { data: 'ExtraChilliScreen/ECS_Button_A', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'ExtraChilliScreen/ECS_Button_A_Pressed', alpha: 0, x: 0, y: 0 },
            text: window.Lang.default['COLLECT'],
            callback_function: this.spinClicked.bind(this)
        })
        this.collectBtn.name = BTGUIConstants.WHEEL_COLLECT
        this.addChild(this.collectBtn)
        this.collectBtn.x = 497
        this.collectBtn.y = 17

        this.startSpinBtnAnimation()
    }

    setGambleMode(mode) {
        if (mode) {
            new TWEEN.Tween(this.gambleBtn)
                .to({ alpha: 0 }, 100)
                .easing(TWEEN.Easing.Linear.None)
                .start()
            new TWEEN.Tween(this.collectBtn)
                .to({ alpha: 0 }, 100)
                .easing(TWEEN.Easing.Linear.None)
                .start()
            new TWEEN.Tween(this.singleButtonHolder)
                .to({ alpha: 0 }, 100)
                .easing(TWEEN.Easing.Linear.None)
                .start()
            new TWEEN.Tween(this.buttonsHolder)
                .to({ x: 232 }, 100)
                .delay(100)
                .easing(TWEEN.Easing.Linear.None)
                .start()
        } else {
            this.gambleBtn.alpha = 1
            this.collectBtn.alpha = 1
            this.singleButtonHolder.alpha = 1
            this.buttonsHolder.x = 170
        }

    }

    setActiveMode(b1, b2) {
        this.button1ActiveBG.alpha = b1
        this.button2ActiveBG.alpha = b2
    }

    createButtons(num1, num2, num3) {
        var b1data = this.getButtonDataForPos(num1, 0)
        console.log(b1data)

        var b2data = this.getButtonDataForPos(num2, 1)
        console.log(b2data)

        var b3data = this.getButtonDataForPos(num3, 2)
        console.log(b3data)


        var but1_numbg = PIXI.Sprite.from(PIXI.Texture.from(b1data[0]));
        but1_numbg.x = 0
        but1_numbg.y = 2
        but1_numbg.width = 120
        but1_numbg.height = 100
        this.buttonsHolder.addChild(but1_numbg)


        var but2_numbg = PIXI.Sprite.from(PIXI.Texture.from(b2data[0]));
        but2_numbg.x = 110
        but2_numbg.y = 2
        but2_numbg.width = 120
        but2_numbg.height = 100
        this.buttonsHolder.addChild(but2_numbg)


        this.button1ActiveBG = PIXI.Sprite.from(PIXI.Texture.from(b1data[2]));
        this.button1ActiveBG.x = 0
        this.button1ActiveBG.y = 2
        this.button1ActiveBG.width = 120
        this.button1ActiveBG.height = 100
        this.button1ActiveBG.alpha = 0
        this.buttonsHolder.addChild(this.button1ActiveBG)

        this.button2ActiveBG = PIXI.Sprite.from(PIXI.Texture.from(b2data[2]));
        this.button2ActiveBG.x = 110
        this.button2ActiveBG.y = 2
        this.button2ActiveBG.width = 120
        this.button2ActiveBG.height = 100
        this.button2ActiveBG.alpha = 0
        this.buttonsHolder.addChild(this.button2ActiveBG)


        var but3_numbg = PIXI.Sprite.from(PIXI.Texture.from(b3data[0]));
        but3_numbg.x = 240
        but3_numbg.y = 2
        but3_numbg.width = 120
        but3_numbg.height = 100
        this.singleButtonHolder.addChild(but3_numbg)


        var but1_num = PIXI.Sprite.from(PIXI.Texture.from(b1data[1]));
        but1_num.x = 20
        but1_num.y = 8
        but1_num.scale.x = but1_num.scale.y = 0.45
        this.buttonsHolder.addChild(but1_num)


        var but2_num = PIXI.Sprite.from(PIXI.Texture.from(b2data[1]));
        but2_num.x = 145
        but2_num.y = 8
        but2_num.scale.x = but2_num.scale.y = 0.45
        this.buttonsHolder.addChild(but2_num)

        var but3_num = PIXI.Sprite.from(PIXI.Texture.from(b3data[1]));
        but3_num.x = 255
        but3_num.y = 8
        but3_num.scale.x = but3_num.scale.y = 0.45
        this.singleButtonHolder.addChild(but3_num)


        var but1 = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/GlassLosange_01"));
        but1.x = 0
        but1.y = 0
        this.buttonsHolder.addChild(but1)

        var but2 = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/GlassLosange_01"));
        but2.x = but1.x + but1.width
        but2.y = 0
        this.singleButtonHolder.addChild(but2)
    }

    getButtonDataForPos(button, pos) {
        var firstbg = ""
        var firstfg = ""
        var firstactive = ""
        switch (button) {
            case 0:
                firstbg = "ExtraChilliScreen/GambleSlot_Black"
                firstactive = "ExtraChilliScreen/GambleSlot_Black_Active"
                firstfg = "ExtraChilliScreen/NUM_Black_0"
                break;
            case 8:
                firstbg = "ExtraChilliScreen/GambleSlot_Black"
                firstactive = "ExtraChilliScreen/GambleSlot_Black_Active"
                firstfg = "ExtraChilliScreen/NUM_Green_8"
                break;
            case 12:
                firstbg = "ExtraChilliScreen/GambleSlot_Black"
                firstactive = "ExtraChilliScreen/GambleSlot_Black_Active"
                firstfg = "ExtraChilliScreen/NUM_Green_12"
                break;
            case 16:
                firstbg = "ExtraChilliScreen/GambleSlot_Black"
                firstactive = "ExtraChilliScreen/GambleSlot_Black_Active"
                firstfg = "ExtraChilliScreen/NUM_Blue_16"
                break;
            case 20:
                firstbg = "ExtraChilliScreen/GambleSlot_Black"
                firstactive = "ExtraChilliScreen/GambleSlot_Black_Active"
                firstfg = "ExtraChilliScreen/NUM_Red_20"
                break;
            case 24:
                firstbg = "ExtraChilliScreen/GambleSlot_Black"
                firstactive = "ExtraChilliScreen/GambleSlot_Black_Active"
                firstfg = "ExtraChilliScreen/NUM_Purple_24"
                break;
            case 28:
                firstbg = "ExtraChilliScreen/GambleSlot_Black"
                firstactive = "ExtraChilliScreen/GambleSlot_Black_Active"
                firstfg = "ExtraChilliScreen/NUM_Purple_28"
                break;
            default:
                break;
        }

        return [firstbg, firstfg, firstactive]
    }

    setMode(mode) {
        console.log('down panel setmode ' + mode)

        while (this.buttonsHolder.children[0]) {
            this.buttonsHolder.removeChild(this.buttonsHolder.children[0]);
        }
        while (this.singleButtonHolder.children[0]) {
            this.singleButtonHolder.removeChild(this.singleButtonHolder.children[0]);
        }

        switch (mode) {
            case 8:
                this.createButtons(12, 0, 8)
                break;
            case 12:
                this.createButtons(16, 0, 12)
                break;
            case 16:
                this.createButtons(20, 8, 16)
                break;
            case 20:
                this.createButtons(24, 12, 20)
                break;
            case 24:
                this.createButtons(28, 16, 24)
                break;
            default:
                break;
        }
    }

    spinClicked(obj) {
        this.resetSpinBtnAnimation()
        if (this.callback_function) {
            this.callback_function(obj)
        }
    }

    spinBtnAnimationTomeout = 0
    spinBtnAnimationInterval = 0
    tweenArr1 = null
    tweenArr2 = null

    resetSpinBtnAnimation() {
        clearTimeout(this.spinBtnAnimationTomeout)
        clearInterval(this.spinBtnAnimationInterval)
        if (this.tweenArr1) {
            this.tweenArr1.stop()
        }
        if (this.tweenArr2) {
            this.tweenArr2.stop()
        }
    }

    startSpinBtnAnimation() {
        clearTimeout(this.spinBtnAnimationTomeout)
        clearInterval(this.spinBtnAnimationInterval)
        this.spinBtnAnimationTomeout = setTimeout(function () {
            this.spinBtnAnimationInterval = setInterval(function () {
                this.tweenArr1 = new TWEEN.Tween(this.collectBtn.pressed)
                    .to({ alpha: 1 }, 100)
                    .delay(0)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        new TWEEN.Tween(this.collectBtn.pressed)
                            .to({ alpha: 0 }, 100)
                            .delay(500)
                            .easing(TWEEN.Easing.Linear.None)
                            .start()
                    }.bind(this)).start()

                this.tweenArr2 = new TWEEN.Tween(this.gambleBtn.pressed)
                    .to({ alpha: 1 }, 100)
                    .delay(1500)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        new TWEEN.Tween(this.gambleBtn.pressed)
                            .to({ alpha: 0 }, 100)
                            .delay(500)
                            .easing(TWEEN.Easing.Linear.None)
                            .start()
                    }.bind(this)).start()


            }.bind(this), 3000);
        }.bind(this), 3000);
    }


    get_size() {
        if (this.bg) {
            return { width: this.bg.width, height: this.bg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default WheelDownPanel;

import * as PIXI from 'pixi.js'
import BTGButton from "../btgui/btgbutton"
import BTGUIConstants from "../btgui/constants"
import MainPopup from "../btgui/mainpopup"
import TWEEN from '@tweenjs/tween.js';


class autoPage extends MainPopup {
    callback_function = null
    bg = null
    bgbaners = null
    NumberOfSpins = null
    LossLimit = null
    SingleWinLimit = null
    leftBtn = null
    raightBtn = null
    paysBtn = null
    activbullet = null
    bulletArr = []

    funValue = 50


    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.createBg()
        this.createTexts()
        this.createBtns()

    }

    createBtns() {
        this.spinautoButton = new BTGButton()
        this.spinautoButton.init({
            bg: { data: 'ExtraChilliScreen/ECS_Button_A', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['AUTOSTART'],
            callback_function: this.buttonClicked.bind(this)
        })
        this.spinautoButton.name = BTGUIConstants.AUTO_START
        this.spinautoButton.x = 730;
        this.spinautoButton.y = 470;
        this.addChild(this.spinautoButton)
        this.createCosesBtns(620, 160, BTGUIConstants.AUTO_NUM_SPINS_PLUS, BTGUIConstants.AUTO_NUM_SPINS_MINUS)
        this.createCosesBtns(620, 317, BTGUIConstants.AUTO_LOSS_PLUS, BTGUIConstants.AUTO_LOSS_MINUS)
        this.createCosesBtns(620, 384, BTGUIConstants.AUTO_WIN_PLUS, BTGUIConstants.AUTO_WIN_MINUS)
        this.createCosesTexts()

    }

    createCosesBtns(x, y, plus, minus) {
        var barBg = null
        barBg = PIXI.Sprite.from(PIXI.Texture.from("Menu/Panel_03"));
        barBg.x = x + 20
        barBg.y = y
        barBg.scale.x = 1.8
        barBg.scale.y = 1.3
        this.addChild(barBg)

        var barPlusBtn = null
        var barMinusBtn = null

        barMinusBtn = new BTGButton()
        barMinusBtn.init({
            bg: { data: 'Menu/BUT_Minus_01', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'Menu/BUT_Minus_01_Pressed', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this)

        })
        barMinusBtn.x = x - 30
        barMinusBtn.y = y
        barMinusBtn.scale.x = 1.3
        barMinusBtn.scale.y = 1.3
        barMinusBtn.name = minus
        this.addChild(barMinusBtn)

        barPlusBtn = new BTGButton()
        barPlusBtn.init({
            bg: { data: 'Menu/BUT_Plus_01', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'Menu/BUT_Plus_01_Pressed', alpha: 0, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this)

        })
        barPlusBtn.x = x + 230
        barPlusBtn.y = y
        barPlusBtn.scale.x = 1.3
        barPlusBtn.scale.y = 1.3
        barPlusBtn.name = plus
        this.addChild(barPlusBtn)

    }

    createCosesTexts() {
        // NumberOfSpins
        this.NumberOfSpins = new PIXI.Text(window.Lang.default['AUTOPLEASESET'].str, window.Lang.default['AUTOPLEASESET']);
        this.NumberOfSpins.anchor.set(0.5, 0.5);
        this.NumberOfSpins.position.set(750, 190);
        this.addChild(this.NumberOfSpins)
        // this.NumberOfSpins.text = window.Lang.default['AUTONOS'].str.replace("%d", 5)

        this.LossLimit = new PIXI.Text(window.Lang.default['AUTOPLEASESET'].str, window.Lang.default['AUTOPLEASESET']);
        this.LossLimit.anchor.set(0.5, 0.5);
        this.LossLimit.position.set(750, 347);
        this.addChild(this.LossLimit)

        this.SingleWinLimit = new PIXI.Text(window.Lang.default['AUTOLL'].str, window.Lang.default['AUTOLL']);
        this.SingleWinLimit.anchor.set(0.5, 0.5);
        this.SingleWinLimit.position.set(750, 414);
        this.addChild(this.SingleWinLimit)
        let wl = window.SETTINGS.CurrencyBets[window.SETTINGS.CurrencyBetIndex]
        this.SingleWinLimit.text = window.Lang.default['AUTOLL'].str.replace("%d", wl).replace("%c", window.SETTINGS.Currency)
        // window.Lang.default['AUTOLL'].str.replace("%d", value).replace("%c", curr)
        //win: [10, 50, 100, 500, 1000],
        // this.LossLimit.text = window.Lang.default['AUTONOS'].str.replace("%d", 5)


    }


    createTexts() {
        var soundText = null
        soundText = new PIXI.Text(window.Lang.default['MENUAUTOTEXTA'].str, window.Lang.default['MENUAUTOTEXTA']);
        soundText.anchor.set(0, 0.5);
        soundText.position.set(100, 190);
        this.addChild(soundText)

        soundText = new PIXI.Text(window.Lang.default['MENUAUTOTEXTB'].str, window.Lang.default['MENUAUTOTEXTB']);
        soundText.anchor.set(0, 0.5);
        soundText.position.set(100, 250);
        this.addChild(soundText)

        soundText = new PIXI.Text(window.Lang.default['MENUAUTOTEXTC'].str, window.Lang.default['MENUAUTOTEXTC']);
        soundText.anchor.set(0, 0.5);
        soundText.position.set(100, 350);
        this.addChild(soundText)

        soundText = new PIXI.Text(window.Lang.default['MENUAUTOTEXTD'].str, window.Lang.default['MENUAUTOTEXTD']);
        soundText.anchor.set(0, 0.5);
        soundText.position.set(100, 415);
        this.addChild(soundText)

        soundText = new PIXI.Text(window.Lang.default['MENUAUTOTEXTE'].str, window.Lang.default['MENUAUTOTEXTE']);
        soundText.anchor.set(0, 0.5);
        soundText.position.set(100, 480);
        this.addChild(soundText)
    }


    createBg() {

        this.bgbaners = PIXI.Sprite.from(PIXI.Texture.from("Menu/Panel_04"));
        this.bgbaners.x = 76
        this.bgbaners.y = 156
        this.bgbaners.scale.x = 1.31
        this.bgbaners.scale.y = 9.05
        this.addChild(this.bgbaners)

        this.bgbaners = PIXI.Sprite.from(PIXI.Texture.from("Menu/Panel_02"));
        this.bgbaners.x = 76
        this.bgbaners.y = 156
        this.bgbaners.scale.x = 1.31
        this.bgbaners.scale.y = 1.31
        this.addChild(this.bgbaners)

        this.bgbaners = PIXI.Sprite.from(PIXI.Texture.from("Menu/Panel_02"));
        this.bgbaners.x = 76
        this.bgbaners.y = 315
        this.bgbaners.scale.x = 1.31
        this.bgbaners.scale.y = 1.31
        this.addChild(this.bgbaners)

        this.bgbaners = PIXI.Sprite.from(PIXI.Texture.from("Menu/Panel_02"));
        this.bgbaners.x = 76
        this.bgbaners.y = 380
        this.bgbaners.scale.x = 1.31
        this.bgbaners.scale.y = 1.31
        this.addChild(this.bgbaners)

    }
    blinkStartButton(){
        new TWEEN.Tween(this.spinautoButton)
            .to({ alpha: 0.8 }, 150)
            .easing(TWEEN.Easing.Linear.None)
            .delay(0)
            .onComplete(function () {
                new TWEEN.Tween(this.spinautoButton)
                .to({ alpha: 1 }, 150)
                .easing(TWEEN.Easing.Linear.None)
                .delay(0)
                .start()
            }.bind(this)).start()
    }

    buttonClicked(obj) {
        this.callback_function(obj)
    }

    errorNumberOfSpinsText() {
        this.NumberOfSpins.style.fill = '#ff985c'
        setTimeout(function () {
            this.NumberOfSpins.style.fill = '#ffffff'
        }.bind(this), 1000);
    }

    errorLossLimitText() {
        this.LossLimit.style.fill = '#ff985c'
        setTimeout(function () {
            this.LossLimit.style.fill = '#ffffff'
        }.bind(this), 1000);
    }

    changeNumberOfSpinsText(value) {
        if (value < 0) {
            this.NumberOfSpins.text = window.Lang.default['AUTOPLEASESET'].str
            return
        }
        this.NumberOfSpins.text = window.Lang.default['AUTONOS'].str.replace("%d", value)
    }

    changeLossLimitText(value, curr) {
        if (value < 0) {
            this.LossLimit.text = window.Lang.default['AUTOPLEASESET'].str
            return
        }
        this.LossLimit.text = window.Lang.default['AUTOLL'].str.replace("%d", value).replace("%c", curr)
    }

    changeSingleWinLimitText(value, curr) {
        this.SingleWinLimit.text = window.Lang.default['AUTOLL'].str.replace("%d", value).replace("%c", curr)
        if(this.SingleWinLimit.text.length<=7){
            this.SingleWinLimit.scale.set(1,1)
        }else if(this.SingleWinLimit.text.length>7){
            this.SingleWinLimit.scale.set(0.8,0.8)
        }
        
    }


    get_size() {
        if (this.bg) {
            return { width: this.bg.width, height: this.bg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default autoPage;

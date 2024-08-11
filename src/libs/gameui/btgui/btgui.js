import * as PIXI from 'pixi.js'
import BTGButton from "./btgbutton"
import FeatureDrop from "./featuredrop"
import Changebet from "./changebet"
import BuyBonus from "./buybonus"
import MenuPopup from "../menu/menupopup"
import FreeSpinWindow from "./freespinwindow"
import FreeSpinWheel from "./freespinwheel"
import BTGUIConstants from "./constants"
import BonusFinalPopup from "./bonusfinalpopup"
import Startbaner from './startbaner'
import MessageWindow from './messagewindow'
import TWEEN from '@tweenjs/tween.js';


//import DownPanel from './downpanel'

//git add . && git commit -m "fixes" && git push -u origin main

//git add . ; git commit -m "fixes" ; git push -u origin main
class BtgUI extends PIXI.Sprite {


    logo = null
    spinautoButton = null
    spinautoStopButton = null
    menuButton = null
    spinButton = null
    parent_obj = null
    fetureDrop = null
    buyBonus = null
    menu = null
    changeBetBtn = null
    freeSpinWindow = null
    freeSpinWheel = null
    bonusFinalWindow = null
    buttonsHolder = null
    //downPanel = null
    logoImg = null
    autoMode = false
    init(_parent) {

        this.buttonsHolder = new PIXI.Sprite()
        this.addChild(this.buttonsHolder)
        this.parent_obj = _parent
        this.spinButton = new BTGButton()
        this.spinButton.init({
            bg: { data: 'UI/UI_BUT_A_BG_01', alpha: 0, x: 0, y: 0 },
            bg2: { data: 'UI/UI_BUT_A_BG_03', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'UI/UI_BUT_A_BG_03_Pressed', alpha: 0, x: 0, y: 0 },
            icon: { data: 'UI/UI_BUT_A_Spin', alpha: 1, x: 0, y: 0 },
            fg: { data: 'UI/UI_BUT_A', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this)
        })
        this.spinButton.name = BTGUIConstants.SPIN
        this.buttonsHolder.addChild(this.spinButton)

        this.spinautoButton = new BTGButton()
        this.spinautoButton.init({
            bg: { data: 'UI/UI_BUT_D_BG_03', alpha: 1, x: 0, y: 0 },
            // bg2: { data: 'UI/UI_BUT_A_BG_03', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'UI/UI_BUT_D_BG_03_Pressed', alpha: 0, x: 0, y: 0 },
            icon: { data: 'UI/UI_BUT_D_Autoplay', alpha: 1, x: 0, y: 0 },
            fg: { data: 'UI/UI_BUT_D', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this),
        })
        this.spinautoButton.name = BTGUIConstants.AUTO_SPIN
        this.buttonsHolder.addChild(this.spinautoButton)

        this.spinautoStopButton = new BTGButton()
        this.spinautoStopButton.init({
            bg: { data: 'UI/UI_BUT_A_BG_05', alpha: 1, x: 0, y: 0 },
            // bg2: { data: 'UI/UI_BUT_A_BG_03', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'UI/UI_BUT_A_BG_05_Pressed', alpha: 0, x: 0, y: 0 },
            icon: { data: 'UI/UI_BUT_A_Stop', alpha: 1, x: 0, y: 0 },
            fg: { data: 'UI/UI_BUT_A', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['AUTOSPINTEXT'],
            callback_function: this.buttonClicked.bind(this)
        })
        this.spinautoStopButton.name = BTGUIConstants.AUTO_STOP_SPIN
        this.spinautoStopButton.alpha = 0
        this.buttonsHolder.addChild(this.spinautoStopButton)
        this.updateAutoSpinStopBtnText(23)
        this.buttonsHolder.addChild(this.spinButton)

        // spinButton,spinautoButton,menuButton,changeBetBtn,fetureDrop
        this.menuButton = new BTGButton()
        this.menuButton.init({
            bg: { data: 'UI/UI_BUT_D_BG_04', alpha: 1, x: 0, y: 0 },
            // bg2: { data: 'UI/UI_BUT_A_BG_03', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'UI/UI_BUT_D_BG_04_Pressed', alpha: 0, x: 0, y: 0 },
            icon: { data: 'UI/UI_BUT_D_Paytable', alpha: 1, x: 0, y: 0 },
            fg: { data: 'UI/UI_BUT_D', alpha: 1, x: 0, y: 0 },
            callback_function: this.buttonClicked.bind(this)
        })
        this.menuButton.name = BTGUIConstants.MENU
        this.buttonsHolder.addChild(this.menuButton)
        this.menuButton.x = 300
        // // this.menuButton.width = 0.4

        this.changeBetBtn = new Changebet()
        this.changeBetBtn.init({
            callback_function: this.buttonClicked.bind(this)
        })

        this.changeBetBtn.name = BTGUIConstants.FEATURE_DROP
        this.buttonsHolder.addChild(this.changeBetBtn)



        this.logoImg = PIXI.Sprite.from(PIXI.Texture.from("DB_Logo_01"));
        this.logoImg.scale.x = this.logoImg.scale.y = 0.5
        this.logo =  new PIXI.Sprite()

        this.logo.x = 0
        this.logo.y = 0
        this.logo.addChild(this.logoImg)
        this.addChild(this.logo)

        this.fetureDrop = new FeatureDrop()
        this.fetureDrop.init({
            callback_function: this.buttonClicked.bind(this)
        })

        this.fetureDrop.name = BTGUIConstants.FEATURE_DROP
        this.buttonsHolder.addChild(this.fetureDrop)

        //this.downPanel = new DownPanel()
        // this.downPanel.init({})
        // this.buttonsHolder.addChild(this.downPanel)

        //this.resize()

        //this.menuPopap()

        this.startSpinBtnAnimation()


    }

    

    takeCoin() {
        this.fetureDrop.takeCoin()
    }

    getCoinObject() {
        return this.fetureDrop
    }

    hideButtons(all) {
        this.buttonsHolder.alpha = 0
        if (all) {
            this.logo.alpha = 0
        }
    }

    showButtons(all) {
        this.buttonsHolder.alpha = 1
        if (all) {
            this.logo.alpha = 1
        }
    }

    changebet(currency, bet) {
        this.changeBetBtn.change_bet(currency, bet)
    }

    changebuyBonus(currency, bet) {
        this.fetureDrop.change_price(currency, bet)
    }

    updateAutoSpinStopBtnText(text) {
        this.spinautoStopButton.buttonText.text = window.Lang.default["AUTOSPINTEXT"].str.replace("%d", text)
    }

    showAutoSpinStopBtn(val) {
        if (val) {
            this.spinautoStopButton.alpha = 1
            this.spinButton.alpha = 0
            this.buttonsHolder.addChild(this.spinautoStopButton)
        } else {
            this.spinautoStopButton.alpha = 0
            this.spinButton.alpha = 1
            this.buttonsHolder.addChild(this.spinButton)
        }

    }

    showMessageWindow(header, content) {
        this.messageWindow = new MessageWindow()
        this.messageWindow.init({
            callback_function: this.buttonClicked.bind(this),
            header: header,
            content: content
        })
        this.messageWindow.showPopup(0)
        this.addChild(this.messageWindow)
        this.resize()
        return this.messageWindow
    }

    freeSpinWheelPopap() {
        this.freeSpinWheel = new FreeSpinWheel()
        this.freeSpinWheel.init({
            callback_function: this.buttonClicked.bind(this)
        })
        this.freeSpinWheel.showPopup(0)
        return this.freeSpinWheel
    }

    bonusFinalPopup(startSpins) {
        this.bonusFinalWindow = new BonusFinalPopup()
        this.bonusFinalWindow.init({
            callback_function: this.buttonClicked.bind(this),
            startSpins: startSpins
        })
        this.bonusFinalWindow.showPopup(0)
        return this.bonusFinalWindow
    }

    freeSpinPopap(startSpins) {
        this.freeSpinWindow = new FreeSpinWindow()
        this.freeSpinWindow.init({
            callback_function: this.buttonClicked.bind(this),
            startSpins: startSpins
        })
        this.freeSpinWindow.showPopup(0)
        return this.freeSpinWindow
    }

    buyBonusPopap(funValue, currency) {
        this.buyBonus = new BuyBonus()
        this.buyBonus.init({
            callback_function: this.buttonClicked.bind(this),
            funValue: funValue,
            currency: currency
        })
        this.buyBonus.showPopup(0)
        return this.buyBonus
    }

    menuPopup(startPage) {
        this.menu = new MenuPopup()
        this.menu.init({
            callback_function: this.buttonClicked.bind(this),
            eventHandler: this.eventHandler.bind(this),
            startPage: startPage
        })
        this.menu.showPopup(0)
        this.menu.x = 100
        this.menu.y = 100
        this.addChild(this.menu)
        this.resize()
        return this.menu
    }

    createStartBaner() {
        this.startBar = new Startbaner()
        this.startBar.init({
            callback_function: this.buttonClicked.bind(this),
        })
        this.addChild(this.startBar)
        this.resize()
        return this.startBar
    }

    hideStartBanner(_delay) {
        this.startBar.hidePopup(_delay)
        this.startBar = null
    }

    bonusFinalPopupHide(_delay) {
        this.bonusFinalWindow.hidePopup(_delay)
        this.bonusFinalWindow = null
    }

    freeSpinWheelPopapHide(_delay) {
        this.freeSpinWheel.hidePopup(_delay)
        this.freeSpinWheel = null
    }

    freeSpinPopapHide(_delay) {
        this.freeSpinWindow.hidePopup(_delay)
        this.freeSpinWindow = null
    }

    buyBonusPopapHide(_delay) {
        this.buyBonus.hidePopup(_delay)
        this.buyBonus = null
    }

    menuPopupHide(_delay) {
        this.menu.hidePopup(_delay)
        this.menu = null
    }

    setAutoMode(mode){
        this.autoMode = mode
        if(this.autoMode){
            this.interactiveChildren = true;
        }else{
           // this.interactiveChildren = false;
        }
    }

    setEnabled(en){
        this.interactiveChildren = en
        if(this.autoMode){
            this.interactiveChildren = true;
        }
    }


    buttonClicked(obj) {
        if(this.autoMode){
            if (obj.name!==BTGUIConstants.AUTO_STOP_SPIN){
                return
            }
        }
        console.log("buttonClicked")
        this.parent_obj.buttonClicked(obj.name)
        this.resetSpinBtnAnimation();
    }

    eventHandler(eventtype, caller) {
        if (this.parent_obj.eventHandler) {
            this.parent_obj.eventHandler(eventtype, caller)
        }
    }

    spinBtnAnimationTomeout = 0
    spinBtnAnimationInterval = 0


    resetSpinBtnAnimation() {
        clearTimeout(this.spinBtnAnimationTomeout)
        clearInterval(this.spinBtnAnimationInterval)

    }

    startSpinBtnAnimation() {
        clearTimeout(this.spinBtnAnimationTomeout)
        clearInterval(this.spinBtnAnimationInterval)
        this.spinBtnAnimationTomeout = setTimeout(function () {
            this.spinBtnAnimationInterval = setInterval(function () {
                new TWEEN.Tween(this.spinButton.bg)
                    .to({ alpha: 1 }, 100)
                    .delay(0)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(function () {
                        new TWEEN.Tween(this.spinButton.bg)
                            .to({ alpha: 0 }, 100)
                            .delay(500)
                            .easing(TWEEN.Easing.Linear.None)
                            .start()
                    }.bind(this)).start()
            }.bind(this), 3000);
        }.bind(this), 3000);
    }

    buttonsscale(s) {
        this.logo.scale.x = s
        this.logo.scale.y = s

        this.spinButton.scale.x = s
        this.spinButton.scale.y = s

        this.spinautoButton.scale.x = s
        this.spinautoButton.scale.y = s

        this.spinautoStopButton.scale.x = s
        this.spinautoStopButton.scale.y = s

        this.changeBetBtn.scale.x = s
        this.changeBetBtn.scale.y = s

        this.menuButton.scale.x = s
        this.menuButton.scale.y = s

        this.fetureDrop.scale.x = s
        this.fetureDrop.scale.y = s
    }


    currentSize = { w: 0, h: 0, s: 1, o: 20 }

    resize(_w = 0, _h = 1, _s = 1, _o = 20) {
        if (_w > 0) {
            this.currentSize.w = _w
            this.currentSize.h = _h
            this.currentSize.s = _s
            this.currentSize.o = _o
        }
        this.buttonsscale(this.currentSize.s)

        var prop = this.currentSize.w / this.currentSize.h
        console.log(prop)
        if (prop > 1.72) {
            this.resizeRight(this.currentSize.w, this.currentSize.h, this.currentSize.s, this.currentSize.o)
        } else {
            var t = 0
            if (prop > 1.62) {
                t = 1
            }
            if (prop < 1) {
                t = 2
            }


            this.resizeDown(this.currentSize.w, this.currentSize.h, this.currentSize.s, t)
        }

        if (this.startBar) {
            this.startBar.resize(this.currentSize.w, this.currentSize.h, this.currentSize.s)
        }

        if (this.menu) {
            this.menu.resize(this.currentSize.w, this.currentSize.h, this.currentSize.s)
        }

        if (this.messageWindow) {
            this.messageWindow.resize(this.currentSize.w, this.currentSize.h, this.currentSize.s)
        }

    }

    resizeDown(w, h, s, t) {
        console.log('resizeRight')
        var spinButtonSize = this.spinButton.get_size()



        this.spinButton.x = w - (spinButtonSize.width + 20) * s
        this.spinButton.y = h - (spinButtonSize.height + 2) * s

        this.spinautoStopButton.x = this.spinButton.x
        this.spinautoStopButton.y = this.spinButton.y

        this.spinautoButton.x = w - (this.spinautoButton.get_size().width + spinButtonSize.width + 20) * s
        this.spinautoButton.y = this.spinButton.y


        this.changeBetBtn.x = 20 * s
        this.changeBetBtn.y = h - (this.changeBetBtn.get_size().height + 2) * s


        this.menuButton.x = this.changeBetBtn.x + (this.changeBetBtn.get_size().width * s)
        this.menuButton.y = h - (this.menuButton.get_size().height + 2) * s
        if (t == 1 || t == 2) {
            this.fetureDrop.x = this.menuButton.x + (this.menuButton.get_size().width * s)
            this.fetureDrop.y = h - (this.fetureDrop.get_size().height + 5 + 2) * s
        } else {
            this.fetureDrop.x = 20 * s
            this.fetureDrop.y = h - (this.changeBetBtn.get_size().height + this.fetureDrop.get_size().height + 25 + 20) * s
        }
        if (t == 2) {
            var scaleFactor = (spinButtonSize.height * s) / this.logoImg.height
            this.logo.scale.x = scaleFactor
            this.logo.scale.y = scaleFactor
            this.logo.x = w / 2 - (this.logoImg.width * s / 2)
            this.logo.y = 20 * s
        } else {
            var scaleFactor = (spinButtonSize.height * s) / this.logoImg.height
            this.logo.scale.x = scaleFactor
            this.logo.scale.y = scaleFactor
            this.logo.x = w / 2 - (this.logoImg.width * s / 2)
            this.logo.y = h - (this.logoImg.height + 2) * s
        }




    }


    resizeRight(w, h, s, o) {
        console.log('resizeRight')
        var spinButtonSize = this.spinButton.get_size()


        var currentY = 0

        this.spinButton.x = w - (spinButtonSize.width + o) * s
        this.spinButton.y = h - (spinButtonSize.height + 40) * s

        this.spinautoStopButton.x = this.spinButton.x
        this.spinautoStopButton.y = this.spinButton.y
        currentY = this.spinButton.y


        this.menuButton.x = w - (this.menuButton.get_size().width + o + spinButtonSize.width / 2) * s
        this.menuButton.y = currentY - (this.menuButton.get_size().height + 20) * s


        this.spinautoButton.x = w - (this.spinautoButton.get_size().width + o) * s
        this.spinautoButton.y = currentY - (this.spinautoButton.get_size().height + 20) * s
        currentY = this.spinautoButton.y

        this.changeBetBtn.x = w - (this.changeBetBtn.get_size().width + o) * s
        this.changeBetBtn.y = currentY - (this.changeBetBtn.get_size().height + 20) * s
        currentY = this.changeBetBtn.y

        this.fetureDrop.x = w - (this.fetureDrop.get_size().width + o) * s
        this.fetureDrop.y = currentY - (this.fetureDrop.get_size().height + 20) * s
        currentY = this.fetureDrop.y


        var scaleFactor = (spinButtonSize.width * s) / this.logoImg.width


        this.logo.scale.x = scaleFactor
        this.logo.scale.y = scaleFactor
        this.logo.x = w - (this.logoImg.width + o+50) * s
        this.logo.y = 20 * s


    }





}


export default BtgUI;

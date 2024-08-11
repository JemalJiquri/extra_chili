import * as PIXI from 'pixi.js'
import BTGButton from "./btgbutton"
import BTGUIConstants from "./constants"
import MainPopup from "./mainpopup"

class BuyBonus extends MainPopup {
    callback_function = null
    bg = null
    cancelBtn = null
    startBtn = null
    warningText = null
    warningData = null
    priceText = null
    funText = null
    funValue = 50


    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.alpha = 0

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("FeatureDrop/Prompt/FDMenu_BG_01"));
        this.bg.x = 0
        this.bg.y = 0
        this.addChild(this.bg)

        //FeatureDrop/Prompt/BUT_START_01
        this.cancelBtn = new BTGButton()
        this.cancelBtn.init({
            bg: { data: 'FeatureDrop/Prompt/BUT_CANCEL_01', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'FeatureDrop/Prompt/BUT_CANCEL_02', alpha: 0, x: 0, y: 0 },
            text: window.Lang.default['CANCEL'],
            callback_function: this.spinClicked.bind(this)
        })
        this.cancelBtn.name = BTGUIConstants.BUY_BONUS_CANCEL
        this.cancelBtn.scale.x = 0.58394160;
        this.cancelBtn.scale.y = 0.58394160;
        this.addChild(this.cancelBtn)
        this.cancelBtn.x = 317
        this.cancelBtn.y = 445


        this.startBtn = new BTGButton()
        this.startBtn.init({
            bg: { data: 'FeatureDrop/Prompt/BUT_START_01', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'FeatureDrop/Prompt/BUT_START_02', alpha: 0, x: 0, y: 0 },
            text: window.Lang.default['START'],
            callback_function: this.spinClicked.bind(this)
        })
        this.startBtn.name = BTGUIConstants.BUY_BONUS_START
        this.startBtn.scale.x = 0.58394160;
        this.startBtn.scale.y = 0.58394160;
        this.addChild(this.startBtn)
        this.startBtn.x = this.cancelBtn.x + 200
        this.startBtn.y = this.cancelBtn.y




        this.warningText = new PIXI.Text(window.Lang.default['WARNING'].str, window.Lang.default['WARNING']);

        //this.warningText.anchor.set(0.5, 0.5);
        this.warningText.position.set(270, 155);
        this.addChild(this.warningText)

        this.warningData = new PIXI.Text(window.Lang.default['PRESS_START'].str, window.Lang.default['PRESS_START']);

        //this.warningData.anchor.set(0.5, 0.5);
        this.warningData.position.set(270, 195);
        this.addChild(this.warningData)


        this.priceText = new PIXI.Text(window.Lang.default['PRICE'].str, window.Lang.default['PRICE']);

        this.priceText.anchor.set(0.5, 0.5);
        this.priceText.position.set(500, 342); 
        this.addChild(this.priceText)

        this.funText = new PIXI.Text(window.Lang.default['FUNBONUSBANER'].str.replace('%d', obj.funValue).replace('%c', obj.currency), window.Lang.default['FUNBONUSBANER']);

        this.funText.anchor.set(0.5, 0.5);
        this.funText.position.set(500, 388);
        this.addChild(this.funText)
    }


    spinClicked(obj) {
        if (this.callback_function) {
            this.callback_function(obj)
        }
    }

    get_size() {
        if (this.bg) {
            return { width: this.bg.width, height: this.bg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default BuyBonus;

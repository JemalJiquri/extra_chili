import * as PIXI from 'pixi.js'
import MainPopup from "../../btgui/mainpopup"
// import test from "./asgasfasf/pagea"


class pageC extends MainPopup {
    callback_function = null
    bg = null
    leftBtn = null
    raightBtn = null
    paysBtn = null
    activiconinfobg = null
    iconinfobgArr = []

    funValue = 50


    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_C"));
        this.bg.x = 70
        this.bg.y = 155
        this.addChild(this.bg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_C"));
        this.bg.x = 70
        this.bg.y = 377
        this.addChild(this.bg)

        // this.createBulets()

        // this.bg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_Panel_01"));
        // this.bg.x = 55
        // this.bg.y = 150
        // this.addChild(this.bg)

        // this.leftBtn = new BTGButton()
        // this.leftBtn.init({
        //     bg: { data: 'Menu/BUT_Next_01', alpha: 1, x: 0, y: 0 },
        //     callback_function: this.spinClicked.bind(this)
        // })
        // this.leftBtn.name = BTGUIConstants.BUY_BONUS_CANCEL
        // this.addChild(this.leftBtn)
        // this.leftBtn.x = 55 
        // this.leftBtn.y = 430
        // this.leftBtn.rotation = 1.5708*2

        // this.raightBtn = new BTGButton()
        // this.raightBtn.init({
        //     bg: { data: 'Menu/BUT_Next_01', alpha: 1, x: 0, y: 0 },
        //     callback_function: this.spinClicked.bind(this)
        // })
        // this.raightBtn.name = BTGUIConstants.BUY_BONUS_CANCEL
        // this.addChild(this.raightBtn)
        // this.raightBtn.x = 955
        this.createiconinfobg()
        this.infoTexts()

    }

    createiconinfobg() {
        var iconinfobg = null
        iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_Image_01"))
        iconinfobg.x = 400 
        iconinfobg.y = 200 
        this.addChild(iconinfobg)
    }

    infoTexts(){
        
        var texticonWin = null

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTCAA'].str, window.Lang.default['PAYSINFOTEXTCAA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 200); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTCAB'].str, window.Lang.default['PAYSINFOTEXTCAB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 275); 
        this.addChild(texticonWin)
        
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTCBA'].str, window.Lang.default['PAYSINFOTEXTCBA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 430); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTCBB'].str, window.Lang.default['PAYSINFOTEXTCBB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 505); 
        this.addChild(texticonWin)
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


export default pageC;

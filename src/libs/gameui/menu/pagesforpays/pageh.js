import * as PIXI from 'pixi.js'
import MainPopup from "../../btgui/mainpopup"
// import test from "./asgasfasf/pagea"


class pageH extends MainPopup {
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

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_E"));
        this.bg.x = 70
        this.bg.y = 155
        this.addChild(this.bg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_D"));
        this.bg.x = 70
        this.bg.y = 420
        this.addChild(this.bg)
        
        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_Megaways_01"));
        this.bg.x = 100
        this.bg.y = 180
        // this.bg.alpha = 0.3
        this.addChild(this.bg)
        
        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_HowToPlay_01"));
        this.bg.x = 630
        this.bg.y = 180
        // this.bg.alpha = 0.3
        this.addChild(this.bg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_HowToPlay_02"));
        this.bg.x = 480
        this.bg.y = 450
        // this.bg.alpha = 0.3
        this.addChild(this.bg)


        this.infoTexts()

    }



    infoTexts(){
        
        var texticonWin = null
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTHA'].str, window.Lang.default['PAYSINFOTEXTHA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 280); 
        this.addChild(texticonWin)
        
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTHB'].str, window.Lang.default['PAYSINFOTEXTHB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 390); 
        this.addChild(texticonWin)
        
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTHC'].str, window.Lang.default['PAYSINFOTEXTHC']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 500); 
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


export default pageH;

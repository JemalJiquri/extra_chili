import * as PIXI from 'pixi.js'
import MainPopup from "../../btgui/mainpopup"
// import test from "./asgasfasf/pagea"


class pageF extends MainPopup {
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

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_K"));
        this.bg.x = 70
        this.bg.y = 155
        this.addChild(this.bg)


        this.createiconinfobg()
        this.infoTexts()

    }

    createiconinfobg() {
            var iconinfobg = null
            iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_Image_03"))
            iconinfobg.x = 550 
            iconinfobg.y = 180 
            this.addChild(iconinfobg)
    }

    infoTexts(){
        
        var texticonWin = null
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTFA'].str, window.Lang.default['PAYSINFOTEXTFA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(100 , 210); 
        this.addChild(texticonWin)
        
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTFB'].str, window.Lang.default['PAYSINFOTEXTFB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(100 , 370); 
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


export default pageF;

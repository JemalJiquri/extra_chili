import * as PIXI from 'pixi.js'
import MainPopup from "../../btgui/mainpopup"
// import test from "./asgasfasf/pagea"


class pageE extends MainPopup {
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

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_H"));
        this.bg.x = 70
        this.bg.y = 155
        this.addChild(this.bg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_D"));
        this.bg.x = 70
        this.bg.y = 417
        this.addChild(this.bg)



        // this.bg = PIXI.Sprite.from(PIXI.Texture.from("Menu/TAB_Menu_01_Pressed"));
        // this.bg.x = 80
        // this.bg.y = 420
        // this.bg.width = 850
        // this.bg.height = 190
        // this.bg.alpha = 0.3
        // this.addChild(this.bg)


        // this.bg = PIXI.Sprite.from(PIXI.Texture.from("Menu/TAB_Menu_01_Pressed"));
        // this.bg.x = 80
        // this.bg.y = 355 - 190
        // this.bg.width = 330
        // this.bg.height = 250
        // this.bg.alpha = 0.3
        // this.addChild(this.bg)


        
        this.createiconinfobg() 
        this.infoTexts() 

    }

    createiconinfobg() {
        var iconinfobg = null
        iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_Image_04"))
        iconinfobg.x = 480 
        iconinfobg.y = 150 
        this.addChild(iconinfobg)
        for (let i = 0; i < 3; i++) {
            var iconinfobg2 = null
            iconinfobg2 = PIXI.Sprite.from(PIXI.Texture.from("Scatter_Feature_3"))
            iconinfobg2.x = 440 + iconinfobg2.width*i
            iconinfobg2.y = 430 
            this.addChild(iconinfobg2)
        }
    }

    infoTexts(){
        
        var texticonWin = null
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTEAA'].str, window.Lang.default['PAYSINFOTEXTEAA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(100 , 200); 
        this.addChild(texticonWin)
        
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTEAB'].str, window.Lang.default['PAYSINFOTEXTEAB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(100 , 260); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTEAC'].str, window.Lang.default['PAYSINFOTEXTEAC']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(100 , 300); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTEBA'].str, window.Lang.default['PAYSINFOTEXTEBA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(100 , 460); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTEBB'].str, window.Lang.default['PAYSINFOTEXTEBB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(100 , 530); 
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


export default pageE;

import * as PIXI from 'pixi.js'
import MainPopup from "../../btgui/mainpopup"
// import test from "./asgasfasf/pagea"


class pageG extends MainPopup {
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

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_F"));
        this.bg.x = 70
        this.bg.y = 155
        this.addChild(this.bg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_F"));
        this.bg.x = 497
        this.bg.y = 155
        this.addChild(this.bg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_G"));
        this.bg.x = 510
        this.bg.y = 300
        this.addChild(this.bg)



        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_G"));
        this.bg.x = 675
        this.bg.y = 300
        this.addChild(this.bg)



        this.createiconinfobg()
        this.infoTexts()
        this.infoBars()

    }

    createiconinfobg() {
        var iconinfobg = null
        iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_Image_05"))
        iconinfobg.x = 90 
        iconinfobg.y = 420 
        this.addChild(iconinfobg)
    }

    infoBars() {
        var iconimage = null
        var icontext = null


        iconimage = PIXI.Sprite.from(PIXI.Texture.from("FeatureDrop/FDSymbol_02"));
        iconimage.x = 540
        iconimage.y = 345 
        iconimage.scale.x = 0.3
        iconimage.scale.y = 0.3
        this.addChild(iconimage)

        iconimage = PIXI.Sprite.from(PIXI.Texture.from("FeatureDrop/FDSymbol_04"));
        iconimage.x = 540
        iconimage.y = 455
        iconimage.scale.x = 0.3
        iconimage.scale.y = 0.3
        this.addChild(iconimage)

        iconimage = PIXI.Sprite.from(PIXI.Texture.from("FeatureDrop/FDSymbol_06"));
        iconimage.x = 540
        iconimage.y = 525
        iconimage.scale.x = 0.3
        iconimage.scale.y = 0.3
        this.addChild(iconimage)

        iconimage = PIXI.Sprite.from(PIXI.Texture.from("FeatureDrop/FDSymbol_03"));
        iconimage.x = 705
        iconimage.y = 355 
        iconimage.scale.x = 0.3
        iconimage.scale.y = 0.3
        this.addChild(iconimage)

        iconimage = PIXI.Sprite.from(PIXI.Texture.from("FeatureDrop/FDSymbol_05"));
        iconimage.x = 705
        iconimage.y = 460
        iconimage.scale.x = 0.3
        iconimage.scale.y = 0.3
        this.addChild(iconimage)

        iconimage = PIXI.Sprite.from(PIXI.Texture.from("FeatureDrop/FDSymbol_07"));
        iconimage.x = 705
        iconimage.y = 527
        iconimage.scale.x = 0.3
        iconimage.scale.y = 0.3
        this.addChild(iconimage)

        icontext = new PIXI.Text(window.Lang.default['MENUPAYPAGECOINTEXT'].str, window.Lang.default['MENUPAYPAGECOINTEXT']);
        icontext.anchor.set(0, 0.5);
        icontext.position.set(615 , 382); 
        icontext.text = window.Lang.default['MENUPAYPAGECOINTEXT'].str.replace("%d", 2)
        this.addChild(icontext)
        
        icontext = null
        icontext = new PIXI.Text(window.Lang.default['MENUPAYPAGECOINTEXT'].str, window.Lang.default['MENUPAYPAGECOINTEXT']);
        icontext.anchor.set(0, 0.5);
        icontext.position.set(785 , 382); 
        icontext.text = window.Lang.default['MENUPAYPAGECOINTEXT'].str.replace("%d", 1)
        this.addChild(icontext)
        
        icontext = new PIXI.Text(window.Lang.default['MENUPAYPAGECOINTEXT'].str, window.Lang.default['MENUPAYPAGECOINTEXT']);
        icontext.anchor.set(0, 0.5);
        icontext.position.set(600 , 475); 
        icontext.text = window.Lang.default['MENUPAYPAGECOINTEXT'].str.replace("%d", 0.5)
        this.addChild(icontext)
        
        icontext = null
        icontext = new PIXI.Text(window.Lang.default['MENUPAYPAGECOINTEXT'].str, window.Lang.default['MENUPAYPAGECOINTEXT']);
        icontext.anchor.set(0, 0.5);
        icontext.position.set(770 , 475); 
        icontext.text = window.Lang.default['MENUPAYPAGECOINTEXT'].str.replace("%d", 0.4)
        this.addChild(icontext)
        
        icontext = new PIXI.Text(window.Lang.default['MENUPAYPAGECOINTEXT'].str, window.Lang.default['MENUPAYPAGECOINTEXT']);
        icontext.anchor.set(0, 0.5);
        icontext.position.set(600 , 538); 
        icontext.text = window.Lang.default['MENUPAYPAGECOINTEXT'].str.replace("%d", 0.3)
        this.addChild(icontext)
        
        icontext = null
        icontext = new PIXI.Text(window.Lang.default['MENUPAYPAGECOINTEXT'].str, window.Lang.default['MENUPAYPAGECOINTEXT']);
        icontext.anchor.set(0, 0.5);
        icontext.position.set(770 , 538); 
        icontext.text = window.Lang.default['MENUPAYPAGECOINTEXT'].str.replace("%d", 0.2)
        this.addChild(icontext)

    }
    
    infoTexts(){
        
        var texticonWin = null
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTGA'].str, window.Lang.default['PAYSINFOTEXTGA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(100 , 210); 
        this.addChild(texticonWin)
        
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTGB'].str, window.Lang.default['PAYSINFOTEXTGB']);
        texticonWin.anchor.set(0, 0);
        texticonWin.position.set(100 , 240); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTGC'].str, window.Lang.default['PAYSINFOTEXTGC']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(520 , 210); 
        this.addChild(texticonWin)
        
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTGD'].str, window.Lang.default['PAYSINFOTEXTGD']);
        texticonWin.anchor.set(0, 0);
        texticonWin.position.set(520 , 240); 
        this.addChild(texticonWin)
        
        // texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTHC'].str, window.Lang.default['PAYSINFOTEXTHC']);
        // texticonWin.anchor.set(0, 0.5);
        // texticonWin.position.set(110 , 500); 
        // this.addChild(texticonWin)

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


export default pageG;

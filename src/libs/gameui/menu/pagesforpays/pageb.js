import * as PIXI from 'pixi.js'
import MainPopup from "../../btgui/mainpopup"
// import test from "./asgasfasf/pagea"


class pageB extends MainPopup {
    callback_function = null
    bg = null
    leftBtn = null
    raightBtn = null
    infoText = null
    bigicon = ['Ace_5', 'King_5', 'Queen_5', 'Jack_5', 'Ten_5', 'Nine_5']
    winArr = [[1.75, 0.6, 0.4, 0.2], [1.75, 0.6, 0.4, 0.2], [1, 0.6, 0.25, 0.2], [1, 0.5, 0.25, 0.15], [0.9, 0.5, 0.25, 0.15], [0.8, 0.4, 0.2, 0.1 ] ]


    iconinfobgArr = []

    funValue = 50


    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_B"));
        this.bg.x = 70
        this.bg.y = 535
        this.addChild(this.bg)

        this.createiconinfobg()
        this.infoTexts()

    }

    createiconinfobg() {
        for (let i = 0; i < 6; i++) {
            var iconinfobg = null
            var yindex = 0
            if(i >= 3) yindex = 1
            iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_Panel_02"))
            iconinfobg.x = 60 + (iconinfobg.width - 15 )*i -  yindex*(iconinfobg.width - 15 )*3
            iconinfobg.y = 150 + yindex*(iconinfobg.height - 15 )
            this.addChild(iconinfobg)
            this.iconinfobgArr.push(iconinfobg)

            
            var test = null
            test = PIXI.Sprite.from(PIXI.Texture.from(this.bigicon[i]))
            test.x = iconinfobg.x + 25
            test.y = iconinfobg.y + 50
            this.addChild(test)
            this.textCreate(i, 4)
        }
    }


    
    textCreate(index, quantity) {
        var numline = 0
        if(index > 2)numline = 1

        for (let i = 0; i < quantity; i++) {

            var texticon = null
            texticon = new PIXI.Text(window.Lang.default['MENUICONSTEXTCOUNT'].str, window.Lang.default['MENUICONSTEXTCOUNT']);
            texticon.anchor.set(0.5, 0.5);
            texticon.position.set(245 + 288*(index%3) , 215 + 22*i +  200*(numline)); 
            texticon.text = window.Lang.default['MENUICONSTEXTCOUNT'].str.replace("%d", 6-i)
            this.addChild(texticon)

            var texticonWin = null
            texticonWin = new PIXI.Text(window.Lang.default['MENUICONSTEXTWIN'].str, window.Lang.default['MENUICONSTEXTWIN']);
            texticonWin.anchor.set(0, 0.5);
            texticonWin.position.set(texticon.x + 40 , texticon.y); 
            texticonWin.text = window.Lang.default['MENUICONSTEXTWIN'].str.replace("%d", this.winArr[index][i])
            this.addChild(texticonWin)
        }
        
    }

    
    infoTexts(){
        
        var texticonWin = null
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTA'].str, window.Lang.default['PAYSINFOTEXTA']);
        texticonWin.anchor.set(0.5, 0.5);
        texticonWin.position.set(500 , 580); 
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


export default pageB;

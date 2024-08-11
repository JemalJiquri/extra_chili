import * as PIXI from 'pixi.js'
import MainPopup from "../../btgui/mainpopup"
// import test from "./asgasfasf/pagea"


class pageA extends MainPopup {
    callback_function = null
    bg = null
    leftBtn = null
    raightBtn = null
    paysBtn = null
    activiconinfobg = null
    bigicon = ['Scroll_3', 'FireGem_3', 'IceGem_3', 'Emblem_3']
    smalicon = ['Scroll_7', 'FireGem_7', 'IceGem_7', 'Emblem_7']
    winArr = [[50, 25, 10, 5, 2], [7.5, 2.5, 2, 1], [2, 1.5, 1, 0.25], [2, 0.75, 0.5, 0.25],]
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
        for (let i = 0; i < 4; i++) {
            var iconinfobg = null
            iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Paytable/PT_Panel_01"))
            iconinfobg.x = 60 + (iconinfobg.width) * i
            iconinfobg.y = 150
            this.addChild(iconinfobg)
            this.iconinfobgArr.push(iconinfobg)

            var test = null
            test = PIXI.Sprite.from(PIXI.Texture.from(this.bigicon[i]))
            test.x = 110 + 220 * i
            test.y = 160
            this.addChild(test)


            test = null
            test = PIXI.Sprite.from(PIXI.Texture.from(this.smalicon[i]))

            test.x = 120 + 222 * i
            test.y = 330
            this.addChild(test)
            if (i === 0) this.textCreate(i, 5)
            else this.textCreate(i, 4)

        }
    }


    textCreate(index, quantity) {
        for (let i = 0; i < quantity; i++) {

            var texticon = null
            texticon = new PIXI.Text(window.Lang.default['MENUICONSTEXTCOUNT'].str, window.Lang.default['MENUICONSTEXTCOUNT']);
            texticon.anchor.set(0.5, 0.5);
            texticon.position.set(137 + 220 * index, 436 - 6 * (quantity - 4) + (22 - 2 * (quantity - 4)) * i);
            texticon.text = window.Lang.default['MENUICONSTEXTCOUNT'].str.replace("%d", 6 - i)
            this.addChild(texticon)

            var texticonWin = null
            texticonWin = new PIXI.Text(window.Lang.default['MENUICONSTEXTWIN'].str, window.Lang.default['MENUICONSTEXTWIN']);
            texticonWin.anchor.set(0, 0.5);
            texticonWin.position.set(texticon.x + 40, texticon.y);
            texticonWin.text = window.Lang.default['MENUICONSTEXTWIN'].str.replace("%d", this.winArr[index][i])
            this.addChild(texticonWin)
        }

    }


    infoTexts() {

        var texticonWin = null
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTA'].str, window.Lang.default['PAYSINFOTEXTA']);
        texticonWin.anchor.set(0.5, 0.5);
        texticonWin.position.set(500, 580);
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


export default pageA;

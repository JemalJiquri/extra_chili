import * as PIXI from 'pixi.js'
import BTGButton from "./btgbutton"
import BTGUIConstants from "./constants"
import MainPopup from "./mainpopup"

class FreeSpinWindow extends MainPopup {
    callback_function = null
    bg = null
    gambleBtn = null
    numTxt = null
    awardText = null
    gambleText = null
    gambleWarnText = null




    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }


        this.bg = PIXI.Sprite.from(PIXI.Texture.from("FreeSpinWindow/FreeSpinWindow_BG_01"));
        this.bg.x = 0
        this.bg.y = 0
        this.addChild(this.bg)
        var freeSpinsNum = "ExtraChilliScreen/NUM_Black_0"
        switch (obj.startSpins) {
            case 8:
                freeSpinsNum = "ExtraChilliScreen/NUM_Green_8"
                break;
            case 12:
                freeSpinsNum = "ExtraChilliScreen/NUM_Green_12"
                break;
            case 16:
                freeSpinsNum = "ExtraChilliScreen/NUM_Blue_16"
                break;
            case 20:
                freeSpinsNum = "ExtraChilliScreen/NUM_Red_20"
                break;
            case 24:
                freeSpinsNum = "ExtraChilliScreen/NUM_Purple_24"
                break;
            case 28:
                freeSpinsNum = "ExtraChilliScreen/NUM_Purple_28"
                break;
            default:
                break;
        }

        this.numTxt = PIXI.Sprite.from(PIXI.Texture.from(freeSpinsNum));
        this.numTxt.x = obj.startSpins === 8 ? 118 : 80
        this.numTxt.y = 150
        this.addChild(this.numTxt)


        //

        this.gambleBtn = new BTGButton()
        this.gambleBtn.init({
            bg: { data: 'ExtraChilliScreen/ECS_Button_A', alpha: 1, x: 0, y: 0 },
            pressed: { data: 'ExtraChilliScreen/ECS_Button_A_Pressed', alpha: 0, x: 0, y: 0 },
            text: window.Lang.default['OK'],
            callback_function: this.spinClicked.bind(this)
        })
        this.gambleBtn.name = BTGUIConstants.FREE_SPIN_GAMBLE
        this.addChild(this.gambleBtn)
        this.gambleBtn.x = 610
        this.gambleBtn.y = 635




        this.awardText = new PIXI.Text(window.Lang.default['FREE_SPINS_AWARDED'].str, window.Lang.default['FREE_SPINS_AWARDED']);

        this.awardText.anchor.set(0.5, 0.5);
        this.awardText.position.set(520, 235);
        this.addChild(this.awardText)

        this.gambleText = new PIXI.Text(window.Lang.default['GAMBLE_TO_WIN'].str, window.Lang.default['GAMBLE_TO_WIN']);

        this.gambleText.anchor.set(0.5, 0.5);
        this.gambleText.position.set(465, 535);
        this.addChild(this.gambleText)



        this.gambleWarnText = new PIXI.Text(window.Lang.default['GAMBLE_MAY_RESULT'].str, window.Lang.default['GAMBLE_MAY_RESULT']);

        this.gambleWarnText.anchor.set(0.5, 0.5);
        this.gambleWarnText.position.set(405, 695);
        this.addChild(this.gambleWarnText)
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


export default FreeSpinWindow;

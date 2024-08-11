import * as PIXI from 'pixi.js'
import BTGButton from "./btgbutton"
import BTGUIConstants from "./constants"
import MainPopup from "./mainpopup"

class BonusFinalPopup extends MainPopup {
    callback_function = null
    bg = null
    gambleBtn = null
    numTxt = null
    awardText = null
    unlimitedText = null
    unlimitedTextBody = null
    more_3 = null



    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }


        this.bg = PIXI.Sprite.from(PIXI.Texture.from("FreeSpinWindow/FreeSpinWindow_BG_02"));
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
        this.numTxt.y = 80
        this.addChild(this.numTxt)


        this.awardText = new PIXI.Text(window.Lang.default['FREE_SPINS_AWARDED'].str, window.Lang.default['FREE_SPINS_AWARDED']);
        this.awardText.anchor.set(0.5, 0.5);
        this.awardText.position.set(520, 175);
        this.addChild(this.awardText)


        this.unlimitedText = new PIXI.Text(window.Lang.default['UNLIMITED_WIN'].str, window.Lang.default['UNLIMITED_WIN']);
        this.unlimitedText.anchor.set(0.5, 0.5);
        this.unlimitedText.position.set(450, 355);
        this.addChild(this.unlimitedText)

        this.unlimitedTextBody = new PIXI.Text(window.Lang.default['UNLIMITED_WIN_BODY'].str, window.Lang.default['UNLIMITED_WIN_BODY']);
        this.unlimitedTextBody.anchor.set(0.5, 0.5);
        this.unlimitedTextBody.position.set(450, 420);
        this.addChild(this.unlimitedTextBody)

        this.more_3 = new PIXI.Text(window.Lang.default['MORE_3'].str, window.Lang.default['MORE_3']);
        this.more_3.anchor.set(0.5, 0.5);
        this.more_3.position.set(610, 550);
        this.addChild(this.more_3)


        

        this.gambleBtn = new BTGButton()
        this.gambleBtn.init({
            bg: { data: 'FreeSpinWindow/BUT_StartFreeSpin_01_BG_01', alpha: 1, x: 0, y: 0 },
            fg: { data: 'FreeSpinWindow/BUT_StartFreeSpin_01', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['START_FREE_SPINS'],
            callback_function: this.spinClicked.bind(this)
        })
        this.gambleBtn.name = BTGUIConstants.FREE_SPIN_START
        this.addChild(this.gambleBtn)
        this.gambleBtn.x = 215
        this.gambleBtn.y = 615










       
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


export default BonusFinalPopup;

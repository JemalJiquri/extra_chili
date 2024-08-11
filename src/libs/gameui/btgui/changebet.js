import BTGButton from "./btgbutton"
import BTGUIConstants from "./constants"
import MainPopup from "./mainpopup"

class Changebet extends MainPopup {
    callback_function = null
    bg = null
    fg = null
    plusbetbtn = null
    minusbetbtn = null
    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.fg = new BTGButton()
        this.fg.init({
            bg: { data: 'UI/UI_BUT_B_BG_01', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['STAKE'],
            fg: { data: 'UI/UI_BUT_B', alpha: 1, x: 0, y: 0 },
            callback_function: this.spinClicked.bind(this)
        })
        this.fg.name = BTGUIConstants.BG
        this.fg.bg.tint = 0x0c0d0c;

        this.addChild(this.fg)

        this.bg = new BTGButton()
        this.bg.init({
            bg: { data: 'UI/UI_BUT_A_BG_01', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['FUN'],
            fg: { data: 'UI/UI_BUT_A', alpha: 1, x: 0, y: 0 },
            callback_function: this.spinClicked.bind(this)
        })
        this.bg.name = BTGUIConstants.BG
        this.bg.x = 0
        this.bg.y = 0
        this.bg.buttonText.text = window.Lang.default['FUN'].str.replace("%d", 0).replace("%c", "FUN")
        this.addChild(this.bg)
        // this.bg.x = this.bg.x +1
        // this.bg.y = this.bg.y - 39+ 107


        this.fg.x = this.bg.x + 60
        this.fg.y = this.bg.y - 20
        this.addChild(this.fg)

        this.minusbetbtn = new BTGButton()
        this.minusbetbtn.init({
            bg: { data: 'UI/UI_BUT_E_BG_01', alpha: 1, x: 0, y: 0 },
            // text: window.Lang.default['TEST'],
            fg: { data: 'UI/UI_BUT_E', alpha: 1, x: 0, y: 0 },
            icon: { data: 'UI/UI_Arrow_01', alpha: 1, x: 82, y: 53 },
            callback_function: this.spinClicked.bind(this)

        })
        this.minusbetbtn.name = BTGUIConstants.CHANGE_BET_MINUS
        this.minusbetbtn.icon.rotation = 1.5708 * 2
        this.minusbetbtn.bg.tint = 0x128212;

        this.addChild(this.minusbetbtn)
        this.minusbetbtn.x = this.bg.x + 7
        this.minusbetbtn.y = this.bg.y - 39 + 107


        this.plusbetbtn = new BTGButton()
        this.plusbetbtn.init({
            bg: { data: 'UI/UI_BUT_E_BG_01', alpha: 1, x: 0, y: 0 },
            fg: { data: 'UI/UI_BUT_E', alpha: 1, x: 0, y: 0 },
            icon: { data: 'UI/UI_Arrow_01', alpha: 1, x: 58, y: 24 },
            callback_function: this.spinClicked.bind(this)

        })
        this.plusbetbtn.bg.tint = 0x128212;
        this.plusbetbtn.name = BTGUIConstants.CHANGE_BET_PLUS
        this.addChild(this.plusbetbtn)
        this.plusbetbtn.x = this.bg.x + 151
        this.plusbetbtn.y = this.bg.y - 39 + 107

    }

    spinClicked(obj) {
        if (this.callback_function) {
            this.callback_function(obj)
        }
    }

    get_size() {
        var bg = this.bg.get_size()
        var fg = this.bg.get_size()
        if (this.bg) {
            return { width: bg.width, height: bg.height, heightfg: fg.height }
        }
        return { width: 0, height: 0 }
    }


    change_bet(currency, bet) {
        this.bg.buttonText.text = window.Lang.default['FUN'].str.replace("%d", bet).replace("%c", currency)
    }

    change_position(x, y) {

        this.bg.x = x
        this.bg.y = y

        this.fg.x = this.bg.x
        this.fg.y = this.bg.y - 39

        this.buyButton.x = this.bg.x + 1
        this.buyButton.y = this.bg.y + 68
    }

}


export default Changebet;

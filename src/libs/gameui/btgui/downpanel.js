import * as PIXI from 'pixi.js'

class DownPanel extends PIXI.Sprite {
    blackBG = null
    bg = null
    originHeight = 40
    balanceTxt = null
    winTxt = null
    msgText = null

    init(obj) {
        this.blackBG = this.createRect(
            100,
            100,
            0x000000
        );
        this.addChild(this.blackBG)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("UI/UI_BottomBar_BG"));
        this.addChild(this.bg)

        this.balanceTxt = new PIXI.Text(window.Lang.default['DWN_BALANCE'].str, window.Lang.default['DWN_BALANCE']);
        this.balanceTxt.position.set(0, 0);
        this.addChild(this.balanceTxt)
        this.balanceTxt.alpha = 0


        this.winTxt = new PIXI.Text(window.Lang.default['DWN_WIN'].str, window.Lang.default['DWN_WIN']);
        this.winTxt.position.set(0, 0);
        this.winTxt.anchor.set(1, 0);
        this.addChild(this.winTxt)
        this.winTxt.alpha = 0

        this.msgText = new PIXI.Text(window.Lang.default['DWN_WIN'].str, window.Lang.default['DWN_WIN']);
        this.msgText.position.set(0, 0);
        this.msgText.anchor.set(0.5, 0);
        this.addChild(this.msgText)
        this.msgText.alpha = 0

    }

    update(obj) {
        if (obj.balance >= 0) {
            this.balanceTxt.alpha = 1
            var bal = "" + window.Lang.default['DWN_BALANCE'].str
            this.balanceTxt.text = bal.replace('%c', obj.currency).replace('%d', obj.balance.toLocaleString(undefined,{minimumFractionDigits: 2}))
        }


        if (obj.win >= 0) {
            this.winTxt.alpha = 1
            var win = "" + window.Lang.default['DWN_WIN'].str
            this.winTxt.text = win.replace('%c', obj.currency).replace('%d', obj.win.toLocaleString(undefined,{minimumFractionDigits: 2}))
        }

        if (obj.msg) {
            this.msgText.alpha = 1
            this.msgText.text = obj.msg
        }



    }


    createRect(width, height, color) {
        var holderMask = new PIXI.Graphics();
        holderMask.beginFill(color, 1);
        holderMask.moveTo(0, 0);
        holderMask.lineTo(width, 0);
        holderMask.lineTo(width, height);
        holderMask.lineTo(0, height);
        holderMask.lineTo(0, 0);
        return holderMask
    }



    resize(w, h, s) {
        this.blackBG.width = w

        this.blackBG.height = this.originHeight * s
        this.blackBG.y = h - this.blackBG.height

        this.bg.width = this.blackBG.width
        this.bg.height = this.blackBG.height
        this.bg.y = h - this.bg.height - 3

        this.balanceTxt.position.set(20 * s, this.blackBG.y + 5 * s);
        this.balanceTxt.style.fontSize = parseInt(window.Lang.default['DWN_BALANCE'].fontSize * s)

        this.winTxt.position.set(w - 20 * s, this.blackBG.y + 5 * s);
        this.winTxt.style.fontSize = parseInt(window.Lang.default['DWN_WIN'].fontSize * s)


        this.msgText.position.set(w / 2, this.blackBG.y + 5 * s);
        this.msgText.style.fontSize = parseInt(window.Lang.default['DWN_MSG'].fontSize * s)

    }

    get_size() {
        if (this.bg) {
            return { width: this.bg.width, height: this.bg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default DownPanel;

import * as PIXI from 'pixi.js'
import MainPopup from "./mainpopup"
import BTGButton from "./btgbutton"

class MessageWindow extends MainPopup {
    holder = null
    blackBG = null
    init(obj) {
        this.blackBG = this.createRect(
            100,
            100,
            0x000000
        );
        this.blackBG.interactive = true;
        this.blackBG.alpha = 0.3
        this.addChild(this.blackBG)


        this.holder = new PIXI.Sprite()
        this.addChild(this.holder)
        this.bg = PIXI.Sprite.from(PIXI.Texture.from("FreeSpinWindow/MessageWindow_BG_01"));
        this.bg.x = 0
        this.bg.y = 0
        this.bg.anchor.set(0.5, 0.5);
        this.holder.addChild(this.bg)

        console.dir(this.get_size())
        this.closeBtn = new BTGButton()
        this.closeBtn.init({
            bg: { data: 'ButtonGreen_01', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['MSG_OK'],
            callback_function: function () {
                this.hidePopup(0)
            }.bind(this)
        })

        this.closeBtn.scale.x = this.closeBtn.scale.y = 0.8
        this.closeBtn.x = -90
        this.closeBtn.y = 100
        

        this.header = new PIXI.Text(obj.header, window.Lang.default['MSG_HEADER']);
        this.header.anchor.set(0.5, 0.5);
        this.header.position.set(0, -140);
        this.holder.addChild(this.header)

        this.content = new PIXI.Text(obj.content, window.Lang.default['MSG_CONTENT']);
        this.content.anchor.set(0.5, 0.5);
        this.content.position.set(0, -90);
        this.holder.addChild(this.content)

        this.holder.addChild(this.closeBtn)
    }

    resize(w, h, s) {
        this.holder.scale.x = this.holder.scale.y = s
        this.holder.x = w/2
        this.holder.y = h / 2
        this.blackBG.x = 0
        this.blackBG.y = 0
        this.blackBG.width = w
        this.blackBG.height = h
    }


    get_size() {
        if (this.bg) {
            return { width: this.bg.width, height: this.bg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default MessageWindow;

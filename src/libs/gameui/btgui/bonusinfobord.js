import * as PIXI from 'pixi.js'
import BTGButton from "./btgbutton"
import BTGUIConstants from "./constants"
import MainPopup from "./mainpopup"

class BonusInfoBord extends MainPopup {
    callback_function = null
    bg = null
    fg = null
    textbanername = null
    infotext = null
    infotextdefaulvar = null
    playedfreespin = null
    remainingfreespin = null
    playedtext = null
    remainingtext = null
    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.fg = PIXI.Sprite.from(PIXI.Texture.from(obj.banerbg));
        this.fg.x = 0
        this.fg.y = 0
        this.addChild(this.fg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("UI/UI_BUT_A"));
        this.bg.x = 0
        this.bg.y = 0
        this.addChild(this.bg)


        switch (obj.banerstatus) {
            case 'infobord':
                this.infobordtext(obj)
                break;
            case 'freespininfobord':
                this.freespinintext(obj)
                break;
            default:
                break;
        }

    }

    infobordtext(obj) {

        this.textbanername = new PIXI.Text(window.Lang.default[obj.banernametext].str, window.Lang.default[obj.banernametext])
        this.textbanername.anchor.set(0.5, 0.5)
        this.textbanername.position.set(150, 115)
        this.addChild(this.textbanername)

        this.infotext = new PIXI.Text(window.Lang.default[obj.infotext].str, window.Lang.default[obj.infotext])
        this.infotext.anchor.set(0.5, 0.5)
        this.infotext.position.set(150, 60)
        this.addChild(this.infotext)

        this.infotextdefaulvar = obj.infotext
    }

    freespinintext(obj) {

        this.textbanername = new PIXI.Text(window.Lang.default[obj.banernametext].str, window.Lang.default[obj.banernametext])
        this.textbanername.anchor.set(0.5, 0.5)
        this.textbanername.position.set(150, 32)
        this.addChild(this.textbanername)

        this.playedfreespin = new PIXI.Text(window.Lang.default["FREESPINSCOUNT"].str, window.Lang.default["FREESPINSCOUNT"])
        this.playedfreespin.anchor.set(0.5, 0.5)
        this.playedfreespin.position.set(85, 75)
        this.addChild(this.playedfreespin)

        this.remainingfreespin = new PIXI.Text(window.Lang.default["FREESPINSCOUNT"].str, window.Lang.default["FREESPINSCOUNT"])
        this.remainingfreespin.anchor.set(0.5, 0.5)
        this.remainingfreespin.position.set(215, 75)
        this.addChild(this.remainingfreespin)

        this.playedtext = new PIXI.Text(window.Lang.default["PLAYED"].str, window.Lang.default["PLAYED"])
        this.playedtext.anchor.set(0.5, 0.5)
        this.playedtext.position.set(85, 115)
        this.addChild(this.playedtext)

        this.remainingtext = new PIXI.Text(window.Lang.default["REMAINING"].str, window.Lang.default["REMAINING"])
        this.remainingtext.anchor.set(0.5, 0.5)
        this.remainingtext.position.set(215, 115)
        this.addChild(this.remainingtext)

        this.infotextdefaulvar = "FREESPINSCOUNT"


    }
    spinsLeft = -1
    updateInfoBoardText(c, d) {
        this.infotext.text = window.Lang.default[this.infotextdefaulvar].str.replace("%c", c).replace("%d", d)
    }

    updateFreeSpinText(p, r) {

        console.log(`this.spinsLeft = ${this.spinsLeft} ${r}`)
        if (this.spinsLeft != -1) {
            if (this.spinsLeft < r) {
                console.log('animating add')
                //00000
                var extraSpin = this.getAnimatedSprite(`DB_ExtraSpin_02/DB_ExtraSpin_02_%frame%`, 0, 12)
                extraSpin.play()
                extraSpin.loop = true
                extraSpin.x = 155
                extraSpin.y = 15
                //extraSpin.animationSpeed = 0.5
                //extraSpin.scale.x = extraSpin.scale.y = 0.9
                extraSpin.onLoop = function () {
                    console.log('looooooop')
                    if (this.spinsLeft < r) {
                        this.spinsLeft++
                        this.remainingfreespin.text = window.Lang.default[this.infotextdefaulvar].str.replace("%d", this.spinsLeft)
                    } else {
                        extraSpin.stop()
                        this.removeChild(extraSpin)
                    }
                }.bind(this);
                this.addChild(extraSpin)
                this.addChild(this.playedfreespin)
            } else {
                this.spinsLeft = r
                this.remainingfreespin.text = window.Lang.default[this.infotextdefaulvar].str.replace("%d", r)
                this.playedfreespin.text = window.Lang.default[this.infotextdefaulvar].str.replace("%d", p)
            }
        } else {
            this.spinsLeft = r
            this.remainingfreespin.text = window.Lang.default[this.infotextdefaulvar].str.replace("%d", r)
            this.playedfreespin.text = window.Lang.default[this.infotextdefaulvar].str.replace("%d", p)
        }




    }


    get_size() {
        if (this.fg) {
            return { width: this.fg.width, height: this.fg.height }
        }
        return { width: 0, height: 0 }
    }



}


export default BonusInfoBord;

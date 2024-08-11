import * as PIXI from 'pixi.js'
import BTGButton from "../btgui/btgbutton"
import BTGUIConstants from "../btgui/constants"
import MainPopup from "../btgui/mainpopup"

class optionsPage extends MainPopup {
    callback_function = null
    bg = null
    replay = null
    soundOn = null
    soundOff = null
    soundText = null
    bulletArr = []

    funValue = 50


    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Menu/Panel_02"));
        this.bg.x = 76
        this.bg.y = 170
        this.bg.scale.x = 1.31
        this.bg.scale.y = 1.31
        this.addChild(this.bg)

        // this.replay = new BTGButton()
        // this.replay.init({
        //     bg: { data: 'ButtonGreen_03', alpha: 1, x: 0, y: 0 },
        //     text: window.Lang.default['MENUSOUNDBUTONREPLAYREXT'],
        //     callback_function: this.spinClicked.bind(this)
        // })
        // this.replay.x = 156
        // this.replay.y = 270
        // this.replay.scale.x = 0.5
        // this.replay.scale.y = 0.5
        // this.replay.name = BTGUIConstants.MENU_OPTIONS_REPLAY
        // this.addChild(this.replay)



        this.soundText = new PIXI.Text(window.Lang.default['MENUSOUNDOFFTEXT'].str, window.Lang.default['MENUSOUNDOFFTEXT']);
        this.soundText.anchor.set(0.5, 0.5);
        this.soundText.position.set(620, 200);
        this.addChild(this.soundText)

        this.soundOff = new BTGButton()
        this.soundOff.init({
            bg: { data: 'Menu/BUT_Radio_01', alpha: 1, x: 0, y: 0 },
            bg2: { data: 'Menu/BUT_Radio_01_Pressed', alpha: 0, x: 0, y: 0 },
            callback_function: this.soundMute.bind(this)
        })
        this.soundOff.x = 670
        this.soundOff.y = 180
        this.soundOff.name = BTGUIConstants.MENU_BUTTONS
        this.addChild(this.soundOff)

        this.soundText = new PIXI.Text(window.Lang.default['MENUSOUNDONTEXT'].str, window.Lang.default['MENUSOUNDONTEXT']);
        this.soundText.anchor.set(0.5, 0.5);
        this.soundText.position.set(820, 200);
        this.addChild(this.soundText)

        this.soundOn = new BTGButton()
        this.soundOn.init({
            bg: { data: 'Menu/BUT_Radio_01', alpha: 1, x: 0, y: 0 },
            bg2: { data: 'Menu/BUT_Radio_01_Pressed', alpha: 0, x: 0, y: 0 },
            callback_function: this.SoundUnMute.bind(this)
        })
        this.soundOn.x = 860
        this.soundOn.y = this.soundOff.y
        this.soundOn.name = BTGUIConstants.MENU_BUTTONS
        this.addChild(this.soundOn)

        this.soundText = new PIXI.Text(window.Lang.default['MENUSOUNDTEXT'].str, window.Lang.default['MENUSOUNDTEXT']);
        this.soundText.anchor.set(0.5, 0.5);
        this.soundText.position.set(170, 200);
        this.addChild(this.soundText)
        this.btnBgStaus(window.SoundManager.isMuted()?0:1)



    }

    soundMute() {
        this.btnBgStaus(0)
        window.SoundManager.mute()
    }

    SoundUnMute() {
        window.SoundManager.unMute()
        this.btnBgStaus(1)
    }

    btnBgStaus(stat) {
        this.soundOff.bg2.alpha = 1 - stat
        this.soundOn.bg2.alpha = stat
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


export default optionsPage;

import * as PIXI from 'pixi.js'
import BTGButton from "../btgui/btgbutton"
import BTGUIConstants from "../btgui/constants"
import MainPopup from "../btgui/mainpopup"
import PaysPage from './payspage'
import AutoPage from './autopage'
import OptionsPage from './optionspage'
import HelpPage from './helppage'

class MenuPopup extends MainPopup {
    callback_function = null
    eventHandler = null
    bg = null
    homeBtn = null
    exitBtn = null
    exitasfasfBtn = null
    activPage = null
    aqtivpageindex = 0
    pagearr = [PaysPage, AutoPage, OptionsPage, HelpPage]
    btntextarr = ['PAYS', 'AUTO', 'OPTIONS', 'HELP']
    btnarr = []



    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
        if (obj.eventHandler) {
            this.eventHandler = obj.eventHandler
        }
        this.alpha = 0

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Menu/Menu_BG_01"));
        this.bg.x = 0
        this.bg.y = 0
        this.addChild(this.bg)


        switch (obj.startPage) {
            case "PAYS":
                this.changePage(0)
                break;
            case "AUTO":
                this.changePage(1)
                break;
            default:
                break;
        }

        this.createBtn()

    }

    createBtn() {

        this.homeBtn = new BTGButton()
        this.homeBtn.init({
            bg: { data: 'Menu/BUT_Home_01', alpha: 1, x: 0, y: 0 },
            callback_function: this.spinClicked.bind(this)
        })
        this.homeBtn.name = BTGUIConstants.MENU_HOME
        this.addChild(this.homeBtn)
        this.homeBtn.x = 70
        this.homeBtn.y = 61

        for (let i = 0; i < this.btntextarr.length; i++) {
            var test = null
            test = new BTGButton()
            test.init({
                bg: { data: 'Menu/TAB_Menu_01', alpha: 1, x: 0, y: 0 },
                pressed: { data: 'Menu/TAB_Menu_01_Pressed', alpha: 0, x: 0, y: 0 },
                text: window.Lang.default[this.btntextarr[i]],
                callback_function: this.callbackChangePage.bind(this, i)
            })
            test.name = BTGUIConstants.MENU_BUTTONS
            this.addChild(test)
            test.x = this.homeBtn.x + this.homeBtn.get_size().width + test.get_size().width * i
            test.y = this.homeBtn.y
            this.btnarr[i] = test
        }

        this.exitBtn = new BTGButton()
        this.exitBtn.init({
            bg: { data: 'Menu/BUT_CloseMenu_01', alpha: 1, x: 0, y: 0 },
            callback_function: this.spinClicked.bind(this)
        })
        this.exitBtn.name = BTGUIConstants.MENU_EXIT
        this.addChild(this.exitBtn)
        this.exitBtn.x = this.btnarr[3].x + this.btnarr[3].get_size().width
        this.exitBtn.y = this.homeBtn.y

        this.exitasfasfBtn = new BTGButton()
        this.exitasfasfBtn.init({
            bg: { data: 'Menu/TAB_Menu_01_Pressed', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default[this.btntextarr[this.aqtivpageindex]],
            callback_function: this.spinClicked.bind(this)
        })
        this.exitasfasfBtn.name = BTGUIConstants.MENU_EXIT
        this.addChild(this.exitasfasfBtn)
        this.exitasfasfBtn.x = this.btnarr[this.aqtivpageindex].x
        this.exitasfasfBtn.y = this.homeBtn.y
        this.exitasfasfBtn.alpha = 1

    }


    changeExitButonPozition() {
        if (this.exitasfasfBtn == null) return
        this.exitasfasfBtn.buttonText.text = window.Lang.default[this.btntextarr[this.aqtivpageindex]].str
        this.exitasfasfBtn.x = this.btnarr[this.aqtivpageindex].x
    }


    changePage(pageindex) {

        if (this.activPage != null) {
            this.activPage.alpha = 0;
            this.removeChild(this.activPage)
            this.activPage = null;
        }

        this.activPage = new this.pagearr[pageindex]()
        this.activPage.init({
            callback_function: this.callback_function
        })
        this.activPage.alpha = 1
        this.addChild(this.activPage)
        this.aqtivpageindex = pageindex
        this.changeExitButonPozition()
        if(this.eventHandler){
            this.eventHandler('changepage',this)
        }
    }


    callbackChangePage(pageindex) {
        this.changePage(pageindex)
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


export default MenuPopup;

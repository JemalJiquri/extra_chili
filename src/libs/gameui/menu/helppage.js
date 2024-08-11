import * as PIXI from 'pixi.js'
import BTGButton from "../btgui/btgbutton"
import BTGUIConstants from "../btgui/constants"
import MainPopup from "../btgui/mainpopup"

class helpPage extends MainPopup {
    callback_function = null
    bg = null
    leftBtn = null
    raightBtn = null
    activbullet = null
    titleText = null
    infoText = null
    bgbaners = null
    activPageindex = 0
    bulletArr = []
    textsArr = []

    funValue = 50


    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.createBulets()

        this.leftBtn = new BTGButton()
        this.leftBtn.init({
            bg: { data: 'Menu/BUT_Next_01', alpha: 1, x: 0, y: 0 },
            callback_function: this.changePage.bind(this, -1)
        })
        this.leftBtn.name = BTGUIConstants.MENU_BUTTONS
        this.addChild(this.leftBtn)
        this.leftBtn.x = 55
        this.leftBtn.y = 430
        this.leftBtn.rotation = 1.5708 * 2

        this.raightBtn = new BTGButton()
        this.raightBtn.init({
            bg: { data: 'Menu/BUT_Next_01', alpha: 1, x: 0, y: 0 },
            callback_function: this.changePage.bind(this, 1)
        })
        this.raightBtn.name = BTGUIConstants.MENU_BUTTONS
        this.addChild(this.raightBtn)
        this.raightBtn.x = 955
        this.raightBtn.y = this.leftBtn.y - 125

        // Paytable/BTG_Logo_01
        this.bgbaners = PIXI.Sprite.from(PIXI.Texture.from("Paytable/BTG_Logo_01"));
        this.bgbaners.x = 90
        this.bgbaners.y = 225
        this.bgbaners.scale.x = 0.3
        this.bgbaners.scale.y = 0.3
        this.addChild(this.bgbaners)

        this.changePage(0)

    }

    createBulets() {
        for (let i = 0; i < 15; i++) {
            var bullet = null
            bullet = PIXI.Sprite.from(PIXI.Texture.from("Menu/Bullet_01"))
            bullet.x = 320 + 20 * i
            bullet.y = 620
            this.addChild(bullet)
            this.bulletArr.push(bullet)
        }
    }

    changeBulet() {
        if (this.activPageindex > this.bulletArr.length - 1) return

        for (let i = 0; i < this.bulletArr.length; i++) this.bulletArr[i].alpha = 1
        this.bulletArr[this.activPageindex].alpha = 0
        if (this.activbullet != null) this.activbullet.alpha = 0
        this.activbullet = null

        this.activbullet = PIXI.Sprite.from(PIXI.Texture.from("Menu/Bullet_01_Pressed"))
        this.activbullet.x = this.bulletArr[this.activPageindex].x
        this.activbullet.y = this.bulletArr[this.activPageindex].y
        this.addChild(this.activbullet)
    }

    changePage(obj) {
        this.activPageindex = (this.activPageindex + obj) % 15
        if (this.activPageindex < 0) this.activPageindex = 14
        this.bgbaners.alpha = 0
        if (this.activPageindex === 14) this.bgbaners.alpha = 1

        this.pageText()
        this.changeBulet()
    }

    pageText() {
        if (this.titleText != null) {
            this.titleText.alpha = 0
            this.titleText = null
            this.infoText.alpha = 0
            this.infoText = null
        }
        var indextitle = (this.activPageindex + 1) * 10 + 1
        var indexinfo = (this.activPageindex + 1) * 10 + 2

        this.titleText = new PIXI.Text(window.Lang.default['HELPTEXT' + indextitle].str, window.Lang.default['HELPTEXT' + indextitle]);
        this.titleText.anchor.set(0, 0.5);
        this.titleText.position.set(90, 180);
        this.addChild(this.titleText)

        this.infoText = new PIXI.Text(window.Lang.default['HELPTEXT' + indexinfo].str, window.Lang.default['HELPTEXT' + indexinfo]);
        this.infoText.anchor.set(0, 0);
        this.infoText.position.set(90, 210);
        this.addChild(this.infoText)
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


export default helpPage;

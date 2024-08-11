import * as PIXI from 'pixi.js'
import BTGButton from "../btgui/btgbutton"
import BTGUIConstants from "../btgui/constants"
import MainPopup from "../btgui/mainpopup"
import PageA from "./pagesforpays/pagea"
import PageB from "./pagesforpays/pageb"
import PageC from "./pagesforpays/pagec"
import PageD from "./pagesforpays/paged"
import PageE from "./pagesforpays/pagee"
import PageF from "./pagesforpays/pagef"
import PageG from "./pagesforpays/pageg"
import PageH from "./pagesforpays/pageh"


class paysPage extends MainPopup {
    callback_function = null
    bg = null
    leftPaysBtn = null
    raightPaysBtn = null
    activbullet = null
    activPaysPage = 0
    bulletArr = []
    pagesArr = [PageA, PageB, PageC, PageD, PageE, PageF, PageG, PageH]

    funValue = 50


    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.createpagearr()
        this.changepayspage()
        this.createBtm()

    }

    createBulets(num) {
        for (let i = 0; i < num; i++) {
            var bullet = null
            bullet = PIXI.Sprite.from(PIXI.Texture.from("Menu/Bullet_01"))
            bullet.x = 430 + 20 * i
            bullet.y = 620
            this.addChild(bullet)
            this.bulletArr.push(bullet)
        }
    }


    createBtm() {

        this.leftPaysBtn = new BTGButton()
        this.leftPaysBtn.init({
            bg: { data: 'Menu/BUT_Next_01', alpha: 1, x: 0, y: 0 },
            callback_function: this.callbackChangePaysPage.bind(this, -1)

        })
        this.leftPaysBtn.name = BTGUIConstants.MENU_BUTTONS
        this.addChild(this.leftPaysBtn)
        this.leftPaysBtn.x = 55
        this.leftPaysBtn.y = 430
        this.leftPaysBtn.rotation = 1.5708 * 2

        this.raightPaysBtn = new BTGButton()
        this.raightPaysBtn.init({
            bg: { data: 'Menu/BUT_Next_01', alpha: 1, x: 0, y: 0 },
            callback_function: this.callbackChangePaysPage.bind(this, 1)

        })
        this.raightPaysBtn.name = BTGUIConstants.MENU_BUTTONS
        this.addChild(this.raightPaysBtn)
        this.raightPaysBtn.x = 955
        this.raightPaysBtn.y = this.leftPaysBtn.y - 125
    }


    createpagearr() {
        this.createBulets(this.pagesArr.length)
        for (let i = 0; i < this.pagesArr.length; i++) {
            var test = null
            test = new this.pagesArr[i]()
            test.init({})
            test.alpha = 0
            this.addChild(test)
            this.pagesArr[i] = test

        }

    }

    changeBulet() {
        if (this.activPaysPage > this.bulletArr.length - 1) return

        for (let i = 0; i < this.bulletArr.length; i++) this.bulletArr[i].alpha = 1
        this.bulletArr[this.activPaysPage].alpha = 0
        if (this.activbullet != null) this.activbullet.alpha = 0
        this.activbullet = null

        this.activbullet = PIXI.Sprite.from(PIXI.Texture.from("Menu/Bullet_01_Pressed"))
        this.activbullet.x = this.bulletArr[this.activPaysPage].x
        this.activbullet.y = this.bulletArr[this.activPaysPage].y
        this.addChild(this.activbullet)
    }

    changepayspage() {
        this.changeBulet(this.activPaysPage)
        for (let i = 0; i < this.pagesArr.length; i++) {
            this.pagesArr[i].alpha = 0
        }
        this.pagesArr[this.activPaysPage].alpha = 1
    }


    callbackChangePaysPage(obj) {
        if (this.activPaysPage + obj < 0) this.activPaysPage = 7
        else this.activPaysPage = (this.activPaysPage + obj) % 8
        this.changepayspage()
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


export default paysPage;

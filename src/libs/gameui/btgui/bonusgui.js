import * as PIXI from 'pixi.js'
import BonusInfoBord from "./bonusinfobord"
import BTGUIConstants from "./constants"
//import DownPanel from './downpanel'
//git add . && git commit -m "fixes" && git push -u origin main

//git add . ; git commit -m "fixes" ; git push -u origin main
class BonusUI extends PIXI.Sprite {


    parent_obj = null
    betbord = null
    xbord = null
    winbord = null
    freespinbord = null
    logo = null
    bonusinfobord = null
    currentSize = { w: 0, h: 0, s: 1, o: 20 }
    logoImg = null


    init(_parent) {
        this.parent_obj = _parent

        this.betbord = new BonusInfoBord()
        this.betbord.init({
            callback_function: this.buttonClicked.bind(this),
            banerstatus: 'infobord',
            banerbg: 'UI/UI_BUT_A_BG_04',
            banernametext: 'FSS',
            infotext: 'FUNINBONUS'
        })

        this.betbord.name = BTGUIConstants.BG
        this.addChild(this.betbord)

        this.betbord.updateInfoBoardText("FUN", 0)

        this.xbord = new BonusInfoBord()
        this.xbord.init({
            callback_function: this.buttonClicked.bind(this),
            banerstatus: 'infobord',
            banerbg: 'UI/UI_BUT_A_BG_04',
            banernametext: 'WM',
            infotext: 'XINBONUS'
        })

        this.xbord.name = BTGUIConstants.BG
        this.addChild(this.xbord)
        this.xbord.x = 400
        this.xbord.updateInfoBoardText("X", 1)


        this.winbord = new BonusInfoBord()
        this.winbord.init({
            callback_function: this.buttonClicked.bind(this),
            banerstatus: 'infobord',
            banerbg: 'UI/UI_BUT_A_BG_04',
            banernametext: 'TW',
            infotext: 'FUNINBONUS'
        })

        this.winbord.name = BTGUIConstants.BG
        this.addChild(this.winbord)
        this.winbord.y = 200
        this.winbord.updateInfoBoardText("FUN", 0)



        this.freespinbord = new BonusInfoBord()
        this.freespinbord.init({
            callback_function: this.buttonClicked.bind(this),
            banerstatus: 'freespininfobord',
            banerbg: 'UI/UI_BUT_A_BG_02',
            banernametext: 'FS',
        })
        //this.freespinbord.updateFreeSpinText(0, 0)


        this.freespinbord.name = BTGUIConstants.BG
        this.addChild(this.freespinbord)
        this.freespinbord.y = 200
        this.freespinbord.x = 400



        this.logoImg = PIXI.Sprite.from(PIXI.Texture.from("DB_Logo_01"));
        this.logoImg.scale.x = this.logoImg.scale.y = 0.5
        this.logo = new PIXI.Sprite()

        this.logo.x = 0
        this.logo.y = 0
        this.logo.addChild(this.logoImg)
        this.addChild(this.logo)

        //this.downPanel = new DownPanel()
        //this.downPanel.init({})
        //this.addChild(this.downPanel)

    }

    buttonClicked(obj) {
        this.parent_obj.buttonClicked(obj.name)
    }


    update(obj) {
        if (obj.hasOwnProperty('spinsPlayed')) {
            this.freespinbord.updateFreeSpinText(obj.spinsPlayed, obj.spinsLeft)
        }
        if (obj.hasOwnProperty('multValue')) {
            this.xbord.updateInfoBoardText('X', obj.multValue)
        }
        if (obj.hasOwnProperty('winValue')) {
            this.winbord.updateInfoBoardText(obj.currency, obj.winValue)
        }

        if (obj.hasOwnProperty('stakeValue')) {
            this.betbord.updateInfoBoardText(obj.currency, obj.stakeValue)
        }
    }

    buttonsscale(s) {
        // betbord xbord winbord freespinbord logo
        this.logo.scale.x = s
        this.logo.scale.y = s
        this.betbord.scale.x = s
        this.betbord.scale.y = s

        this.xbord.scale.x = s
        this.xbord.scale.y = s

        this.winbord.scale.x = s
        this.winbord.scale.y = s

        this.freespinbord.scale.x = s
        this.freespinbord.scale.y = s

    }

    resize(_w = 2040, _h = 1020, _s = 1, _o = 20) {
        this.buttonsscale(_s)


        if (_w > 0) {
            this.currentSize.w = _w
            this.currentSize.h = _h
            this.currentSize.s = _s
            this.currentSize.o = _o
        }
        this.buttonsscale(this.currentSize.s)

        var prop = this.currentSize.w / this.currentSize.h
        console.log(prop)
        if (prop > 1.7) {
            this.resizeRight(this.currentSize.w, this.currentSize.h, this.currentSize.s, this.currentSize.o)
        } else {
            var t = 0
            if (prop < 1.4) {
                t = 2
            }


            this.resizeDown(this.currentSize.w, this.currentSize.h, this.currentSize.s, t)
        }

    }


    resizeRight(w, h, s, o) {
        var freespinbordSize = this.freespinbord.get_size()

        var currentY = 0

        this.freespinbord.x = w - (freespinbordSize.width + o) * s
        this.freespinbord.y = h - (freespinbordSize.height + 50) * s

        currentY = this.freespinbord.y


        this.winbord.x = w - (this.winbord.get_size().width + o) * s
        this.winbord.y = currentY - (this.winbord.get_size().height + 20) * s
        currentY = this.winbord.y

        this.betbord.x = w - (this.betbord.get_size().width + o) * s
        this.betbord.y = currentY - (this.betbord.get_size().height + 20) * s
        currentY = this.betbord.y

        this.xbord.x = w - (this.xbord.get_size().width + o) * s
        this.xbord.y = currentY - (this.xbord.get_size().height + 20) * s
        currentY = this.xbord.y



        var scaleFactor = (freespinbordSize.width * s) / this.logoImg.width


        this.logo.scale.x = scaleFactor
        this.logo.scale.y = scaleFactor
        this.logo.x = w - (this.logoImg.width + o + 50) * s
        this.logo.y = 20 * s


    }



    resizeDown(w, h, s, t) {
        var freespinbordSize = this.freespinbord.get_size()


        this.freespinbord.x = w - (freespinbordSize.width + 20) * s
        this.freespinbord.y = h - (freespinbordSize.height + 2) * s



        this.winbord.x = w - (this.winbord.get_size().width + freespinbordSize.width + 20) * s
        this.winbord.y = h - (this.winbord.get_size().height + 2) * s

        this.betbord.x = 20 * s
        this.betbord.y = h - (this.betbord.get_size().height + 2) * s

        this.xbord.x = this.betbord.x + (this.xbord.get_size().width + 20) * s
        this.xbord.y = h - (this.xbord.get_size().height + 2) * s



        var scaleFactor = (freespinbordSize.width * s) / this.logoImg.width



        if (t == 2) {
            var scaleFactor = (freespinbordSize.height * s) / this.logoImg.height
            this.logo.scale.x = scaleFactor
            this.logo.scale.y = scaleFactor
            this.logo.x = w / 2 - (this.logoImg.width * s / 2)
            this.logo.y = 20 * s
        } else {
            var scaleFactor = (freespinbordSize.height * s) / this.logoImg.height
            this.logo.scale.x = scaleFactor
            this.logo.scale.y = scaleFactor
            this.logo.x = w / 2 - (this.logoImg.width * s / 2)
            this.logo.y = h - (this.logoImg.height + 2) * s
        }




    }







}


export default BonusUI;

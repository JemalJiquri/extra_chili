import * as PIXI from 'pixi.js'
import DynamicSizeRheelHolder from '../libs/mainlib/rheel/DynamicSizeRheelHolder'
import RheelConfig from '../libs/mainlib/rheel/RheelConfig'
import BTGUIConstants from "../libs/gameui/btgui/constants"
import BonusUI from '../libs/gameui/btgui/bonusgui'
import TWEEN from '@tweenjs/tween.js';
import Background from './Background'
import Foreground from './Foreground'
import Globals from './Globals'
import WinHolder from '../libs/mainlib/rheel/WinHolder'

class MainSceneBonus extends PIXI.Sprite {
  bg = null
  fg = null
  rhholder = null
  btgui = null
  currentMessage = null
  freeSpinWheel = null
  selfMAsk = null
  bonusIndex = 0
  bonusData = null
  parentObj = null
  winHolder = null
  currentSound = null
  totalWin = 0
  currentBet = 1
  bottomWin = 0
  mainHolder = null


  init(_bonusData, _parent) {
    console.log("MainSceneBonus init");
    this.mainHolder = new PIXI.Sprite()
    this.addChild(this.mainHolder)



    Globals.downPanel.update({
      currency: window.SETTINGS.Currency,
      win: 0,
      msg:' '
    })
    this.parentObj = _parent
    this.currentBet = this.parentObj.currentBet
    this.bg = new Background()
    this.bg.init(true)
    this.mainHolder.addChild(this.bg);
    this.bonusData = _bonusData

    this.rhholder = new DynamicSizeRheelHolder()
    this.rhholder.x = 570;
    this.rhholder.y = 195;
    this.rhholder.build(this.bonusData, this, true)
    this.mainHolder.addChild(this.rhholder);
    this.rhholder.textSprite.x = RheelConfig.RheelUtils.TEXT_RHEEL_X
    this.rhholder.textSprite.y = RheelConfig.RheelUtils.TEXT_RHEEL_Y

    this.rhholder.xwinHolder.interactive = false;
    RheelConfig.RheelUtils.EXPLOSION_HOLDER.addChild(this.rhholder.xwinHolder)

    this.fg = new Foreground()
    this.fg.init(true)
    this.mainHolder.addChild(this.fg);
    this.mainHolder.addChild(this.rhholder.textSprite);
    this.btgui = new BonusUI()
    this.btgui.init(this)
    this.btgui.interactive = false;
    this.addChild(this.btgui);
    this.btgui.alpha = 0
    new TWEEN.Tween(this.btgui)
      .to({ alpha: 1 }, 700)
      .delay(700)
      .easing(TWEEN.Easing.Linear.None)
      .start()

    this.selfMAsk = RheelConfig.RheelUtils.createMask(
      Globals.width,
      Globals.height * 2
    );
    this.selfMAsk.y = -Globals.height / 2
    this.mainHolder.addChild(this.selfMAsk)
    this.mainHolder.mask = this.selfMAsk


    var white = RheelConfig.RheelUtils.createRect(
      Globals.windowWidth,
      Globals.windowHeight,
      0xffffff
    );
    new TWEEN.Tween(white)
      .to({ alpha: 0 }, 700)
      .easing(TWEEN.Easing.Linear.None)
      .onComplete(function () {
        white.parent.removeChild(white)
      }.bind(this)).start()

    RheelConfig.RheelUtils.EXPLOSION_HOLDER.addChild(white)
    this.resize()

    window.SoundManager.play({ name: "Bang10", loop: false })
    this.currentSound = window.SoundManager.play({ name: "BonanzaFreeSpins", loop: true })
  }

  resize() {

    this.mainHolder.scale.x = RheelConfig.RheelUtils.SCALE
    this.mainHolder.scale.y = RheelConfig.RheelUtils.SCALE
    this.rhholder.xwinHolder.scale.x = RheelConfig.RheelUtils.SCALE
    this.rhholder.xwinHolder.scale.y = RheelConfig.RheelUtils.SCALE

    var w = this.mainHolder.scale.x * Globals.width
    var h = this.mainHolder.scale.y * Globals.height

    this.mainHolder.x = (window.innerWidth - w) / 2
    this.mainHolder.y = (window.innerHeight - h) / 2
    this.rhholder.xwinHolder.x = this.mainHolder.x + this.rhholder.x * RheelConfig.RheelUtils.SCALE
    this.rhholder.xwinHolder.y = this.mainHolder.y + this.rhholder.y * RheelConfig.RheelUtils.SCALE


    var offset = 100
    var ossetFactor = window.innerWidth / window.innerHeight
    if (ossetFactor > 2 && ossetFactor < 7) {
      //100 3000
      console.log('offsetoffset '+offset)
      offset = 100+(ossetFactor-2)*2900/5
    }

    this.btgui.resize(window.innerWidth, window.innerHeight - Globals.downPanel.originHeight, RheelConfig.RheelUtils.SCALE*0.8,offset)
  }

  animateBonus() {
    this.currentMessage = this.bonusData.freespins[this.bonusIndex]
    this.totalWin = 0
    this.bottomWin = 0
    this.btgui.update({
      spinsPlayed: this.currentMessage.spinsPlayed,
      spinsLeft: this.currentMessage.spinsLeft,
      multValue: 1,
      currency: window.SETTINGS.Currency,
      winValue: 0,
      stakeValue: this.currentBet
    })

    this.rhholder.animate(this.currentMessage)
    this.bonusIndex++;
  }

  eventHandler(eventtype, caller) {
    console.log('bonuseventtype '+eventtype)
    switch (eventtype) {
      case 'xwin':
        this.btgui.update({
          multValue: caller.number
        })
        break;
      case 'respinfinished':
        console.log(caller.winnings)
        if (caller.winnings) {

          for (let index = 0; index < caller.winnings.length; index++) {
            this.bottomWin += (caller.winnings[0][2] / 100)

          }

          Globals.downPanel.update({
            currency: window.SETTINGS.Currency,
            win: this.bottomWin
          })



          if (caller.winnings.length == 1) {
            Globals.downPanel.update({
              msg: window.Lang.default['BOTTOM_WIN'].str
                .replace('%w', caller.winnings[0][6])
                .replace('%c', window.SETTINGS.Currency)
                .replace('%d', (caller.winnings[0][2] / 100))
            })

            setTimeout(function () {
              Globals.downPanel.update({
                msg: ' '
              })
            }.bind(this), 1000);
          }
        }
        break
      default:
        break;
    }

  }

  spinFinished() {
    var win = this.getWin(this.currentMessage)
    this.totalWin += win
    this.bottomWin = 0
    var winTime = 1000
    console.log('WinBonus: ' + this.totalWin + " " + this.getWin(this.currentMessage))

    if (win > 0) {
      var black = RheelConfig.RheelUtils.createRect(
        Globals.width,
        Globals.height,
        0x000000
      );
      black.alpha = 0
      this.mainHolder.addChild(black)
      this.winHolder = new WinHolder()


      this.winHolder.build(win, (win) / this.currentBet, black)

      this.winHolder.x = 570 + RheelConfig.RheelUtils.RHEEL_WIDTH / 2;
      this.winHolder.y = 195 + RheelConfig.RheelUtils.RHEEL_HEIGHT + RheelConfig.RheelUtils.SECONDARY_RHEEL_HEIGHT;
      winTime = this.winHolder.winTime + 2000
      this.mainHolder.addChild(this.winHolder)
      this.addChild(this.btgui);
    }



    setTimeout(function () {
      if (this.bonusIndex >= this.bonusData.freespins.length) {
        console.log('DynamicSizeRheelHolder all spinFinished bonus finished')
        var white = RheelConfig.RheelUtils.createRect(
          Globals.windowWidth,
          Globals.windowHeight,
          0xffffff
        );
        new TWEEN.Tween(white)
          .to({ alpha: 0 }, 700)
          .easing(TWEEN.Easing.Linear.None)
          .onComplete(function () {
            white.parent.removeChild(white)
          }.bind(this)).start()

        RheelConfig.RheelUtils.EXPLOSION_HOLDER.addChild(white)
        this.parent.removeChild(this)
        if(this.currentSound){
          this.currentSound.fadeOut()
        }
        

        this.parentObj.bonusSpinsFinished()
        return;
      }
      this.currentMessage = this.bonusData.freespins[this.bonusIndex]
      console.log(this.currentMessage)
      this.btgui.update({
        spinsPlayed: this.currentMessage.spinsPlayed,
        spinsLeft: this.currentMessage.spinsLeft,
        currency: window.SETTINGS.Currency,
        winValue: this.totalWin / 100,
        stakeValue: this.currentBet / 100
      })

      this.rhholder.animate(this.currentMessage)
      this.bonusIndex++;
      Globals.downPanel.update({
        currency: window.SETTINGS.Currency,
        win: 0
      })
    }.bind(this), winTime);
  }

  getWin(data) {
    if (data.winnings.length == 0) {
      return 0
    }

    var win = 0
    for (let index = 0; index < data.winnings.length; index++) {
      win = win + data.winnings[index][2]
    }
    if (data.respins) {
      for (let index = 0; index < data.respins.length; index++) {
        let respin = data.respins[index]
        for (let index2 = 0; index2 < respin.winnings.length; index2++) {
          win = win + respin.winnings[index2][2]
        }
      }
    }
    return win
  }


  buttonClicked(btnname) {
    console.dir('buttonClicked ' + btnname)
    switch (btnname) {
      case BTGUIConstants.SPIN:
        break;
      default:
        break;
    }
  }

  get_size() {
    return { width: Globals.width, height: Globals.height }
  }
}


export default MainSceneBonus

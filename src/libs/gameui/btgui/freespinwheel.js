import * as PIXI from 'pixi.js'
import Wheel from "./wheel"
import WheelDownPanel from "./wheeldownpanel"
import MainPopup from "./mainpopup"

class FreeSpinWheel extends MainPopup {
    callback_function = null
    bg = null
    dwnPanel = null
    upPanel = null
    leftPanel = null
    gambleBtn = null
    collectBtn = null
    wheel = null
    addTxt = null
    gambleTxt = null
    esc_01 = null
    esc_02 = null
    esc_03 = null
    esc_04 = null
    currentSound = null
    haveWin = false

    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.name = "wheel"
        this.bg = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_WhelGoldBG"));
        this.bg.x = 0
        this.bg.y = 0
        this.addChild(this.bg)

        this.wheel = new Wheel();
        this.wheel.init({
            index: 1,
            callback_function: this.wheelAnimationFinished.bind(this)
        })
        this.wheel.x = 155
        this.wheel.y = 55
        this.addChild(this.wheel)



        this.dwnPanel = new WheelDownPanel();
        this.dwnPanel.init({
            callback_function: this.spinClicked.bind(this)
        })
        this.dwnPanel.x = 100
        this.dwnPanel.y = 510
        this.addChild(this.dwnPanel)
        this.wheel.dwnPanel = this.dwnPanel


        this.upPanel = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_Panel_01"));
        this.upPanel.x = 100
        this.upPanel.y = -125
        this.addChild(this.upPanel)

        this.leftPanel = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_Panel_03"));
        this.leftPanel.x = -100
        this.leftPanel.y = -15
        this.addChild(this.leftPanel)


        this.addTxt = new PIXI.Text(window.Lang.default['ADD_EXTRA'].str, window.Lang.default['ADD_EXTRA']);

        this.addTxt.anchor.set(0.5, 0.5);
        this.addTxt.position.set(430, -80);
        this.addChild(this.addTxt)

        this.gambleTxt = new PIXI.Text(window.Lang.default['FREE_SPINS_GAMBLE'].str, window.Lang.default['FREE_SPINS_GAMBLE']);

        this.gambleTxt.anchor.set(0.5, 0.5);
        this.gambleTxt.position.set(430, -35);
        this.addChild(this.gambleTxt)



        this.esc_01 = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_X_01"));
        this.esc_01.x = -25
        this.esc_01.y = 380
        this.esc_01.alpha = 0;
        this.addChild(this.esc_01)

        this.esc_02 = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_X_01"));
        this.esc_02.x = -25
        this.esc_02.y = 270
        this.esc_02.alpha = 0;
        this.addChild(this.esc_02)

        this.esc_03 = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_X_01"));
        this.esc_03.x = -25
        this.esc_03.y = 150
        this.esc_03.alpha = 0;
        this.addChild(this.esc_03)


        this.esc_04 = PIXI.Sprite.from(PIXI.Texture.from("ExtraChilliScreen/ECS_X_01"));
        this.esc_04.x = -25
        this.esc_04.y = 40
        this.esc_04.alpha = 0;
        this.addChild(this.esc_04)
    }
    
    setMode(mode) {
        switch (mode) {
            case 8:
                this.esc_01.alpha = 0;
                this.esc_02.alpha = 0;
                this.esc_03.alpha = 0;
                this.esc_04.alpha = 0;
                break;
            case 12:
                this.esc_01.alpha = 1;
                this.esc_02.alpha = 0;
                this.esc_03.alpha = 0;
                this.esc_04.alpha = 0;
                break; 
            case 16:
                this.esc_01.alpha = 1;
                this.esc_02.alpha = 1;
                this.esc_03.alpha = 0;
                this.esc_04.alpha = 0;
                break;
            case 20:
                this.esc_01.alpha = 1;
                this.esc_02.alpha = 1;
                this.esc_03.alpha = 1;
                this.esc_04.alpha = 0;
                break;
            case 24:
                this.esc_01.alpha = 1;
                this.esc_02.alpha = 1;
                this.esc_03.alpha = 1;
                this.esc_04.alpha = 1;
                break;
            default:
                break;
        }
        this.wheel.setWheel(mode)

    }

    gambleTo(win, mode) {
        var stopIndex = 0
        if (win) {
            stopIndex = 1
            this.haveWin = true
        }
        this.wheel.gambleTo(stopIndex) 
        window.SoundManager.play({name:"WheelStart",loop:false})
        this.currentSound = window.SoundManager.play({ name: "WheelSpin" + parseInt(Math.random() * 4), loop: false })
    }

    wheelAnimationFinished() {
        
        console.log('wheelAnimationFinished')
        if(this.haveWin){
            this.interactiveChildren = true
            window.SoundManager.play({ name: "WheelWinner" + parseInt(Math.random() * 3), loop: false })
        }
        if(this.currentSound){
            this.currentSound.fadeOut(300)
        }
        setTimeout(function () {
            if (this.callback_function) {
                this.callback_function(this)
            }
        }.bind(this), 500);
        
    }

    spinClicked(obj) {
        this.interactiveChildren = false
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


export default FreeSpinWheel;

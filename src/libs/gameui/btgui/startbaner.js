import * as PIXI from 'pixi.js'
import MainPopup from "./mainpopup"
import BTGUIConstants from "./constants"
class Startbaner extends MainPopup {


    parent_obj = null
    staticimage = null
    buttonimage = null
    blackBG = null
    logo = null
    holder = null


    init(_parent) {
        this.parent_obj = _parent
        this.holder = new PIXI.Sprite()
        this.name = BTGUIConstants.START_BANER_BTN;
        this.blackBG = this.createRect(
            100,
            100,
            0x000000
        );
        this.blackBG.alpha = 0.3
        this.addChild(this.blackBG)


        this.addChild(this.holder)
        this.createImages()
        this.createTexts()
        this.createGlow()


        this.buttonMode = true;
        this.interactive = true;
        if (window.SETTINGS.isMobile) {
            this.on('pointertap', this.buttonClicked.bind(this))
        } else {
            this.on('click', this.buttonClicked.bind(this))
        }
    }


    createGlow() {
        //Scatter_BG_2_Glow/Scatter_BG_2_Glow_00009
        this.glow1 = this.getAnimatedSprite(`Scatter_BG_2_Glow/Scatter_BG_2_Glow_%frame%`, 0, 9)
        this.glow1.gotoAndPlay(parseInt(Math.random() * 9))
        this.glow1.loop = true
        this.glow1.x = -420
        this.glow1.y = 523
        this.glow1.animationSpeed = .44
        this.glow1.scale.x = this.glow1.scale.y = 1
        this.holder.addChild(this.glow1)


        this.glow2 = this.getAnimatedSprite(`Scatter_BG_2_Glow/Scatter_BG_2_Glow_%frame%`, 0, 9)
        this.glow2.gotoAndPlay(parseInt(Math.random() * 9))
        this.glow2.loop = true
        this.glow2.x = -340
        this.glow2.y = 523
        this.glow2.animationSpeed = .44
        this.glow2.scale.x = this.glow2.scale.y = 1
        this.holder.addChild(this.glow2)

        this.glow3 = this.getAnimatedSprite(`Scatter_BG_2_Glow/Scatter_BG_2_Glow_%frame%`, 0, 9)
        this.glow3.gotoAndPlay(parseInt(Math.random() * 9))
        this.glow3.loop = true
        this.glow3.x = -260
        this.glow3.y = 523
        this.glow3.animationSpeed = .44
        this.glow3.scale.x = this.glow3.scale.y = 1
        this.holder.addChild(this.glow3)


    }

    getAnimatedSprite(pattern, startindex, endindex) {
        //Scatter_BG_3_Glow/Scatter_BG_3_Glow_00001
        const textures = [];
        for (let index = startindex; index <= endindex; index++) {
            var index_str = "" + index
            var str = new Array(5 - index_str.length + 1).join('0');
            var current = pattern.replace('%frame%', str + index)
            const texture = PIXI.Texture.from(current);
            textures.push(texture);
        }
        //this.parent_obj.widthBg this.parent_obj.heightBg
        return new PIXI.AnimatedSprite(textures);
    }



    createImages() {


        this.logo = PIXI.Sprite.from(PIXI.Texture.from("DB_Logo_01"));
        this.logo.x = -this.logo.width / 2
        this.logo.y = 0


        this.IntroPanel_01 = PIXI.Sprite.from(PIXI.Texture.from("Intro/IntroPanel_01"));
        this.IntroPanel_01.x = -this.IntroPanel_01.width - this.IntroPanel_01.width / 2
        this.IntroPanel_01.y = this.logo.height - 35
        this.holder.addChild(this.IntroPanel_01)



        this.IntroPanel_02 = PIXI.Sprite.from(PIXI.Texture.from("Intro/IntroPanel_02"));
        this.IntroPanel_02.x = - this.IntroPanel_01.width / 2
        this.IntroPanel_02.y = this.logo.height - 35
        this.holder.addChild(this.IntroPanel_02)



        this.IntroPanel_03 = PIXI.Sprite.from(PIXI.Texture.from("Intro/IntroPanel_03"));
        this.IntroPanel_03.x = this.IntroPanel_03.width / 2
        this.IntroPanel_03.y = this.logo.height - 35
        this.holder.addChild(this.IntroPanel_03)

        this.buttonimage = PIXI.Sprite.from(PIXI.Texture.from("UI/FeatureDrop/FDButton"));
        this.buttonimage.scale.x = 1.3
        this.buttonimage.scale.y = 1.3
        this.buttonimage.x = -this.buttonimage.width / 2
        this.buttonimage.y = this.logo.height + this.IntroPanel_03.height - 35
        this.holder.addChild(this.buttonimage)

        this.holder.addChild(this.logo)

    }


    createTexts() {

        var texticon = null
        texticon = new PIXI.Text(window.Lang.default['START_POPAP_SPINS'].str, window.Lang.default['START_POPAP_SPINS']);
        texticon.anchor.set(0.5, 0.5);
        texticon.position.set(-this.IntroPanel_03.width, this.logo.height + 25);
        this.holder.addChild(texticon)

        texticon = new PIXI.Text(window.Lang.default['START_POPAP_UNLIMITED'].str, window.Lang.default['START_POPAP_UNLIMITED']);
        texticon.anchor.set(0.5, 0.5);
        texticon.position.set(-this.IntroPanel_03.width, this.logo.height + 400);
        this.holder.addChild(texticon)

        texticon = new PIXI.Text(window.Lang.default['START_POPAP_WIN_MUKT'].str, window.Lang.default['START_POPAP_WIN_MUKT']);
        texticon.anchor.set(0.5, 0.5);
        texticon.position.set(- this.IntroPanel_03.width, this.logo.height + 430);
        this.holder.addChild(texticon)

        texticon = new PIXI.Text(window.Lang.default['START_POPAP_GAMBEL'].str, window.Lang.default['START_POPAP_GAMBEL']);
        texticon.anchor.set(0.5, 0.5);
        texticon.position.set(0, this.logo.height + 25);
        this.holder.addChild(texticon)

        texticon = new PIXI.Text(window.Lang.default['START_POPAP_FREE'].str, window.Lang.default['START_POPAP_FREE']);
        texticon.anchor.set(0.5, 0.5);
        texticon.position.set(0, this.logo.height + 415);
        this.holder.addChild(texticon)

        texticon = new PIXI.Text(window.Lang.default['START_POPAP_WIN'].str, window.Lang.default['START_POPAP_WIN']);
        texticon.anchor.set(0.5, 0.5);
        texticon.position.set(this.IntroPanel_03.width + 5, this.logo.height + 25);
        this.holder.addChild(texticon)

        texticon = new PIXI.Text(window.Lang.default['START_POPAP_CONTINUE'].str, window.Lang.default['START_POPAP_CONTINUE']);
        texticon.anchor.set(0.5, 0.5);
        texticon.position.set(this.buttonimage.x + 190, this.buttonimage.y + 55);
        this.holder.addChild(texticon)

    }

    

    resize(w, h, s) {
        this.holder.scale.x = this.holder.scale.y = s
        this.holder.x = w / 2
        this.holder.y = (h - 860 * s) / 2
        this.blackBG.x = 0
        this.blackBG.y = 0
        this.blackBG.width = w
        this.blackBG.height = h
    }

    buttonClicked(obj) {
        this.parent_obj.callback_function(this)
    }

}


export default Startbaner;

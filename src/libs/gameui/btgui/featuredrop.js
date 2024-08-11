import * as PIXI from 'pixi.js'
import BTGButton from "./btgbutton"
import BTGUIConstants from "./constants"
import MainPopup from "./mainpopup"

class FeatureDrop extends MainPopup {
    callback_function = null
    bg = null
    fg = null
    buyButton = null
    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.fg = PIXI.Sprite.from(PIXI.Texture.from("UI/FeatureDrop/FDFrame_Top"));

        // this.bg = PIXI.Sprite.from(PIXI.Texture.from("UI/FeatureDrop/FDFrame_Bottom"));
        // this.bg.x = 0
        // this.bg.y = 
        // this.addChild(this.bg)
        this.bg = new BTGButton()
        this.bg.init({
            bg: { data: 'UI/FeatureDrop/FDFrame_Bottom', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['BUYBON'],
            callback_function: this.spinClicked.bind(this)
        })
        
        this.bg.buttonText.text = window.Lang.default['FUN'].str.replace("%d", 0).replace("%c", "FUN")
        this.bg.name = BTGUIConstants.BG
        this.bg.x = 0
        this.bg.y = this.fg.height 
        this.addChild(this.bg)

        this.fg.x = 0
        this.fg.y = 0
        this.addChild(this.fg)

        this.buyButton = new BTGButton()
        this.buyButton.init({
            bg: { data: 'UI/FeatureDrop/FDButton', alpha: 1, x: 0, y: 0 },
            text: window.Lang.default['BUY'],
            callback_function: this.spinClicked.bind(this)
        })
        this.buyButton.name = BTGUIConstants.FEATURE_DROP_BUY
        this.addChild(this.buyButton)
        this.buyButton.x = 1
        this.buyButton.y = 107

    }

    takeCoin(){
        var coinTake = this.getAnimatedSprite(`FeatureDrop/FDCoin Dissapear/FDCoin Dissapear_%frame%`, 0, 7)
        coinTake.play()
        coinTake.loop = false
        coinTake.x = 50
        coinTake.y = -70
        coinTake.animationSpeed = 0.7
        coinTake.scale.x = coinTake.scale.y = 0.9
        coinTake.onComplete = function () {
            this.removeChild(coinTake)
        }.bind(this);
        this.addChild(coinTake)
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

    change_price(w , price) {
        // es teqstis shesacvlelad+
        this.bg.buttonText.text = window.Lang.default['FUN'].str.replace("%d", price).replace("%c", w)

    }

    spinClicked(obj) {
        if (this.callback_function) {
            this.callback_function(obj)
        }
    }

    get_size() {
        var bg = this.bg.get_size()
        if (this.bg) {
            return { width: bg.width, height: bg.height + this.fg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default FeatureDrop;

import * as PIXI from 'pixi.js'
import MainPopup from "../../btgui/mainpopup"
// import test from "./asgasfasf/pagea"


class pageD extends MainPopup {
    callback_function = null
    bg = null
    leftBtn = null
    raightBtn = null
    paysBtn = null
    activiconinfobg = null
    iconinfobgArr = []

    funValue = 50


    init(obj) {
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_D"));
        this.bg.x = 70
        this.bg.y = 155
        this.addChild(this.bg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_J"));
        this.bg.x = 70
        this.bg.y = 338
        this.addChild(this.bg)

        this.bg = PIXI.Sprite.from(PIXI.Texture.from("Panel_J"));
        this.bg.x = 497
        this.bg.y = 338
        this.addChild(this.bg)
        
        this.createiconinfobg()
        this.infoTexts()
        this.createAnimations()

    }

    createiconinfobg() {
        var iconinfoArr = ["Scatter_H", "Scatter_O", "Scatter_T" ]

        for (let i = 0; i < 3; i++) {
            var iconinfobg = null
            iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Scatter_BG_3"))
            iconinfobg.x = 460 + (iconinfobg.width  )*i
            iconinfobg.y = 170 
            this.addChild(iconinfobg)
            iconinfobg = PIXI.Sprite.from(PIXI.Texture.from(iconinfoArr[i]))
            iconinfobg.x = 467 + (iconinfobg.width )*i + 13 + 35*(i)
            if(i === 2){
                iconinfobg.x += 25
            }
            iconinfobg.y = 170 + 20
            iconinfobg.scale.x = 0.9
            iconinfobg.scale.y = 0.9
            this.addChild(iconinfobg)
        }

        iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Scatter_BG_3"))
        iconinfobg.x = 220 
        iconinfobg.y = 370 
        this.addChild(iconinfobg)
        iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Scatter_Plus4"))
        iconinfobg.x = 220 + 15
        iconinfobg.y = 370 + 20
        this.addChild(iconinfobg)

        iconinfobg = PIXI.Sprite.from(PIXI.Texture.from("Wild_3"))
        iconinfobg.x = 720 
        iconinfobg.y = 380 
        this.addChild(iconinfobg)

    }

    
    infoTexts(){
        
        var texticonWin = null
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTDAA'].str, window.Lang.default['PAYSINFOTEXTDAA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 200); 
        this.addChild(texticonWin)
        
        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTDAB'].str, window.Lang.default['PAYSINFOTEXTDAB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 260); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTDB'].str, window.Lang.default['PAYSINFOTEXTDB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(110 , 560); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTDCA'].str, window.Lang.default['PAYSINFOTEXTDCA']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(530 , 400); 
        this.addChild(texticonWin)

        texticonWin = new PIXI.Text(window.Lang.default['PAYSINFOTEXTDCB'].str, window.Lang.default['PAYSINFOTEXTDCB']);
        texticonWin.anchor.set(0, 0.5);
        texticonWin.position.set(530 , 500); 
        this.addChild(texticonWin)
    }

    createAnimations(){
        

        var sparkle1 = this.getAnimatedSprite(`Sparkles_01/Sparkles_01_%frame%`, 0, 13)
        sparkle1.play()
        sparkle1.loop = true
        sparkle1.x = 710
        sparkle1.y = 475
        sparkle1.animationSpeed = 0.7
        sparkle1.scale.x = sparkle1.scale.y = 0.5
        this.addChild(sparkle1)


        var sparkle2= this.getAnimatedSprite(`Sparkles_01/Sparkles_01_%frame%`, 0, 13)
        sparkle2.play()
        sparkle2.loop = true
        sparkle2.x = 755
        sparkle2.y = 475
        sparkle2.animationSpeed = 0.7
        sparkle2.scale.x = sparkle2.scale.y = 0.5
        this.addChild(sparkle2)

        var sparkle3= this.getAnimatedSprite(`Sparkles_01/Sparkles_01_%frame%`, 0, 13)
        sparkle3.play()
        sparkle3.loop = true
        sparkle3.x = 800
        sparkle3.y = 475
        sparkle3.animationSpeed = 0.7
        sparkle3.scale.x = sparkle3.scale.y = 0.5
        this.addChild(sparkle3)

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


export default pageD;

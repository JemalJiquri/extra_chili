import * as PIXI from 'pixi.js'
import MainButton from "./mainbutton"

class BTGButton extends MainButton {
    bg = null
    bg2 = null
    pressed = null
    icon = null
    fg = null
    buttonText = null

    init(obj) {
        super.init()
        if (obj.bg) {
            this.bg = PIXI.Sprite.from(PIXI.Texture.from(obj.bg.data));
            this.bg.x = obj.bg.x
            this.bg.y = obj.bg.y
            if(obj.bg.scale){
                this.bg.scale.x = obj.bg.scale.x
                this.bg.scale.y = obj.bg.scale.y
            }
            this.bg.alpha = obj.bg.alpha
            this.addChild(this.bg)
        }

        if (obj.bg2) {
            this.bg2 = PIXI.Sprite.from(PIXI.Texture.from(obj.bg2.data));
            this.bg2.x = obj.bg2.x
            this.bg2.y = obj.bg2.y
            this.bg2.alpha = obj.bg2.alpha
            this.addChild(this.bg2)
        }

        if (obj.pressed) {
            this.pressed = PIXI.Sprite.from(PIXI.Texture.from(obj.pressed.data));
            this.fade_element = this.pressed
            this.pressed.x = obj.pressed.x
            this.pressed.y = obj.pressed.y
            this.pressed.alpha = obj.pressed.alpha
            this.addChild(this.pressed)
        }

        if (obj.icon) {
            this.icon = PIXI.Sprite.from(PIXI.Texture.from(obj.icon.data));
            this.icon.x = obj.icon.x
            this.icon.y = obj.icon.y
            this.icon.alpha = obj.icon.alpha
            this.addChild(this.icon)
        }




        if (obj.fg) {
            this.fg = PIXI.Sprite.from(PIXI.Texture.from(obj.fg.data));
            this.fg.x = obj.fg.x
            this.fg.y = obj.fg.y
            this.fg.alpha = obj.fg.alpha
            this.addChild(this.fg)
        }
        if (obj.text) {
            this.buttonText = new PIXI.Text(obj.text.str,
                {
                    fontFamily: obj.text.fontFamily,
                    fontSize: obj.text.fontSize,
                    fill: obj.text.fill,
                    align: obj.text.align,
                    fontWeight: obj.text.fontWeight
                });
            this.buttonText.anchor.set(0.5, 0.5);
            this.buttonText.position.set(this.bg.width / 2 + obj.text.offsetX, this.bg.height / 2 + obj.text.offsetY);
            this.addChild(this.buttonText)
        }
        if (obj.callback_function) {
            this.callback_function = obj.callback_function
        }
    }

    get_size() {
        if (this.bg) {
            return { width: this.bg.width, height: this.bg.height }
        }

        if (this.bg2) {
            return { width: this.bg2.width, height: this.bg2.height }
        }
        if (this.pressed) {
            return { width: this.pressed.width, height: this.pressed.height }
        }

        if (this.fg) {
            return { width: this.fg.width, height: this.fg.height }
        }
        return { width: 0, height: 0 }
    }

}


export default BTGButton;


import * as PIXI from 'pixi.js'

class WinNumber extends PIXI.Sprite {
    fg_texture = null
    fg = null

    build(_fg_texture,_scale) {
        this.fg_texture = _fg_texture

        this.fg = PIXI.Sprite.from(PIXI.Texture.from(this.fg_texture));
        this.fg.x = 0
        this.fg.y = 0
        this.fg.anchor.set(0.5, 0.5);
        if(_scale > 0){
            this.fg.scale.x = this.fg.scale.y = _scale
        }else{
            this.fg.scale.x = this.fg.scale.y = 0.3
        }
        
        this.addChild(this.fg)
    }

    getHeight() {
        return this.fg.height
    }
    getWidth() {
        return this.fg.width
    }



}


export default WinNumber;

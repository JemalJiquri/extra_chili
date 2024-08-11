import * as PIXI from 'pixi.js'


class Foreground extends PIXI.Sprite {
    fg = null

    init(bonusMode) {
        console.log("Foreground init");
        if (bonusMode) {
            this.fg = PIXI.Sprite.from(PIXI.Texture.from('DB_Cabinet_02'));
        } else {
            this.fg = PIXI.Sprite.from(PIXI.Texture.from('DB_Cabinet_01'));
        }


        this.fg.x = 517
        this.fg.y = 145

        this.addChild(this.fg);

    }




}


export default Foreground

import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';

class MainPopup extends PIXI.Sprite {


    showPopup(_delay){
        new TWEEN.Tween(this)
            .to({ alpha: 1 }, 100)
            .delay(_delay)
            .easing(TWEEN.Easing.Linear.None)
            .start()
    }

    hidePopup(_delay){
        new TWEEN.Tween(this)
            .to({ alpha: 0 }, 100)
            .delay(_delay)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                this.parent.removeChild(this)
            }.bind(this)).start()
    }

    createRect(width, height, color) {
        var holderMask = new PIXI.Graphics();
        holderMask.beginFill(color, 1);
        holderMask.moveTo(0, 0);
        holderMask.lineTo(width, 0);
        holderMask.lineTo(width, height);
        holderMask.lineTo(0, height);
        holderMask.lineTo(0, 0);
        return holderMask
    }

    resize(w, h, s) {
        var size = this.get_size()
        this.scale.x = this.scale.y = s
        this.x = (w - size.width*s) / 2
        this.y = (h - size.height*s) / 2
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

}


export default MainPopup;

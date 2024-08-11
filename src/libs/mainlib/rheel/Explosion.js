
import * as PIXI from 'pixi.js'
import ExplosionItem from './ExplosionItem'

class Explosion extends PIXI.Sprite {
    count = 0
    finishedItems = 0
    build(_count, _itemsList, _rect, _sizes) {
        this.count = _count
        //{w:100,h:200},{min:0.1,max:0.8}
        for (let index = 0; index < _count; index++) {
            var fg_texture = _itemsList[Math.floor(Math.random() * _itemsList.length)];
            var item = new ExplosionItem()
            item.x = Math.floor(Math.random() * _rect.w)
            item.y = Math.floor(Math.random() * _rect.h)
            item.scale.x = item.scale.y = _sizes.min + Math.random() * (_sizes.max - _sizes.min)

            


            item.build(fg_texture)
            item.onComplete = function () {
                this.explosionItemCompleted()
            }.bind(this);
            item.fall()
            this.addChild(item)
        }
    }

    explosionItemCompleted() {
        this.finishedItems++
        if (this.finishedItems >= this.count) {
            if (this.parent) {
                this.parent.removeChild(this)
            }
        }
    }

    //Splinters/SplinterDay_03

}


export default Explosion;

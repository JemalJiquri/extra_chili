import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import Globals from '../Globals'

class FlagB extends PIXI.Sprite {
    speed = 2000
    flag_texture = null
    flag = null
    buffer = null
    rows = 2;
    cols = 10;
    directionUp = true
    active = true

    init() {
        this.flag_texture = PIXI.Texture.from('FlagBRotated')
        this.flag = new PIXI.SimplePlane(this.flag_texture, this.cols, this.rows);
        this.flag.textureUpdated();

        //flag.position.set(100, 100);
        this.addChild(this.flag);

        this.buffer = this.flag.geometry.getBuffer('aVertexPosition');
        Globals.buffers.push(this.buffer)
        //Globals.debugElements.push([this.flag, this.rows, this.cols, this])


        // [0,1] [2,3] [4,5] [6,7]
        // [8,9] 
        this.startAnimation()
        //this.animateUpDown()
    }


    startAnimation() {
        var pindex = 8
        setTimeout(function () {
            this.animatePoints({
                origin_y1: this.buffer.data[this.cols * this.rows + pindex * 2 + 1],
                origin_y2: this.buffer.data[this.cols * this.rows + (pindex + 1) * 2 + 1],
                pindex: pindex,
                height: 15,
                delay: 20,
                delayBack: 350,
                callback: false
            })
        }.bind(this), 100);

        setTimeout(function () {
            pindex = 6
            this.animatePoints({
                origin_y1: this.buffer.data[this.cols * this.rows + pindex * 2 + 1],
                origin_y2: this.buffer.data[this.cols * this.rows + (pindex + 1) * 2 + 1],
                pindex: pindex,
                height: 20,
                delay: 20,
                delayBack: 150,
                callback: false
            })
        }.bind(this), 100);


        setTimeout(function () {
            pindex = 4
            this.animatePoints({
                origin_y1: this.buffer.data[this.cols * this.rows + pindex * 2 + 1],
                origin_y2: this.buffer.data[this.cols * this.rows + (pindex + 1) * 2 + 1],
                pindex: pindex,
                height: 16,
                delay: 20,
                delayBack: 350,
                callback: false
            })
        }.bind(this), 100);


        setTimeout(function () {
            pindex = 2
            this.animatePoints({
                origin_y1: this.buffer.data[this.cols * this.rows + pindex * 2 + 1],
                origin_y2: this.buffer.data[this.cols * this.rows + (pindex + 1) * 2 + 1],
                pindex: pindex,
                height: 10,
                delay: 20,
                delayBack: 450,
                callback: false
            })
        }.bind(this), 100);

        setTimeout(function () {
            pindex = 0
            this.animatePoints({
                origin_y1: this.buffer.data[this.cols * this.rows + pindex * 2 + 1],
                origin_y2: this.buffer.data[this.cols * this.rows + (pindex + 1) * 2 + 1],
                pindex: pindex,
                height: 6,
                delay: 20,
                delayBack: 550,
                callback: true
            })
        }.bind(this), 100);

        new TWEEN.Tween(this.flag)
            .to({ y: -3 }, this.speed)
            .delay(0)
            .easing(TWEEN.Easing.Linear.None)
            .start()
    }



    animatePoints(obj) {
        var twObj = { progress: 0 }
        new TWEEN.Tween(twObj)
            .to({ progress: 1 }, this.speed)
            .easing(TWEEN.Easing.Linear.None)
            .delay(obj.delay)
            .onUpdate(function () {
                this.buffer.data[this.cols * this.rows + obj.pindex * 2 + 1] = obj.origin_y1 - obj.height * twObj.progress
                this.buffer.data[this.cols * this.rows + (obj.pindex + 1) * 2 + 1] = obj.origin_y2 - obj.height * twObj.progress

            }.bind(this))
            .onComplete(function () {
                this.animatePointsBack(obj)
            }.bind(this)).start()
    }

    animatePointsBack(obj) {
        var twObj = { progress: 0 }
        if (obj.callback) {
            new TWEEN.Tween(this.flag)
                .to({ y: 1 }, this.speed+500)
                .delay(200)
                .easing(TWEEN.Easing.Linear.None)
                .start()
        }


        new TWEEN.Tween(twObj)
            .to({ progress: 1 }, this.speed)
            .easing(TWEEN.Easing.Linear.None)
            .delay(obj.delayBack)
            .onUpdate(function () {
                this.buffer.data[this.cols * this.rows + obj.pindex * 2 + 1] = obj.origin_y1 + obj.height * twObj.progress - obj.height
                this.buffer.data[this.cols * this.rows + (obj.pindex + 1) * 2 + 1] = obj.origin_y2 + obj.height * twObj.progress - obj.height
            }.bind(this))
            .onComplete(function () {
                if (obj.callback) {
                    this.startAnimation()
                }
            }.bind(this)).start()
    }


}


export default FlagB

import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import Globals from '../Globals'

class FlagD extends PIXI.Sprite {
    speed = 2000
    flag_texture = null
    flag = null
    buffer = null
    rows = 2;
    cols = 4;
    directionUp = true
    active = true

    init(tecturestr) {
        this.flag_texture = PIXI.Texture.from(tecturestr)
        this.flag = new PIXI.SimplePlane(this.flag_texture, this.cols, this.rows);
        this.flag.textureUpdated();

        //flag.position.set(100, 100); Flags/Flags_C Flags/Flags_D
        this.addChild(this.flag);

        this.buffer = this.flag.geometry.getBuffer('aVertexPosition');
        Globals.buffers.push(this.buffer)
        //Globals.debugElements.push([this.flag, this.rows, this.cols, this])

        this.startAnimation()
    }


    startAnimation() {
        var pindex = 0
        setTimeout(function () {
            this.animatePoints({
                origin_y1: this.buffer.data[this.cols * this.rows + pindex * 2 + 1],
                origin_y2: this.buffer.data[this.cols * this.rows + (pindex + 1) * 2 + 1],
                pindex: pindex,
                height: 1,
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
                height: 2,
                delay: 20,
                delayBack: 550,
                callback: true
            })
        }.bind(this), 100);



        new TWEEN.Tween(this.flag)
            .to({ y: -2 }, this.speed)
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
                .to({ y: 0 }, this.speed+500)
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


export default FlagD

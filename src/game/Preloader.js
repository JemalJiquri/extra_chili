import * as PIXI from 'pixi.js'
import Globals from './Globals'
import RheelUtils from './RheelUtils'
import TWEEN from '@tweenjs/tween.js';
import Bubble from './Bubble'


class Preloader extends PIXI.Sprite {
    preloader = null
    progress = 0
    progressLine = null
    preloader_img = null
    currentTween = null
    bubblesSprite = null

    init() {
        console.log("Preloader init");
        console.dir(PIXI.Loader.shared.resources.LoaderLogo)

        this.preloader = new PIXI.Sprite()


        this.preloader_img = PIXI.Sprite.from(PIXI.Loader.shared.resources.LoaderLogo.texture);
        this.preloader_img.anchor.set(0.5, 0.5);
        this.preloader.addChild(this.preloader_img)



        //96 308

        this.progressLine = new RheelUtils().createRect(
            386,
            13,
            0x000000
        );


        this.progressLine.x = 96 - this.preloader_img.width / 2
        this.progressLine.y = 308 - this.preloader_img.height / 2
        this.preloader.addChild(this.progressLine)

        var bubblemask = new RheelUtils().createMask(
            386,
            13
        );
        bubblemask.x = 96 - this.preloader_img.width / 2
        bubblemask.y = 308 - this.preloader_img.height / 2

        this.bubblesSprite = new PIXI.Sprite()
        this.bubblesSprite.x = this.progressLine.x
        this.bubblesSprite.y = this.progressLine.y
        this.bubblesSprite.mask = bubblemask

        this.preloader.addChild(this.bubblesSprite)
        this.preloader.addChild(bubblemask)
        setTimeout(function () {
            this.addBubble()
        }.bind(this), 200);

        this.addChild(this.preloader);

        this.resize()
    }

    addBubble() {
        var colors = [0xc9130d, 0x6f1b0f, 0x622500, 0x343230]
        var cnts = [10, 7, 4, 2]
        for (let i = 0; i < cnts.length; i++) {
            for (let k = 0; k < cnts[i]; k++) {
                var b = new Bubble()
                b.init(colors[i], (4 - i) / 3)
                b.x = -1 + i * 9 + Math.random() * 8
                this.bubblesSprite.addChild(b)
            }
        }
        if (this.parent) {
            setTimeout(function () {
                this.addBubble()
            }.bind(this), 150);
        } else {
            console.log('bublles finished')
        }
    }


    resize() {
        var _w = window.innerWidth / window.devicePixelRatio
        var _h = window.innerHeight / window.devicePixelRatio
        if (window.innerWidth < window.innerHeight) {
            var _sw = _w / Globals.minWidth
            var _sh = _h / Globals.height
        } else {
            var _sw = _w / Globals.width
            var _sh = _h / Globals.height
        }


        var minS = Math.min(_sw, _sh);
        if (minS > 1) {
            minS = 1;
        }
        if (minS < 0.3) {
            minS = 0.3;
        }

        this.preloader.scale.x = minS
        this.preloader.scale.y = minS


        this.preloader.x = window.innerWidth / 2
        this.preloader.y = window.innerHeight / 2
    }



    setProgress(_progress) {
        if (this.currentTween) {
            this.currentTween.stop()
        }

        this.currentTween = new TWEEN.Tween(this)
            .to({ progress: _progress / 100 }, 300)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                this._setProgress()
            }.bind(this)).start()
    }


    _setProgress() {

        this.progressLine.width = 386 * (1 - this.progress)
        this.progressLine.x = 96 - this.preloader_img.width / 2 + (386 - this.progressLine.width)
        this.bubblesSprite.x = this.progressLine.x
    }


}


export default Preloader


import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js';
import RheelConfig from './RheelConfig'

class DynamicIcon extends PIXI.Sprite {
    bg_texture = null
    fg_texture = null
    status = null
    rheelheight = 0
    bganimations = []
    fganimations = []
    highlightAnimations = []
    bonusMode = false
    initObj = null
    build(_height, _bg_texture, _fg_texture) {
        this.bg_texture = _bg_texture
        this.fg_texture = _fg_texture
        this.rheelheight = _height

        this.bg = PIXI.Sprite.from(PIXI.Texture.from(this.bg_texture));
        this.addChild(this.bg)
        this.bg.width = 150
        this.fg = PIXI.Sprite.from(PIXI.Texture.from(this.fg_texture));
        this.fg.x = (this.bg.width - this.fg.width) / 2
        this.fg.y = (this.bg.height - this.fg.height) / 2
        this.addChild(this.fg)
    }

    init(_height, _obj, _bonusMode) {
        this.initObj = _obj
        this.bg_texture = this.initObj.bg
        this.fg_texture = this.initObj.fg
        this.rheelheight = _height
        this.bonusMode = _bonusMode
        this.shadow = PIXI.Sprite.from(PIXI.Texture.from(this.initObj.shadow));
        this.shadow.scale.x = this.initObj.bgposition.scaleX
        this.shadow.scale.y = this.initObj.bgposition.scaleY

        this.bg = PIXI.Sprite.from(PIXI.Texture.from(this.bg_texture));
        this.bg.scale.x = this.initObj.bgposition.scaleX
        this.bg.scale.y = this.initObj.bgposition.scaleY

        this.shadow.x = (this.bg.width - this.shadow.width)


        this.fg = PIXI.Sprite.from(PIXI.Texture.from(this.fg_texture));
        var fgobj = null
        if (this.initObj.fgposition.length == 1) {
            fgobj = this.initObj.fgposition[0]
        } else {
            fgobj = this.initObj.fgposition[_height - 2]
        }
        this.fg.scale.x = fgobj.scaleX
        this.fg.scale.y = fgobj.scaleY
        if (fgobj.align == "center") {
            this.fg.x = (this.bg.width - this.fg.width) / 2
            this.fg.y = (this.bg.height - this.fg.height) / 2
        } else {
            this.fg.x = fgobj.x
            this.fg.y = fgobj.y
        }


        //_obj.animations onspincomplete
        if (this.initObj.animations) {
            if (this.initObj.animations.bg) {
                for (let k = 0; k < this.initObj.animations.bg.length; k++) {
                    const element = this.initObj.animations.bg[k];
                    var animationPattern = element.animation.replaceAll('%h', this.rheelheight)
                    var bganim = RheelConfig.RheelUtils.getAnimatedSprite(animationPattern, 0, element.length)
                    bganim.loop = element.loop
                    if (element.scaleFactor > 0) {
                        bganim.width = this.bg.width * element.scaleFactor
                        bganim.height = this.bg.height * element.scaleFactor
                    } else {
                        bganim.scale.x = element.scale
                        bganim.scale.y = element.scale
                    }

                    bganim.animationSpeed = .44
                    bganim.blendMode = PIXI.BLEND_MODES.ADD
                    bganim.alpha = element.alpha
                    if (element.autoplay >= 0) {
                        bganim.gotoAndPlay(element.autoplay)
                    }
                    switch (element.position) {
                        case "center":
                            bganim.position.set((this.bg.width - bganim.width) / 2, (this.bg.height - bganim.height) / 2);
                            break;
                        case "coordinates":
                            bganim.position.set(element.x, element.y);
                            break;
                        default:
                            break;
                    }

                    this.bganimations.push({ animation: bganim, animatedCount: 0, event: element.event, config: element })
                }
            }


            if (this.initObj.animations.highlight) {
                for (let k = 0; k < this.initObj.animations.highlight.length; k++) {
                    const element = this.initObj.animations.highlight[k];
                    var animationPattern = element.animation.replaceAll('%h', this.rheelheight)
                    var hanim = RheelConfig.RheelUtils.getAnimatedSprite(animationPattern, 0, element.length)
                    hanim.loop = element.loop
                    if (element.scaleFactor > 0) {
                        hanim.width = this.bg.width * element.scaleFactor
                        hanim.height = this.bg.height * element.scaleFactor
                    } else {
                        hanim.scale.x = element.scale
                        hanim.scale.y = element.scale
                    }

                    hanim.animationSpeed = .44
                    hanim.blendMode = PIXI.BLEND_MODES.ADD
                    hanim.alpha = element.alpha
                    if (element.autoplay >= 0) {
                        hanim.gotoAndPlay(element.autoplay)
                    }
                    switch (element.position) {
                        case "center":
                            hanim.position.set((this.bg.width - hanim.width) / 2, (this.bg.height - hanim.height) / 2);
                            break;
                        case "coordinates":
                            hanim.position.set(element.x, element.y);
                            break;
                        default:
                            break;
                    }

                    this.highlightAnimations.push({ animation: hanim, animatedCount: 0, event: element.event, config: element })
                }
            }

            if (this.initObj.animations.fg) {
                for (let k = 0; k < this.initObj.animations.fg.length; k++) {
                    const element = this.initObj.animations.fg[k];
                    var animationPattern = element.animation.replaceAll('%h', this.rheelheight)
                    var fganim = RheelConfig.RheelUtils.getAnimatedSprite(animationPattern, 0, element.length)
                    fganim.loop = element.loop
                    if (element.scaleFactor > 0) {
                        fganim.width = this.bg.width * element.scaleFactor
                        fganim.height = this.bg.height * element.scaleFactor
                    } else {
                        fganim.scale.x = element.scale
                        fganim.scale.y = element.scale
                    }
                    fganim.animationSpeed = .25
                    fganim.blendMode = PIXI.BLEND_MODES.ADD
                    fganim.alpha = element.alpha
                    if (element.autoplay >= 0) {
                        fganim.gotoAndPlay(element.autoplay)
                    }
                    switch (element.position) {
                        case "center":
                            fganim.position.set((this.bg.width - fganim.width) / 2, (this.bg.height - fganim.height) / 2);
                            break;
                        case "coordinates":
                            fganim.position.set(element.x, element.y);
                            break;
                        default:
                            break;
                    }
                    this.fganimations.push({ animation: fganim, animatedCount: 0, event: element.event, config: element })
                }

            }
        }
        this.addChild(this.shadow)
        this.addChild(this.bg)
        for (let index = 0; index < this.bganimations.length; index++) {
            const element = this.bganimations[index];
            this.addChild(element.animation)
        }
        this.addChild(this.fg)
        for (let index = 0; index < this.fganimations.length; index++) {
            const element = this.fganimations[index];
            this.addChild(element.animation)
        }

        for (let index = 0; index < this.highlightAnimations.length; index++) {
            const element = this.highlightAnimations[index];
            this.addChild(element.animation)
        }

    }

    animateHighlight() {
        if (this.highlightAnimations.length > 0) {
            for (let index = 0; index < this.highlightAnimations.length; index++) {
                const animation = this.highlightAnimations[index].animation;
                const config = this.highlightAnimations[index].config;
                this.bganimations[index].animatedCount++;
                animation.play()
                if (config.fade) {
                    if (config.fade.alpha.length == 3) {
                        new TWEEN.Tween(animation)
                            .to({ alpha: config.fade.alpha[1] }, config.fade.time[0])
                            .easing(TWEEN.Easing.Linear.None)
                            .delay(config.fade.delay[0])
                            .onComplete(function () {
                                new TWEEN.Tween(animation)
                                    .to({ alpha: config.fade.alpha[2] }, config.fade.time[1])
                                    .easing(TWEEN.Easing.Back.Out)
                                    .delay(config.fade.delay[1])
                                    .onComplete(function () {
                                        new TWEEN.Tween(animation)
                                            .to({ alpha: config.fade.alpha[1] }, config.fade.time[0])
                                            .easing(TWEEN.Easing.Linear.None)
                                            .delay(config.fade.delay[1])
                                            .onComplete(function () {
                                                new TWEEN.Tween(animation)
                                                    .to({ alpha: config.fade.alpha[2] }, config.fade.time[1])
                                                    .easing(TWEEN.Easing.Back.Out)
                                                    .delay(config.fade.delay[1])
                                                    .onComplete(function () {
                                                        new TWEEN.Tween(animation)
                                                            .to({ alpha: config.fade.alpha[1] }, config.fade.time[0])
                                                            .easing(TWEEN.Easing.Linear.None)
                                                            .delay(config.fade.delay[1])
                                                            .onComplete(function () {
                                                                new TWEEN.Tween(animation)
                                                                    .to({ alpha: config.fade.alpha[2] }, config.fade.time[1])
                                                                    .easing(TWEEN.Easing.Back.Out)
                                                                    .delay(config.fade.delay[1])
                                                                    .start()
                                                            }.bind(this)).start()
                                                    }.bind(this)).start()
                                            }.bind(this)).start()
                                    }.bind(this)).start()
                            }.bind(this)).start()
                    }
                }
            }
        }
    }


    highlight(on) {
        if (this.highlightAnimations.length > 0) {
            for (let index = 0; index < this.highlightAnimations.length; index++) {
                const animation = this.highlightAnimations[index].animation;
                animation.play()
                new TWEEN.Tween(animation)
                    .to({ alpha: on ? 1 : 0 }, 100)
                    .easing(TWEEN.Easing.Back.Out)
                    .start()
            }
        }
    }

    animateEntered() {
        if (this.bganimations.length > 0) {
            for (let index = 0; index < this.bganimations.length; index++) {
                const animation = this.bganimations[index].animation;
                const config = this.bganimations[index].config;
                if (config.oneTime && this.bganimations[index].animatedCount > 0) {
                    continue
                }
                if (config.event === "entered") {
                    this.bganimations[index].animatedCount++;
                    animation.play()
                    if (config.fade) {
                        if (config.fade.alpha.length == 3) {
                            new TWEEN.Tween(animation)
                                .to({ alpha: config.fade.alpha[1] }, config.fade.time[0])
                                .easing(TWEEN.Easing.Linear.None)
                                .delay(config.fade.delay[0])
                                .onComplete(function () {
                                    new TWEEN.Tween(animation)
                                        .to({ alpha: config.fade.alpha[2] }, config.fade.time[1])
                                        .easing(TWEEN.Easing.Back.Out)
                                        .delay(config.fade.delay[1])
                                        .start()
                                }.bind(this)).start()
                        }
                    }
                }

            }
        }

    }

    animateOnspinFinished() {
        if (this.bganimations.length > 0) {
            for (let index = 0; index < this.bganimations.length; index++) {
                const animation = this.bganimations[index].animation;
                const config = this.bganimations[index].config;
                if (config.oneTime && this.bganimations[index].animatedCount > 0) {
                    continue
                }
                if (config.event === "onspincomplete") {
                    this.bganimations[index].animatedCount++;
                    animation.play()
                    if (config.fade) {
                        if (config.fade.alpha.length == 3) {
                            new TWEEN.Tween(animation)
                                .to({ alpha: config.fade.alpha[1] }, config.fade.time[0])
                                .easing(TWEEN.Easing.Linear.None)
                                .delay(config.fade.delay[0])
                                .onComplete(function () {
                                    new TWEEN.Tween(animation)
                                        .to({ alpha: config.fade.alpha[2] }, config.fade.time[1])
                                        .easing(TWEEN.Easing.Back.Out)
                                        .delay(config.fade.delay[1])
                                        .start()
                                }.bind(this)).start()
                        }
                    }
                }

            }
        }

    }

    getHeight() {
        return this.bg.height
    }
    getWidth() {
        return this.bg.width
    }


    removeWithExplosion() {
        var winAnim = PIXI.Sprite.from(PIXI.Texture.from(`SYM_Main_BG_${this.rheelheight}_Reaction/SYM_Main_BG_${this.rheelheight}_Reaction_00000`));

        var frames = this.bonusMode ? 39 : 10
        var explosion = RheelConfig.RheelUtils.getAnimatedSprite(`SYM_Main_BG_${this.rheelheight}_Reaction/SYM_Main_BG_${this.rheelheight}_Reaction_%frame%`, 0, frames)


        explosion.play()
        explosion.loop = false

        explosion.animationSpeed = .44
        explosion.blendMode = PIXI.BLEND_MODES.ADD
        winAnim.blendMode = PIXI.BLEND_MODES.ADD

        winAnim.width = this.fg.width
        winAnim.height = this.fg.height
        winAnim.position.set((this.bg.width - winAnim.width) / 2, (this.bg.height - winAnim.height) / 2);
        winAnim.alpha = 0.5
        winAnim.addChild(explosion)
        this.addChild(winAnim)
        this.addChild(this.fg)
        this.tremorFG()
        this.removeChild(this.shadow)

        explosion.onComplete = function () {
            //this.parent.removeChild(this)
            //RheelConfig.RheelUtils.EXPLOSION_HOLDER {w:100,h:200}
            this.removeChild(this.bg)
            this.removeChild(winAnim)
            this.fg.scale.x = this.fg.scale.y = 0.2
            this.fg.x = (this.bg.width - this.fg.width) / 2
            this.fg.y = (this.bg.height - this.fg.height) / 2
            this.fg.alpha = 0.5

            var twObj = { progress: 0 }
            new TWEEN.Tween(twObj)
                .to({ progress: 1 }, 300)
                .easing(TWEEN.Easing.Linear.None)
                .onUpdate(function () {
                    this.fg.scale.x = this.fg.scale.y = 0.2 + 0.6 * twObj.progress
                    this.fg.x = (this.bg.width - this.fg.width) / 2
                    this.fg.y = (this.bg.height - this.fg.height) / 2
                    this.fg.alpha = 0.5 * (1 - twObj.progress)
                }.bind(this))
                .onComplete(function () {
                    this.parent.removeChild(this)
                }.bind(this)).start()

            if (this.initObj.code == 'WR') {
                var explosionWR = RheelConfig.RheelUtils.getAnimatedSprite(`Explosion_01/Explosion_01_%frame%`, 0, 29)
                explosionWR.play()
                explosionWR.scale.x = explosionWR.scale.y = 2
                explosionWR.loop = false
                explosionWR.animationSpeed = .44
                explosionWR.x = (this.bg.width - explosionWR.width) / 2
                explosionWR.y = (this.bg.height - explosionWR.height) / 2
                explosionWR.blendMode = PIXI.BLEND_MODES.ADD
                this.addChild(explosionWR)
            } else { 
                //
                var explosionSprites = RheelConfig.RheelUtils.getExplosionSprites({ w: this.bg.width*RheelConfig.RheelUtils.SCALE, h: this.bg.height*RheelConfig.RheelUtils.SCALE }, this.rheelheight, this.bonusMode, this.initObj.code)
                explosionSprites.x = this.getGlobalPosition().x
                explosionSprites.y = this.getGlobalPosition().y

                RheelConfig.RheelUtils.EXPLOSION_HOLDER.addChild(explosionSprites)
            }

        }.bind(this);
    }

    tremorFG() {
        if (this.fg.alpha < 1) {
            return
        }

        var centerx = (this.bg.width - this.fg.width) / 2 + (0.5 - Math.random()) * 3
        var centery = (this.bg.height - this.fg.height) / 2 + (0.5 - Math.random()) * 3

        new TWEEN.Tween(this.fg)
            .to({ x: centerx, y: centery }, 30)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(function () {
                this.tremorFG()
            }.bind(this)).start()
    }

}


export default DynamicIcon;

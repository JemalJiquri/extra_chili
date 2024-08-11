
import * as PIXI from 'pixi.js'
import RheelConfig from './RheelConfig'
import Firework from './Firework'

import * as particles from '@pixi/particle-emitter'


class Particles extends PIXI.Sprite {



    colours = ["#ff0000", "#ff00d5", "#ae00ff", "#3300ff", "#006fff", "#00ffee", "#00ff48", "#8cff00", "#eaff00", "#ff7b00"]

    fireworksXPos = [
        .1, .5, .9
    ]


    build() {
        /**/
        this.buildFirework1(this.fireworksXPos[0]).playOnceAndDestroy()
        //this.buildFirework1(this.fireworksXPos[0]).playOnceAndDestroy()
        this.buildFirework2(this.fireworksXPos[1]).playOnceAndDestroy()
        //this.buildFirework2(this.fireworksXPos[1]).playOnceAndDestroy()
        this.buildFirework3(this.fireworksXPos[2]).playOnceAndDestroy()
        //this.buildFirework3(this.fireworksXPos[2]).playOnceAndDestroy()

        this.buildFirework1(this.fireworksXPos[0]).playOnceAndDestroy()
        //this.buildFirework1(this.fireworksXPos[0]).playOnceAndDestroy()
        this.buildFirework1(this.fireworksXPos[1]).playOnceAndDestroy()
        //this.buildFirework1(this.fireworksXPos[2]).playOnceAndDestroy()
        this.buildFirework1(this.fireworksXPos[2]).playOnceAndDestroy()

        for (let index = 0; index < 5; index++) {
            setTimeout(function () {
                window.SoundManager.play({ name: "OneShot" + parseInt(Math.random() * 8), loop: false })
            }.bind(this), parseInt(Math.random() * 1000));

        }
        
        this.buildFirework4(this.fireworksXPos[0])
        //this.buildFirework4(this.fireworksXPos[1])
        this.buildFirework4(this.fireworksXPos[2])
    }

    buildFirework4(xp) {
       var fw = new Firework();
       fw.build()
       fw.x = RheelConfig.RheelUtils.RHEEL_WIDTH * xp + ((Math.random() - 0.5) * 50)
       fw.y = RheelConfig.RheelUtils.RHEEL_HEIGHT * 0.3 * Math.random()

       this.addChild(fw)
        
    }


    buildFirework3(xp) {
        var obj = {}
        obj.scaleMultiplier = 1
        obj.startHeadColour = this.colours[Math.floor(Math.random() * this.colours.length)]
        obj.endHeadColour = this.colours[Math.floor(Math.random() * this.colours.length)]
        obj.startSpeed = 100
        obj.xPos = RheelConfig.RheelUtils.RHEEL_WIDTH * xp + ((Math.random() - 0.5) * 50)
        obj.yPos = RheelConfig.RheelUtils.RHEEL_HEIGHT * 0.3 * Math.random()


        var STAR_PARTICLE = {
            alpha: {
                start: 1,
                end: 0
            },
            scale: {
                start: .1,
                end: .2,
                minimumScaleMultiplier: obj.scaleMultiplier
            },
            color: {
                start: obj.startHeadColour,
                end: obj.endHeadColour
            },
            speed: {
                start: 100,
                end: 0,
                minimumSpeedMultiplier: 1
            },
            acceleration: {
                x: 0,
                y: 100
            },
            maxSpeed: 0,
            startRotation: {
                min: 0,
                max: 360
            },
            noRotation: false,
            rotationSpeed: {
                min: 0,
                max: 0
            },
            lifetime: {
                min: 1,
                max: 1
            },
            blendMode: "add",
            frequency: 0.008,
            emitterLifetime: .2,
            maxParticles: 60,
            pos: {
                x: obj.xPos,
                y: obj.yPos
            },
            addAtBack: false,
            spawnType: "point"
        }

        return new particles.Emitter(this, particles.upgradeConfig(STAR_PARTICLE, [PIXI.Texture.from("star")]));
    }


    buildFirework2(xp) {
        var obj = {}
        obj.startScale = .05
        obj.endScale = .2
        obj.speed = 100
        obj.maxSpeed = 200
        obj.speedMultiplier = .01
        obj.lifeTimeMultiplier = .1
        obj.xPos = RheelConfig.RheelUtils.RHEEL_WIDTH * xp + ((Math.random() - 0.5) * 50)
        obj.yPos = RheelConfig.RheelUtils.RHEEL_HEIGHT * 0.3 * Math.random()
        obj.delay = 1


        var FIRE_WORK_1 = {
            alpha: {
                start: 1,
                end: 0
            },
            scale: {
                start: obj.startScale,
                end: obj.endScale,
                minimumScaleMultiplier: 1
            },
            color: {
                start: this.colours[Math.floor(Math.random() * this.colours.length)],
                end: this.colours[Math.floor(Math.random() * this.colours.length)]
            },
            speed: {
                start: obj.speed,
                end: 0,
                minimumSpeedMultiplier: 1
            },
            acceleration: {
                x: 1,
                y: 1
            },
            maxSpeed: 100,
            startRotation: {
                min: 0,
                max: 360
            },
            noRotation: false,
            rotationSpeed: {
                min: 0,
                max: 0
            },
            lifetime: {
                min: 1,
                max: 2
            },

            blendMode: "add",
            frequency: .001 * obj.lifeTimeMultiplier,
            emitterLifetime: .1 * obj.lifeTimeMultiplier,
            maxParticles: 120,
            addAtBack: false,
            spawnType: "circle",
            spawnCircle: {
                x: obj.xPos,
                y: obj.yPos,
                r: 0
            }
        }

        return new particles.Emitter(this, particles.upgradeConfig(FIRE_WORK_1, [PIXI.Texture.from('FireWork_Particle_01')]));
    }


    buildFirework1(xp) {
        var obj = {}
        obj.startScale = .05
        obj.endScale = .1
        obj.speed = 100
        obj.maxSpeed = 200
        obj.speedMultiplier = .01
        obj.lifeTimeMultiplier = .1
        obj.xPos = RheelConfig.RheelUtils.RHEEL_WIDTH * xp + ((Math.random() - 0.5) * 50)
        obj.yPos = RheelConfig.RheelUtils.RHEEL_HEIGHT * 0.3 * Math.random()


        obj.delay = 1

        var FIRE_WORK_1 = {
            alpha: {
                start: 1,
                end: 0
            },
            scale: {
                start: obj.startScale,
                end: obj.endScale,
                minimumScaleMultiplier: 1
            },
            color: {
                start: this.colours[Math.floor(Math.random() * this.colours.length)],
                end: this.colours[Math.floor(Math.random() * this.colours.length)]
            },
            speed: {
                start: obj.speed,
                end: 0,
                minimumSpeedMultiplier: obj.speedMultiplier
            },
            acceleration: {
                x: 0,
                y: 100
            },
            maxSpeed: 0,
            startRotation: {
                min: 0,
                max: 360
            },
            noRotation: false,
            rotationSpeed: {
                min: 0,
                max: 0
            },
            lifetime: {
                min: 1,
                max: 2
            },
            blendMode: "add",
            frequency: .001 * obj.lifeTimeMultiplier,
            emitterLifetime: .1 * obj.lifeTimeMultiplier,
            maxParticles: 80,
            addAtBack: false,
            spawnType: "circle",
            spawnCircle: {
                x: obj.xPos,
                y: obj.yPos,
                r: 5
            }
        }


        return new particles.Emitter(this, particles.upgradeConfig(FIRE_WORK_1, [PIXI.Texture.from('FireWork_Particle_02')]));
    }





}


export default Particles;

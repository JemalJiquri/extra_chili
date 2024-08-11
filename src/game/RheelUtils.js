
import DynamicIcon from '../libs/mainlib/rheel/DynamicIcon'
import Explosion from '../libs/mainlib/rheel/Explosion'
import * as PIXI from 'pixi.js'
import ExtraChili from "../libs/mainlib/rheel/extrachili.json"


class RheelUtils {
    APP_WIDTH = 2048
    APP_HEIGHT = 1024

    RHEEL_HEIGHT = 500
    RHEEL_WIDTH = 900

    SECONDARY_RHEEL_HEIGHT = 178
    SECONDARY_RHEEL_WIDTH = 600

    SECONDARY_RHEEL_X = 157
    SECONDARY_RHEEL_Y = 510
    //150 178 

    TEXT_RHEEL_X = 775
    TEXT_RHEEL_Y = 115
    TEXT_RHEEL_WIDTH = 500


    ANIM_SPEED = 300
    EXPLOSION_TIME = 900
    EXPLOSION_BONUS_TIME = 2000
    EXPLOSION_HOLDER = null
    SCALE = 1.0
    allIcons = [
        'S1', 'S2', 'S3', 'S4',
        'A', 'K', 'Q', 'J', 'T', 'N'
    ]
    scatters = ["H", "O", "T", "Plus4", "Feature_3"]
    scatterIndex = 0

    iconHeights = [0, 0, 256, 165, 125, 100, 83, 71]
    winMultipliers = [0, 1, 5, 10, 20, 30, 50, 75, 100, 125, 150, 250]
    winmAnimTimes = [0, 3500, 3500, 4000, 5500, 7000, 16000, 15000, 16000, 23000, 28000, 35000]
    winTexts = ["", "", "", "", "", "", "LIB_BIG_WIN", "LIB_BIG_WIN", "LIB_SUPER_WIN", "LIB_MEGA_WIN", "LIB_EPIC_WIN", "LIB_EPIC_WIN"]

    getExplosionSprites(frame, height, bonusMode, name) {
        var bonus = "Day"
        if (bonusMode) {
            bonus = 'Night'
        }
        //Explosion_01/Explosion_01_00001
        // s3 P_GemBlue_01 
        // S4 P_GemGreen_01 
        // S1 P_GemPurple_01 
        // S2 P_GemRed_01
        var itemsList = []

        switch (name) {
            case 'S1':
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                itemsList.push(`P_GemPurple_01`)
                break;
            case 'S2':
                itemsList.push(`Splinters/Splinter${bonus}_01`)
                itemsList.push(`Splinters/Splinter${bonus}_02`)
                itemsList.push(`Splinters/Splinter${bonus}_03`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                itemsList.push(`P_GemRed_01`)
                break;
            case 'S3':
                itemsList.push(`Splinters/Splinter${bonus}_01`)
                itemsList.push(`Splinters/Splinter${bonus}_02`)
                itemsList.push(`Splinters/Splinter${bonus}_03`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                itemsList.push(`P_GemBlue_01`)
                break;
            case 'S4':
                itemsList.push(`Splinters/Splinter${bonus}_01`)
                itemsList.push(`Splinters/Splinter${bonus}_02`)
                itemsList.push(`Splinters/Splinter${bonus}_03`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                itemsList.push(`P_GemGreen_01`)
                break;
            default:
                itemsList.push(`Splinters/Splinter${bonus}_01`)
                itemsList.push(`Splinters/Splinter${bonus}_02`)
                itemsList.push(`Splinters/Splinter${bonus}_03`)
                itemsList.push(`Splinters/Splinter${bonus}_04`)
                itemsList.push(`Splinters/Splinter${bonus}_05`)
                itemsList.push(`Splinters/Splinter${bonus}_06`)
                break;
        }

        var e = new Explosion()
        e.build(12 - height, itemsList, frame, { min: 0.2 * this.SCALE, max: 0.6 * this.SCALE })
        return e
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

        return new PIXI.AnimatedSprite(textures);
    }

    getRandomFloor(bonusMode) {
        var height = 2 + parseInt(Math.random() * 5);
        //console.log("getRandomFloor height=" + height)
        var arr = [];
        for (let index = 0; index < height; index++) {
            var icon = new DynamicIcon()
            var icnObj = this.getIconSettings(
                this.allIcons[parseInt(Math.random() * this.allIcons.length)],
                height, false, bonusMode)
            icon.init(height, icnObj, bonusMode)

            arr.push(icon)
        }
        return { icons: arr, height: height }
    }

    createMask(width, height) {
        var holderMask = new PIXI.Graphics();
        holderMask.beginFill(0x8bc5ff, 1);
        holderMask.moveTo(0, 0);
        holderMask.lineTo(width, 0);
        holderMask.lineTo(width, height);
        holderMask.lineTo(0, height);
        holderMask.lineTo(0, 0);
        return holderMask
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


    getIconSettings(symbol, height, extra, bonusMode) {
        var obj = JSON.parse(JSON.stringify(ExtraChili.symbols[symbol]))
        if (bonusMode) {
            if (obj.bgbonus) {
                obj.bg = obj.bgbonus
            }
            if (obj.bgbonuse) {
                obj.bge = obj.bgbonuse
            }
        }
        if (obj.bg) {
            obj.bg = obj.bg.replace("%h", height)
            obj.bge = obj.bge.replace("%h", height)
        }

        obj.shadow = obj.shadow.replace("%h", height)
        if (symbol == 'SC') { 
            if (extra) {
                obj.fg = obj.fg.replace("%h", this.scatters[4])
                obj.fgposition = obj.fgpositionextra
            } else {
                obj.fg = obj.fg.replace("%h", this.scatters[this.scatterIndex])
            }

            this.scatterIndex++
            if(this.scatterIndex>=3){
                this.scatterIndex = 3
            }
        } else {
            obj.fg = obj.fg.replace("%h", height)
        }


        if (extra) {
            obj.bg = obj.bge
            if(obj.animations && obj.animations.bg){
                for (let index = 0; index < obj.animations.bg.length; index++) {
                    obj.animations.bg[index].animation = obj.animations.bg[index].animation_extra
                    obj.animations.bg[index].fade.delay = obj.animations.bg[index].fade.delay_extra
                }
            }
            




        }

        return obj
    }





    Bezier(a, b, c, d, t) {
        var point = { x: 0, y: 0 },
            mt = 1 - t,
            mt2 = mt * mt,
            mt3 = mt2 * mt;
        point.x = a.x * mt3 + b.x * 3 * mt2 * t + c.x * 3 * mt * t * t + d.x * t * t * t;
        point.y = a.y * mt3 + b.y * 3 * mt2 * t + c.y * 3 * mt * t * t + d.y * t * t * t;
        return point;
    }

}


export default RheelUtils;

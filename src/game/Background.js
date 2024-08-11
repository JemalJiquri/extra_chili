import * as PIXI from 'pixi.js'
import Flag from './flags/Flag'
import FlagB from './flags/FlagB'
import FlagD from './flags/FlagD'

import Globals from './Globals'
class Background extends PIXI.Sprite {
    bg1 = null
    bg2 = null

    bgUp1 = null
    bgUp2 = null
    bgDown1 = null
    bgDown2 = null

    flagA = null
    flagB = null
    flagC = null
    flagD = null

    flagCoverRight = null
    flagCoverLeft = null

    init(bonusMode) {
        console.log("Background init");
        if (bonusMode) {
            this.bgUp1 = PIXI.Sprite.from(PIXI.Texture.from('BGDusk_01_01'));
            this.bgUp2 = PIXI.Sprite.from(PIXI.Texture.from('BGDusk_01_02'));
            this.bg1 = PIXI.Sprite.from(PIXI.Texture.from('BGDusk_01_03'));
            this.bg2 = PIXI.Sprite.from(PIXI.Texture.from('BGDusk_01_04'));
            this.bgDown1 = PIXI.Sprite.from(PIXI.Texture.from('BGDusk_01_05'));
            this.bgDown2 = PIXI.Sprite.from(PIXI.Texture.from('BGDusk_01_06'));

        } else {
            this.bgUp1 = PIXI.Sprite.from(PIXI.Texture.from('BGDay_01_01'));
            this.bgUp2 = PIXI.Sprite.from(PIXI.Texture.from('BGDay_01_02'));
            this.bg1 = PIXI.Sprite.from(PIXI.Texture.from('BGDay_01_03'));
            this.bg2 = PIXI.Sprite.from(PIXI.Texture.from('BGDay_01_04'));
            this.bgDown1 = PIXI.Sprite.from(PIXI.Texture.from('BGDay_01_05'));
            this.bgDown2 = PIXI.Sprite.from(PIXI.Texture.from('BGDay_01_06'));
            
        }

        //BGDay_01_01 BGDay_01_02
        //BGDay_01_05 BGDay_01_06
        //BGDusk_01_01 BGDusk_01_02
        //BGDusk_01_05 BGDusk_01_06

        this.bg2.x = this.bg1.width

        this.addChild(this.bg1);
        this.addChild(this.bg2);

        this.bgUp2.x = this.bgUp1.width
        this.bgUp1.y = -this.bgUp1.height
        this.bgUp2.y = -this.bgUp2.height
        this.addChild(this.bgUp1);
        this.addChild(this.bgUp2);


        this.bgDown2.x = this.bgDown1.width
        this.bgDown1.y = this.bg1.height
        this.bgDown2.y = this.bg2.height
        this.addChild(this.bgDown1);
        this.addChild(this.bgDown2);
        //flag.position.set(100, 100); Flags/Flags_C Flags/Flags_D
        if (!bonusMode) {
            this.flagD = new FlagD()
            this.flagD.init('Flags/Flags_D')
            this.flagD.x = 0
            this.flagD.y = 220

            this.addChild(this.flagD);


            this.flagC = new FlagD()
            this.flagC.init('Flags/Flags_C')
            this.flagC.x = Globals.width - this.flagC.flag_texture.width
            this.flagC.y = 220

            this.addChild(this.flagC);


            this.flagA = new Flag()
            this.flagA.init()
            this.flagA.angle = 7
            this.flagA.scale.x = this.flagA.scale.y = 1.15
            this.flagA.x = Globals.width - this.flagA.flag_texture.width + 30
            this.flagA.y = 180

            this.addChild(this.flagA);


            this.flagB = new FlagB()
            this.flagB.init()
            this.flagB.angle = -7
            this.flagB.scale.x = this.flagB.scale.y = 1.15
            this.flagB.x = -40
            this.flagB.y = 260

            this.addChild(this.flagB);


            this.flagCoverRight = PIXI.Sprite.from(PIXI.Texture.from('Flags/FlagCoverRight'));
            this.flagCoverRight.x = 1491
            this.flagCoverRight.y = 179
            this.addChild(this.flagCoverRight);
            //Flags/FlagCoverRight Flags/FlagCoverLeft

            this.flagCoverLeft = PIXI.Sprite.from(PIXI.Texture.from('Flags/FlagCoverLeft'));
            this.flagCoverLeft.x = 467
            this.flagCoverLeft.y = 194
            this.addChild(this.flagCoverLeft);
        }

    }




}


export default Background

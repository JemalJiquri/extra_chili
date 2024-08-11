import { Howl, Howler } from "howler";
import MainSound from "./MainSound";
import Globals from "../../game/Globals";

//install AudioSprite https://github.com/tonistiigi/audiosprite
//npm install -g audiosprite
//install ffmpec for macos "brew install ffmpeg"
//Step1 change directory to sounds folder "cd public/assets/sounds"
//Step2 generate sound sprite "audiosprite --format howler --output bitingsounds *.mp3"

class SM {
    GlobalSound = null;
    muteState = false;
    sounds = {};
    bgs = {};

    load(list) {
        Globals.SoundNameID = 0
        Globals.globalSound = new Howl({
            src: list.urls,
            sprite: list.sprite,
            autoplay: false,
            loop: false,
            volume: 0.5,
        });
        window.onblur = function () {
            this.mute();
        }.bind(this);
        window.onfocus = function () {
            this.unMute();
        }.bind(this);
    }

    play(conf) {

        //console.log()
        var snd = new MainSound();
        snd.play(conf, this);
        if (conf.isBG) {
            this.bgs[snd.unique_name] = snd;
        } else {
            this.sounds[snd.unique_name] = snd;
        }

        return snd;
    }

    stop(name, fade) {
        for (let snd of Object.entries(this.sounds)) {
            if (snd[1].name === name) {
                snd[1].stop(fade);
            }
        }
    }

    mute() {
        Howler.mute(true);
        this.muteState = true;
    }

    unMute() {
        Howler.mute(false);
        this.muteState = false;
    }

    isMuted() {
        return this.muteState;
    }

    soundCompleted(snd) {
        if (this.sounds[snd.unique_name]) {
            this.sounds[snd.unique_name].destroy();
        }
        delete this.sounds[snd.unique_name];

        if (this.bgs[snd.unique_name]) {
            this.bgs[snd.unique_name].destroy();
        }
        delete this.bgs[snd.unique_name];
    }
}

export default SM;

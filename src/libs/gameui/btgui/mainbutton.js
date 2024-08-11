import * as PIXI from 'pixi.js'


class MainButton extends PIXI.Sprite {
    callback_function = null
    fade_element = null


    init() {
        console.log('MainButton init')

        this.buttonMode = true;
        this.interactive = true;

        
        if (window.SETTINGS.isMobile) {
            this.on('touchstart', this.onButtonDown.bind(this))
            this.on('touchend', this.onButtonUp.bind(this))
            this.on('touchendoutside', this.onButtonUp.bind(this))
            this.on('pointertap', this.onClick.bind(this))
        } else {
            this.on('mousedown', this.onButtonDown.bind(this))
            this.on('mouseup', this.onButtonUp.bind(this))
            this.on('mouseupoutside', this.onButtonUp.bind(this))
            this.on('mouseover', this.onButtonOver.bind(this))
            this.on('mouseout', this.onButtonOut.bind(this))
            this.on('click', this.onClick.bind(this))
    
        }

        //
    }

    onClick() {
        if (this.callback_function) {
            this.callback_function(this)
        }
    }

    onButtonDown() {
        if (this.fade_element) {
            this.fade_element.alpha = 1
        }
    }

    onButtonUp() {
        if (this.fade_element) {
            this.fade_element.alpha = 0
        }

    }

    onButtonOver() {

    }

    onButtonOut() {

    }

}


export default MainButton;

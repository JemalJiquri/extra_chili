
import * as PIXI from 'pixi.js'
import WinCoin from './WinCoin'

class WinCoinsHolder extends PIXI.Sprite {
    coinsHolder = null
    currentAdding = 0
    currentAdded = 0
    winType = 0
    winTime = 0
    addSpeed = 250
    active = true


    build(_winType, _winTime) {

        this.winType = _winType
        this.winTime = _winTime
        if (this.winType < 5) {
            this.addSpeed = this.winTime / 4
            this.currentAdding = 3
        } else {
            if (this.winType == 5) {
                this.addSpeed = this.winTime / 10
                this.currentAdding = 4
            } else {
                this.addSpeed = this.winTime / 16
                this.currentAdding = 15
            }
        }

        this.addNextCoins()
        setTimeout(function () {
            this.active = false
            if (this.winType >= 6) {
                window.SoundManager.play({ name: "UnderStakeWin0", loop: false })
            }
        }.bind(this), this.winTime + 1000);
    }


    addNextCoins() {
        if (!this.active) {
            console.log(`addNextCoins return`)
            return
        }
        var currentA = this.currentAdding
        if (Math.random() > 0.8) {
            currentA = this.currentAdding + 10
        }
        var coins = [
            [1, 'Coin', 9],
            [2, 'Coin', 9]
        ]
        var gems = [
            [1, 'Gem', 19],
            [2, 'Gem', 19],
            [3, 'Gem', 19]
        ]
        var delay = 0


        for (let index = 0; index < currentA; index++) {
            var wc = new WinCoin()
            var item = coins[Math.floor(Math.random() * coins.length)]
            var fall = 0.9 + 0.2 * (Math.random() - 0.5)


            if (this.winType > 2 && Math.random() > 0.8) {
                item = gems[Math.floor(Math.random() * gems.length)]
                fall = 1.2 + 0.2 * (Math.random() - 0.5)

                if (Math.random() > 0.96 && this.currentAdding > 20) {
                    delay = 1
                    fall = 1.2
                }

            }
            wc.build(item[0], item[1], item[2])
            wc.fall(fall, delay > 0 ? delay : (this.addSpeed / currentA) * index)
            this.addChild(wc)

        }
        this.currentAdded = this.currentAdded + this.currentAdding
        this.currentAdding = this.currentAdding + 2
        if (this.currentAdding > 30) {
            this.currentAdding = 30
        }

        setTimeout(function () {
            this.addNextCoins()
        }.bind(this), this.addSpeed);
    }




}


export default WinCoinsHolder;

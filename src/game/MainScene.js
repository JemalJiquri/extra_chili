import * as PIXI from "pixi.js";
import DynamicSizeRheelHolder from "../libs/mainlib/rheel/DynamicSizeRheelHolder";
import RheelConfig from "../libs/mainlib/rheel/RheelConfig";
import WinHolder from "../libs/mainlib/rheel/WinHolder";
import CoinFall from "../libs/mainlib/rheel/CoinFall";

import BTGUIConstants from "../libs/gameui/btgui/constants";
import BtgUI from "../libs/gameui/btgui/btgui";

import Background from "./Background";
import Foreground from "./Foreground";
import Globals from "./Globals";
import MainSceneBonus from "./MainSceneBonus";
import TWEEN from "@tweenjs/tween.js";

//git add . && git commit -m "fixes" && git push -u origin main
//git submodule foreach git pull origin main
class MainScene extends PIXI.Sprite {
    bg = null;
    fg = null;
    rhholder = null;
    btgui = null;
    currentMessage = null;
    freeSpinWheel = null;
    selfMAsk = null;
    mainSceneBonus = null;
    currentBet = 10;
    winHolder = null;
    currentSound = null;
    startBanner = null;
    mainHolder = null;
    bottomWin = 0;
    blackLayer = null;

    init() {
        console.log("MainScene init");
        this.mainHolder = new PIXI.Sprite();
        this.addChild(this.mainHolder);

        this.bg = new Background();
        this.bg.init(false);
        this.mainHolder.addChild(this.bg);

        this.rhholder = new DynamicSizeRheelHolder();
        this.rhholder.x = 570;
        this.rhholder.y = 195;
        this.rhholder.build(Globals.firstMessage, this, false);
        this.mainHolder.addChild(this.rhholder);
        this.rhholder.textSprite.x = RheelConfig.RheelUtils.TEXT_RHEEL_X;
        this.rhholder.textSprite.y = RheelConfig.RheelUtils.TEXT_RHEEL_Y;

        this.fg = new Foreground();
        this.fg.init(false);
        this.mainHolder.addChild(this.fg);
        this.mainHolder.addChild(this.rhholder.textSprite);
        //this.addChild(RheelConfig.RheelUtils.EXPLOSION_HOLDER);
        //freeSpinWheelPopap bonusFinalPopup freeSpinPopap buyBonusPopap menuPopap createStartBaner

        this.btgui = new BtgUI();
        this.btgui.init(this);

        this.addChild(this.btgui);

        Globals.downPanel.update({
            currency: window.SETTINGS.Currency,
            balance: window.SETTINGS.Balance,
            win: 0,
            msg: "",
        });
        //Chips

        this.startBanner = this.btgui.createStartBaner();
        this.btgui.hideButtons(true);

        this.selfMAsk = RheelConfig.RheelUtils.createMask(
            Globals.width,
            Globals.height * 2
        );
        this.selfMAsk.y = -Globals.height / 2;
        this.mainHolder.addChild(this.selfMAsk);
        this.mainHolder.mask = this.selfMAsk;
        this.currentSound = window.SoundManager.play({
            name: "Ambience1",
            loop: true,
        });
        this.resize();

        //window.SETTINGS.Balance window.SETTINGS.Feature window.SETTINGS.CurrencyBets window.SETTINGS.CurrencyBetIndex
        this.currentBet =
            window.SETTINGS.CurrencyBets[window.SETTINGS.CurrencyBetIndex];
        this.btgui.changebet(window.SETTINGS.Currency, this.currentBet / 100);
        if (window.SETTINGS.Feature[this.currentBet]) {
            this.btgui.changebuyBonus(
                window.SETTINGS.Currency,
                window.SETTINGS.Feature[this.currentBet] / 100
            );
        } else {
            this.btgui.changebuyBonus(
                window.SETTINGS.Currency,
                (this.currentBet * 50) / 100
            );
        }
        //changebuyBonus
    }

    getOriginScaleRatio() {
        var _w = window.innerWidth;
        var _h = window.innerHeight;

        var fatness1 = _w / _h;
        var fatness2 = 1300 / 1000;
        var scaleRatio = 1;

        if (fatness2 >= fatness1) {
            scaleRatio = _w / 1300;
        } else {
            scaleRatio = _h / 1000;
        }

        return scaleRatio;
    }

    resize() {
        var osr = this.getOriginScaleRatio();

        if (window.innerWidth > window.innerHeight) {
            if (window.SETTINGS.isMobile) {
                Globals.downPanel.originHeight = 140;
            } else {
                Globals.downPanel.originHeight = 40;
            }
        }

        var _w = window.innerWidth;
        var _h = window.innerHeight - Globals.downPanel.originHeight * osr;

        var fatness1 = _w / _h;
        var fatness2 = 1300 / 1000;
        var scaleRatio = 1;

        if (fatness2 >= fatness1) {
            scaleRatio = _w / 1300;
        } else {
            scaleRatio = _h / 1000;
        }

        this.mainHolder.scale.x = scaleRatio;
        this.mainHolder.scale.y = scaleRatio;
        RheelConfig.RheelUtils.SCALE = scaleRatio;
        var w = this.mainHolder.scale.x * Globals.width;
        var h = this.mainHolder.scale.y * Globals.height;

        this.mainHolder.x = (window.innerWidth - w) / 2;
        this.mainHolder.y =
            (window.innerHeight - Globals.downPanel.originHeight * osr - h) / 2;
        console.log("aaaaaaaaaaaaaaaaaaaa " + w + " " + h + " " + scaleRatio);

        var offset = 100;
        var ossetFactor = window.innerWidth / window.innerHeight;
        if (ossetFactor > 2 && ossetFactor < 7) {
            offset = 100 + ((ossetFactor - 2) * 2900) / 5;
        }

        this.btgui.resize(
            window.innerWidth,
            window.innerHeight - Globals.downPanel.originHeight * osr,
            scaleRatio * 0.9,
            offset
        );

        Globals.downPanel.resize(
            window.innerWidth,
            window.innerHeight,
            scaleRatio
        );

        if (this.mainSceneBonus) {
            this.mainSceneBonus.resize();
        }
    }

    eventHandler(eventtype, caller) {
        console.log("eventtype " + eventtype);

        switch (eventtype) {
            case "featuredrop":
                var coinCaller = this.btgui.getCoinObject();
                var point = coinCaller.toGlobal(new PIXI.Point(0, 0));
                console.log(point);
                caller.fall = {
                    x:
                        point.x -
                        caller.position.x +
                        (coinCaller.get_size().width *
                            RheelConfig.RheelUtils.SCALE) /
                            2,
                    y:
                        point.y -
                        caller.position.y +
                        ((coinCaller.get_size().height - 150) *
                            RheelConfig.RheelUtils.SCALE) /
                            2,
                    scale: RheelConfig.RheelUtils.SCALE,
                };

                var cf = new CoinFall();
                cf.build(caller, this);
                cf.x = caller.position.x;
                cf.y = caller.position.y;

                this.addChild(cf);
                break;

            case "coinfall":
                this.btgui.takeCoin();
                caller.parent.removeChild(caller);
                break;
            case "changepage":
                if (this.menu) {
                    if (this.menu.activPage) {
                        if (this.menu.activPage.changeSingleWinLimitText) {
                            this.menu.activPage.changeSingleWinLimitText(
                                (this.autoData.win[this.autoData.winIndex] *
                                    window.SETTINGS.CurrencyBets[
                                        window.SETTINGS.CurrencyBetIndex
                                    ]) /
                                    100,
                                window.SETTINGS.Currency
                            );
                        }
                    }
                }
                break;
            case "respinfinished":
                console.log(caller.winnings);
                if (caller.winnings) {
                    for (
                        let index = 0;
                        index < caller.winnings.length;
                        index++
                    ) {
                        this.bottomWin += caller.winnings[0][2] / 100;
                    }

                    Globals.downPanel.update({
                        currency: window.SETTINGS.Currency,
                        win: this.bottomWin,
                    });

                    if (caller.winnings.length === 1) {
                        //
                        //"%w WAY = %c %d"
                        Globals.downPanel.update({
                            msg: window.Lang.default["BOTTOM_WIN"].str
                                .replace("%w", caller.winnings[0][6])
                                .replace("%c", window.SETTINGS.Currency)
                                .replace("%d", caller.winnings[0][2] / 100),
                        });

                        setTimeout(function () {
                            Globals.downPanel.update({
                                msg: " ",
                            });
                        }, 1000);
                    }
                }
                break;

            default:
                break;
        }
    }

    bonusSpinsFinished() {
        this.btgui.showButtons();
        console.dir(this.mainSceneBonus.bonusData);
        this.btgui.setEnabled(true);
        Globals.downPanel.update({
            msg: window.Lang.default["BONUS_COMPLETED"].str,
            currency: window.SETTINGS.Currency,
            win: this.currentMessage.win / 100,
            balance: window.SETTINGS.Balance,
        });

        if (this.mainSceneBonus.bonusData.win > 0) {
            console.log("Win: " + this.mainSceneBonus.bonusData.win);

            var black = RheelConfig.RheelUtils.createRect(
                Globals.width,
                Globals.height,
                0x000000
            );
            black.alpha = 0;
            this.mainHolder.addChild(black);
            this.winHolder = new WinHolder();

            this.winHolder.build(
                this.mainSceneBonus.bonusData.win,
                this.mainSceneBonus.bonusData.win / this.currentBet,
                black
            );

            this.winHolder.x = 570 + RheelConfig.RheelUtils.RHEEL_WIDTH / 2;
            this.winHolder.y =
                195 +
                RheelConfig.RheelUtils.RHEEL_HEIGHT +
                RheelConfig.RheelUtils.SECONDARY_RHEEL_HEIGHT;

            this.mainHolder.addChild(this.winHolder);
            this.addChild(this.btgui);
        }
    }

    spinFinished() {
        var winTime = 1000;
        if (this.currentMessage.win > 0) {
            console.log("Win: " + this.currentMessage.win);
            console.dir(this.currentMessage);

            var black = RheelConfig.RheelUtils.createRect(
                Globals.width,
                Globals.height,
                0x000000
            );
            black.alpha = 0;
            this.mainHolder.addChild(black);
            this.winHolder = new WinHolder();

            Globals.downPanel.update({
                currency: window.SETTINGS.Currency,
                win: this.currentMessage.win / 100,
                balance: window.SETTINGS.Balance,
            });

            this.winHolder.build(
                this.currentMessage.win,
                this.currentMessage.win / this.currentBet,
                black
            );
            winTime = this.winHolder.winTime;
            if (this.autoData.play.spins > 0) {
                winTime += 2000;
            }
            this.winHolder.x = 570 + RheelConfig.RheelUtils.RHEEL_WIDTH / 2;
            this.winHolder.y =
                195 +
                RheelConfig.RheelUtils.RHEEL_HEIGHT +
                RheelConfig.RheelUtils.SECONDARY_RHEEL_HEIGHT;

            this.mainHolder.addChild(this.winHolder);
            this.addChild(this.btgui);
        }

        console.dir(this.currentMessage);
        if (this.currentMessage.subgameTriggered) {
            setTimeout(
                function () {
                    this.rhholder.animateScattersFeature();
                    setTimeout(
                        function () {
                            this.freeSpinPopap = this.btgui.freeSpinPopap(
                                this.currentMessage.freespinsCountHistory[0]
                            );
                            this.freeSpinPopap.x = 576;
                            this.freeSpinPopap.y = 98;
                            this.mainHolder.addChild(this.freeSpinPopap);
                            this.btgui.hideButtons();
                            Globals.downPanel.update({
                                msg: window.Lang.default["BONUS_TRIGGER"].str,
                            });
                        }.bind(this),
                        4000
                    );
                }.bind(this),
                winTime
            );
        } else {
            this.btgui.setEnabled(true);
        }

        if (this.autoData.play.spins > 0) {
            if (winTime < 2000) {
                winTime = 2000;
            }
            setTimeout(
                function () {
                    this.autoPlay();
                }.bind(this),
                winTime
            );
        } else if (this.autoData.play.autoplay) {
            this.autoPlay();
        }
    }
    /** */
    messageReaded(msg) {
        //this.btgui.changebet changebuyBonus
        switch (msg.MT) {
            case 51:
                if (msg.IM.ErrorCode === 10) {
                    this.btgui.setEnabled(true);
                    this.btgui.showMessageWindow(
                        window.Lang.default["INFO_MSG_HEADER"].str,
                        window.Lang.default["BALANCE_ERROR_MSG"].str
                    );

                    if (
                        this.autoData.play.spins > 0 ||
                        this.autoData.play.autoplay
                    ) {
                        this.btgui.setAutoMode(false);
                        this.stopAutoPlay();
                    }
                }

                break;
            case 6:
                window.SETTINGS.Balance = (msg.IM.Chips / 100.0).toFixed(2);

                break;
            case 2:
                this.currentMessage = msg.IM;

                Globals.downPanel.update({
                    currency: window.SETTINGS.Currency,
                    balance: this.currentMessage.Chips / 100,
                    win: 0,
                    msg: "",
                });

                window.SETTINGS.Feature = msg.IM.machineStateAfter;

                if (window.SETTINGS.Feature[this.currentMessage.ba]) {
                    this.btgui.changebuyBonus(
                        window.SETTINGS.Currency,
                        window.SETTINGS.Feature[this.currentMessage.ba] / 100
                    );
                } else {
                    this.btgui.changebuyBonus(
                        window.SETTINGS.Currency,
                        (this.currentBet * 50) / 100
                    );
                }
                this.rhholder.animate(msg.IM);
                break;
            case 4:
                var prevlen = this.currentMessage.freespinsCountHistory.length;
                var prevWin =
                    this.currentMessage.freespinsCountHistory[
                        this.currentMessage.freespinsCountHistory.length - 1
                    ];
                this.currentMessage = msg.IM;
                if (
                    prevlen !== this.currentMessage.freespinsCountHistory.length
                ) {
                    this.freeSpinWheel.gambleTo(
                        this.currentMessage.freespinsCountHistory[
                            this.currentMessage.freespinsCountHistory.length - 1
                        ] > prevWin
                    );
                } else {
                    this.btgui.freeSpinWheelPopapHide(0);
                    if (this.currentMessage.ended) {
                        if (
                            this.currentMessage.freespins &&
                            this.currentMessage.freespins.length > 0
                        ) {
                            this.bonusFinalPopup = this.btgui.bonusFinalPopup(
                                this.currentMessage.freespinsCountHistory[
                                    this.currentMessage.freespinsCountHistory
                                        .length - 1
                                ]
                            );
                            this.bonusFinalPopup.x = 576;
                            this.bonusFinalPopup.y = 98;
                            this.mainHolder.addChild(this.bonusFinalPopup);
                            this.btgui.hideButtons();
                        }
                    }
                }
                break;
            default:
                break;
        }
    }

    blackLayerFunc(add) {
        if (add) {
            this.blackLayer = RheelConfig.RheelUtils.createRect(
                Globals.width * 2,
                Globals.height * 2,
                0x000000
            );
            this.blackLayer.x = -Globals.width / 2;
            this.blackLayer.y = -Globals.height / 2;
            this.blackLayer.alpha = 0.5;
            this.mainHolder.addChild(this.blackLayer);
        } else {
            new TWEEN.Tween(this.blackLayer)
                .to({ alpha: 0 }, 100)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(
                    function () {
                        this.mainHolder.removeChild(this.blackLayer);
                    }.bind(this)
                )
                .start();
        }
    }

    buttonClicked(btnname) {
        console.dir("buttonClicked " + btnname);
        if (this.winHolder) {
            if (this.winHolder.active) {
                this.winHolder.remove();
                this.winHolder = null;
            }
        }
        //this.btgui.changebet(window.SETTINGS.Currency,window.SETTINGS.CurrencyBets[window.SETTINGS.CurrencyBetIndex]/100)
        switch (btnname) {
            case "wheel":
                if (
                    this.currentMessage.freespinsCountHistory[
                        this.currentMessage.freespinsCountHistory.length - 1
                    ] > 0 &&
                    !this.currentMessage.ended
                ) {
                    this.freeSpinWheel.setMode(
                        this.currentMessage.freespinsCountHistory[
                            this.currentMessage.freespinsCountHistory.length - 1
                        ]
                    );
                } else {
                    setTimeout(
                        function () {
                            this.btgui.freeSpinWheelPopapHide(0);
                            this.btgui.setEnabled(true);
                            this.btgui.showButtons();
                            if (this.currentMessage.ended) {
                                if (
                                    this.currentMessage.freespins &&
                                    this.currentMessage.freespins.length > 0
                                ) {
                                    this.bonusFinalPopup =
                                        this.btgui.bonusFinalPopup(
                                            this.currentMessage
                                                .freespinsCountHistory[
                                                this.currentMessage
                                                    .freespinsCountHistory
                                                    .length - 1
                                            ]
                                        );
                                    this.bonusFinalPopup.x = 576;
                                    this.bonusFinalPopup.y = 98;
                                    this.mainHolder.addChild(
                                        this.bonusFinalPopup
                                    );
                                    this.btgui.hideButtons();
                                }
                            }
                        }.bind(this),
                        4000
                    );
                }
                break;
            //
            case BTGUIConstants.MENU: //BTGUI_MENU this.changePage(1)
                if (this.menu == null) {
                    this.menu = this.btgui.menuPopup("PAYS");
                } else {
                    if (this.menu.aqtivpageindex === 0) {
                        this.btgui.menuPopupHide(0);
                        this.menu = null;
                    } else {
                        this.menu.changePage(0);
                    }
                }

                break;

            case BTGUIConstants.START_BANER_BTN: //BTGUI_MENU this.changePage(1)
                this.startBanner.hidePopup(0);
                this.btgui.showButtons(true);
                setTimeout(
                    function () {
                        this.btgui.startSpinBtnAnimation();
                    }.bind(this),
                    100
                );

                break;

            case BTGUIConstants.MENU_HOME: //BTGUI_MENU this.changePage(1)
                document.location = window.SETTINGS.ReturnUrl;
                break;

            case BTGUIConstants.AUTO_SPIN:
                if (this.menu == null) {
                    this.menu = this.btgui.menuPopup("AUTO");
                    this.autoData.winIndex = 2;
                    if (this.menu) {
                        if (this.menu.activPage) {
                            this.menu.activPage.changeSingleWinLimitText(
                                (this.autoData.win[this.autoData.winIndex] *
                                    window.SETTINGS.CurrencyBets[
                                        window.SETTINGS.CurrencyBetIndex
                                    ]) /
                                    100,
                                window.SETTINGS.Currency
                            );
                        }
                    }
                } else {
                    if (this.menu.aqtivpageindex === 1) {
                        this.btgui.menuPopupHide(0);
                        this.menu = null;
                    } else {
                        this.menu.changePage(1);
                        this.autoData.winIndex = 2;
                        if (this.menu) {
                            if (this.menu.activPage) {
                                this.menu.activPage.changeSingleWinLimitText(
                                    (this.autoData.win[this.autoData.winIndex] *
                                        window.SETTINGS.CurrencyBets[
                                            window.SETTINGS.CurrencyBetIndex
                                        ]) /
                                        100,
                                    window.SETTINGS.Currency
                                );
                            }
                        }
                    }
                }
                break;

            case BTGUIConstants.MENU_EXIT: //BTGUI_MENU this.changePage(1)
                this.btgui.menuPopupHide(0);
                this.menu = null;
                this.autoData.spinsIndex = -1;
                this.autoData.winIndex = 0;
                break;

            case BTGUIConstants.CHANGE_BET_PLUS: //CHANGE_BET_MINUS
                window.SETTINGS.CurrencyBetIndex++;
                if (
                    window.SETTINGS.CurrencyBetIndex >
                    window.SETTINGS.CurrencyBets.length - 1
                ) {
                    window.SETTINGS.CurrencyBetIndex =
                        window.SETTINGS.CurrencyBets.length - 1;
                }

                this.currentBet =
                    window.SETTINGS.CurrencyBets[
                        window.SETTINGS.CurrencyBetIndex
                    ];
                this.btgui.changebet(
                    window.SETTINGS.Currency,
                    this.currentBet / 100
                );

                if (window.SETTINGS.Feature[this.currentBet]) {
                    this.btgui.changebuyBonus(
                        window.SETTINGS.Currency,
                        window.SETTINGS.Feature[this.currentBet] / 100
                    );
                } else {
                    this.btgui.changebuyBonus(
                        window.SETTINGS.Currency,
                        (this.currentBet * 50) / 100
                    );
                }
                if(this.menu){
                    if (this.menu.aqtivpageindex === 1) {
                        this.menu.activPage.changeNumberOfSpinsText(-1);
                        this.menu.activPage.changeLossLimitText(
                            -1,
                            window.SETTINGS.Currency
                        );
                        this.autoData.spinsIndex = -1
                        if (this.menu.activPage.changeSingleWinLimitText) {
                            this.menu.activPage.changeSingleWinLimitText(
                                (this.autoData.win[this.autoData.winIndex] *
                                    window.SETTINGS.CurrencyBets[
                                        window.SETTINGS.CurrencyBetIndex
                                    ]) /
                                    100,
                                window.SETTINGS.Currency
                            );
                        }
                    }
                }
                


                break;

            case BTGUIConstants.CHANGE_BET_MINUS: //CHANGE_BET_MINUS
                window.SETTINGS.CurrencyBetIndex--;
                if (window.SETTINGS.CurrencyBetIndex < 0) {
                    window.SETTINGS.CurrencyBetIndex = 0;
                }
                this.currentBet =
                    window.SETTINGS.CurrencyBets[
                        window.SETTINGS.CurrencyBetIndex
                    ];
                this.btgui.changebet(
                    window.SETTINGS.Currency,
                    this.currentBet / 100
                );

                if (window.SETTINGS.Feature[this.currentBet]) {
                    this.btgui.changebuyBonus(
                        window.SETTINGS.Currency,
                        window.SETTINGS.Feature[this.currentBet] / 100
                    );
                } else {
                    this.btgui.changebuyBonus(
                        window.SETTINGS.Currency,
                        (this.currentBet * 50) / 100
                    );
                }

                if(this.menu){
                    if (this.menu.aqtivpageindex === 1) {
                        this.menu.activPage.changeNumberOfSpinsText(-1);
                        this.menu.activPage.changeLossLimitText(
                            -1,
                            window.SETTINGS.Currency
                        );
                        this.autoData.spinsIndex = -1
                        if (this.menu.activPage.changeSingleWinLimitText) {
                            this.menu.activPage.changeSingleWinLimitText(
                                (this.autoData.win[this.autoData.winIndex] *
                                    window.SETTINGS.CurrencyBets[
                                        window.SETTINGS.CurrencyBetIndex
                                    ]) /
                                    100,
                                window.SETTINGS.Currency
                            );
                        }
                    }
                }
                break;

            case BTGUIConstants.SPIN:
                //this.menu  this.menu.aqtivpageindex === 1
                if (this.menu == null) {
                    this.bottomWin = 0;
                    Globals.downPanel.update({
                        currency: window.SETTINGS.Currency,
                        win: this.bottomWin,
                        msg: " ",
                    });
                    this.currentBet =
                        window.SETTINGS.CurrencyBets[
                            window.SETTINGS.CurrencyBetIndex
                        ];
                    var spinMessage = {
                        IM: { Bet: this.currentBet },
                        UID: window.SETTINGS.UID,
                        SID: window.SETTINGS.SID,
                        MT: 2,
                    };
                    this.btgui.setEnabled(false);
                    Globals.WS.send(JSON.stringify(spinMessage));
                } else {
                    if (this.menu.aqtivpageindex === 1) {
                        if (this.menu.activPage) {
                            if (this.menu.activPage.blinkStartButton) {
                                this.menu.activPage.blinkStartButton();
                            }
                        }
                    } else {
                        this.btgui.menuPopupHide(0);
                        this.menu = null;
                    }
                }

                break;

            case BTGUIConstants.FEATURE_DROP_BUY:
                if (this.menu) {
                    this.btgui.menuPopupHide(0);
                    this.menu = null;
                }

                var bonusPrice = (this.currentBet * 50) / 100;

                if (window.SETTINGS.Feature[this.currentBet]) {
                    bonusPrice = window.SETTINGS.Feature[this.currentBet] / 100;
                }
                var bbp = this.btgui.buyBonusPopap(
                    bonusPrice,
                    window.SETTINGS.Currency
                );
                bbp.x = 505;
                bbp.y = 100;

                this.blackLayerFunc(true);
                this.btgui.setEnabled(false);

                this.mainHolder.addChild(bbp);

                break;

            case BTGUIConstants.BUY_BONUS_CANCEL:
                this.btgui.buyBonusPopapHide(0);
                this.blackLayerFunc(false);
                this.btgui.setEnabled(true);
                break;

            case BTGUIConstants.FREE_SPIN_GAMBLE:
                this.btgui.freeSpinPopapHide(0);
                this.freeSpinWheel = this.btgui.freeSpinWheelPopap();
                this.freeSpinWheel.x = 576;
                this.freeSpinWheel.y = 198;
                this.mainHolder.addChild(this.freeSpinWheel);
                console.dir(this.currentMessage);
                this.freeSpinWheel.setMode(
                    this.currentMessage.freespinsCountHistory[0]
                );
                break;

            case BTGUIConstants.BUY_BONUS_START:
                this.btgui.buyBonusPopapHide(0);
                this.blackLayerFunc(false);
                //{"IM":{"Bet":10},"SID":"JJJ","UID":-27,"MT":21}
                var bonusPrice = this.currentBet * 50;

                if (window.SETTINGS.Feature[this.currentBet]) {
                    bonusPrice = window.SETTINGS.Feature[this.currentBet];
                }

                var buyBonusMessage = {
                    IM: { Bet: this.currentBet },
                    UID: window.SETTINGS.UID,
                    SID: window.SETTINGS.SID,
                    MT: 21,
                };
                Globals.WS.send(JSON.stringify(buyBonusMessage));
                break;

            case BTGUIConstants.WHEEL_GAMBLE:
                this.btgui.setEnabled(false);
                var gambleMessage = {
                    IM: { Index: 1 },
                    UID: window.SETTINGS.UID,
                    SID: window.SETTINGS.SID,
                    MT: 4,
                };
                Globals.WS.send(JSON.stringify(gambleMessage));

                break;

            case BTGUIConstants.WHEEL_COLLECT:
                var gambleMessage = {
                    IM: { Index: -1 },
                    UID: window.SETTINGS.UID,
                    SID: window.SETTINGS.SID,
                    MT: 4,
                };
                Globals.WS.send(JSON.stringify(gambleMessage));
                break;

            case BTGUIConstants.FREE_SPIN_START:
                this.btgui.bonusFinalPopupHide(100);
                this.mainSceneBonus = new MainSceneBonus();
                this.mainSceneBonus.init(this.currentMessage, this);
                this.mainSceneBonus.animateBonus();
                Globals.PixiApp.stage.addChild(this.mainSceneBonus);
                Globals.PixiApp.stage.addChild(Globals.downPanel);
                Globals.PixiApp.stage.addChild(
                    RheelConfig.RheelUtils.EXPLOSION_HOLDER
                );
                break;

            case BTGUIConstants.AUTO_NUM_SPINS_PLUS:
                this.autoData.spinsIndex++;
                if (this.autoData.spinsIndex >= this.autoData.spins.length) {
                    this.autoData.spinsIndex = this.autoData.spins.length - 1;
                }
                if (this.menu) {
                    if (this.menu.activPage) {
                        this.menu.activPage.changeNumberOfSpinsText(
                            this.autoData.spins[this.autoData.spinsIndex]
                        );
                        this.menu.activPage.changeLossLimitText(
                            -1,
                            window.SETTINGS.Currency
                        );
                        this.autoData.loss = 0;
                    }
                }
                break;

            case BTGUIConstants.AUTO_NUM_SPINS_MINUS:
                this.autoData.spinsIndex--;
                if (this.autoData.spinsIndex < 0) {
                    this.autoData.spinsIndex = 0;
                }
                if (this.menu) {
                    if (this.menu.activPage) {
                        this.menu.activPage.changeNumberOfSpinsText(
                            this.autoData.spins[this.autoData.spinsIndex]
                        );
                        this.menu.activPage.changeLossLimitText(
                            -1,
                            window.SETTINGS.Currency
                        );
                        this.autoData.loss = 0;
                    }
                }
                break;

            case BTGUIConstants.AUTO_LOSS_PLUS:
                if (this.autoData.spinsIndex === -1) {
                    this.menu.activPage.errorNumberOfSpinsText();
                } else {
                    var spins = this.autoData.spins[this.autoData.spinsIndex];
                    this.autoData.loss++;
                    if (this.autoData.loss > 5) {
                        this.autoData.loss = 5;
                    }
                    if (this.menu) {
                        if (this.menu.activPage) {
                            this.menu.activPage.changeLossLimitText(
                                ((spins / 5) *
                                    this.autoData.loss *
                                    window.SETTINGS.CurrencyBets[
                                        window.SETTINGS.CurrencyBetIndex
                                    ]) /
                                    100,
                                window.SETTINGS.Currency
                            );
                        }
                    }
                }
                break;

            case BTGUIConstants.AUTO_LOSS_MINUS:
                if (this.autoData.spinsIndex === -1) {
                    this.menu.activPage.errorNumberOfSpinsText();
                } else {
                    let spins = this.autoData.spins[this.autoData.spinsIndex];
                    this.autoData.loss--;
                    if (this.autoData.loss <= 0) {
                        this.autoData.loss = 1;
                    }
                    if (this.menu) {
                        if (this.menu.activPage) {
                            this.menu.activPage.changeLossLimitText(
                                ((spins / 5) *
                                    this.autoData.loss *
                                    window.SETTINGS.CurrencyBets[
                                        window.SETTINGS.CurrencyBetIndex
                                    ]) /
                                    100,
                                window.SETTINGS.Currency
                            );
                        }
                    }
                }
                break;

            case BTGUIConstants.AUTO_WIN_PLUS:
                this.autoData.winIndex++;
                if (this.autoData.winIndex >= this.autoData.win.length) {
                    this.autoData.winIndex = this.autoData.win.length - 1;
                }
                if (this.menu) {
                    if (this.menu.activPage) {
                        this.menu.activPage.changeSingleWinLimitText(
                            (this.autoData.win[this.autoData.winIndex] *
                                window.SETTINGS.CurrencyBets[
                                    window.SETTINGS.CurrencyBetIndex
                                ]) /
                                100,
                            window.SETTINGS.Currency
                        );
                    }
                }
                break;

            case BTGUIConstants.AUTO_WIN_MINUS:
                this.autoData.winIndex--;
                if (this.autoData.winIndex < 0) {
                    this.autoData.winIndex = 0;
                }
                if (this.menu) {
                    if (this.menu.activPage) {
                        this.menu.activPage.changeSingleWinLimitText(
                            (this.autoData.win[this.autoData.winIndex] *
                                window.SETTINGS.CurrencyBets[
                                    window.SETTINGS.CurrencyBetIndex
                                ]) /
                                100,
                            window.SETTINGS.Currency
                        );
                    }
                }
                break;

            case BTGUIConstants.AUTO_START:
                if (this.autoData.loss === 0) {
                    this.menu.activPage.errorLossLimitText();
                }
                if (this.autoData.spinsIndex === -1) {
                    this.menu.activPage.errorNumberOfSpinsText();
                }
                if (this.autoData.loss > 0 && this.autoData.spinsIndex >= 0) {
                    this.autoData.play = {
                        autoplay: true,
                        spins: this.autoData.spins[this.autoData.spinsIndex],
                        loss:
                            ((this.autoData.spins[this.autoData.spinsIndex] /
                                5) *
                                this.autoData.loss *
                                window.SETTINGS.CurrencyBets[
                                    window.SETTINGS.CurrencyBetIndex
                                ]) /
                            100,
                        win:
                            (this.autoData.win[this.autoData.winIndex] *
                                window.SETTINGS.CurrencyBets[
                                    window.SETTINGS.CurrencyBetIndex
                                ]) /
                            100,
                        lossPlay: 0,
                    };
                    this.btgui.menuPopupHide(0);
                    this.btgui.showButtons(true);
                    this.btgui.showAutoSpinStopBtn(true);
                    this.menu = null;
                    if (this.currentMessage == null) {
                        this.currentMessage = { win: 0 };
                    } else {
                        this.currentMessage.win = 0;
                    }
                    this.btgui.setAutoMode(true);
                    this.autoPlay();
                }

                break;

            case BTGUIConstants.AUTO_STOP_SPIN:
                this.btgui.setAutoMode(false);
                this.stopAutoPlay();

                break;

            default:
                break;
        }
    }
    autoData = {
        spins: [5, 10, 25, 50, 100],
        win: [10, 50, 100, 500, 1000],
        loss: 0,
        spinsIndex: -1,
        winIndex: 2,
        play: {
            autoplay: false,
            spins: 0,
            loss: 0,
            win: 0,
            lossPlay: 0,
        },
    };

    autoPlay() {
        if (this.autoData.play.spins <= 0) {
            console.log("autoplayautoplay this.autoData.play.spins <= 0");
            this.btgui.setAutoMode(false);
            this.stopAutoPlay("spins");
            return;
        }
        //this.currentMessage.win
        if (this.currentMessage.win / 100 >= this.autoData.play.win) {
            console.log(
                "autoplayautoplay this.currentMessage.win >= this.autoData.play.win"
            );
            this.btgui.setAutoMode(false);
            this.stopAutoPlay("win");
            return;
        }

        this.autoData.play.lossPlay -= this.currentMessage.win / 100;
        this.autoData.play.lossPlay +=
            window.SETTINGS.CurrencyBets[window.SETTINGS.CurrencyBetIndex] /
            100;
        console.log(
            "autoplayautoplay " +
                this.currentMessage.win / 100 +
                " " +
                window.SETTINGS.CurrencyBets[window.SETTINGS.CurrencyBetIndex] /
                    100 +
                " " +
                JSON.stringify(this.autoData.play)
        );

        if (this.autoData.play.lossPlay > this.autoData.play.loss) {
            console.log(
                "autoplayautoplay this.autoData.play.lossPlay>this.autoData.play.loss"
            );
            this.btgui.setAutoMode(false);
            this.stopAutoPlay("loss");
            return;
        }

        this.autoData.play.spins--;
        this.btgui.updateAutoSpinStopBtnText("" + this.autoData.play.spins);
        console.dir(this.autoData);
        this.buttonClicked(BTGUIConstants.SPIN);
    }

    stopAutoPlay(data) {
        this.autoData = {
            spins: [5, 10, 25, 50, 100],
            win: [10, 50, 100, 500, 1000],
            loss: 0,
            spinsIndex: -1,
            winIndex: 2,
            play: {
                spins: 0,
                loss: 0,
                win: 0,
                lossPlay: 0,
                winPlay: 0,
            },
        };
        var automsg = "";
        ////spins win loss
        switch (data) {
            case "spins":
                break;
            case "win":
                automsg = window.Lang.default["AUTO_MSG_WIN"].str;
                break;
            case "loss":
                automsg = window.Lang.default["AUTO_MSG_LOSS"].str;
                break;
            default:
                break;
        }
        if (automsg.length > 0) {
            this.btgui.showMessageWindow(
                window.Lang.default["AUTO_MSG_HEADER"].str,
                automsg
            );
        }
        //this.btgui.setAutoMode(false)
        this.btgui.showAutoSpinStopBtn(false);
    }

    get_size() {
        return { width: Globals.width, height: Globals.height };
    }
}

export default MainScene;

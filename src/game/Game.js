import React from 'react';
import AssetManager from '../libs/mainlib/AssetManager'
import SoundManager from '../libs/mainlib/SoundManager'
import * as PIXI from 'pixi.js'
import Globals from './Globals'
import Preloader from './Preloader'
import MainScene from './MainScene'
import RheelUtils from './RheelUtils'
import TWEEN from '@tweenjs/tween.js';
import * as LibLang from "../libs/mainlib/rheel/en.json"
import * as UILang from '../libs/gameui/btgui/en.json'
import * as MainLang from './en.json'
import { isMobile } from 'react-device-detect';
import sounds from "./sounds.json";
import RheelConfig from '../libs/mainlib/rheel/RheelConfig'
import GameWebsocket from "../libs/mainlib/websocket/gamewebsocket"
import DownPanel from '../libs/gameui/btgui/downpanel'


function animate(time) {
  requestAnimationFrame(animate)
  TWEEN.update(time)
}
requestAnimationFrame(animate)

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  console.dir(errorMsg)
  return false;
}



class Game extends React.Component {
  preloader = null
  eventKey = null
  stateKey = null
  mainScene = null

  ws = null
  WEBSOCKET_URL = null

  //https://demo-x.betsense.ge/games/btg/extrachilli/resourses/atlass/Animations5.json
  componentDidMount() {
    console.log('App componentDidMount')
    console.dir(LibLang)
    console.dir(UILang)
    window.Lang = { default: Object.assign({}, LibLang.default, UILang.default, MainLang.default) }
    console.dir(window.Lang)



    window.SETTINGS.isMobile = isMobile

    window.SETTINGS.Currency = 'FUN'
    window.SETTINGS.Balance = 1000
    window.SETTINGS.Feature = {}
    window.SETTINGS.CurrencyBets = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

    RheelConfig.RheelUtils = new RheelUtils()
    Globals.Game = this;
    window.SoundManager = new SoundManager()
    if (window.SETTINGS.ASSETPATH.length > 0) {
      window.SETTINGS.AssetFolder = window.SETTINGS.ASSETPATH + "/" + window.SETTINGS.GAME + "/resourses/"
    } else {
      window.SETTINGS.AssetFolder = "resourses/"
    }

    console.dir(window.SETTINGS)
    this.WEBSOCKET_URL = "wss://" + window.SETTINGS.IP + ":" + window.SETTINGS.PORT
    var _stateKey, keys = {
      hidden: "visibilitychange",
      webkitHidden: "webkitvisibilitychange",
      mozHidden: "mozvisibilitychange",
      msHidden: "msvisibilitychange"
    };
    for (_stateKey in keys) {
      if (_stateKey in document) {
        this.eventKey = keys[_stateKey];
        this.stateKey = _stateKey
        break;
      }
    }
    if (this.eventKey) {
      console.dir('eventKey ' + this.eventKey + " " + this.stateKey)
      document.addEventListener(this.eventKey, this.visiblityChanged.bind(this));
    }


    var a = new AssetManager()
    a.load(Globals.LoaderConfig, this)

    //Globals.width Globals.height
    Globals.PixiApp = new PIXI.Application(
      {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: Globals.backgroundColor,
        antialias: true,
        autoDensity: true,
        resolution: window.devicePixelRatio
      }
    );

    document.getElementById("maingame").appendChild(Globals.PixiApp.view);
    this.updateSize()
    window.addEventListener('resize', this.updateSize.bind(this));
  }


  updateSize() {
    Globals.PixiApp.view.style.width = window.innerWidth + 'px';
    Globals.PixiApp.view.style.height = window.innerHeight + 'px';
    Globals.PixiApp.renderer.resize(window.innerWidth, window.innerHeight);
    Globals.windowWidth = window.innerWidth
    Globals.windowHeight = window.innerHeight
    if (this.preloader) {
      this.preloader.resize()
    }
    if (this.mainScene) {
      this.mainScene.resize();
    }

  }

  visiblityChanged() {
    if (!document[this.stateKey]) {
      console.log('visible')
    } else {
      console.log('hidden')
    }

  }

  onError(error) {
    console.log('App onError ' + error)
  }

  onProgress(progress) {
    if (this.preloader) {
      this.preloader.setProgress(progress)
    }
  }

  onPreLoad() {
    console.log('App preLoaded')
    this.preloader = new Preloader()
    this.preloader.init();
    Globals.PixiApp.stage.addChild(this.preloader);

  }

  onLoad() {
    if(window.SoundManager){
        
        /**/
        //[window.SETTINGS.AssetFolder+path[0]]
        for (let index = 0; index < sounds.urls.length; index++) {
            sounds.urls[index] = window.SETTINGS.AssetFolder+sounds.urls[index]
            
        }
        
        console.log("sounds",sounds)
        window.SoundManager.load(sounds)
    }
    this.ws = new GameWebsocket()
    this.ws.init(this);
    this.ws.connect()
    Globals.WS = this.ws
  }



  messageReaded(msg) {
    console.log(msg);
    switch (msg.MT) {
      case 1:
        for (let index = 0; index < msg.IM.Currencies.length; index++) {
          if (msg.IM.Currencies[index].order === msg.IM.CurrencyID) {
            window.SETTINGS.Currency = msg.IM.Currencies[index].name
          }

        }

        
        window.SETTINGS.Balance = (msg.IM.Chips / 100.0).toFixed(2);
        window.SETTINGS.Feature = msg.IM.MachineState
        window.SETTINGS.CurrencyBets = msg.IM.CurrencyBets
        window.SETTINGS.CurrencyBetIndex = 0

        console.dir(window.SETTINGS)


        RheelConfig.RheelUtils.EXPLOSION_HOLDER = new PIXI.Sprite()
        Globals.PixiApp.stage.removeChild(this.preloader);
        Globals.downPanel = new DownPanel()
        Globals.downPanel.init({})
        
        
        this.mainScene = new MainScene()
        this.mainScene.init()
        Globals.PixiApp.stage.addChild(this.mainScene);
        
        


        Globals.PixiApp.stage.addChild(Globals.downPanel)

        Globals.PixiApp.stage.addChild(RheelConfig.RheelUtils.EXPLOSION_HOLDER);
        var debugGraphics = new PIXI.Graphics();
        Globals.debugGraphics = debugGraphics
        Globals.PixiApp.stage.addChild(Globals.debugGraphics);
        Globals.PixiApp.ticker.add(this.updateLevel.bind(this)); /**/
        break;

      default:
        break;
    }
    if (this.mainScene) {
      this.mainScene.messageReaded(msg);
    }

  }

  statusChanged(status) {
    console.log("statusChanged " + status);
    if (status === GameWebsocket.CONNECTED) {
      var loginMessage = {
        UID: window.SETTINGS.UID,
        SID: window.SETTINGS.SID,
        SLOTID: window.SETTINGS.SLOTID,
        MT: 1,
        rnd: 261696569
      }
      Globals.WS.send(JSON.stringify(loginMessage))
    }

  }


  updateLevel() {
    Globals.debugGraphics.clear();
    for (let index = 0; index < Globals.debugElements.length; index++) {
      const element = Globals.debugElements[index];
      this.drawObject(element)
    }
    for (let index = 0; index < Globals.buffers.length; index++) {
      const element = Globals.buffers[index];
      element.update()
    }
  }

  drawObject(entry) {
    if (entry instanceof PIXI.TilingSprite) {
      return;
    }

    const bounds = entry[0].getBounds(); //AABB
    let color = 0x00ffff,
      width = 1.0;


    this.drawMesh(entry);
    Globals.debugGraphics.lineStyle(width, color);
    Globals.debugGraphics.drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
  }


  drawMesh(obj) {

    obj[0].updateTransform();
    obj[0].calculateVertices();
    let points = [];
    let buffer = obj[0].geometry.getBuffer('aVertexPosition');
    /*if (buffer) {
      var rows = obj[1];
      var cols = obj[2];
      //console.dir(buffer)
      for (var iy = 0; iy < buffer.data.length; iy++) {
        points.push(buffer.data[iy]);
        points.push(buffer.data[iy + 1]);
        //console.dir(buffer[iy])
        Globals.debugGraphics.drawCircle(buffer.data[iy], buffer.data[iy + 1], 2);
      }

      //
    }*/

    /*
    let indices = buffer.data
    let count = indices.length;


    for (let i = 0; i < count; i += 3) {
      //points = [];

      for (let j = 0; j < 3; j++) {
        points.push(indices[indices[j + i] * 2 + 0]);
        points.push(indices[indices[j + i] * 2 + 1]);
      }

      Globals.debugGraphics.drawPolygon(points);
    }
    */
    Globals.debugGraphics.lineStyle(1.0, 0xff0000);
    var rows = obj[1];
    var cols = obj[2];
    //var globalPos = obj[1].toGlobal();
    for (var iy = 0; iy < rows; iy++) {
      for (var ix = 0; ix < cols; ix++) {

        var i = ix + iy * cols;
        var ii = i * 2;

        Globals.debugGraphics.drawCircle(buffer.data[ii] + obj[3].x, buffer.data[ii + 1] + obj[3].y, 2);
      }
    }


  }

  onPostLoad() {
    console.log('App postLoaded')
  }


  render() {
    return <div id="maingame" style={{ padding: 0, margin: 0 }}></div>;
  }
}


export default Game;

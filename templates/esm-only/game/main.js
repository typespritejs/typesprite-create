import {GraphicsEngine, AudioManager, ManualActivator, MainLoopType, GameRunner, registerComponent} from './typespritejs.js'
import {Rect} from "./Rect.js";
import {RectUserControl} from "./RectUserControl.js";
import {RectSinusControl} from "./RectSinusControl.js";

// we need to register components ------------------------------

registerComponent({'AudioManager:typesprite':AudioManager})
registerComponent({'GraphicsEngine:typesprite':GraphicsEngine})
registerComponent({Rect});
registerComponent({RectUserControl});
registerComponent({RectSinusControl});

// general config ----------------------------------------------

const config = {}
config.mainloopType = MainLoopType.Fixed;
config.fixedMainloopFps = 120
config.canvasType = "SearchSelector"
config.canvasSelector = "#game"

// define worlds -----------------------------------------------

config.startWorlds = [["world"]]
config.worlds = []
config.worlds.push({
    name:"world",
    edfPath:"./world.edf",
    activatorFactory: () => new ManualActivator(),
})

// start game runner -------------------------------------------

config.finishCallback = () => { console.log('⭐️ GameRunner\nCONFIG:', config) }
const game = new GameRunner(config)
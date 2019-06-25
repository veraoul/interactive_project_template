import { EventEmitter } from 'events';
/* eslint import/no-dynamic-require:0 */
/* @flow */
/**
 * Adobe AnimateCC2018(Only Support CC2018) CreateJS Helper
 * @author milkmidi
 * @version 1.0.1
 *
 */
/*
})(window.createjs, AdobeAn = AdobeAn||{});
var AdobeAn;
export default AdobeAn;
*/
type SSMetaData = {
  name: string,
  frames: Array[],
}

interface AdobeAnCompositoin {
  getStage(): createjs.DisplayObject;
  getLibrary(): Object;
  getSpriteSheet(): Object;
  getImages(): Object;
}

const getImageFileName = (src:string):string => {
  let f:string = src.replace('images/', '');
  const parmIndex:number = src.indexOf('?');
  if (parmIndex !== -1) {
    f = f.substr(0, parmIndex);
  }
  return f;
};

export default class AnimateCCHelper extends EventEmitter {
  root: createjs.DisplayObject;

  stage: createjs.DisplayObject;

  comp: AdobeAnCompositoin;

  isPause: Boolean = false;

  constructor(
    canvas:HTMLCanvasElement,
    adobeAn:AdobeAnCompositoin,
    rootComponentName: string,
    defaultManifest,
  ) {
    super();
    this.canvas = canvas;
    this.adobeAn = adobeAn;
    this.rootComponentName = rootComponentName;
    const [comp] = Object.values(this.adobeAn.compositions);
    this.comp = comp;


    const lib = comp.getLibrary();
    const { manifest, width, height } = lib.properties;
    canvas.width = width;
    canvas.height = height;

    const newManifest = defaultManifest || manifest.map(({ src, id }) => ({
      src: require(`img/animate/${getImageFileName(src)}`),
      id,
    }));
    this.loadManifest(newManifest);
  }


  loadManifest(manifest) {
    const loader = new createjs.LoadQueue(false);
    const ss:Object = this.comp.getSpriteSheet();
    const lib:Object = this.comp.getLibrary();
    const images:Object = this.comp.getImages();

    const handleComplete = (evt) => {
      const queue = evt.target;
      lib.ssMetadata.forEach((metadata:SSMetaData) => {
        ss[metadata.name] = new createjs.SpriteSheet({
          images: [queue.getResult(metadata.name)],
          frames: metadata.frames,
        });
      });
      loader.removeAllEventListeners();
      this.start(lib);
    };
    const errorHandler = (error) => {
      console.error(error);
    };
    const fileloadHandler = (evt) => {
      if (evt && (evt.item.type === 'image')) {
        images[evt.item.id] = evt.result;
      }
    };
    loader.addEventListener('complete', handleComplete);
    loader.addEventListener('error ', errorHandler);
    loader.addEventListener('fileload', fileloadHandler);
    loader.loadManifest(manifest);
  }

  start(lib) {
    const exportRoot = new lib[this.rootComponentName]();
    const stage = new lib.Stage(this.canvas);
    this.stage = stage;
    this.root = exportRoot;
    stage.addChild(exportRoot);
    // Deprecated method
    // createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.framerate = lib.properties.fps;
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;

    createjs.Ticker.addEventListener('tick', this.tickHandler);
    this.emit('start');
  }

  tickHandler = () => {
    if (!this.isPause) {
      this.stage.update();
    }
  }

  destroy() {
    this.removeAllListeners();
    createjs.Ticker.removeEventListener('tick', this.tickHandler);
    this.stage = null;
    delete this.stage;
    this.root = null;
    delete this.root;
    this.adobeAn = null;
    delete this.adobeAn;
    this.comp = null;
    delete this.comp;
    this.onStart = null;
    delete this.onStart;
  }
}

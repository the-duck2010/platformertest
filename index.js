import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import _3dEngine from "./_3dEngine/_3dEngine.js";
import Messages from "./Messages/Messages.js";
import Paused from "./Paused/Paused.js";
import Instructions from "./Instructions/Instructions.js";
import Leaderboard from "./Leaderboard/Leaderboard.js";
import Cloud from "./Cloud/Cloud.js";
import Status from "./Status/Status.js";
import Thumbnail from "./Thumbnail/Thumbnail.js";
import Mouse from "./Mouse/Mouse.js";
import Camera from "./Camera/Camera.js";
import Sprite1 from "./Sprite1/Sprite1.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  _3dEngine: new _3dEngine({
    x: -171.68511139082767,
    y: 45.707795599575135,
    direction: 75,
    costumeNumber: 1,
    size: 100,
    visible: true
  }),
  Messages: new Messages({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 2,
    size: 100,
    visible: true
  }),
  Paused: new Paused({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Instructions: new Instructions({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 4,
    size: 100,
    visible: false
  }),
  Leaderboard: new Leaderboard({
    x: 214,
    y: 147,
    direction: 90,
    costumeNumber: 2,
    size: 30,
    visible: false
  }),
  Cloud: new Cloud({
    x: 219,
    y: -162,
    direction: 90,
    costumeNumber: 7,
    size: 20,
    visible: false
  }),
  Status: new Status({
    x: 10,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Thumbnail: new Thumbnail({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 3,
    size: 100,
    visible: true
  }),
  Mouse: new Mouse({
    x: 116,
    y: -167,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Camera: new Camera({
    x: -149,
    y: -168,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false
  }),
  Sprite1: new Sprite1({
    x: 68,
    y: -8,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true
  })
};

const project = new Project(stage, sprites);
export default project;

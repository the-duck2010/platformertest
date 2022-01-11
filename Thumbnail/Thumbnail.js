/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Thumbnail extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("stage4", "./Thumbnail/costumes/stage4.png", {
        x: 480,
        y: 360
      }),
      new Costume("stage2", "./Thumbnail/costumes/stage2.png", {
        x: 480,
        y: 360
      }),
      new Costume("stage", "./Thumbnail/costumes/stage.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Thumbnail/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
    this.costume = "stage";
    this.visible = true;
    while (true) {
      this.effects.ghost = 100;
      yield;
    }
  }
}

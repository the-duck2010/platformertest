/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Status extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Status/costumes/costume1.svg", {
        x: 26,
        y: 27
      })
    ];

    this.sounds = [new Sound("pop", "./Status/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(10, 0);
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      if (this.stage.vars.pause == 0) {
        this.visible = false;
      } else {
        this.visible = true;
      }
      yield;
    }
  }
}

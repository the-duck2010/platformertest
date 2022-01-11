/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Paused extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Paused/costumes/costume1.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Paused/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(0, 0);
    /* TODO: Implement looks_gotofrontback */ null;
    this.effects.ghost = 30;
    while (true) {
      if (this.stage.vars.pause == 0) {
        this.visible = false;
      } else {
        this.effects.ghost = 30;
        this.visible = true;
      }
      yield;
    }
  }
}

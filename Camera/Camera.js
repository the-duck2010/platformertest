/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Camera extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Camera/costumes/costume1.svg", {
        x: 92,
        y: 14
      }),
      new Costume("costume2", "./Camera/costumes/costume2.svg", {
        x: 92,
        y: 14
      })
    ];

    this.sounds = [new Sound("pop", "./Camera/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.goto(-149, -168);
    this.stage.vars.start = 0;
    this.visible = false;
    while (!(this.stage.vars.start == 1)) {
      yield;
    }
    this.visible = true;
    this.costume = "costume1";
    while (true) {
      if (this.touching("mouse")) {
        this.effects.brightness = 20;
        if (this.mouse.down) {
          this.costumeNumber += 1;
          this.stage.vars.playerview = this.costumeNumber - 1;
          yield* this.wait(0.5);
        }
      } else {
        this.effects.brightness = 0;
      }
      yield;
    }
  }
}

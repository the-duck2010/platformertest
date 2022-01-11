/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Mouse extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Mouse/costumes/costume1.svg", {
        x: 81,
        y: 14
      }),
      new Costume("costume2", "./Mouse/costumes/costume2.svg", { x: 81, y: 14 })
    ];

    this.sounds = [new Sound("pop", "./Mouse/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(116, -167);
    yield* this.wait(0.1);
    while (!(this.stage.vars.start == 1)) {
      yield;
    }
    this.costume = "costume1";
    this.visible = true;
    while (true) {
      if (this.touching("mouse")) {
        this.effects.brightness = 20;
        if (this.mouse.down) {
          this.costumeNumber += 1;
          this.stage.vars.mouse = this.costumeNumber - 1;
          yield* this.wait(0.5);
        }
      } else {
        this.effects.brightness = 0;
      }
      yield;
    }
  }
}

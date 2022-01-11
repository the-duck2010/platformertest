/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Instructions extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Instructions/costumes/costume1.svg", {
        x: 232,
        y: 174
      }),
      new Costume("costume2", "./Instructions/costumes/costume2.svg", {
        x: 102,
        y: 140
      }),
      new Costume("costume3", "./Instructions/costumes/costume3.svg", {
        x: -103,
        y: 174
      }),
      new Costume("costume4", "./Instructions/costumes/costume4.png", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("pop", "./Instructions/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show Instructions" },
        this.whenIReceiveShowInstructions
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.hidden = 0;
    this.stage.vars.clone = 1;
    this.visible = false;
    this.costume = "costume4";
  }

  *whenIReceiveShowInstructions() {
    if (this.costumeNumber == 4) {
      for (let i = 0; i < 3; i++) {
        this.createClone();
        yield* this.wait(0.1);
        this.stage.vars.clone += 1;
        yield;
      }
    }
  }

  *startAsClone() {
    this.costume = this.stage.vars.clone;
    this.visible = true;
    if (this.costumeNumber == 1) {
      while (
        !(
          this.keyPressed("w") ||
          this.keyPressed("a") ||
          this.keyPressed("s") || this.keyPressed("d")
        )
      ) {
        yield;
      }
      this.visible = false;
      this.stage.vars.hidden += 1;
    } else {
      if (this.costumeNumber == 2) {
        while (!this.keyPressed("space")) {
          yield;
        }
        this.visible = false;
        this.stage.vars.hidden += 1;
      } else {
        while (
          !(
            this.keyPressed("up arrow") ||
            this.keyPressed("right arrow") ||
            this.keyPressed("down arrow") || this.keyPressed("left arrow") ||
            (this.stage.vars.posx < -11000 && this.stage.vars.posz > 15000)
          )
        ) {
          yield;
        }
        this.visible = false;
        this.stage.vars.hidden += 1;
      }
    }
  }
}

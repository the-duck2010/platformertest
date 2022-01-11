/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Leaderboard extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("settings", "./Leaderboard/costumes/settings.png", {
        x: 182,
        y: 178
      }),
      new Costume("trophy", "./Leaderboard/costumes/trophy.png", {
        x: 142,
        y: 147
      })
    ];

    this.sounds = [new Sound("pop", "./Leaderboard/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Show Settings" },
        this.whenIReceiveShowSettings
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 30;
    this.goto(214, 147);
    this.effects.ghost = 100;
  }

  *whenIReceiveShowSettings() {
    this.visible = true;
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -10;
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.direction = 90;
    while (true) {
      /* TODO: Implement looks_gotofrontback */ null;
      if (Math.hypot(this.mouse.x - this.x, this.mouse.y - this.y) < 25) {
        this.size = 35;
      } else {
        this.size = 30;
      }
      yield;
    }
  }

  *whenthisspriteclicked() {
    if (this.stage.vars.pause == 0) {
      this.stage.vars.pause = 1;
    } else {
      this.stage.vars.pause = 0;
    }
    yield* this.wait(0.5);
  }

  *whenGreenFlagClicked3() {
    this.stage.vars.level = 1;
    this.stage.vars.pause = 0;
    while (true) {
      if (this.stage.vars.level > 8) {
        this.clearPen();
        this.stage.vars.pause = 1;
        this.visible = false;
      }
      yield;
    }
  }

  *whenGreenFlagClicked4() {
    this.stage.vars.leaderboard.push("Spag101fan: 3000000");
  }
}

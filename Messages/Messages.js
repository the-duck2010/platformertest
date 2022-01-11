/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Messages extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Messages/costumes/costume1.svg", {
        x: 119,
        y: 22.5
      }),
      new Costume("costume19", "./Messages/costumes/costume19.png", {
        x: 0,
        y: 0
      }),
      new Costume("costume2", "./Messages/costumes/costume2.svg", {
        x: 117,
        y: 30
      }),
      new Costume("costume3", "./Messages/costumes/costume3.svg", {
        x: 80,
        y: 26
      }),
      new Costume("costume4", "./Messages/costumes/costume4.svg", {
        x: 234,
        y: 177
      }),
      new Costume("costume10", "./Messages/costumes/costume10.svg", {
        x: 234,
        y: 177
      }),
      new Costume("costume5", "./Messages/costumes/costume5.svg", {
        x: 80,
        y: 26
      }),
      new Costume("costume6", "./Messages/costumes/costume6.svg", {
        x: 234,
        y: 177
      }),
      new Costume("costume7", "./Messages/costumes/costume7.svg", {
        x: 80,
        y: 26
      }),
      new Costume("costume8", "./Messages/costumes/costume8.svg", {
        x: 234,
        y: 177
      }),
      new Costume("costume9", "./Messages/costumes/costume9.svg", {
        x: 80,
        y: 26
      }),
      new Costume("costume11", "./Messages/costumes/costume11.svg", {
        x: 80,
        y: 26
      }),
      new Costume("costume12", "./Messages/costumes/costume12.svg", {
        x: 234,
        y: 177
      }),
      new Costume("costume13", "./Messages/costumes/costume13.svg", {
        x: 80,
        y: 26
      }),
      new Costume("costume14", "./Messages/costumes/costume14.svg", {
        x: 234,
        y: 177
      }),
      new Costume("costume15", "./Messages/costumes/costume15.svg", {
        x: 80,
        y: 26
      }),
      new Costume("costume16", "./Messages/costumes/costume16.svg", {
        x: 234,
        y: 177
      }),
      new Costume("costume17", "./Messages/costumes/costume17.svg", {
        x: 80,
        y: 26
      }),
      new Costume("costume18", "./Messages/costumes/costume18.svg", {
        x: 234,
        y: 177
      })
    ];

    this.sounds = [new Sound("pop", "./Messages/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 100;
    this.goto(0, 0);
    this.effects.clear();
    this.effects.ghost = 100;
    this.costume = "costume1";
    this.visible = true;
    yield* this.showMessages();
    this.visible = false;
  }

  *fade(wait) {
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += -10;
      yield;
    }
    yield* this.wait(wait);
    for (let i = 0; i < 10; i++) {
      this.effects.ghost += 10;
      yield;
    }
  }

  *showMessages() {
    yield* this.wait(0.5);
    yield* this.fade(2);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(2);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    this.stage.vars.start = 1;
    yield* this.fade(2);
    this.broadcast("show instructions");
    while (!(this.stage.vars.hidden == 3)) {
      yield;
    }
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(3);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    this.broadcast("show settings");
    yield* this.fade(4);
    while (!(this.stage.vars.level == 2)) {
      yield;
    }
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(2);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(3);
    while (!(this.stage.vars.level == 3)) {
      yield;
    }
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(2);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(3);
    while (!(this.stage.vars.level == 4)) {
      yield;
    }
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(2);
    while (!(this.stage.vars.level == 5)) {
      yield;
    }
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(2);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(3);
    while (!(this.stage.vars.level == 6)) {
      yield;
    }
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(2);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(3);
    while (!(this.stage.vars.level == 7)) {
      yield;
    }
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(2);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(3);
    while (!(this.stage.vars.level == 8)) {
      yield;
    }
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(2);
    this.costumeNumber += 1;
    yield* this.wait(0.5);
    yield* this.fade(3);
  }
}

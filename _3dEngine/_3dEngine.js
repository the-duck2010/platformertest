/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class _3dEngine extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./_3dEngine/costumes/costume1.png", {
        x: 0,
        y: 0
      })
    ];

    this.sounds = [new Sound("pop", "./_3dEngine/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.vars.level = 1;
    this.stage.vars.start = 0;
    this.stage.vars.pause = 0;
    this.stage.vars.mouse = 0;
    this.stage.vars.playerview = 0;
    this.clearPen();
    yield* this.reset();
    while (!(this.stage.vars.start == 1)) {
      yield;
    }
    while (true) {
      if (this.stage.vars.pause == 0) {
        this.clearPen();
        yield* this.readkeys();
        yield* this.decay(0.93);
        yield* this.setCam(0, this.stage.vars.lookx, 0);
        this.stage.vars.gravity += -10;
        yield* this.move(
          this.stage.vars.xz,
          this.stage.vars.gravity,
          this.stage.vars.zz
        );
        yield* this.loopthroughcubesandcollide();
        yield* this.moveobjects();
        yield* this.interact();
        yield* this.teleportplayer();
        this.stage.vars.lookx += this.stage.vars.horacc;
        this.stage.vars.looky += this.stage.vars.vertacc;
        this.stage.vars.lookz += this.stage.vars.rollacc;
        if (Math.abs(this.stage.vars.looky) > 80) {
          this.stage.vars.looky += 0 - this.stage.vars.vertacc;
          this.stage.vars.vertacc = 0;
        }
        yield* this.setCam(this.stage.vars.looky, this.stage.vars.lookx, 0);
        yield* this.renderPoints(this.stage.vars.pointx.length);
        yield* this.connectpoints();
        if (this.stage.vars.playerview == 1) {
          yield* this.setPenColorToRGB(0, 220, 0);
          yield* this.connectPointToPoint(
            this.stage.vars.pointscreenx.length - 1,
            this.stage.vars.pointscreenx.length
          );
          yield* this.setPenColorToRGB(0, 200, 0);
          this.goto(
            this.stage.vars.pointscreenx[
              this.stage.vars.pointscreenx.length - 1 - 1
            ],
            this.stage.vars.pointscreeny[
              this.stage.vars.pointscreenx.length - 1 - 1
            ]
          );
          this.penSize =
            this.stage.vars.pointscreensize[
              this.stage.vars.pointscreenx.length - 1 - 1
            ] * 3;
          this.penDown = true;
          this.penDown = false;
        }
      }
      yield;
    }
  }

  *addPointAt(x, y, z) {
    this.stage.vars.pointx.push(x);
    this.stage.vars.pointy.push(y);
    this.stage.vars.pointz.push(z);
  }

  *reset() {
    yield* this.resetlists();
    yield* this.addObjects();
    yield* this.resetposandmove();
    yield* this.resetcamangles();
  }

  *decay(rate) {
    this.stage.vars.vertacc = this.stage.vars.vertacc * (rate / 1.1);
    this.stage.vars.horacc = this.stage.vars.horacc * (rate / 1.1);
    this.stage.vars.rollacc = this.stage.vars.rollacc * rate;
    this.stage.vars.moveacc = this.stage.vars.moveacc * rate;
    this.stage.vars.sideacc = this.stage.vars.sideacc * rate;
  }

  *rot(vert, hor, roll) {
    this.stage.vars.cosvert = Math.cos(this.scratchToRad(vert));
    this.stage.vars.sinvert = Math.sin(this.scratchToRad(vert));
    this.stage.vars.coshor = Math.cos(this.scratchToRad(hor));
    this.stage.vars.sinhor = Math.sin(this.scratchToRad(hor));
    this.stage.vars.cosroll = Math.cos(this.scratchToRad(roll));
    this.stage.vars.sinroll = Math.sin(this.scratchToRad(roll));
    this.stage.vars.transformx =
      this.stage.vars.cosroll * this.stage.vars.xx +
      this.stage.vars.sinroll * this.stage.vars.xy;
    this.stage.vars.transformy =
      this.stage.vars.cosroll * this.stage.vars.xy -
      this.stage.vars.sinroll * this.stage.vars.xx;
    this.stage.vars.xx =
      this.stage.vars.coshor * this.stage.vars.transformx +
      this.stage.vars.sinhor * this.stage.vars.xz;
    this.stage.vars.transformz =
      this.stage.vars.coshor * this.stage.vars.xz -
      this.stage.vars.sinhor * this.stage.vars.transformx;
    this.stage.vars.xy =
      this.stage.vars.cosvert * this.stage.vars.transformy +
      this.stage.vars.sinvert * this.stage.vars.transformz;
    this.stage.vars.xz =
      this.stage.vars.cosvert * this.stage.vars.transformz -
      this.stage.vars.sinvert * this.stage.vars.transformy;
    this.stage.vars.transformx =
      this.stage.vars.cosroll * this.stage.vars.yx +
      this.stage.vars.sinroll * this.stage.vars.yy;
    this.stage.vars.transformy =
      this.stage.vars.cosroll * this.stage.vars.yy -
      this.stage.vars.sinroll * this.stage.vars.yx;
    this.stage.vars.yx =
      this.stage.vars.coshor * this.stage.vars.transformx +
      this.stage.vars.sinhor * this.stage.vars.yz;
    this.stage.vars.transformz =
      this.stage.vars.coshor * this.stage.vars.yz -
      this.stage.vars.sinhor * this.stage.vars.transformx;
    this.stage.vars.yy =
      this.stage.vars.cosvert * this.stage.vars.transformy +
      this.stage.vars.sinvert * this.stage.vars.transformz;
    this.stage.vars.yz =
      this.stage.vars.cosvert * this.stage.vars.transformz -
      this.stage.vars.sinvert * this.stage.vars.transformy;
    this.stage.vars.transformx =
      this.stage.vars.cosroll * this.stage.vars.zx +
      this.stage.vars.sinroll * this.stage.vars.zy;
    this.stage.vars.transformy =
      this.stage.vars.cosroll * this.stage.vars.zy -
      this.stage.vars.sinroll * this.stage.vars.zx;
    this.stage.vars.zx =
      this.stage.vars.coshor * this.stage.vars.transformx +
      this.stage.vars.sinhor * this.stage.vars.zz;
    this.stage.vars.transformz =
      this.stage.vars.coshor * this.stage.vars.zz -
      this.stage.vars.sinhor * this.stage.vars.transformx;
    this.stage.vars.zy =
      this.stage.vars.cosvert * this.stage.vars.transformy +
      this.stage.vars.sinvert * this.stage.vars.transformz;
    this.stage.vars.zz =
      this.stage.vars.cosvert * this.stage.vars.transformz -
      this.stage.vars.sinvert * this.stage.vars.transformy;
  }

  *renderPoints(number) {
    this.stage.vars.pointscreenx = [];
    this.stage.vars.pointscreeny = [];
    this.stage.vars.pointscreenz = [];
    this.stage.vars.pointscreensize = [];
    this.stage.vars.loop = 1;
    while (!(this.stage.vars.loop > number)) {
      this.stage.vars.transformx = this.stage.vars.pointx[
        this.stage.vars.loop - 1
      ];
      this.stage.vars.transformy = this.stage.vars.pointy[
        this.stage.vars.loop - 1
      ];
      this.stage.vars.transformz = this.stage.vars.pointz[
        this.stage.vars.loop - 1
      ];
      if (this.stage.vars.playerview == 0) {
        this.stage.vars.camx = this.stage.vars.posx;
        this.stage.vars.camy = this.stage.vars.posy;
        this.stage.vars.camz = this.stage.vars.posz;
      } else {
        this.stage.vars.camx =
          this.stage.vars.posx + this.stage.vars.xz * -5000;
        this.stage.vars.camz =
          this.stage.vars.posz + this.stage.vars.zz * -5000;
        this.stage.vars.camy =
          this.stage.vars.posy + this.stage.vars.yz * -5000;
      }
      this.stage.vars.pointdistx =
        this.stage.vars.transformx - this.stage.vars.camx;
      this.stage.vars.pointdisty =
        this.stage.vars.transformy - this.stage.vars.camy;
      this.stage.vars.pointdistz =
        this.stage.vars.transformz - this.stage.vars.camz;
      this.stage.vars.transformx =
        this.stage.vars.xx * this.stage.vars.pointdistx +
        (this.stage.vars.yx * this.stage.vars.pointdisty +
          this.stage.vars.zx * this.stage.vars.pointdistz);
      this.stage.vars.transformy =
        this.stage.vars.xy * this.stage.vars.pointdistx +
        (this.stage.vars.yy * this.stage.vars.pointdisty +
          this.stage.vars.zy * this.stage.vars.pointdistz);
      this.stage.vars.transformz =
        this.stage.vars.xz * this.stage.vars.pointdistx +
        (this.stage.vars.yz * this.stage.vars.pointdisty +
          this.stage.vars.zz * this.stage.vars.pointdistz);
      this.stage.vars.transformx =
        (270 * this.stage.vars.transformx) / this.stage.vars.transformz;
      this.stage.vars.transformy =
        (270 * this.stage.vars.transformy) / this.stage.vars.transformz;
      this.stage.vars.pointscreenz.push(this.stage.vars.transformz);
      this.stage.vars.pointscreenx.push(this.stage.vars.transformx);
      this.stage.vars.pointscreeny.push(this.stage.vars.transformy);
      this.stage.vars.pointscreensize.push(
        Math.round((540 * 30) / this.stage.vars.transformz) * 0.5 + 0.5
      );
      this.stage.vars.loop += 1;
      yield;
    }
    if (this.stage.vars.playerview == 1) {
      this.stage.vars.transformx = this.stage.vars.posx;
      this.stage.vars.transformy = this.stage.vars.posy;
      this.stage.vars.transformz = this.stage.vars.posz;
      this.stage.vars.camx = this.stage.vars.posx + this.stage.vars.xz * -5000;
      this.stage.vars.camz = this.stage.vars.posz + this.stage.vars.zz * -5000;
      this.stage.vars.camy = this.stage.vars.posy + this.stage.vars.yz * -5000;
      this.stage.vars.pointdistx =
        this.stage.vars.transformx - this.stage.vars.camx;
      this.stage.vars.pointdisty =
        this.stage.vars.transformy - this.stage.vars.camy;
      this.stage.vars.pointdistz =
        this.stage.vars.transformz - this.stage.vars.camz;
      this.stage.vars.transformx =
        this.stage.vars.xx * this.stage.vars.pointdistx +
        (this.stage.vars.yx * this.stage.vars.pointdisty +
          this.stage.vars.zx * this.stage.vars.pointdistz);
      this.stage.vars.transformy =
        this.stage.vars.xy * this.stage.vars.pointdistx +
        (this.stage.vars.yy * this.stage.vars.pointdisty +
          this.stage.vars.zy * this.stage.vars.pointdistz);
      this.stage.vars.transformz =
        this.stage.vars.xz * this.stage.vars.pointdistx +
        (this.stage.vars.yz * this.stage.vars.pointdisty +
          this.stage.vars.zz * this.stage.vars.pointdistz);
      this.stage.vars.transformx =
        (270 * this.stage.vars.transformx) / this.stage.vars.transformz;
      this.stage.vars.transformy =
        (270 * this.stage.vars.transformy) / this.stage.vars.transformz;
      this.stage.vars.pointscreenz.push(this.stage.vars.transformz);
      this.stage.vars.pointscreenx.push(this.stage.vars.transformx);
      this.stage.vars.pointscreeny.push(this.stage.vars.transformy);
      this.stage.vars.pointscreensize.push(
        Math.round((540 * 100) / this.stage.vars.transformz) * 0.5 + 0.5
      );
      this.stage.vars.transformx = this.stage.vars.posx;
      this.stage.vars.transformy = this.stage.vars.posy - 1000;
      this.stage.vars.transformz = this.stage.vars.posz;
      this.stage.vars.camx = this.stage.vars.posx + this.stage.vars.xz * -5000;
      this.stage.vars.camz = this.stage.vars.posz + this.stage.vars.zz * -5000;
      this.stage.vars.camy = this.stage.vars.posy + this.stage.vars.yz * -5000;
      this.stage.vars.pointdistx =
        this.stage.vars.transformx - this.stage.vars.camx;
      this.stage.vars.pointdisty =
        this.stage.vars.transformy - this.stage.vars.camy;
      this.stage.vars.pointdistz =
        this.stage.vars.transformz - this.stage.vars.camz;
      this.stage.vars.transformx =
        this.stage.vars.xx * this.stage.vars.pointdistx +
        (this.stage.vars.yx * this.stage.vars.pointdisty +
          this.stage.vars.zx * this.stage.vars.pointdistz);
      this.stage.vars.transformy =
        this.stage.vars.xy * this.stage.vars.pointdistx +
        (this.stage.vars.yy * this.stage.vars.pointdisty +
          this.stage.vars.zy * this.stage.vars.pointdistz);
      this.stage.vars.transformz =
        this.stage.vars.xz * this.stage.vars.pointdistx +
        (this.stage.vars.yz * this.stage.vars.pointdisty +
          this.stage.vars.zz * this.stage.vars.pointdistz);
      this.stage.vars.transformx =
        (270 * this.stage.vars.transformx) / this.stage.vars.transformz;
      this.stage.vars.transformy =
        (270 * this.stage.vars.transformy) / this.stage.vars.transformz;
      this.stage.vars.pointscreenz.push(this.stage.vars.transformz);
      this.stage.vars.pointscreenx.push(this.stage.vars.transformx);
      this.stage.vars.pointscreeny.push(this.stage.vars.transformy);
      this.stage.vars.pointscreensize.push(
        Math.round((540 * 100) / this.stage.vars.transformz) * 0.5 + 0.5
      );
    }
  }

  *readkeys() {
    if (this.stage.vars.mouse == 0) {
      if (this.keyPressed("up arrow")) {
        this.stage.vars.vertacc += -0.8;
      }
      if (this.keyPressed("down arrow")) {
        this.stage.vars.vertacc += 0.8;
      }
      if (this.keyPressed("right arrow")) {
        this.stage.vars.horacc += -0.8;
      }
      if (this.keyPressed("left arrow")) {
        this.stage.vars.horacc += 0.8;
      }
    } else {
      this.stage.vars.vertacc = (this.mouse.y - this.stage.vars.prevy) / -1;
      if (Math.abs(this.mouse.x) > 235) {
        this.stage.vars.horacc = this.mouse.x / -38;
      } else {
        this.stage.vars.horacc = (this.mouse.x - this.stage.vars.prevx) / -1;
      }
      this.stage.vars.prevx = this.mouse.x;
      this.stage.vars.prevy = this.mouse.y;
    }
    if (this.keyPressed("d")) {
      this.stage.vars.sideacc += -10;
    }
    if (this.keyPressed("a")) {
      this.stage.vars.sideacc += 10;
    }
    if (this.keyPressed("w")) {
      this.stage.vars.moveacc += 10;
    }
    if (this.keyPressed("s")) {
      this.stage.vars.moveacc += -10;
    }
    if (this.keyPressed("space")) {
      if (this.stage.vars.collided == 1) {
        this.stage.vars.gravity = 200;
      }
    }
  }

  *makeOfPointsWithRange(number2, range) {
    for (let i = 0; i < number2; i++) {
      yield* this.addPointAt(
        this.random(0 - range, range),
        this.random(0 - range, range),
        this.random(0 - range, range)
      );
      yield;
    }
  }

  *connectpoints() {
    this.stage.vars.object = 1;
    this.stage.vars.loop = 1;
    while (!(this.stage.vars.object > this.stage.vars.objects.length)) {
      if (this.stage.vars.deleted.includes(this.stage.vars.object)) {
        this.stage.vars.object += 1;
        this.stage.vars.loop += 8;
      }
      if (this.stage.vars.objects[this.stage.vars.object - 1] == "Cube") {
        if (this.stage.vars.objecttype[this.stage.vars.object - 1] == 1) {
          if (
            this.stage.vars.interactiveobjects.includes(
              this.stage.vars.object
            ) &&
            !this.stage.vars.interacted.includes(this.stage.vars.object)
          ) {
            yield* this.setPenColorToRGB(255, 128, 0);
          } else {
            yield* this.setPenColorToRGB(0, 0, 255);
          }
        } else {
          if (this.stage.vars.objecttype[this.stage.vars.object - 1] == 2) {
            yield* this.setPenColorToRGB(255, 0, 0);
          } else {
            if (this.stage.vars.objecttype[this.stage.vars.object - 1] == 3) {
              yield* this.setPenColorToRGB(0, 255, 0);
            } else {
              if (this.stage.vars.objecttype[this.stage.vars.object - 1] == 4) {
                yield* this.setPenColorToRGB(255, 255, 0);
              } else {
                yield* this.setPenColorToRGB(127, 0, 255);
              }
            }
          }
        }
        yield* this.connectPointToPoint(
          this.stage.vars.loop,
          this.stage.vars.loop + 1
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 1,
          this.stage.vars.loop + 2
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 2,
          this.stage.vars.loop + 3
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 3,
          this.stage.vars.loop
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 4,
          this.stage.vars.loop + 5
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 5,
          this.stage.vars.loop + 6
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 6,
          this.stage.vars.loop + 7
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 7,
          this.stage.vars.loop + 4
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 7,
          this.stage.vars.loop
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 6,
          this.stage.vars.loop + 1
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 5,
          this.stage.vars.loop + 2
        );
        yield* this.connectPointToPoint(
          this.stage.vars.loop + 4,
          this.stage.vars.loop + 3
        );
        this.stage.vars.loop += 8;
      } else {
        if (this.stage.vars.objects[this.stage.vars.object - 1] == "Pyramid") {
          yield* this.setPenColorToRGB(255, 0, 0);
          yield* this.connectPointToPoint(
            this.stage.vars.loop,
            this.stage.vars.loop + 1
          );
          yield* this.connectPointToPoint(
            this.stage.vars.loop + 1,
            this.stage.vars.loop + 2
          );
          yield* this.connectPointToPoint(
            this.stage.vars.loop + 2,
            this.stage.vars.loop + 3
          );
          yield* this.connectPointToPoint(
            this.stage.vars.loop + 3,
            this.stage.vars.loop
          );
          yield* this.connectPointToPoint(
            this.stage.vars.loop,
            this.stage.vars.loop + 4
          );
          yield* this.connectPointToPoint(
            this.stage.vars.loop + 1,
            this.stage.vars.loop + 4
          );
          yield* this.connectPointToPoint(
            this.stage.vars.loop + 2,
            this.stage.vars.loop + 4
          );
          yield* this.connectPointToPoint(
            this.stage.vars.loop + 3,
            this.stage.vars.loop + 4
          );
          this.stage.vars.loop += 5;
        } else {
          0;
        }
      }
      this.stage.vars.object += 1;
      yield;
    }
  }

  *connectPointToPoint(_1, _2) {
    this.penDown = false;
    if (
      !(
        this.stage.vars.pointscreenz[_1 - 1] < 10 &&
        this.stage.vars.pointscreenz[_2 - 1] < 10
      )
    ) {
      if (
        !(
          this.stage.vars.pointscreenz[_1 - 1] > 50000 &&
          this.stage.vars.pointscreenz[_2 - 1] > 50000
        )
      ) {
        this.stage.vars.x1 = this.stage.vars.pointscreenx[_1 - 1];
        this.stage.vars.y1 = this.stage.vars.pointscreeny[_1 - 1];
        this.stage.vars.x2 = this.stage.vars.pointscreenx[_2 - 1];
        this.stage.vars.y2 = this.stage.vars.pointscreeny[_2 - 1];
        this.stage.vars.size1 = this.stage.vars.pointscreensize[_1 - 1];
        this.stage.vars.size2 = this.stage.vars.pointscreensize[_2 - 1];
        this.stage.vars.z1 = this.stage.vars.pointscreenz[_1 - 1];
        this.stage.vars.z2 = this.stage.vars.pointscreenz[_2 - 1];
        this.stage.vars.pointdistzz = this.stage.vars.z2 - this.stage.vars.z1;
        if (this.stage.vars.z2 < 10) {
          this.stage.vars.transformx =
            this.stage.vars.pointx[_1 - 1] +
            (this.stage.vars.pointx[_2 - 1] - this.stage.vars.pointx[_1 - 1]) *
              ((10 - this.stage.vars.z1) / this.stage.vars.pointdistzz);
          this.stage.vars.transformy =
            this.stage.vars.pointy[_1 - 1] +
            (this.stage.vars.pointy[_2 - 1] - this.stage.vars.pointy[_1 - 1]) *
              ((10 - this.stage.vars.z1) / this.stage.vars.pointdistzz);
          this.stage.vars.transformz =
            this.stage.vars.pointz[_1 - 1] +
            (this.stage.vars.pointz[_2 - 1] - this.stage.vars.pointz[_1 - 1]) *
              ((10 - this.stage.vars.z1) / this.stage.vars.pointdistzz);
          this.stage.vars.pointdistx =
            this.stage.vars.transformx - this.stage.vars.camx;
          this.stage.vars.pointdisty =
            this.stage.vars.transformy - this.stage.vars.camy;
          this.stage.vars.pointdistz =
            this.stage.vars.transformz - this.stage.vars.camz;
          this.stage.vars.transformx =
            this.stage.vars.xx * this.stage.vars.pointdistx +
            (this.stage.vars.yx * this.stage.vars.pointdisty +
              this.stage.vars.zx * this.stage.vars.pointdistz);
          this.stage.vars.transformy =
            this.stage.vars.xy * this.stage.vars.pointdistx +
            (this.stage.vars.yy * this.stage.vars.pointdisty +
              this.stage.vars.zy * this.stage.vars.pointdistz);
          this.stage.vars.transformz =
            this.stage.vars.xz * this.stage.vars.pointdistx +
            (this.stage.vars.yz * this.stage.vars.pointdisty +
              this.stage.vars.zz * this.stage.vars.pointdistz);
          this.stage.vars.transformx =
            (270 * this.stage.vars.transformx) / this.stage.vars.transformz;
          this.stage.vars.transformy =
            (270 * this.stage.vars.transformy) / this.stage.vars.transformz;
          this.stage.vars.x2 = this.stage.vars.transformx;
          this.stage.vars.y2 = this.stage.vars.transformy;
          this.stage.vars.size2 =
            Math.round((540 * 30) / this.stage.vars.transformz) * 0.5 + 0.5;
        } else {
          if (this.stage.vars.z1 < 10) {
            this.stage.vars.transformx =
              this.stage.vars.pointx[_2 - 1] -
              (this.stage.vars.pointx[_2 - 1] -
                this.stage.vars.pointx[_1 - 1]) *
                ((this.stage.vars.z2 - 10) / this.stage.vars.pointdistzz);
            this.stage.vars.transformy =
              this.stage.vars.pointy[_2 - 1] -
              (this.stage.vars.pointy[_2 - 1] -
                this.stage.vars.pointy[_1 - 1]) *
                ((this.stage.vars.z2 - 10) / this.stage.vars.pointdistzz);
            this.stage.vars.transformz =
              this.stage.vars.pointz[_2 - 1] -
              (this.stage.vars.pointz[_2 - 1] -
                this.stage.vars.pointz[_1 - 1]) *
                ((this.stage.vars.z2 - 10) / this.stage.vars.pointdistzz);
            this.stage.vars.pointdistx =
              this.stage.vars.transformx - this.stage.vars.camx;
            this.stage.vars.pointdisty =
              this.stage.vars.transformy - this.stage.vars.camy;
            this.stage.vars.pointdistz =
              this.stage.vars.transformz - this.stage.vars.camz;
            this.stage.vars.transformx =
              this.stage.vars.xx * this.stage.vars.pointdistx +
              (this.stage.vars.yx * this.stage.vars.pointdisty +
                this.stage.vars.zx * this.stage.vars.pointdistz);
            this.stage.vars.transformy =
              this.stage.vars.xy * this.stage.vars.pointdistx +
              (this.stage.vars.yy * this.stage.vars.pointdisty +
                this.stage.vars.zy * this.stage.vars.pointdistz);
            this.stage.vars.transformz =
              this.stage.vars.xz * this.stage.vars.pointdistx +
              (this.stage.vars.yz * this.stage.vars.pointdisty +
                this.stage.vars.zz * this.stage.vars.pointdistz);
            this.stage.vars.transformx =
              (270 * this.stage.vars.transformx) / this.stage.vars.transformz;
            this.stage.vars.transformy =
              (270 * this.stage.vars.transformy) / this.stage.vars.transformz;
            this.stage.vars.x1 = this.stage.vars.transformx;
            this.stage.vars.y1 = this.stage.vars.transformy;
            this.stage.vars.size1 =
              Math.round((540 * 30) / this.stage.vars.transformz) * 0.5 + 0.5;
          }
        }
        this.stage.vars.pointdistx = this.stage.vars.x2 - this.stage.vars.x1;
        this.stage.vars.pointdisty = this.stage.vars.y2 - this.stage.vars.y1;
        this.stage.vars.pointdistz =
          this.stage.vars.size2 - this.stage.vars.size1;
        if (!(this.stage.vars.x1 > 240 && this.stage.vars.x2 > 240)) {
          if (!(this.stage.vars.x1 < -240 && this.stage.vars.x2 < -240)) {
            if (!(this.stage.vars.y1 > 180 && this.stage.vars.y2 > 180)) {
              if (!(this.stage.vars.y1 < -180 && this.stage.vars.y2 < -180)) {
                yield* this.drawToEdge();
                this.stage.vars.pointdistx =
                  this.stage.vars.x2 - this.stage.vars.x1;
                this.stage.vars.pointdisty =
                  this.stage.vars.y2 - this.stage.vars.y1;
                this.stage.vars.pointdistz =
                  this.stage.vars.size2 - this.stage.vars.size1;
                this.goto(this.stage.vars.x1, this.stage.vars.y1);
                this.penSize = this.stage.vars.size1;
                if (Math.floor(Math.abs(this.stage.vars.pointdistz)) == 0) {
                  this.penDown = true;
                  this.goto(this.stage.vars.x2, this.stage.vars.y2);
                } else {
                  for (
                    let i = 0;
                    i < Math.floor(Math.abs(this.stage.vars.pointdistz));
                    i++
                  ) {
                    this.penDown = true;
                    this.goto(
                      this.x +
                        this.stage.vars.pointdistx /
                          Math.floor(Math.abs(this.stage.vars.pointdistz)),
                      this.y +
                        this.stage.vars.pointdisty /
                          Math.floor(Math.abs(this.stage.vars.pointdistz))
                    );
                    this.penSize +=
                      this.stage.vars.pointdistz /
                      Math.floor(Math.abs(this.stage.vars.pointdistz));
                    yield;
                  }
                }
              }
            }
          }
        }
      }
    }
    this.penDown = false;
  }

  *drawToEdge() {
    if (this.stage.vars.x1 < -240) {
      this.stage.vars.x1 = -240;
      this.stage.vars.y1 =
        this.stage.vars.y2 -
        ((this.stage.vars.x2 - -240) / this.stage.vars.pointdistx) *
          this.stage.vars.pointdisty;
      this.stage.vars.size1 =
        this.stage.vars.size2 -
        ((this.stage.vars.x2 - -240) / this.stage.vars.pointdistx) *
          this.stage.vars.pointdistz;
    } else {
      if (this.stage.vars.x1 > 240) {
        this.stage.vars.x1 = 240;
        this.stage.vars.y1 =
          this.stage.vars.y2 -
          ((this.stage.vars.x2 - 240) / this.stage.vars.pointdistx) *
            this.stage.vars.pointdisty;
        this.stage.vars.size1 =
          this.stage.vars.size2 -
          ((this.stage.vars.x2 - 240) / this.stage.vars.pointdistx) *
            this.stage.vars.pointdistz;
      }
    }
    if (this.stage.vars.x2 < -240) {
      this.stage.vars.x2 = -240;
      this.stage.vars.y2 =
        this.stage.vars.y1 +
        ((-240 - this.stage.vars.x1) / this.stage.vars.pointdistx) *
          this.stage.vars.pointdisty;
      this.stage.vars.size2 =
        this.stage.vars.size1 +
        ((-240 - this.stage.vars.x1) / this.stage.vars.pointdistx) *
          this.stage.vars.pointdistz;
    } else {
      if (this.stage.vars.x2 > 240) {
        this.stage.vars.x2 = 240;
        this.stage.vars.y2 =
          this.stage.vars.y1 +
          ((240 - this.stage.vars.x1) / this.stage.vars.pointdistx) *
            this.stage.vars.pointdisty;
        this.stage.vars.size2 =
          this.stage.vars.size1 +
          ((240 - this.stage.vars.x1) / this.stage.vars.pointdistx) *
            this.stage.vars.pointdistz;
      }
    }
    if (this.stage.vars.y1 < -180) {
      this.stage.vars.y1 = -180;
      this.stage.vars.x1 =
        this.stage.vars.x2 -
        ((this.stage.vars.y2 - -180) / this.stage.vars.pointdisty) *
          this.stage.vars.pointdistx;
      this.stage.vars.size1 =
        this.stage.vars.size2 -
        ((this.stage.vars.y2 - -180) / this.stage.vars.pointdisty) *
          this.stage.vars.pointdistz;
    } else {
      if (this.stage.vars.y1 > 180) {
        this.stage.vars.y1 = 180;
        this.stage.vars.x1 =
          this.stage.vars.x2 -
          ((this.stage.vars.y2 - 180) / this.stage.vars.pointdisty) *
            this.stage.vars.pointdistx;
        this.stage.vars.size1 =
          this.stage.vars.size2 -
          ((this.stage.vars.y2 - 180) / this.stage.vars.pointdisty) *
            this.stage.vars.pointdistz;
      }
    }
    if (this.stage.vars.y2 < -180) {
      this.stage.vars.y2 = -180;
      this.stage.vars.x2 =
        this.stage.vars.x1 +
        ((-180 - this.stage.vars.y1) / this.stage.vars.pointdisty) *
          this.stage.vars.pointdistx;
      this.stage.vars.size2 =
        this.stage.vars.size1 +
        ((-180 - this.stage.vars.y1) / this.stage.vars.pointdisty) *
          this.stage.vars.pointdistz;
    } else {
      if (this.stage.vars.y2 > 180) {
        this.stage.vars.y2 = 180;
        this.stage.vars.x2 =
          this.stage.vars.x1 +
          ((180 - this.stage.vars.y1) / this.stage.vars.pointdisty) *
            this.stage.vars.pointdistx;
        this.stage.vars.size2 =
          this.stage.vars.size1 +
          ((180 - this.stage.vars.y1) / this.stage.vars.pointdisty) *
            this.stage.vars.pointdistz;
      }
    }
  }

  *move(x3, y3, z3) {
    this.stage.vars.posx += x3 * this.stage.vars.moveacc;
    this.stage.vars.posz += z3 * this.stage.vars.moveacc;
    this.stage.vars.posx += (0 - z3) * this.stage.vars.sideacc;
    this.stage.vars.posz += x3 * this.stage.vars.sideacc;
    this.stage.vars.posy += y3;
    if (this.stage.vars.posy < -20000) {
      yield* this.reset();
      this.stage.vars.attempts += 1;
    }
  }

  *addPoints() {}

  *resetcamangles() {
    this.stage.vars.xx = 1;
    this.stage.vars.xy = 0;
    this.stage.vars.xz = 0;
    this.stage.vars.yy = 1;
    this.stage.vars.yx = 0;
    this.stage.vars.yz = 0;
    this.stage.vars.zz = 1;
    this.stage.vars.zx = 0;
    this.stage.vars.zy = 0;
  }

  *setCam(vert2, hor2, roll2) {
    yield* this.resetcamangles();
    yield* this.rot(vert2, hor2, roll2);
  }

  *setPenColorToRGB(r, g, b) {
    this.penColor = Color.num(r * 65536 + (g * 256 + b));
  }

  *createPyramidLeftBottomCornerXYZLH(x4, y4, z4, l, h) {
    this.stage.vars.cubex.push(x4);
    this.stage.vars.cubey.push(y4);
    this.stage.vars.cubez.push(z4);
    this.stage.vars.cubeh.push(h);
    this.stage.vars.cubew.push(l);
    this.stage.vars.cubel.push(l);
    this.stage.vars.objects.push("Pyramid");
    this.stage.vars.objecttype.push(2);
    yield* this.addPointAt(x4, y4, z4);
    yield* this.addPointAt(x4 + l, y4, z4);
    yield* this.addPointAt(x4 + l, y4, z4 + l);
    yield* this.addPointAt(x4, y4, z4 + l);
    yield* this.addPointAt(x4 + l / 2, y4 + h, z4 + l / 2);
  }

  *createCubeLeftBottomCornerXYZHWLType(x5, y5, z5, h2, w, l2, type) {
    this.stage.vars.cubex.push(x5);
    this.stage.vars.cubey.push(y5);
    this.stage.vars.cubez.push(z5);
    this.stage.vars.cubeh.push(h2);
    this.stage.vars.cubew.push(w);
    this.stage.vars.cubel.push(l2);
    this.stage.vars.objects.push("Cube");
    this.stage.vars.objecttype.push(type);
    this.stage.vars.movedir.push(1);
    this.stage.vars.touchingobject.push(0);
    yield* this.addPointAt(x5, y5, z5);
    yield* this.addPointAt(x5 + w, y5, z5);
    yield* this.addPointAt(x5 + w, y5, z5 + l2);
    yield* this.addPointAt(x5, y5, z5 + l2);
    yield* this.addPointAt(x5, y5 + h2, z5 + l2);
    yield* this.addPointAt(x5 + w, y5 + h2, z5 + l2);
    yield* this.addPointAt(x5 + w, y5 + h2, z5);
    yield* this.addPointAt(x5, y5 + h2, z5);
  }

  *resetlists() {
    this.stage.vars.pointx = [];
    this.stage.vars.pointy = [];
    this.stage.vars.pointz = [];
    this.stage.vars.objects = [];
    this.stage.vars.objecttype = [];
    this.stage.vars.cubex = [];
    this.stage.vars.cubey = [];
    this.stage.vars.cubez = [];
    this.stage.vars.cubeh = [];
    this.stage.vars.cubew = [];
    this.stage.vars.cubel = [];
    this.stage.vars.movedir = [];
    this.stage.vars.interactiveobjects = [];
    this.stage.vars.interacted = [];
    this.stage.vars.deleted = [];
    this.stage.vars.touchingobject = [];
  }

  *resetposandmove() {
    this.stage.vars.gravity = 0;
    this.stage.vars.vertacc = 0;
    this.stage.vars.horacc = 0;
    this.stage.vars.rollacc = 0;
    this.stage.vars.sideacc = 0;
    this.stage.vars.moveacc = 0;
    this.stage.vars.posx = 0;
    this.stage.vars.posy = 6000;
    this.stage.vars.posz = 0;
    this.stage.vars.lookx = 0;
    this.stage.vars.looky = 0;
    this.stage.vars.lookz = 0;
  }

  *loopthroughcubesandcollide() {
    this.stage.vars.loop = 1;
    this.stage.vars.collided = 0;
    while (!(this.stage.vars.loop > this.stage.vars.cubex.length)) {
      if (this.stage.vars.deleted.includes(this.stage.vars.loop)) {
        this.stage.vars.loop += 1;
      }
      if (
        !(
          this.stage.vars.posx < this.stage.vars.cubex[this.stage.vars.loop - 1]
        ) &&
        !(
          this.stage.vars.posx >
          this.stage.vars.cubex[this.stage.vars.loop - 1] +
            this.stage.vars.cubew[this.stage.vars.loop - 1]
        )
      ) {
        if (
          !(
            this.stage.vars.posz <
            this.stage.vars.cubez[this.stage.vars.loop - 1]
          ) &&
          !(
            this.stage.vars.posz >
            this.stage.vars.cubez[this.stage.vars.loop - 1] +
              this.stage.vars.cubel[this.stage.vars.loop - 1]
          )
        ) {
          if (
            (this.stage.vars.posy - 1000 >
              this.stage.vars.cubey[this.stage.vars.loop - 1] &&
              this.stage.vars.posy - 1000 <
                this.stage.vars.cubey[this.stage.vars.loop - 1] +
                  this.stage.vars.cubeh[this.stage.vars.loop - 1]) ||
            (this.stage.vars.posy >
              this.stage.vars.cubey[this.stage.vars.loop - 1] &&
              this.stage.vars.posy <
                this.stage.vars.cubey[this.stage.vars.loop - 1] +
                  this.stage.vars.cubeh[this.stage.vars.loop - 1])
          ) {
            if (this.stage.vars.objecttype[this.stage.vars.loop - 1] == 1) {
              if (
                this.stage.vars.posy - 1000 >
                  this.stage.vars.cubey[this.stage.vars.loop - 1] &&
                this.stage.vars.posy - 1000 <
                  this.stage.vars.cubey[this.stage.vars.loop - 1] +
                    this.stage.vars.cubeh[this.stage.vars.loop - 1]
              ) {
                this.stage.vars.collided = 1;
              } else {
                this.stage.vars.collided = -1;
              }
              this.stage.vars.oldy = this.stage.vars.posy;
              this.stage.vars.posy += 0 - this.stage.vars.gravity;
              if (this.stage.vars.collided == 1) {
                if (
                  this.stage.vars.posy - 1000 <
                  this.stage.vars.cubey[this.stage.vars.loop - 1] +
                    this.stage.vars.cubeh[this.stage.vars.loop - 1]
                ) {
                  this.stage.vars.posy =
                    this.stage.vars.cubey[this.stage.vars.loop - 1] +
                    this.stage.vars.cubeh[this.stage.vars.loop - 1] +
                    1000;
                }
                if (this.stage.vars.posy - 1500 > this.stage.vars.oldy) {
                  this.stage.vars.posx +=
                    0 - this.stage.vars.xz * this.stage.vars.moveacc;
                  this.stage.vars.posz +=
                    0 - this.stage.vars.zz * this.stage.vars.moveacc;
                  this.stage.vars.posx +=
                    0 - (0 - this.stage.vars.zz) * this.stage.vars.sideacc;
                  this.stage.vars.posz +=
                    0 - this.stage.vars.xz * this.stage.vars.sideacc;
                  this.stage.vars.posy = this.stage.vars.oldy + 10;
                  this.stage.vars.moveacc = 0;
                  this.stage.vars.sideacc = 0;
                  this.stage.vars.collided = 0;
                }
              } else {
                if (
                  this.stage.vars.posy >
                  this.stage.vars.cubey[this.stage.vars.loop - 1]
                ) {
                  this.stage.vars.posy = this.stage.vars.cubey[
                    this.stage.vars.loop - 1
                  ];
                }
              }
              this.stage.vars.gravity = 0;
            } else {
              if (this.stage.vars.objecttype[this.stage.vars.loop - 1] == 3) {
                this.stage.vars.score += Math.ceil(
                  (1000 * this.stage.vars.level) / this.stage.vars.attempts
                );
                this.stage.vars.level += 1;
                this.stage.vars.attempts = 1;
                yield* this.reset();
              } else {
                if (this.stage.vars.objecttype[this.stage.vars.loop - 1] == 2) {
                  this.stage.vars.attempts += 1;
                  yield* this.reset();
                } else {
                  if (
                    this.stage.vars.objecttype[this.stage.vars.loop - 1] == 4
                  ) {
                    this.stage.vars.gravity = 400;
                  } else {
                    0;
                  }
                }
              }
            }
          }
        }
      }
      this.stage.vars.loop += 1;
      yield;
    }
  }

  *addObjects() {
    if (this.stage.vars.level == 1) {
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -5000,
        -2000,
        -5000,
        1000,
        10000,
        10000,
        1
      );
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -2000,
        -300,
        7500,
        500,
        4000,
        4000,
        1
      );
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -5000,
        600,
        14500,
        500,
        4000,
        4000,
        1
      );
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -14000,
        -2200,
        15000,
        500,
        4000,
        4000,
        1
      );
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -19000,
        -500,
        15000,
        500,
        4000,
        4000,
        1
      );
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -19000,
        -500,
        22000,
        500,
        4000,
        4000,
        1
      );
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -25000,
        1250,
        23000,
        500,
        4000,
        4000,
        1
      );
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -19000,
        2750,
        23000,
        500,
        4000,
        4000,
        1
      );
      yield* this.createCubeLeftBottomCornerXYZHWLType(
        -19000,
        4000,
        29000,
        500,
        4000,
        4000,
        3
      );
    } else {
      if (this.stage.vars.level == 2) {
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -2000,
          -2000,
          -2000,
          1000,
          4000,
          5750,
          1
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -3000,
          -2000,
          4000,
          2000,
          6000,
          1000,
          2
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -2000,
          -2000,
          5250,
          1000,
          4000,
          5000,
          1
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -6000,
          -2000,
          11500,
          2000,
          9000,
          1500,
          2
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -6000,
          -2000,
          13250,
          1000,
          8000,
          4000,
          1
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -9000,
          -2000,
          13250,
          1000,
          2000,
          4000,
          2
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -9000,
          -2000,
          17250,
          2000,
          11000,
          4000,
          2
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -11000,
          -5000,
          13250,
          1000,
          2000,
          6000,
          1
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -12000,
          -5000,
          19500,
          2000,
          4000,
          1000,
          2
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -11000,
          -5000,
          20750,
          1000,
          2000,
          1750,
          1
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -12000,
          -5000,
          22750,
          2000,
          4000,
          1000,
          2
        );
        yield* this.createCubeLeftBottomCornerXYZHWLType(
          -12000,
          -5000,
          24000,
          1000,
          4000,
          1000,
          3
        );
      } else {
        if (this.stage.vars.level == 3) {
          yield* this.createCubeLeftBottomCornerXYZHWLType(
            -5000,
            -2000,
            -5000,
            1000,
            10000,
            10000,
            1
          );
          yield* this.createCubeLeftBottomCornerXYZHWLType(
            -8000,
            -1000,
            -500,
            1000,
            1000,
            1000,
            1
          );
          yield* this.createCubeLeftBottomCornerXYZHWLType(
            -10500,
            500,
            0,
            1000,
            1000,
            1000,
            1
          );
          yield* this.createCubeLeftBottomCornerXYZHWLType(
            -10500,
            2750,
            2500,
            500,
            2000,
            2000,
            4
          );
          yield* this.createCubeLeftBottomCornerXYZHWLType(
            -17000,
            6000,
            6000,
            500,
            2000,
            2000,
            4
          );
          yield* this.createCubeLeftBottomCornerXYZHWLType(
            -13000,
            8000,
            13000,
            500,
            2000,
            2000,
            4
          );
          yield* this.createCubeLeftBottomCornerXYZHWLType(
            -5000,
            10000,
            18000,
            500,
            2000,
            2000,
            4
          );
          yield* this.createCubeLeftBottomCornerXYZHWLType(
            5500,
            10000,
            18000,
            500,
            2000,
            2000,
            3
          );
        } else {
          if (this.stage.vars.level == 4) {
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -5000,
              -2000,
              -5000,
              1000,
              10000,
              10000,
              1
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -500,
              -1000,
              8000,
              500,
              1000,
              1000,
              1
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -500,
              -1000,
              9000,
              1000,
              1000,
              1000,
              2
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              2000,
              0,
              11000,
              500,
              1000,
              1000,
              1
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              2000,
              0,
              12000,
              1000,
              1000,
              1000,
              2
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -1000,
              1000,
              13000,
              500,
              1000,
              1000,
              1
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -1000,
              1000,
              14000,
              1000,
              1000,
              1000,
              2
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -1000,
              1000,
              17500,
              1000,
              1000,
              1000,
              4
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -10000,
              15000,
              17500,
              1000,
              20000,
              20000,
              2
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -1000,
              8000,
              22500,
              500,
              1000,
              1000,
              1
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -1000,
              8000,
              23500,
              1000,
              1000,
              1000,
              4
            );
            yield* this.createCubeLeftBottomCornerXYZHWLType(
              -1000,
              9000,
              25500,
              500,
              1000,
              1000,
              3
            );
          } else {
            if (this.stage.vars.level == 5) {
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -250,
                -2000,
                -500,
                1000,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -250,
                -2000,
                500,
                1500,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -250,
                -2000,
                1500,
                2000,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -250,
                -2000,
                2500,
                2500,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -250,
                -2000,
                3500,
                3000,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -250,
                -2000,
                4500,
                3500,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -1250,
                -2000,
                5000,
                4000,
                1000,
                500,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -2250,
                -2000,
                5000,
                4500,
                1000,
                500,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -3250,
                -2000,
                5000,
                5000,
                1000,
                500,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -4250,
                -2000,
                5000,
                5500,
                1000,
                500,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -5250,
                -2000,
                5000,
                6000,
                1000,
                500,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -6250,
                -2000,
                5000,
                6500,
                1000,
                500,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -6250,
                -2000,
                2000,
                8000,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -6250,
                -2000,
                1000,
                10500,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -6250,
                -2000,
                0,
                13000,
                500,
                1000,
                1
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -6250,
                11500,
                -3000,
                500,
                500,
                1000,
                4
              );
              yield* this.createCubeLeftBottomCornerXYZHWLType(
                -6250,
                12500,
                -8000,
                1000,
                1000,
                1000,
                3
              );
            } else {
              if (this.stage.vars.level == 6) {
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -5000,
                  -2000,
                  -5000,
                  1000,
                  10000,
                  10000,
                  1
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -5000,
                  -2000,
                  7000,
                  1000,
                  3000,
                  3000,
                  1
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -10000,
                  -2000,
                  23000,
                  1000,
                  10000,
                  10000,
                  1
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -16000,
                  -2000,
                  23000,
                  1000,
                  3000,
                  3000,
                  1
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -25000,
                  -1000,
                  22000,
                  1250,
                  500,
                  5000,
                  2
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -45000,
                  -2000,
                  22000,
                  1000,
                  10000,
                  10000,
                  1
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -45000,
                  -2000,
                  2000,
                  1000,
                  1000,
                  20000,
                  1
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -45500,
                  1000,
                  2000,
                  1000,
                  2000,
                  20000,
                  2
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -45000,
                  1000,
                  15000,
                  3000,
                  1000,
                  1000,
                  2
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -45000,
                  -2000,
                  10000,
                  3000,
                  1000,
                  1000,
                  2
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -45000,
                  0,
                  5000,
                  3000,
                  1000,
                  1000,
                  2
                );
                yield* this.createCubeLeftBottomCornerXYZHWLType(
                  -45000,
                  -2000,
                  0,
                  3000,
                  1000,
                  1000,
                  3
                );
              } else {
                if (this.stage.vars.level == 7) {
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -750,
                    -1000,
                    5000,
                    2250,
                    1500,
                    500,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    10000000,
                    -1000,
                    6500,
                    2250,
                    1500,
                    500,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -750,
                    -1000,
                    8000,
                    2250,
                    1500,
                    500,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -5000,
                    -2000,
                    -2000,
                    1000,
                    10000,
                    15000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -500,
                    -1000,
                    9500,
                    2000,
                    1000,
                    500,
                    3
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    750,
                    -1000,
                    5000,
                    2250,
                    500,
                    6000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -1250,
                    -1000,
                    5000,
                    2220,
                    500,
                    6000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -750,
                    -1000,
                    10500,
                    2250,
                    1500,
                    500,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -1250,
                    1250,
                    5000,
                    500,
                    2500,
                    6000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    7500,
                    0,
                    2000,
                    500,
                    11000,
                    7000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    9000,
                    2000,
                    2000,
                    500,
                    8000,
                    7000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    10000,
                    500,
                    2000,
                    2000,
                    500,
                    500,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    10000,
                    500,
                    8500,
                    2000,
                    500,
                    500,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    21500,
                    0,
                    4500,
                    500,
                    2000,
                    2000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -9000,
                    -500,
                    4500,
                    500,
                    1000,
                    1500,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -12000,
                    0,
                    1500,
                    500,
                    1000,
                    1500,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -15000,
                    500,
                    3000,
                    500,
                    1000,
                    1000,
                    1
                  );
                } else {
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -5000,
                    -2000,
                    -2000,
                    1000,
                    10000,
                    10000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -5000,
                    -1000,
                    3000,
                    2500,
                    10000,
                    500,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    2000,
                    -1000,
                    7500,
                    2000,
                    1000,
                    500,
                    5
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    2000,
                    -2000,
                    20000,
                    1000,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    4500,
                    -1000,
                    20000,
                    2000,
                    500,
                    1000,
                    5
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -6000,
                    -2000,
                    20000,
                    1000,
                    3500,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -9000,
                    -2000,
                    20000,
                    2750,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -12000,
                    -2000,
                    20000,
                    4750,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -15000,
                    -2000,
                    20000,
                    6750,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -21000,
                    4750,
                    19000,
                    1000,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -22000,
                    5750,
                    13000,
                    1000,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -22000,
                    6750,
                    7000,
                    1000,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -22000,
                    7750,
                    1000,
                    1000,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -21000,
                    4500,
                    19000,
                    1000,
                    3000,
                    3000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -22000,
                    5500,
                    13000,
                    1000,
                    3000,
                    3000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -22000,
                    6500,
                    7000,
                    1000,
                    3000,
                    3000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -3000,
                    -1000,
                    7500,
                    2000,
                    1000,
                    500,
                    5
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    -3500,
                    -1000,
                    7000,
                    2500,
                    2000,
                    1500,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    2000,
                    -2000,
                    -20000,
                    1000,
                    3000,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    2500,
                    -1000,
                    -20000,
                    2000,
                    500,
                    1000,
                    5
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    2500,
                    -7000,
                    -25000,
                    1000,
                    3000,
                    3000,
                    4
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    2500,
                    -7000,
                    -37000,
                    1000,
                    3000,
                    3000,
                    4
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    2500,
                    -7000,
                    -71000,
                    8000,
                    7000,
                    30000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    10500,
                    -7000,
                    -71000,
                    8000,
                    7000,
                    30000,
                    2
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    9500,
                    -7000,
                    -49500,
                    1000,
                    1000,
                    7000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    9500,
                    -6500,
                    -56500,
                    1000,
                    500,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    9500,
                    -6500,
                    1000000000000000,
                    1500,
                    500,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    10000,
                    -6500,
                    1000000000000,
                    2500,
                    500,
                    3000,
                    1
                  );
                  yield* this.createCubeLeftBottomCornerXYZHWLType(
                    10000,
                    -6500,
                    -62000,
                    1000,
                    500,
                    3000,
                    3
                  );
                }
              }
            }
          }
        }
      }
    }
  }

  *moveObjectByMaxMin(number3, x6, y6, z6, mx, my, mz, mx2, my2, mz2) {
    this.stage.vars.loop = (number3 - 1) * 8 + 1;
    this.stage.vars.cubex.splice(
      number3 - 1,
      1,
      this.stage.vars.cubex[number3 - 1] +
        x6 * this.stage.vars.movedir[number3 - 1]
    );
    this.stage.vars.cubey.splice(
      number3 - 1,
      1,
      this.stage.vars.cubey[number3 - 1] +
        y6 * this.stage.vars.movedir[number3 - 1]
    );
    this.stage.vars.cubez.splice(
      number3 - 1,
      1,
      this.stage.vars.cubez[number3 - 1] +
        z6 * this.stage.vars.movedir[number3 - 1]
    );
    for (let i = 0; i < 8; i++) {
      this.stage.vars.pointx.splice(
        this.stage.vars.loop - 1,
        1,
        this.stage.vars.pointx[this.stage.vars.loop - 1] +
          x6 * this.stage.vars.movedir[number3 - 1]
      );
      this.stage.vars.pointy.splice(
        this.stage.vars.loop - 1,
        1,
        this.stage.vars.pointy[this.stage.vars.loop - 1] +
          y6 * this.stage.vars.movedir[number3 - 1]
      );
      this.stage.vars.pointz.splice(
        this.stage.vars.loop - 1,
        1,
        this.stage.vars.pointz[this.stage.vars.loop - 1] +
          z6 * this.stage.vars.movedir[number3 - 1]
      );
      this.stage.vars.loop += 1;
      yield;
    }
    if (
      !(this.stage.vars.posx < this.stage.vars.cubex[number3 - 1]) &&
      !(
        this.stage.vars.posx >
        this.stage.vars.cubex[number3 - 1] + this.stage.vars.cubew[number3 - 1]
      )
    ) {
      if (
        !(this.stage.vars.posz < this.stage.vars.cubez[number3 - 1]) &&
        !(
          this.stage.vars.posz >
          this.stage.vars.cubez[number3 - 1] +
            this.stage.vars.cubel[number3 - 1]
        )
      ) {
        if (
          (!(
            this.stage.vars.posy - 1000 <
            this.stage.vars.cubey[number3 - 1]
          ) &&
            !(
              this.stage.vars.posy - 1000 >
              this.stage.vars.cubey[number3 - 1] +
                this.stage.vars.cubeh[number3 - 1]
            )) ||
          (this.stage.vars.posy > this.stage.vars.cubey[number3 - 1] &&
            this.stage.vars.posy <
              this.stage.vars.cubey[number3 - 1] +
                this.stage.vars.cubeh[number3 - 1])
        ) {
          if (this.stage.vars.objecttype[number3 - 1] == 1) {
            this.stage.vars.posx += x6 * this.stage.vars.movedir[number3 - 1];
            this.stage.vars.posy += y6 * this.stage.vars.movedir[number3 - 1];
            this.stage.vars.posz += z6 * this.stage.vars.movedir[number3 - 1];
          }
        }
      }
    }
    if (
      this.stage.vars.cubex[number3 - 1] > mx ||
      this.stage.vars.cubey[number3 - 1] > my ||
      this.stage.vars.cubez[number3 - 1] > mz
    ) {
      this.stage.vars.movedir.splice(number3 - 1, 1, -1);
    }
    if (
      this.stage.vars.cubex[number3 - 1] < mx2 ||
      this.stage.vars.cubey[number3 - 1] < my2 ||
      this.stage.vars.cubez[number3 - 1] < mz2
    ) {
      this.stage.vars.movedir.splice(number3 - 1, 1, 1);
    }
  }

  *moveobjects() {
    if (this.stage.vars.level == 6) {
      yield* this.moveObjectByMaxMin(
        2,
        0,
        0,
        100,
        0,
        0,
        20000,
        -7000,
        -7000,
        7000
      );
      yield* this.moveObjectByMaxMin(
        4,
        100,
        0,
        0,
        -15000,
        50000,
        50000,
        -35000,
        -10000,
        0
      );
      yield* this.moveObjectByMaxMin(
        9,
        0,
        100,
        0,
        0,
        3000,
        50000,
        -50000,
        -2000,
        -50000
      );
      yield* this.moveObjectByMaxMin(
        10,
        0,
        75,
        0,
        0,
        3000,
        50000,
        -50000,
        -2000,
        -50000
      );
      yield* this.moveObjectByMaxMin(
        11,
        0,
        100,
        0,
        0,
        3000,
        50000,
        -50000,
        -2000,
        -50000
      );
    } else {
      if (this.stage.vars.level == 7) {
        yield* this.moveObjectByMaxMin(
          12,
          200,
          0,
          200,
          50000,
          50000,
          8500,
          -50000,
          -50000,
          2000
        );
        yield* this.moveObjectByMaxMin(
          13,
          -200,
          0,
          200,
          50000,
          50000,
          8500,
          -50000,
          -50000,
          2000
        );
        yield* this.moveObjectByMaxMin(
          15,
          0,
          0,
          40,
          50000,
          50000,
          4500,
          -50000,
          -50000,
          1500
        );
        yield* this.moveObjectByMaxMin(
          16,
          0,
          0,
          40,
          50000,
          50000,
          4500,
          -50000,
          -50000,
          1500
        );
      } else {
        if (this.stage.vars.level == 8) {
          yield* this.moveObjectByMaxMin(
            14,
            0,
            10,
            0,
            50000,
            5750,
            50000,
            -50000,
            4000,
            -50000
          );
          yield* this.moveObjectByMaxMin(
            15,
            0,
            10,
            0,
            50000,
            6750,
            50000,
            -50000,
            5000,
            -50000
          );
          yield* this.moveObjectByMaxMin(
            16,
            0,
            10,
            0,
            50000,
            7750,
            50000,
            -50000,
            6000,
            -50000
          );
        }
      }
    }
  }

  *interact() {
    if (this.stage.vars.level == 7) {
      yield* this.ifTouchingObjectThenDeleteObject(14, 1);
      yield* this.ifTouchingObjectThenDeleteObject(17, 3);
    }
    if (this.stage.vars.level == 8) {
      yield* this.ifTouchingObjectThenDeleteObject(13, 18);
    }
  }

  *ifTouchingObjectThenDeleteObject(number4, number5) {
    if (!this.stage.vars.interactiveobjects.includes(number4)) {
      this.stage.vars.interactiveobjects.push(number4);
    }
    if (
      !(this.stage.vars.posx < this.stage.vars.cubex[number4 - 1]) &&
      !(
        this.stage.vars.posx >
        this.stage.vars.cubex[number4 - 1] + this.stage.vars.cubew[number4 - 1]
      )
    ) {
      if (
        !(this.stage.vars.posz < this.stage.vars.cubez[number4 - 1]) &&
        !(
          this.stage.vars.posz >
          this.stage.vars.cubez[number4 - 1] +
            this.stage.vars.cubel[number4 - 1]
        )
      ) {
        if (
          (!(
            this.stage.vars.posy - 1000 <
            this.stage.vars.cubey[number4 - 1]
          ) &&
            !(
              this.stage.vars.posy - 1000 >
              this.stage.vars.cubey[number4 - 1] +
                this.stage.vars.cubeh[number4 - 1]
            )) ||
          (this.stage.vars.posy > this.stage.vars.cubey[number4 - 1] &&
            this.stage.vars.posy <
              this.stage.vars.cubey[number4 - 1] +
                this.stage.vars.cubeh[number4 - 1])
        ) {
          if (!this.stage.vars.interacted.includes(number4)) {
            this.stage.vars.interacted.push(number4);
            this.stage.vars.deleted.push(number5);
          }
        }
      }
    }
  }

  *ifTouchingObjectThenTeleportTo(number6, number7) {
    if (
      !(this.stage.vars.posx < this.stage.vars.cubex[number6 - 1]) &&
      !(
        this.stage.vars.posx >
        this.stage.vars.cubex[number6 - 1] + this.stage.vars.cubew[number6 - 1]
      )
    ) {
      if (
        !(this.stage.vars.posz < this.stage.vars.cubez[number6 - 1]) &&
        !(
          this.stage.vars.posz >
          this.stage.vars.cubez[number6 - 1] +
            this.stage.vars.cubel[number6 - 1]
        )
      ) {
        if (
          (!(
            this.stage.vars.posy - 1000 <
            this.stage.vars.cubey[number6 - 1]
          ) &&
            !(
              this.stage.vars.posy - 1000 >
              this.stage.vars.cubey[number6 - 1] +
                this.stage.vars.cubeh[number6 - 1]
            )) ||
          (this.stage.vars.posy > this.stage.vars.cubey[number6 - 1] &&
            this.stage.vars.posy <
              this.stage.vars.cubey[number6 - 1] +
                this.stage.vars.cubeh[number6 - 1])
        ) {
          if (this.stage.vars.touchingobject[number6 - 1] == 0) {
            this.stage.vars.touchingobject.splice(number6 - 1, 1, 0);
            this.stage.vars.posx =
              this.stage.vars.cubex[number7 - 1] +
              this.stage.vars.cubew[number7 - 1] / 2;
            this.stage.vars.posy =
              this.stage.vars.cubey[number7 - 1] +
              this.stage.vars.cubeh[number7 - 1] / 2;
            this.stage.vars.posz =
              this.stage.vars.cubez[number7 - 1] +
              this.stage.vars.cubel[number7 - 1] / 2;
            this.stage.vars.touchingobject.splice(number7 - 1, 1, 1);
          }
        } else {
          if (!(this.stage.vars.touchingobject[number6 - 1] == 0)) {
            this.stage.vars.touchingobject.splice(number6 - 1, 1, 0);
          }
        }
      } else {
        if (!(this.stage.vars.touchingobject[number6 - 1] == 0)) {
          this.stage.vars.touchingobject.splice(number6 - 1, 1, 0);
        }
      }
    } else {
      if (!(this.stage.vars.touchingobject[number6 - 1] == 0)) {
        this.stage.vars.touchingobject.splice(number6 - 1, 1, 0);
      }
    }
  }

  *teleportplayer() {
    if (this.stage.vars.level == 8) {
      yield* this.teleportFromObjectToObject(3, 5);
      yield* this.teleportFromObjectToObject(17, 20);
    }
  }

  *teleportFromObjectToObject(number8, number9) {
    yield* this.ifTouchingObjectThenTeleportTo(number8, number9);
    yield* this.ifTouchingObjectThenTeleportTo(number9, number8);
  }
}

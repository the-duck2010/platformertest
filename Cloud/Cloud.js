/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Cloud extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("a", "./Cloud/costumes/a.png", { x: 224, y: 172 }),
      new Costume("b", "./Cloud/costumes/b.png", { x: 224, y: 172 }),
      new Costume("c", "./Cloud/costumes/c.png", { x: 224, y: 172 }),
      new Costume("d", "./Cloud/costumes/d.png", { x: 224, y: 172 }),
      new Costume("e", "./Cloud/costumes/e.png", { x: 224, y: 172 }),
      new Costume("f", "./Cloud/costumes/f.png", { x: 224, y: 172 }),
      new Costume("g", "./Cloud/costumes/g.png", { x: 224, y: 172 }),
      new Costume("h", "./Cloud/costumes/h.png", { x: 224, y: 172 }),
      new Costume("i", "./Cloud/costumes/i.png", { x: 224, y: 172 }),
      new Costume("j", "./Cloud/costumes/j.png", { x: 224, y: 172 }),
      new Costume("k", "./Cloud/costumes/k.png", { x: 224, y: 172 }),
      new Costume("l", "./Cloud/costumes/l.png", { x: 224, y: 172 }),
      new Costume("m", "./Cloud/costumes/m.png", { x: 224, y: 172 }),
      new Costume("n", "./Cloud/costumes/n.png", { x: 224, y: 172 }),
      new Costume("o", "./Cloud/costumes/o.png", { x: 224, y: 172 }),
      new Costume("p", "./Cloud/costumes/p.png", { x: 224, y: 172 }),
      new Costume("q", "./Cloud/costumes/q.png", { x: 224, y: 172 }),
      new Costume("r", "./Cloud/costumes/r.png", { x: 224, y: 172 }),
      new Costume("s", "./Cloud/costumes/s.png", { x: 224, y: 172 }),
      new Costume("t", "./Cloud/costumes/t.png", { x: 224, y: 172 }),
      new Costume("u", "./Cloud/costumes/u.png", { x: 224, y: 172 }),
      new Costume("v", "./Cloud/costumes/v.png", { x: 224, y: 172 }),
      new Costume("w", "./Cloud/costumes/w.png", { x: 224, y: 172 }),
      new Costume("x", "./Cloud/costumes/x.png", { x: 224, y: 172 }),
      new Costume("y", "./Cloud/costumes/y.png", { x: 224, y: 172 }),
      new Costume("z", "./Cloud/costumes/z.png", { x: 224, y: 172 }),
      new Costume("cloud", "./Cloud/costumes/cloud.png", { x: 224, y: 172 })
    ];

    this.sounds = [new Sound("pop", "./Cloud/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked4)
    ];
  }

  *decodeusers(text2) {
    this.stage.vars.usercloudlist = [];
    this.stage.vars.users = [];
    this.stage.vars.textmarker = 1;
    while (!(this.stage.vars.textmarker > text2.length)) {
      this.stage.vars.decodedtext = 0;
      this.stage.vars.length = 0;
      for (let i = 0; i < 3; i++) {
        this.stage.vars.length =
          "" + this.stage.vars.length + text2[this.stage.vars.textmarker - 1];
        this.stage.vars.usercloudlist.push(
          text2[this.stage.vars.textmarker - 1]
        );
        this.stage.vars.textmarker += 1;
        yield;
      }
      for (let i = 0; i < this.stage.vars.length; i++) {
        this.stage.vars.usercloudlist.push(
          text2[this.stage.vars.textmarker - 1]
        );
        this.stage.vars.usercloudlist.push(
          text2[this.stage.vars.textmarker + 1 - 1]
        );
        this.stage.vars.letter =
          "" +
          text2[this.stage.vars.textmarker - 1] +
          text2[this.stage.vars.textmarker + 1 - 1];
        this.stage.vars.decodedtext =
          "" +
          this.stage.vars.decodedtext +
          this.stage.vars.char[this.stage.vars.letter - 1];
        this.stage.vars.textmarker += 2;
        yield;
      }
      this.stage.vars.users.push(this.stage.vars.decodedtext);
      yield;
    }
  }

  *encodeuser(text3) {
    this.stage.vars.encodedtext = 0;
    this.stage.vars.text = 1;
    this.stage.vars.char2 = text3.length;
    this.stage.vars.char1 = this.stage.vars.char2[1 - 1];
    this.stage.vars.char3 = this.stage.vars.char2[2 - 1];
    this.stage.vars.char4 = this.stage.vars.char2[3 - 1];
    if (this.stage.vars.char2.length == 1) {
      this.stage.vars.usercloudlist.push(0);
      this.stage.vars.usercloudlist.push(0);
      this.stage.vars.usercloudlist.push(this.stage.vars.char1);
    } else {
      if (this.stage.vars.char2.length == 2) {
        this.stage.vars.usercloudlist.push(0);
        this.stage.vars.usercloudlist.push(this.stage.vars.char1);
        this.stage.vars.usercloudlist.push(this.stage.vars.char3);
      } else {
        this.stage.vars.usercloudlist.push(this.stage.vars.char1);
        this.stage.vars.usercloudlist.push(this.stage.vars.char3);
        this.stage.vars.usercloudlist.push(this.stage.vars.char4);
      }
    }
    for (let i = 0; i < text3.length; i++) {
      this.stage.vars.char2 = 1;
      while (
        !(
          this.stage.vars.char[this.stage.vars.char2 - 1] ==
            text3[this.stage.vars.text - 1] ||
          this.stage.vars.char2 > this.stage.vars.char.length
        )
      ) {
        this.stage.vars.char2 += 1;
        yield;
      }
      if (this.stage.vars.char2 > this.stage.vars.char.length) {
        this.stage.vars.char2 = 1;
      }
      if (this.stage.vars.char2 > 1 && this.stage.vars.char2 < 28) {
        this.costume = "cloud";
        this.costume = text3[this.stage.vars.text - 1];
        if (this.costumeNumber == 27) {
          this.stage.vars.char2 = this.stage.vars.char2 + 26;
        }
      }
      this.stage.vars.char1 = this.stage.vars.char2[1 - 1];
      this.stage.vars.char3 = this.stage.vars.char2[2 - 1];
      if (this.stage.vars.char2.length == 1) {
        this.stage.vars.usercloudlist.push(0);
        this.stage.vars.usercloudlist.push(this.stage.vars.char1);
      } else {
        this.stage.vars.usercloudlist.push(this.stage.vars.char1);
        this.stage.vars.usercloudlist.push(this.stage.vars.char3);
      }
      this.stage.vars.text += 1;
      yield;
    }
  }

  *whenGreenFlagClicked() {
    this.stage.vars.score = 0;
    this.stage.vars.attempts = 1;
    this.stage.vars.mypos = 0;
    this.visible = false;
    this.costume = "cloud";
    this.stage.vars.usercloudlist = [];
    this.stage.vars.scorecloudlist = [];
    this.stage.vars.users = [];
    this.stage.vars.scores = [];
    this.stage.vars.char =
      " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890~`!@#$%^&*()-_+={}[].,?/:;\"'|\\<>";
    yield* this.encodeUsername(/* no username */ "");
    yield* this.decodeusers(this.stage.vars.Userstorage);
    yield* this.decodescores(this.stage.vars.Scorestorage);
    yield* this.makeLeaderboard();
    if (this.stage.vars.users.includes(/* no username */ "")) {
      this.stage.vars.mypos = 1;
      while (
        !(
          this.stage.vars.users[this.stage.vars.mypos - 1] ==
          /* no username */ ""
        )
      ) {
        this.stage.vars.mypos += 1;
        yield;
      }
    } else {
      while (
        !(
          this.stage.vars.score >
          this.stage.vars.scores[
            this.stage.vars.ranks[this.stage.vars.ranks.length - 1] - 1
          ]
        )
      ) {
        yield;
      }
      while (!!(this.stage.vars.mypos == 0)) {
        while (!(this.stage.vars.Loading == 0)) {
          yield;
        }
        if (this.stage.vars.Loading == 0) {
          this.stage.vars.Loading = this.stage.vars.usercode;
        }
        yield* this.decodeusers(this.stage.vars.Userstorage);
        yield* this.decodescores(this.stage.vars.Scorestorage);
        if (
          this.stage.vars.score >
          this.stage.vars.scores[
            this.stage.vars.ranks[this.stage.vars.ranks.length - 1] - 1
          ]
        ) {
          yield* this.wait(0.1);
          if (this.stage.vars.Loading == this.stage.vars.usercode) {
            this.stage.vars.scores.splice(
              this.stage.vars.ranks[this.stage.vars.ranks.length - 1] - 1,
              1
            );
            this.stage.vars.users.splice(
              this.stage.vars.ranks[this.stage.vars.ranks.length - 1] - 1,
              1
            );
            yield* this.encodeAllUsers();
            yield* this.encodeAllScores();
            if (this.stage.vars.Loading == this.stage.vars.usercode) {
              yield* this.encodeuser(/* no username */ "");
              yield* this.encodescore(this.stage.vars.score);
              this.stage.vars.Userstorage = this.stage.vars.usercloudlist.join(
                " "
              );
              this.stage.vars.Scorestorage = this.stage.vars.scorecloudlist.join(
                " "
              );
              yield* this.decodeusers(this.stage.vars.Userstorage);
              yield* this.decodescores(this.stage.vars.Scorestorage);
              this.stage.vars.mypos = this.stage.vars.users.length;
              this.stage.vars.Loading = 0;
            }
          }
        }
        yield;
      }
    }
    yield* this.makeLeaderboard();
    while (true) {
      if (
        this.stage.vars.score >
        this.stage.vars.scores[this.stage.vars.mypos - 1]
      ) {
        if (
          this.stage.vars.users[this.stage.vars.mypos - 1] ==
          /* no username */ ""
        ) {
          while (!(this.stage.vars.Loading == 0)) {
            yield;
          }
          if (this.stage.vars.Loading == 0) {
            this.stage.vars.Loading = this.stage.vars.usercode;
          }
          yield* this.decodeusers(this.stage.vars.Userstorage);
          yield* this.decodescores(this.stage.vars.Scorestorage);
          if (
            this.stage.vars.users[this.stage.vars.mypos - 1] ==
            /* no username */ ""
          ) {
            if (
              this.stage.vars.score >
              this.stage.vars.scores[
                this.stage.vars.ranks[this.stage.vars.ranks.length - 1] - 1
              ]
            ) {
              yield* this.wait(0.1);
              if (this.stage.vars.Loading == this.stage.vars.usercode) {
                this.stage.vars.scores.splice(
                  this.stage.vars.mypos - 1,
                  1,
                  this.stage.vars.score
                );
                yield* this.encodeAllScores();
                if (this.stage.vars.Loading == this.stage.vars.usercode) {
                  this.stage.vars.Scorestorage = this.stage.vars.scorecloudlist.join(
                    " "
                  );
                  yield* this.decodeusers(this.stage.vars.Userstorage);
                  yield* this.decodescores(this.stage.vars.Scorestorage);
                  yield* this.makeLeaderboard();
                  this.stage.vars.Loading = 0;
                }
              }
            }
          }
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.restartTimer();
    this.stage.vars.timedout = this.stage.vars.Loading;
    while (true) {
      if (this.stage.vars.Loading == 0) {
        this.restartTimer();
      } else {
        if (!(this.stage.vars.Loading == this.stage.vars.timedout)) {
          this.stage.vars.timedout = this.stage.vars.Loading;
          this.restartTimer();
        } else {
          if (this.timer > 12) {
            if (!(this.stage.vars.Loading == this.stage.vars.usercode)) {
              this.stage.vars.Loading = 0;
              this.restartTimer();
            }
          }
        }
      }
      yield;
    }
  }

  *encodeUsername(text4) {
    this.stage.vars.text = 1;
    this.stage.vars.usercode = 0;
    for (let i = 0; i < text4.length; i++) {
      this.stage.vars.char2 = 1;
      while (
        !(
          this.stage.vars.char[this.stage.vars.char2 - 1] ==
            text4[this.stage.vars.text - 1] ||
          this.stage.vars.char2 > this.stage.vars.char.length
        )
      ) {
        this.stage.vars.char2 += 1;
        yield;
      }
      if (this.stage.vars.char2 > this.stage.vars.char.length) {
        this.stage.vars.char2 = 1;
      }
      if (this.stage.vars.char2 > 1 && this.stage.vars.char2 < 28) {
        this.costume = "cloud";
        this.costume = text4[this.stage.vars.text - 1];
        if (this.costumeNumber == 27) {
          this.stage.vars.char2 = this.stage.vars.char2 + 26;
        }
      }
      this.stage.vars.char1 = this.stage.vars.char2[1 - 1];
      this.stage.vars.char3 = this.stage.vars.char2[2 - 1];
      if (this.stage.vars.char2.length == 1) {
        this.stage.vars.usercode =
          "" + this.stage.vars.usercode + ("" + 0 + this.stage.vars.char1);
      } else {
        this.stage.vars.usercode =
          "" + this.stage.vars.usercode + this.stage.vars.char2;
      }
      this.stage.vars.text += 1;
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (this.stage.vars.Loading == this.stage.vars.usercode) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      yield;
    }
  }

  *decodescores(number10) {
    this.stage.vars.nummarker = 1;
    this.stage.vars.scorecloudlist = [];
    this.stage.vars.scores = [];
    while (!(this.stage.vars.nummarker > number10.length)) {
      this.stage.vars.decodednum = 0;
      this.stage.vars.numlength = number10[this.stage.vars.nummarker - 1];
      this.stage.vars.scorecloudlist.push(this.stage.vars.numlength);
      this.stage.vars.nummarker += 1;
      for (let i = 0; i < this.stage.vars.numlength; i++) {
        this.stage.vars.decodednum =
          "" +
          this.stage.vars.decodednum +
          number10[this.stage.vars.nummarker - 1];
        this.stage.vars.scorecloudlist.push(
          number10[this.stage.vars.nummarker - 1]
        );
        this.stage.vars.nummarker += 1;
        yield;
      }
      this.stage.vars.scores.push(this.stage.vars.decodednum);
      yield;
    }
  }

  *encodescore(number11) {
    this.stage.vars.num2 = number11.length;
    this.stage.vars.num = this.stage.vars.num2[1 - 1];
    this.stage.vars.scorecloudlist.push(this.stage.vars.num);
    this.stage.vars.num = 1;
    for (let i = 0; i < number11.length; i++) {
      this.stage.vars.num2 = number11[this.stage.vars.num - 1];
      this.stage.vars.scorecloudlist.push(this.stage.vars.num2);
      this.stage.vars.num += 1;
      yield;
    }
  }

  *reset() {
    this.stage.vars.Userstorage = 0;
    this.stage.vars.Scorestorage = 0;
    this.stage.vars.scores = [];
    this.stage.vars.scorecloudlist = [];
    this.stage.vars.users = [];
    this.stage.vars.usercloudlist = [];
  }

  *encodeAllScores() {
    this.stage.vars.scorecloudlist = [];
    this.stage.vars.encode = 1;
    for (let i = 0; i < this.stage.vars.scores.length; i++) {
      yield* this.encodescore(
        this.stage.vars.scores[this.stage.vars.encode - 1]
      );
      this.stage.vars.encode += 1;
      yield;
    }
  }

  *makeLeaderboard() {
    this.stage.vars.ranks = [];
    while (!(this.stage.vars.ranks.length == this.stage.vars.scores.length)) {
      this.stage.vars.rank = 1;
      this.stage.vars.greatest = 0;
      while (!(this.stage.vars.rank > this.stage.vars.scores.length)) {
        if (
          !this.stage.vars.ranks.includes(this.stage.vars.rank) &&
          this.stage.vars.scores[this.stage.vars.rank - 1] >
            this.stage.vars.scores[this.stage.vars.greatest - 1]
        ) {
          this.stage.vars.greatest = this.stage.vars.rank;
        }
        this.stage.vars.rank += 1;
        yield;
      }
      this.stage.vars.ranks.push(this.stage.vars.greatest);
      yield;
    }
    this.stage.vars.rank = 1;
    this.stage.vars.leaderboard = [];
    while (!(this.stage.vars.rank > this.stage.vars.ranks.length)) {
      this.stage.vars.leaderboard.push(
        "" +
          ("" +
            ("" +
              this.stage.vars.users[
                this.stage.vars.ranks[this.stage.vars.rank - 1] - 1
              ] +
              ":") +
            0) +
          this.stage.vars.scores[
            this.stage.vars.ranks[this.stage.vars.rank - 1] - 1
          ]
      );
      this.stage.vars.rank += 1;
      yield;
    }
    this.stage.vars.position = 1;
    while (
      !(
        this.stage.vars.ranks[this.stage.vars.position - 1] ==
          this.stage.vars.mypos ||
        this.stage.vars.position > this.stage.vars.ranks.length
      )
    ) {
      this.stage.vars.position += 1;
      yield;
    }
  }

  *whenGreenFlagClicked4() {
    while (true) {
      this.stage.vars.scoredisplay =
        "" + "Your Current Score is: " + this.stage.vars.score;
      this.stage.vars.highestScoreDisplay =
        "" +
        "Your Highest Score is: " +
        this.stage.vars.scores[this.stage.vars.mypos - 1];
      this.stage.vars.leaderboardpos =
        "" + "Your Leaderboard Position is: " + this.stage.vars.position;
      if (this.stage.vars.pause == 0) {
        /* TODO: Implement data_hidevariable */ null;
        /* TODO: Implement data_hidevariable */ null;
        /* TODO: Implement data_hidevariable */ null;
        /* TODO: Implement data_hidelist */ null;
      } else {
        /* TODO: Implement data_showlist */ null;
        /* TODO: Implement data_showvariable */ null;
        if (this.stage.vars.users.includes(/* no username */ "")) {
          /* TODO: Implement data_showvariable */ null;
          /* TODO: Implement data_showvariable */ null;
        } else {
          /* TODO: Implement data_hidevariable */ null;
          /* TODO: Implement data_hidevariable */ null;
        }
      }
      yield;
    }
  }

  *uploadToBackup() {
    this.stage.vars.backupscores = this.stage.vars.Scorestorage;
    this.stage.vars.backupusers = this.stage.vars.Userstorage;
  }

  *downloadFromBackup() {
    this.stage.vars.Userstorage = this.stage.vars.backupusers;
    this.stage.vars.Scorestorage = this.stage.vars.backupscores;
  }

  *encodeAllUsers() {
    this.stage.vars.usercloudlist = [];
    this.stage.vars.encode = 1;
    for (let i = 0; i < this.stage.vars.users.length; i++) {
      yield* this.encodeuser(this.stage.vars.users[this.stage.vars.encode - 1]);
      this.stage.vars.encode += 1;
      yield;
    }
  }
}

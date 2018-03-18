const Biscuit = cc.Sprite.extend({
  winSize: 0,

  randPosition(snakeParts) {
    const step = 20;
    const randNum = range => Math.floor(Math.random() * range);
    const range = {
      x: (this.winSize.width / step) - 1,
      y: (this.winSize.height / step) - 1
    };
    const possible = {
      x: randNum(range.x) * step,
      y: randNum(range.y) * step
    };
    let flag = true;
    let hit = false;

    while(flag) {
      snakeParts.forEach((part) => {
        if (part.x === possible.x && part.y === possible.y) {
          hit = true;
        }

        if (hit === true) {
          possible.x = randNum(range.x);
          possible.y = randNum(range.y);
          hit = false;
        } else {
          this.x = possible.x;
          this.y = possible.y;
          flag = false;
        }
      });
    }
  },

  ctor(snakeParts) {
    this._super(res.SnakeBiscuit_png);

    this.winSize = cc.view.getDesignResolutionSize();

    this.randPosition(snakeParts);
  },
});
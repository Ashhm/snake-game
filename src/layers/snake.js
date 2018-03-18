const SnakeLayer = cc.Layer.extend({
  snakeParts: null,
  biscuit: null,
  interval: 0.20,
  counter: this.interval,
  currentDir: 0,
  nextDir: 0,

  addPart() {
    const newPart = new SnakePart(res.SnakeBody_png);
    const size = this.snakeParts.length;
    const tail = this.snakeParts[size - 1];

    newPart.x = tail.x;
    newPart.y = tail.y;

    if(this.snakeParts.length % 10 === 0) {
      this.interval /= 2;
    }

    this.addChild(newPart);
    this.snakeParts.push(newPart);
  },

  moveSnake() {
    const snakeHead = this.snakeParts[0];
    const step = 20;

    const move = {
      [DIR_CONSTS.up]: () => {snakeHead.move(snakeHead.x, snakeHead.y + step)},
      [DIR_CONSTS.down]: () => {snakeHead.move(snakeHead.x, snakeHead.y - step)},
      [DIR_CONSTS.right]: () => {snakeHead.move(snakeHead.x + step, snakeHead.y)},
      [DIR_CONSTS.left]: () => {snakeHead.move(snakeHead.x - step, snakeHead.y)},
    };

    if(this.nextDir * -1 !== this.currentDir || this.snakeParts.length === 1) {
      this.currentDir = this.nextDir;
    }

    if(move[this.currentDir]) {
      move[this.currentDir]();
    }

    let prevX = snakeHead.prevX;
    let prevY = snakeHead.prevY;

    this.snakeParts.slice(1).forEach((part) => {
      part.move(prevX, prevY);
      prevX = part.prevX;
      prevY = part.prevY;
    });
  },

  update(deltaTime) {
    if(this.counter < this.interval) {
      this.counter += deltaTime;
    } else {
      this.counter = 0;
      this.moveSnake(this.nextDir);
      this.checkCollision();
    }
  },

  updateBiscuit() {
    if(this.biscuit) {
      this.biscuit.randPosition(this.snakeParts);
    } else {
      this.biscuit = new Biscuit(this.snakeParts);
      this.addChild(this.biscuit);
    }
  },

  checkCollision() {
    const winSize = cc.view.getDesignResolutionSize();
    const head = this.snakeParts[0];
    const body = this.snakeParts;

    if(head.x < 0) {
      head.x = winSize.width;
    } else if(head.x > winSize.width) {
      head.x = 0;
    }

    if(head.y < 0) {
      head.y = winSize.height;
    } else if(head.y > winSize.height) {
      head.y = 0;
    }

    body.forEach((part) => {
      if(head.x === part.x && head.y === part.y && part !== head) {
        cc.director.runScene(new GameOverScene(this.parent.score_layer.score));
      }
    });

    if(head.x === this.biscuit.x && head.y === this.biscuit.y) {
      this.addPart();
      this.updateBiscuit();
      this.parent.score_layer.scoreIncrease();
    }
  },

  ctor() {
    this._super();

    cc.eventManager.addListener({
      event: cc.EventListener.KEYBOARD,
      onKeyPressed: (keyCode, event) => {
        const target = event.getCurrentTarget();
        const keyMap = {
          87: DIR_CONSTS.up,
          83: DIR_CONSTS.down,
          65: DIR_CONSTS.left,
          68: DIR_CONSTS.right,
        };

        if(keyMap[keyCode]) {
          target.nextDir = keyMap[keyCode];
        }
      },
    }, this);

    const winSize = cc.view.getDesignResolutionSize();

    this.snakeParts = [];

    this.snakeHead = new SnakePart(res.SnakeHead_png);
    this.snakeHead.x = winSize.width / 2;
    this.snakeHead.y = winSize.height / 2;

    this.addChild(this.snakeHead);
    this.snakeParts.push(this.snakeHead);

    this.scheduleUpdate();
    this.updateBiscuit();
  },
});
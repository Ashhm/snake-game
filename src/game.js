const DIR_CONSTS = {
  up: 1,
  down: -1,
  left: -2,
  right: 2,
};

const GameScene = cc.Scene.extend({
  snake_layer: {},
  score_layer: {},

  onEnter() {
    this._super();

    this.score_layer = new ScoreLayer();
    this.snake_layer = new SnakeLayer();

    this.addChild(this.snake_layer, 0);
    this.addChild(this.score_layer, 1);
  }
});

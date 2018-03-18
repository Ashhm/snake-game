const ScoreLayer = cc.Layer.extend({
  score: 0,
  labelScore: null,

  init() {
    const winSize = cc.view.getDesignResolutionSize();

    this.labelScore = cc.LabelTTF.create('Score: 0');
    this.labelScore.x = winSize.width - 50;
    this.labelScore.y = winSize.height - 30;
  },

  scoreIncrease() {
    this.score += 1;
    this.labelScore.setString(`Score: ${this.score}`);
  },

  ctor() {
    this._super();
    this.init();
    this.addChild(this.labelScore);
  },
});

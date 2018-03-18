const GameOverScene = cc.Scene.extend({
  finalScore: 0,
  labelGameOver: {},
  labelScore: {},
  labelPrompt: {},

  onEnter() {
    this._super();

    const winSize = cc.view.getDesignResolutionSize();

    this.labelGameOver  = cc.LabelTTF.create('Game Over pssss....', 'Arial', 50);
    this.labelGameOver.x = winSize.width / 2;
    this.labelGameOver.y = winSize.height / 2;
    this.addChild(this.labelGameOver);

    this.labelScore = cc.LabelTTF.create(`Score: ${this.finalScore}`, 'Arial', 40);
    this.labelScore.x = winSize.width / 2;
    this.labelScore.y = winSize.height / 2 - 100;
    this.addChild(this.labelScore);

    this.labelScore = cc.LabelTTF.create(`Click or Tap To Try Again`, 'Arial', 20);
    this.labelScore.x = winSize.width / 2;
    this.labelScore.y = winSize.height / 2 - 200;
    this.addChild(this.labelScore);
  },

  ctor(score) {
    this._super();

    this.finalScore = score;

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: () => {cc.director.runScene(new MenuScene())},
    }, this);
  },
});
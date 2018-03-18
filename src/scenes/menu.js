const MenuScene = cc.Scene.extend({
  titleSprite: {},
  subTitleSprite: {},

  onEnter() {
    this._super();

    const winSize = cc.view.getDesignResolutionSize();

    this.titleSprite = cc.LabelTTF.create('Snake', 'Arial', 50);
    this.titleSprite.x = winSize.width / 2;
    this.titleSprite.y = winSize.height / 2;
    this.addChild(this.titleSprite);

    this.subTitleSprite = cc.LabelTTF.create('Click to play', 'Arial', 20);
    this.subTitleSprite.x = winSize.width / 2;
    this.subTitleSprite.y = winSize.height / 2 - 200;
    this.addChild(this.subTitleSprite);

    cc.eventManager.addListener({
      event: cc.EventListener.TOUCH_ONE_BY_ONE,
      onTouchBegan: () => {cc.director.runScene(new GameScene())},
    }, this);
  }

});
const SnakePart = cc.Sprite.extend({
  prevX: this.x,
  prevY: this.y,


  move(posX, posY) {
    this.prevX = this.x;
    this.prevY = this.y;

    this.x = posX;
    this.y = posY;
  },

  ctor(sprite) {
    this._super(sprite);
  },
});
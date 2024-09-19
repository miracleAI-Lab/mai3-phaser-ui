
// class Graphics extends Phaser.GameObjects.Graphics {

//   private _x: number = 0;
//   private _y: number = 0;
//   private _width: number = 0;
//   private _height: number = 0;

//   // eslint-disable-next-line @typescript-eslint/no-useless-constructor
//   constructor(scene: Phaser.Scene, options?: Phaser.Types.GameObjects.Graphics.Options) {
//     super(scene, options);
//   }

//   fillRoundedRect(x: number, y: number, width: number, height: number, radius?: Phaser.Types.GameObjects.Graphics.RoundedRectRadius | number): this {
//     this._x = x;
//     this._y = y;
//     this._width = width;
//     this._height = height;
//     return this.fillRoundedRect(x, y, width, height, radius);
//   }

  

//   set displayWidth(value: number) {
//     this._width = value;
//   }

//   get displayWidth(): number {
//     return this._width || 0;
//   }

//   set displayHeight(value: number) {
//     this._height = value;
//   }

//   get displayHeight(): number {
//     return this._height || 0;
//   }

//   set radius(value: number) {
//     this.radius = value;
//   }

//   get radius(): number {
//     return this.radius || 0;
//   }
// }
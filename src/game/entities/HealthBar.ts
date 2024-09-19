
import { HealthBarConfig } from "./Types";
export class HealthBar extends Phaser.GameObjects.Graphics {
  x: number;
  y: number;
  p: number;
  value: number;
  widht: number;
  height: number;
  constructor(scene: Phaser.Scene, config: HealthBarConfig) {
    super(scene);
    this.x = Number(config.x)
    this.y = Number(config.y)
    this.widht = Number(config.widht);
    this.height = Number(config.height);
    this.p = (Number(config.widht) - 4) / Number(config.value);
    this.value = Number(config.value);
    scene.add.existing(this);

  }
  SetPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }
  Decrease(amount: number): boolean {
    this.value -= amount;
    if (this.value < 0) {
      this.value = 0;
    }
    this.Draw();
    return (this.value === 0);
  }
  Draw() {

    this.clear()
    //  BG
    this.fillStyle(0x000000);
    this.fillRect(0, 0, this.widht, this.height);

    //  Health
    this.fillStyle(0xffffff);
    this.fillRect(2, 2, this.widht - 4, this.height - 4);

    if (this.value < 30) {
      this.fillStyle(0xff0000);
      //console.log("this.value:<30")
    }
    else {
      this.fillStyle(0x00ff00);
      //console.log("this.value:>30")
    }
    var d = Math.floor(this.p * this.value);
    this.fillRect(2, 2, d, this.height - 4);
  }
}
export const NewHealthBar = (scene: Phaser.Scene, config: HealthBarConfig) => new HealthBar(scene, config);


// class HealthBar {
//   x: number;
//   y: number;
//   p: number;
//   value: number;
//   widht: number;
//   height: number;
//   bar: Phaser.GameObjects.Graphics;
//   constructor(scene: Phaser.Scene, config: HealthBarConfig) {
//     this.x = Number(config.x)
//     this.y = Number(config.y)
//     this.widht = Number(config.widht);
//     this.height = Number(config.height);
//     this.p = (Number(config.widht) - 4) / Number(config.value);
//     this.value = Number(config.value);
//     this.bar = new Phaser.GameObjects.Graphics(scene);
//     scene.add.existing(this.bar);
//   }
//   SetPosition(x: number, y: number) {
//     this.x = x
//     this.y = y
//     this.Draw();
//   }
//   Decrease(amount: number): boolean {
//     this.value -= amount;
//     if (this.value < 0) {
//       this.value = 0;
//     }
//     this.Draw();
//     return (this.value === 0);
//   }
//   // destroy(): void {
//   //   this.bar.destroy();
//   // }
//   Draw() {
//     this.bar!.clear()
//     //  BG
//     this.bar!.fillStyle(0x000000);
//     this.bar!.fillRect(this.x, this.y, this.widht, this.height);

//     //  Health
//     this.bar!.fillStyle(0xffffff);
//     this.bar!.fillRect(this.x + 2, this.y + 2, this.widht - 4, this.height - 4);

//     if (this.value < 30) {
//       this.bar!.fillStyle(0xff0000);
//       //console.log("this.value:<30")
//     }
//     else {
//       this.bar!.fillStyle(0x00ff00);
//       //console.log("this.value:>30")
//     }

//     var d = Math.floor(this.p * this.value);
//     this.bar!.fillRect(this.x + 2, this.y + 2, d, this.height - 4);
//   }
// }
// export default HealthBar;
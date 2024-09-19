import Phaser from 'phaser';

class Word extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    defaultText: string | string[],
    color: string,
    defaultVisible: boolean,
    defaultFontSize?: string,
    isBold?: boolean
  ) {
    const wordStyleParams: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: "'Source Sans Pro', sans-serif",
      fontSize: defaultFontSize ?? '48px',
      color,
      align: 'center',
    };

    if (isBold) {
      wordStyleParams.stroke = color;
      wordStyleParams.strokeThickness = 3;
    }
    super(scene, x, y, defaultText, wordStyleParams);
    this.setVisible(defaultVisible);
    scene.add.existing(this);
    this.setOrigin(0, 0);
  }
}

export default Word;

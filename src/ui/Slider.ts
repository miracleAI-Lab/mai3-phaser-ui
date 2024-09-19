import Phaser from 'phaser';
import { ProgressBar } from './ProgressBar';
import { SliderConfig } from '../types';
import BaseScene from '../scene';

export class Slider extends ProgressBar {
  min?: number;
  max?: number;
  step?: number;
  sliderConfig?: SliderConfig;
  sliderBtn?: Phaser.GameObjects.Arc;
  btnWidth: number = 0;
  btnHeight: number = 0;
  private _value: number = 0;

  constructor(scene: BaseScene, config: SliderConfig) {
    super(scene, config);

    this.sliderConfig = config;
    this.Type = 'Slider';
    this.draw(config);
  }

  draw(config?: SliderConfig) {
    this.sliderConfig = config;
    this.min = this.sliderConfig?.min ?? 0;
    this.max = this.sliderConfig?.max ?? 100;
    this.step = this.sliderConfig?.step ?? 1;
    this.value = 0;

    if (this.sliderBtn) {
      this.sliderBtn.destroy();
    }
    this.sliderBtn = this.createSliderBtn(config?.progressPercent);
    this.addChildAt(this.sliderBtn, 2);
    this.sliderBtn.setInteractive({ draggable: true });

    this.updateValue(this.sliderBtn.x);
    this.sliderBtn.on('drag', this.handleDrag, this);
    this.RefreshBounds();
  }

  reDraw(config: SliderConfig) {
    super.reDraw(config);
    this.draw(config);
  }

  protected createSliderBtn(progressPercent?: number): Phaser.GameObjects.Arc {
    const handleRadius = this.sliderConfig?.handleRadius ?? (this.config.radius ?? 20) + 4;
    const handleBorder = this.sliderConfig?.handleBorder ?? 6;
    const meshColor = this.sliderConfig?.meshColor ?? 0xffd579;

    this.btnHeight = this.btnWidth = handleRadius + handleBorder;
    const btnX = progressPercent ? this.Width * progressPercent : this.Width / 2;
    const btnY = this.Height / 2;
    const sliderBtn = this.scene.add.circle(btnX, btnY, handleRadius + handleBorder, meshColor);

    return sliderBtn;
  }

  private handleDrag(_pointer: Phaser.Input.Pointer, dragX: number, _dragY: number) {
    if (this.sliderBtn) {
      this.sliderBtn.x = Phaser.Math.Clamp(dragX, 0, this.config?.width!);
      this.updateValue(dragX);
    }
  }

  private updateValue(pointerX: number) {
    if (pointerX > this.bgWidth!) pointerX = this.bgWidth!;
    if (pointerX < this.btnWidth) pointerX = 0;

    let positionRatio = pointerX / this.bgWidth!;
    if (positionRatio > 1) positionRatio = 1;
    if (positionRatio < 0.01) positionRatio = 0;

    const rawValue = this.min! + positionRatio * (this.max! - this.min!);
    this._value = Phaser.Math.Clamp(Math.round(rawValue / this.step!) * this.step!, this.min!, this.max!);
    this.updateSlider();
  }

  private updateSlider() {
    this.progress = (this.value! - this.min!) / (this.max! - this.min!);
  }

  set value(val: number) {
    this._value = val;
    this.updateSlider();
  }

  get value(): number {
    return this._value;
  }

  destroy(fromScene?: boolean): void {
    if (this.sliderBtn) {
      this.sliderBtn.off('drag', this.handleDrag, this);
      this.sliderBtn.destroy();
    }
    super.destroy(fromScene);
  }
}

import Phaser from 'phaser';
import { ProgressBar } from './ProgressBar';
import { RoundedButtonConfig, SliderConfig } from '../types';
import { BaseScene } from "../game";
import Memory from '../utils/Memory';
import { RoundedButton } from './RoundedButton';
export class Slider extends ProgressBar {
  min?: number;
  max?: number;
  step?: number;
  sliderConfig?: SliderConfig;
  sliderBtn?: RoundedButton;
  btnRadius: number = 0;
  progressPercent: number = 0;
  private _value: number = 0;

  constructor(scene: BaseScene, config: SliderConfig) {
    super(scene, config);

    this.sliderConfig = config;
    this.Type = 'Slider';
    this.draw(config);
  }

  draw(config?: SliderConfig) {
    this.sliderConfig = config;

    super.reDraw(this.sliderConfig!);
    this.min = this.sliderConfig?.min ?? 0;
    this.max = this.sliderConfig?.max ?? 100;
    this.step = this.sliderConfig?.step ?? 1;
    if (this.sliderBtn) {
      this.sliderBtn.destroy(true);
    }
    this.sliderBtn = this.drawSliderBtn();
    this.addChildAt(this.sliderBtn, 2);
    this.sliderBtn.setInteractive({ draggable: true });
    this.sliderBtn.debugHitArea();
    Memory.DelEventsBeforeDestory(this.sliderBtn);

    // 因为锚点不是在中心，所以需要额外做以下的计算
    let btnRadius = this.getBtnRadius();
    // let btnCenterPosX = this.sliderBtn.x + btnRadius;
    let btnCenterPosX = config?.progressPercent! * this.config?.width!;
    this.refreshProgress(btnCenterPosX);

    this.fixSliderBtnPosY();
    this.sliderBtn?.updateMaskShapePos();

    let dragXRangeLeft = -btnRadius;
    let dragXRangeRight = this.config?.width! - btnRadius;
    this.sliderBtn.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, _dragY: number) => {
      dragX = Phaser.Math.Clamp(dragX, dragXRangeLeft, dragXRangeRight);
      this.sliderBtn!.x = dragX;
      let realBtnCenterPosX = Phaser.Math.Clamp(dragX + btnRadius, 0, this.config?.width!);
      this.refreshProgress(realBtnCenterPosX);
      this.fixSliderBtnPosY();
      this.sliderBtn?.updateMaskShapePos();
    }, this);

    this.RefreshBounds();
  }

  fixSliderBtnPosY() {
    let btnRadius = this.getBtnRadius();
    let realBtnLeftTopPosY = this.bgHeight! / 2 - btnRadius;
    this.sliderBtn!.y = realBtnLeftTopPosY;
  }

  reDraw(config: SliderConfig) {
    this.draw(config);
  }

  protected drawSliderBtn(): RoundedButton {
    const roundedButtonConfig = this.transformForRoundedButtonConfig();
    let sliderBtn = this.scene.mai3.add.roundedButton(roundedButtonConfig);

    return sliderBtn;
  }

  transformForRoundedButtonConfig(): RoundedButtonConfig {
    const handleRadius = this.getHandleRadius();
    const { btnLeftTopX, btnLeftTopY } = this.computedSliderBtnLeftTopPosition();
    const config: RoundedButtonConfig = {
      x: btnLeftTopX,
      y: btnLeftTopY,
      enableDrag: true,
      radius: handleRadius,
      borderWidth: this.sliderConfig?.handleBorderWidth,
      borderColor: this.sliderConfig?.handleBorderColor,
      backgroundColor: this.sliderConfig?.handleBackgroundColor,
      backgroundAlpha: this.sliderConfig?.handleBackgroundAlpha,
      geomType: this.sliderConfig?.handleGeomType,
      texture: this.sliderConfig?.handleTexture,
    }

    return config;
  }

  private getHandleRadius() {
    return this.sliderConfig?.handleRadius ?? (this.config.radius ?? 20) + 4;
  }

  private getHandleBorderWidth() {
    return this.sliderConfig?.handleBorderWidth ?? 6;
  }

  private getBtnRadius() {
    const handleRadius = this.getHandleRadius();
    const handleBorderWidth = this.getHandleBorderWidth();
    return handleRadius + handleBorderWidth;
  }

  private computedSliderBtnLeftTopPosition() {
    this.btnRadius = this.getBtnRadius();
    let progressPercent = this.sliderConfig?.progressPercent;
    if (progressPercent === undefined || progressPercent === null) {
      progressPercent = 0.5;
    } else {
      progressPercent = progressPercent < 0 ? 0 : progressPercent;
      progressPercent = progressPercent > 1 ? 1 : progressPercent;
    }
    progressPercent = parseFloat(progressPercent.toFixed(20));
    // const btnLeftTopX = this.sliderBtn ?
    //   this.sliderBtn.x : this.Width * progressPercent - this.btnRadius;
    // const btnLeftTopY = this.sliderBtn ?
    //   this.sliderBtn.y : this.Height / 2 - this.btnRadius;
    const btnLeftTopX = this.Width * progressPercent - this.btnRadius;
    const btnLeftTopY = this.Height / 2 - this.btnRadius;

    return {
      btnLeftTopX,
      btnLeftTopY
    }
  }

  private refreshProgress(pointerX: number) {
    if (pointerX > this.bgWidth!) pointerX = this.bgWidth!;
    if (pointerX < this.btnRadius) pointerX = 0;
    this.progressPercent = pointerX / this.bgWidth!;
    this.progressPercent = parseFloat(this.progressPercent.toFixed(20));
    if (this.progressPercent > 1) this.progressPercent = 1;
    if (this.progressPercent < 0) this.progressPercent = 0;

    const rawValue = this.min! + this.progressPercent * (this.max! - this.min!);
    this._value = Phaser.Math.Clamp(Math.round(rawValue / this.step!) * this.step!, this.min!, this.max!);
    this._updateProgress();
  }

  private _updateProgress() {
    let val = (this.value! - this.min!) / (this.max! - this.min!);
    if (val < 0) {
      val = 0;
    } else if (val > 1) {
      val = 1;
    }
    this.progress = val;
  }

  set value(val: number) {
    this._value = val;
    this._updateProgress();
  }

  get value(): number {
    return this._value;
  }

  destroy(fromScene?: boolean): void {
    super.destroy(fromScene);
    if (this.sliderBtn) {
      this.sliderBtn.destroy(true);
    }
  }
}

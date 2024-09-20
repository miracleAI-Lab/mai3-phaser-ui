import { CheckboxConfig } from '../types';
import { Container } from './Container';
import Utils from '../utils';
import BaseScene from '../scene';

export class Checkbox extends Container {
    private _value: string = '';
    private _isChecked: boolean = false;
    private _height: number = 0;

    private config: CheckboxConfig;
    private label?: Phaser.GameObjects.Text;
    private checkbox?: Phaser.GameObjects.RenderTexture;

    constructor(scene: BaseScene, config: CheckboxConfig) {
        super(scene, config);
        this.config = config;
        this.Type = 'Checkbox';
        this._isChecked = config.isChecked ?? false;

        this.initCheckbox();
        this.on('pointerdown', this.handleDown, this);
    }

    private initCheckbox(): void {
        this.createCheckbox();
        this.createLabel();
        this.updateSize();
        this.setEventInteractive();
    }

    private createCheckbox(): void {
        this._height = this.config.height ?? 0;
        this._value = this.config.value ?? '0';

        const radius = this._height / 2;
        const checkColor = this.config.checkColor ?? 0xFFD700;
        const uncheckColor = this.config.uncheckColor ?? 0xff8221;
        const borderWidth = this.config.borderWidth ?? 4;

        this.checkbox = Utils.reDrawCircleRenderTexture(
            this.scene,
            this.checkbox,
            radius,
            radius,
            radius,
            borderWidth,
            uncheckColor,
            this._isChecked ? checkColor : uncheckColor
        );

        this.addChild(this.checkbox!);
    }

    private createLabel(): void {
        const text = this.config.text ?? 'MiracleAI';
        const style = this.config.textStyle ?? {};

        if (!this.label) {
            this.label = this.scene.make.text({ text, style });
        } else {
            this.label.setText(text);
            this.label.setStyle(style);
        }

        const labelSpace = this.config.labelSpace ?? 10;
        const fontSize = this.getFontSize();

        const radius = this._height / 2;
        this.label.x = radius * 2 + labelSpace;
        this.label.y = (radius * 2 - fontSize) / 2;

        this.addChild(this.label);
    }

    private getFontSize(): number {
        if (typeof this.config.textStyle?.fontSize === 'string') {
            return Number(this.config.textStyle.fontSize.replace('px', ''));
        }
        return this.config.textStyle?.fontSize ?? 16;
    }

    private updateSize(): void {
        this.config.width = this.config.width ?? 0;
        this.config.height = this.config.height ?? 0;
        this.RefreshBounds();
    }

    protected handleDown(): void {
        this.checked = !this.checked;
        if (this.config.handleSelect) {
            this.config.handleSelect(this);
        }
        this.blendMode = 'add';
    }

    public reDraw(config: CheckboxConfig): void {
        this.config = config;
        this.initCheckbox();
    }

    set value(v: string) {
        this._value = v;
    }

    get value(): string {
        return this._value;
    }

    set checked(val: boolean) {
        this._isChecked = val;
        this.createCheckbox();
    }

    get checked(): boolean {
        return this._isChecked;
    }

    destroy(fromScene?: boolean): void {
        this.checkbox?.destroy();
        this.label?.destroy();
        this.removeAllListeners();
        super.destroy(fromScene);
    }
}
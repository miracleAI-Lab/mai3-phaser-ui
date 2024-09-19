import { CheckboxConfig } from '../types';
import { Container } from './Container';
import Utils from '../utils';
import BaseScene from '../scene';

export class Checkbox extends Container {
    private _value?: string;
    private _isChecked?: boolean;
    private _height?: number;

    config: CheckboxConfig;
    label?: Phaser.GameObjects.Text;
    checkbox?: Phaser.GameObjects.RenderTexture;
    
    constructor(scene: BaseScene, config: CheckboxConfig) {
        super(scene, config);
        this.config = config;
        this.Type = 'Checkbox';
        this._isChecked = this.config.isChecked ?? false;

        this.reDraw(config);
        this.on('pointerdown', this.handleDown, this);
    }

    protected handleDown() {
        this.checked = !this.checked;
        if (this.config.handleSelect) {
            this.config.handleSelect(this);
        }

        this.blendMode = 'add';
    }

    reDraw(config: CheckboxConfig) {
        this.config = config;
        this.layoutCheckbox();
        this.layoutLabel();

        if (!this.config.width) {
            this.config.width = 0;
        }
        if (!this.config.height) {
            this.config.height = 0;
        }
        this.RefreshBounds();
        this.setEventInteractive();
    }

    private layoutCheckbox() {
        this._height = this.config.height ?? 0;
        this._value = this.config.value ?? '0';

        const radius = this._height / 2;
        const checkColor = this.config.checkColor ?? 0xFFD700;
        const uncheckColor = this.config.uncheckColor ?? 0xff8221;
        const borderWidth = this.config.borderWidth ?? 4;
        const centerPosition = radius;

        if (this._isChecked) {
            this.checkbox = Utils.reDrawCircleRenderTexture(this.scene, this.checkbox!, centerPosition, centerPosition, radius, borderWidth, uncheckColor, checkColor);
        } else {
            this.checkbox = Utils.reDrawCircleRenderTexture(this.scene, this.checkbox!, centerPosition, centerPosition, radius, borderWidth, uncheckColor, uncheckColor);
        }

        this.addChild(this.checkbox!);
    }

    public layoutLabel() {
        let fontSize = 16;
        const text = this.config.text ?? 'MiracleAI';
        const style = this.config.textStyle ?? {};
        if (!this.label) {
            this.label = this.scene.make.text({ text, style });
        } else {
            this.label.setText(text);
            this.label.setStyle(style);
        }

        const labelSpace = this.config.labelSpace ?? 10;
        if (typeof this.config.textStyle?.fontSize === 'string') {
            fontSize = Number(this.config.textStyle?.fontSize.replace('px', ''));
        } else {
            fontSize = this.config.textStyle?.fontSize ?? 16;
        }

        const radius = this._height! / 2;
        this.label.x = radius * 2 + labelSpace;
        this.label.y = (radius * 2 - fontSize) / 2;

        this.addChild(this.label);
    }

    set value(v: string) {
        this._value = v;
    }

    get value(): string {
        return this._value ?? '';
    }

    set checked(val: boolean) {
        this._isChecked = val;
        this.layoutCheckbox();
    }

    get checked(): boolean {
        return this._isChecked ?? false;
    }

    destroy(fromScene?: boolean): void {
        if (this.checkbox) {
            this.checkbox.destroy();
        }
        if (this.label) {
            this.label.destroy();
        }
        this.removeAllListeners();
        super.destroy(fromScene);
    }
}
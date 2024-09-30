import { BaseScene } from "../game";
import { Checkbox } from './Checkbox';
import { CheckboxGroupConfig } from '../types';
import { BaseButton } from "./BaseButton";

export class CheckboxGroup extends BaseButton {
    private _checkboxes: Checkbox[] = [];
    private _selectedValues: string[] = [];
    private _selectedIndexes: number[] = [];
    private _config: CheckboxGroupConfig;

    constructor(scene: BaseScene, config: CheckboxGroupConfig) {
        super(scene, config);
        this._config = config;
        this.Type = 'CheckboxGroup';
        this._initCheckboxGroup();
    }

    private _initCheckboxGroup(): void {
        this._setDefaultConfig();
        this._createCheckboxes();
        this.RefreshBounds();
    }

    private _setDefaultConfig(): void {
        this._config.orientation = this._config.orientation ?? 'horizontal';
        this._config.itemWidth = this._config.itemWidth ?? 200;
        this._config.itemHeight = this._config.itemHeight ?? 40;
        this._config.checkColor = this._config.checkColor ?? 0xFFD700;
        this._config.uncheckColor = this._config.uncheckColor ?? 0xff8221;
        this._config.borderWidth = this._config.borderWidth ?? 4;
        this._config.defaultSelectedIndex = this._config.defaultSelectedIndex ?? -1;
        this._config.space = this._config.space ?? 20;
    }

    private _createCheckboxes(): void {
        let nextX = 0;
        let nextY = 0;
        const items = this._config.items ?? [];

        items.forEach((item, index) => {
            const checkbox = this._createCheckbox(item, index, nextX, nextY);
            this.add(checkbox);
            this._checkboxes.push(checkbox);

            [nextX, nextY] = this._updateNextPosition(checkbox);
            this._updateGroupSize(checkbox);
        });
    }

    private _createCheckbox(item: any, index: number, x: number, y: number): Checkbox {
        return new Checkbox(this.scene, {
            x, y,
            width: this._config.itemWidth,
            height: this._config.itemHeight,
            // checkColor: this._config.checkColor,
            // uncheckColor: this._config.uncheckColor,
            text: item.text,
            value: item.value,
            isChecked: this._config.defaultSelectedIndex === index,
            borderWidth: this._config.borderWidth,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '24px',
                color: '#fff',
                fontStyle: this._config.textStyle?.fontStyle
            },
            handleSelect: this._handleCheckClick.bind(this),
            markBgRadius: 15,
            markBgBorderWidth: 3,
            markBgBorderColor: 0xff0,
            markBgColor: 0x1f1,
            markBgAlpha: 1,
            markBgTexture: "logo",

            markFillRadius: 12,
            markFillBorderWidth: 3,
            markFillBorderColor: 0xffeeff,
            markFillColor: 0xff00ff,
            markFillAlpha: 1,
            markFillTexture: "logo3",
        });
    }

    private _updateNextPosition(checkbox: Checkbox): [number, number] {
        return this._config.orientation === 'horizontal'
            ? [checkbox.Right + this._config.space!, checkbox.y]
            : [checkbox.x, checkbox.Bottom + this._config.space!];
    }

    private _updateGroupSize(checkbox: Checkbox): void {
        this._config.width = this._config.orientation === 'horizontal' ? checkbox.Right : checkbox.RealWidth;
        this._config.height = this._config.orientation === 'horizontal' ? checkbox.y : checkbox.Bottom;
    }

    private _handleCheckClick(ckb: Checkbox): void {
        this._selectedValues = [];
        this._selectedIndexes = [];
        const multiSelect = this._config.multiSelect ?? false;

        if (ckb.isChecked && !multiSelect) {
            this._handleSingleSelect(ckb);
        } else if (multiSelect) {
            this._handleMultiSelect();
        }

        if (this._config.handleSelect) {
            this._config.handleSelect(this, this._selectedValues, this._selectedIndexes);
        }
    }

    private _handleSingleSelect(ckb: Checkbox): void {
        this._checkboxes.forEach((checkbox, index) => {
            if (checkbox.isChecked && checkbox.value !== ckb.value) {
                checkbox.isChecked = false;
            } else if (checkbox.isChecked && checkbox.value === ckb.value) {
                this._selectedIndexes.push(index);
                this._selectedValues.push(ckb.value);
            }
        });
    }

    private _handleMultiSelect(): void {
        this._checkboxes.forEach((checkbox, index) => {
            if (checkbox.isChecked) {
                this._selectedIndexes.push(index);
                this._selectedValues.push(checkbox.value);
            }
        });
    }

    public reDraw(config: CheckboxGroupConfig): void {
        this._config = config;
        this._checkboxes.forEach(checkbox => checkbox.destroy());
        this._checkboxes = [];
        this._selectedValues = [];
        this._selectedIndexes = [];
        this._initCheckboxGroup();
    }

    get config(): CheckboxGroupConfig {
        return this._config!;
    }

    public destroy(fromScene?: boolean): void {
        this._checkboxes.forEach(checkbox => checkbox.destroy());
        this._checkboxes = [];
        this._selectedValues = [];
        this._selectedIndexes = [];
        super.destroy(fromScene);
    }
}
import { BaseScene } from "../game";
import { Checkbox } from './Checkbox';
import { CheckboxGroupConfig, CheckboxConfig } from '../types';
import { BaseButton } from "./BaseButton";

export class CheckboxGroup extends BaseButton {
    private _checkboxes: Checkbox[] = [];
    private _selectedValues: string[] = [];
    private _selectedIndexes: number[] = [];
    private _checkboxConfigs: CheckboxConfig[] = [];
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
        this._config.defaultSelectedIndex = this._config.defaultSelectedIndex ?? -1;
        this._config.labelSpace = this._config.labelSpace ?? 20;
    }

    private _createCheckboxes(): void {
        let nextX = 0;
        let nextY = 0;
        const items = this._config.items ?? [];

        items.forEach((item, index) => {
            const checkbox = this._createCheckbox(item, index, nextX, nextY);
            this.addChild(checkbox);
            this._checkboxes.push(checkbox);

            // const config = this._checkboxConfigs[index];
            // config.x = checkbox.x;
            // config.y = checkbox.y;
            // checkbox.reDraw(config);

            [nextX, nextY] = this._updateNextPosition(checkbox);
            this._updateGroupSize(checkbox);
        });
    }

    private _createCheckbox(item: any, index: number, x: number, y: number): Checkbox {
        let ckbConfig = {
            x, y,
            text: item.text,
            value: item.value,
            isChecked: this._config.defaultSelectedIndex === index,
            labelSpace: this._config.labelSpace,
            textStyle: this._config.textStyle,
            handleSelect: this._handleCheckClick.bind(this),
            iconWidth: this._config.iconWidth,
            iconHeight: this._config.iconHeight,
            unCheckedTexture: this._config.unCheckedTexture,
            checkedTexture: this._config.checkedTexture,
            isCircle: this._config.isCircle,
        };
        this._checkboxConfigs.push(ckbConfig);
        return new Checkbox(this.scene, ckbConfig);
    }

    private _updateNextPosition(checkbox: Checkbox): [number, number] {
        return this._config.orientation === 'horizontal'
            ? [checkbox.Right + this._config.labelSpace!, checkbox.y]
            : [checkbox.x, checkbox.Bottom + this._config.labelSpace!];
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
        this.emit('change', this._selectedValues);
    }

    private _handleSingleSelect(ckb: Checkbox): void {
        this._checkboxes.forEach((checkbox, index) => {
            if (checkbox.isChecked && checkbox.value !== ckb.value) {
                checkbox.isChecked = false;
                let ckbItem: CheckboxConfig = this._checkboxConfigs[index];
                ckbItem.isChecked = false;
                checkbox.reDraw(ckbItem);
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
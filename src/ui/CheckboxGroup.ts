import BaseScene from '../scene';
import { Checkbox } from './Checkbox';
import { Container } from './Container';
import { CheckboxGroupConfig } from '../types';
export class CheckboxGroup extends Container {

    config: CheckboxGroupConfig;
    checkboxes: Checkbox[] = [];
    selectedValues: string[] = [];
    selectedIndexs: number[] = [];

    constructor(scene: BaseScene, config: CheckboxGroupConfig) {
        super(scene, config);
        this.config = config;
        this.Type = 'CheckboxGroup';
        this.reDraw(config);
    }

    reDraw(config: CheckboxGroupConfig) {
        config.orientation = config.orientation ?? 'x';
        config.itemWidth = config.itemWidth ?? 200;
        config.itemHeight = config.itemHeight ?? 40;
        config.checkColor = config.checkColor ?? 0xFFD700;
        config.uncheckColor = config.uncheckColor ?? 0xff8221;
        config.borderWidth = config.borderWidth ?? 4;
        config.defaultSelectedIndex = config.defaultSelectedIndex ?? -1;
        config.space = config.space ?? 20;
        this.config = config;

        for (let i = 0; i < this.checkboxes.length; i++) { 
            this.checkboxes[i].destroy();
        }

        let nextX = 0;
        let nextY = 0;
        this.checkboxes = [];
        const items = config.items ?? [];
        for (let i = 0; i < items.length; i++) {
            const isChecked = config.defaultSelectedIndex === i;
            const checkbox = new Checkbox(this.scene, {
                x: nextX, y: nextY,
                width: config.itemWidth,
                height: config.itemHeight,
                checkColor: config.checkColor,
                uncheckColor: config.uncheckColor,
                text: items[i].text,
                value: items[i].value,
                isChecked: isChecked,
                borderWidth: config.borderWidth,
                textStyle: {
                    fontFamily: 'Arial',
                    fontSize: '24px',
                    color: '#fff',
                },
                handleSelect: this.handleCheckClick.bind(this)
            });

            this.add(checkbox);
            this.checkboxes.push(checkbox);

            nextX = config.orientation === 'x' ? (checkbox.Right + config.space) : checkbox.x;
            nextY = config.orientation === 'x' ? checkbox.y : (checkbox.Bottom + config.space);

            config.width = config.orientation === 'x' ? checkbox.Right : checkbox.RealWidth;
            config.height = config.orientation === 'x' ? checkbox.y : checkbox.Bottom;
        }

        this.RefreshBounds();
    }

    handleCheckClick(ckb: Checkbox): void {
        this.selectedValues = [];
        this.selectedIndexs = [];
        const multiSelect = this.config.multiSelect ?? false;
        if (ckb.checked && !multiSelect) {
            for (let i = 0; i < this.checkboxes.length; i++) {
                const checkbox = this.checkboxes[i];
                if (checkbox.checked && checkbox.value !== ckb.value) {
                    checkbox.checked = false;
                    continue;
                }

                if (checkbox.checked && checkbox.value === ckb.value) {
                    this.selectedIndexs.push(i);
                    this.selectedValues.push(ckb.value);
                }
            }
        } else if (multiSelect) {
            for (let i = 0; i < this.checkboxes.length; i++) {
                const checkbox = this.checkboxes[i];
                if (checkbox.checked) {
                    this.selectedIndexs.push(i);
                    this.selectedValues.push(checkbox.value);
                }
            }
        }

        if (this.config.handleSelect)
            this.config.handleSelect(this, this.selectedValues, this.selectedIndexs);
    }

    destroy(fromScene?: boolean): void {
        for (let i = 0; i < this.checkboxes.length; i++) {
            this.checkboxes[i].destroy();
        }
        this.checkboxes = [];
        this.selectedValues = [];
        this.selectedIndexs = [];
        super.destroy(fromScene);
    }
}
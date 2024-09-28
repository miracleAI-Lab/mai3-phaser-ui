import { Container } from './Container';
import Utils from '../utils';
import { BaseScene } from "../game";
import { TextButton } from './TextButton';
import { Checkbox } from './Checkbox';
import { Label } from './Label';
import { ProgressBar } from './ProgressBar';
import { Slider } from './Slider';
import { Image } from './Image';
import { Text } from './Text';
import { TextBox } from './TextBox';
import { ListViewConfig, ListViewItemConfig } from '../types';
import { Grid } from './Grid';

export class ListView extends Container {
    // private _content!: Container;
    // private _mask!: Phaser.GameObjects.Graphics;
    // private _scrollBar!: Phaser.GameObjects.Graphics;
    // private _allItems: ListViewItemConfig[] = [];
    // private _visibleItems: Grid[] = [];
    // private _startIndex: number = 0;
    // private _itemsPerPage: number = 10;
    // private _config: ListViewConfig;

    // constructor(scene: BaseScene, config: ListViewConfig) {
    //     super(scene, config);
    //     this.scene = scene;
    //     this.Type = 'ListView';
    //     this._config = config;
    //     this.draw();
    //     this.setPosition(
    //         (scene.sys.game.config.width as number) / 2 - this._config.width / 2,
    //         (scene.sys.game.config.height as number) / 2 - this._config.height / 2
    //     );
    // }

    // draw() {
    //     const { width, height, padding = 0, background } = this._config;

    //     // 创建背景
    //     const bg = this.createBg(0, 0, width, height, background);
    //     this.add(bg);

    //     // 创建内容容器
    //     this._content = new Container(this.scene);
    //     this._content.setPosition(padding, padding);
    //     this.add(this._content);

    //     // 创建滚动条
    //     this._scrollBar = this.scene.make.graphics({});
    //     this.add(this._scrollBar);

    //     // 创建遮罩
    //     // this._mask = this.scene.make.graphics({});
    //     // this._mask.fillStyle(0xffffff);
    //     // this._mask.fillRect(padding, padding, width - padding * 2, height - padding * 2);
    //     // this._content.setMask(this._mask.createGeometryMask());

    //     // 启用交互和拖动
    //     this.setInteractive(new Phaser.Geom.Rectangle(0, 0, width, height), Phaser.Geom.Rectangle.Contains);
    //     this.scene.input.setDraggable(this);
    //     this.on('drag', this.onDrag, this);
    // }

    // addItem(config: ListViewItemConfig) {
    //     this._allItems.push(config);
    //     this.renderVisibleItems();
    // }

    // private renderVisibleItems() {
    //     // 清除当前可见项
    //     this._visibleItems.forEach(item => item.destroy());
    //     this._visibleItems = [];

    //     const { itemHeight = 50, padding = 0 } = this._config;
    //     const endIndex = Math.min(this._startIndex + this._itemsPerPage, this._allItems.length);

    //     for (let i = this._startIndex; i < endIndex; i++) {
    //         const y = (i - this._startIndex) * (itemHeight + padding);
    //         const item = this.createItem(this._allItems[i], y);
    //         this._content.addChild(item);
    //         this._visibleItems.push(item);
    //     }

    //     this.updateScrollBar();
        
    //     // 添加调试信息
    //     console.log(`渲染了 ${this._visibleItems.length} 个项目`);
    //     console.log(`起始索引: ${this._startIndex}, 结束索引: ${endIndex}`);
    //     console.log(`所有项目数量: ${this._allItems.length}`);
    // }

    // private createItem(config: ListViewItemConfig, y: number): Grid {
    //     const { width, itemHeight = 50 } = this._config;
    //     const item = new Grid(this.scene, {
    //         x: 0,
    //         y: y,
    //         width: width - 20,
    //         height: itemHeight,
    //         background: 0xffffff,
    //         columnGap: 10,
    //         rowGap: 5
    //     });

    //     const rowItems = [];

    //     // 创建图标（如果有）
    //     if (config.icon) {
    //         rowItems.push({
    //             type: 'Image',
    //             key: config.icon,
    //             columnSpan: 4
    //         });
    //     }

    //     // 创建标签
    //     rowItems.push({
    //         type: 'Label',
    //         text: config.text,
    //         columnSpan: 6
    //     });

    //     // // 创建右侧内容（如果有）
    //     // if (config.rightContent) {
    //     //     rowItems.push(this.createRightContentConfig(config.rightContent));
    //     // }

    //     item.addRow(rowItems);

    //     // 添加分隔线
    //     const line = this.scene.add.line(0, itemHeight, 0, 0, width - 20, 0, 0xcccccc);
    //     line.setOrigin(0);
    //     item.add(line);

    //     return item;
    // }

    // private createRightContentConfig(config: any): any {
    //     switch (config.type) {
    //         case 'TextButton':
    //             return {
    //                 type: 'TextButton',
    //                 text: config.text,
    //                 columnSpan: 3
    //             };
    //         case 'Checkbox':
    //             return {
    //                 type: 'Checkbox',
    //                 checked: config.checked,
    //                 columnSpan: 1
    //             };
    //         case 'ProgressBar':
    //             return {
    //                 type: 'ProgressBar',
    //                 value: config.value,
    //                 columnSpan: 3
    //             };
    //         case 'Slider':
    //             return {
    //                 type: 'Slider',
    //                 value: config.value,
    //                 columnSpan: 3
    //             };
    //         default:
    //             return {
    //                 type: 'Label',
    //                 text: config.text,
    //                 columnSpan: 3
    //             };
    //     }
    // }

    // public onDrag(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
    //     const contentHeight = this._allItems.length * (this._config.itemHeight! + this._config.padding!);
    //     const viewHeight = this._config.height - this._config.padding! * 2;

    //     if (contentHeight > viewHeight) {
    //         const newY = Phaser.Math.Clamp(this._content.y + (dragY - pointer.prevPosition.y), viewHeight - contentHeight, 0);
    //         this._content.setY(newY + this._config.padding!);
            
    //         // 计算新的起始索引
    //         const newStartIndex = Math.floor(-newY / (this._config.itemHeight! + this._config.padding!));
    //         if (newStartIndex !== this._startIndex) {
    //             this._startIndex = newStartIndex;
    //             this.renderVisibleItems();
    //         }

    //         this.updateScrollBar();
    //     }
    // }

    // private updateScrollBar() {
    //     const { width, height, padding = 0 } = this._config;
    //     const contentHeight = this._allItems.length * (this._config.itemHeight! + padding);
    //     const viewHeight = height - padding * 2;

    //     this._scrollBar.clear();

    //     if (contentHeight > viewHeight) {
    //         const scrollBarHeight = (viewHeight / contentHeight) * viewHeight;
    //         const scrollBarY = (-this._content.y / contentHeight) * viewHeight + padding;

    //         this._scrollBar.fillStyle(0xcccccc, 0.8);
    //         this._scrollBar.fillRoundedRect(width - 10, scrollBarY, 5, scrollBarHeight, 2);
    //     }
    // }

    // private createBg(x: number, y: number, width: number, height: number, background: any) {
    //     if (typeof background === 'string' && !background.startsWith('#')) {
    //         const bg = this.scene.make.image({ x, y, key: background });
    //         bg.setDisplaySize(width, height);
    //         bg.setOrigin(0);
    //         return bg;
    //     }

    //     const backgroundColor = background
    //         ? ((typeof background === 'string' && background.startsWith('#')
    //             ? Utils.hexColorToNumber(background) : background as number)) : 0xffffff;

    //     return this.scene.add.rectangle(x, y, width, height, backgroundColor).setOrigin(0);
    // }
}
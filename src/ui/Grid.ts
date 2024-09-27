import { Container } from './Container';
import Utils from '../utils';
import { BaseScene } from "../game";
import { TextButton, TextBox, ImageButton, RoundedButton, Checkbox, CheckboxGroup, Label, ProgressBar, Slider, VolumeSlider, Image } from './index';
import { GridConfig } from '../types';
import { Panel } from './Panel';

interface GridLayoutItem {
    row: number;
    column: number;
    x: number;
    y: number;
    width: number;
    height: number;
    child?: Container;
}

export class Grid extends Panel {
    private _content?: Container;
    private _gridLines?: Phaser.GameObjects.Graphics;
    private _draggingChild?: Container;
    private _originalPosition?: { x: number; y: number };
    private _originalIndex?: number;
    private _cellWidth: number = 0;
    private _cellHeight: number = 0;

    config?: GridConfig;
    image?: Phaser.GameObjects.Image;
    gridItemsMap: Map<string, Container[] | number> = new Map<string, Container[] | number>();

    constructor(scene: BaseScene, config: GridConfig) {
        super(scene, config);
        this.scene = scene;
        this.Type = 'Grid';
        this.draw(config);
    }

    draw(config: GridConfig) {
        this.config = config;
        const { padding = { left: 0, right: 0, top: 0, bottom: 0 }} = config;
        const left = padding.all ? padding.all : padding.left;
        const top = padding.all ? padding.all : padding.top;

        this.drawBg();
        this._content = new Container(this.scene);
        this._content.setPosition(left, top);
        this.addChildAt(this._content, 1);

        this.scene.input.enableDebug(this._content);
        this.RefreshBounds();
        this.setGridPlace();
    }

    reDraw(config: GridConfig) {
        this.clear();
        this.draw(config);
    }

    clear() {
        this._content?.removeAll(true);
        this.removeAll(true);
        if (this._gridLines) {
            this._gridLines.destroy();
            this._gridLines = undefined;
        }
        this.gridItemsMap.clear();
    }

    setGridPlace() {
        const { width = 200, height = 200, columns = 1, rows = 1, padding = { left: 0, right: 0, top: 0, bottom: 0 }, columnGap = 0, rowGap = 0 } = this.config!;
        const paddingX = padding.all ? padding.all * 2 : (padding.left! + padding.right!);
        const paddingY = padding.all ? padding.all * 2 : (padding.top! + padding.bottom!);
        const contentWidth = width - paddingX;
        const contentHeight = height - paddingY; 
        this._cellWidth = (contentWidth - (columns - 1) * columnGap) / columns;
        this._cellHeight = (contentHeight - (rows - 1) * rowGap) / rows;

        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < columns; i++) {
                const x = i * (this._cellWidth + columnGap);
                const y = j * (this._cellHeight + rowGap);
                this.gridItemsMap.set(`${x}-${y}`, 0);
            }
        }
    }

    public addRow(childConfigs: any[]) {
        const { columnGap = 0, rowGap = 0 } = this.config!;
        const lastGameObject = this._content?.getAll().slice(-1)[0] as Container;

        let nextX = 0;
        let nextY = lastGameObject ? lastGameObject.y + this._cellHeight + rowGap : 0;
        childConfigs.forEach((childConfig) => {
            const mergedConfig = {
                ...childConfig,
                x: nextX,
                y: nextY,
                width: this._cellWidth,
                height: this._cellHeight,
                enablePointer: true,
            };

            const child = this.scene.createChildFromConfig(mergedConfig);
            this.setupDraggable(child);
            this._content!.addChild(child);
            this.gridItemsMap.set(`${nextX}-${nextY}`, 1);

            nextX += this._cellWidth + columnGap;
        });
    }

    public addItems(childConfigs: any[]) {
        const emptyCells = this.getEmptyCells();
        emptyCells.forEach((emptyCell, index) => {
            if (index >= childConfigs.length) return;

            const childConfig = childConfigs[index];
            const width = this.config?.autoFill ? this._cellWidth : childConfig.width;
            const height = this.config?.autoFill ? this._cellHeight : childConfig.height;
            const x = emptyCell.x + (this._cellWidth - width) / 2;
            const y = emptyCell.y + (this._cellHeight - height) / 2;
            
            const mergedConfig = {
                ...childConfig,
                x,
                y,
                width,
                height
            };

            const child = this.scene.createChildFromConfig(mergedConfig);
            child.setName(`item_1`);
            this.setupDraggable(child);
            this._content!.addChild(child);

            this.gridItemsMap.set(`${emptyCell.x}-${emptyCell.y}`, 1);
        }); 
    }

    public addCellItems(childConfigs: any[][]) {
        const emptyCells = this.getEmptyCells();
        emptyCells.forEach((emptyCell, index) => {
            if (index >= childConfigs.length) return;

            const itemConfigs = childConfigs[index];
            itemConfigs.forEach((cfg, i) => {
                const width = this.config?.autoFill ? this._cellWidth : cfg.width;
                const height = this.config?.autoFill ? this._cellHeight : cfg.height;
                const x = emptyCell.x + (cfg?.x ?? (this._cellWidth - width) / 2);
                const y = emptyCell.y + (cfg?.y ?? (this._cellHeight - height) / 2);
                const draggable = cfg?.draggable;    
                const mergedConfig = {
                    ...cfg,
                    x,
                    y,
                    width,
                    height
                };

                const child = this.createChildFromConfig(mergedConfig);
                child.setName(`item_${i}`);
                this._content!.addChildAt(child, i);
                if (draggable) {
                    this.setupDraggable(child);
                }

                this.gridItemsMap.set(`${emptyCell.x}-${emptyCell.y}`, 1);
            })   
        });
    }

    public getEmptyCells() {
        const positions: { x: number; y: number; }[] = [];
        this.gridItemsMap.forEach((value, key) => {
            if (value === 0) {
                const [x, y] = key.split('-').map(Number);
                positions.push({ x, y });
            }
        });
        return positions;
    }

    private createChildFromConfig(config: any): Container {
        const componentMap = {
            'Image': Image,
            'TextButton': TextButton,
            'TextBox': TextBox,
            'ImageButton': ImageButton,
            'RoundedButton': RoundedButton,
            'Checkbox': Checkbox,
            'CheckboxGroup': CheckboxGroup,
            'Label': Label,
            'ProgressBar': ProgressBar,
            'Slider': Slider,
            'VolumeSlider': VolumeSlider
        };
        const ComponentClass = componentMap[config.type as keyof typeof componentMap] || TextButton;
        return new ComponentClass(this.scene, config);
    }

    private setupDraggable(child: Container) {
        // if (!this.config?.draggable) return;

        child.setInteractive();
        // child.setEventInteractive();
        // child.debugHitArea();
        this.scene.input.setDraggable(child);

        child.on('dragstart', this.handleDragStart.bind(this, child));
        child.on('drag', this.handleDrag.bind(this));
        child.on('dragend', this.handleDragEnd.bind(this));
    }

    private handleDragStart(child: Container) {
        this._draggingChild = child;
        this._originalPosition = { x: child.x, y: child.y };
        this._originalIndex = this._content!.getIndex(child);
        this._content!.bringToTop(child);
    }

    private handleDrag(_: Phaser.Input.Pointer, dragX: number, dragY: number) {
        if (this._draggingChild) {
            this._draggingChild.x = dragX;
            this._draggingChild.y = dragY;
        }
    }

    private handleDragEnd(pointer: Phaser.Input.Pointer) {
        if (!this._draggingChild) return;

        const localPoint = this._content!.getLocalPoint(pointer.x, pointer.y);
        let targetChild = this.getChildAtPosition(localPoint.x, localPoint.y);
        if (targetChild && targetChild !== this._draggingChild) {
            this.swapChildren(this._draggingChild, targetChild);
        } else {
            const emptyCell = this.findNearestEmptyCell(localPoint.x, localPoint.y);
            if (emptyCell) {
                this.moveChildToEmptyCell(this._draggingChild, emptyCell);
            } else {
                this.resetDraggedChild();
            }
        }

        this.cleanupDragState();
    }

    private findNearestEmptyCell(x: number, y: number): { x: number, y: number } | null {
        let nearestCell = null;
        this.gridItemsMap.forEach((value, key) => {
            if (value === 0) {
                const [cellX, cellY] = key.split('-').map(Number);
                if (x >= cellX && x <= cellX + this._cellWidth &&
                    y >= cellY && y <= cellY + this._cellHeight) {
                    nearestCell = { x: cellX, y: cellY };
                }
            }
        });

        return nearestCell;
    }

    private moveChildToEmptyCell(child: Container, cell: { x: number, y: number }) {
        const oldKey = `${this._originalPosition!.x}-${this._originalPosition!.y}`;
        const newKey = `${cell.x}-${cell.y}`;

        child.setPosition(cell.x, cell.y);
        this.gridItemsMap.set(newKey, 1);
        this.gridItemsMap.set(oldKey, 0);
    }

    private swapChildren(child1: Container, child2: Container) {
        const targetIndex = this._content!.getIndex(child2);
        const pos1 = { x: this._originalPosition!.x, y: this._originalPosition!.y };
        const pos2 = { x: child2.x, y: child2.y };

        child1.setPosition(pos2.x, pos2.y);
        child2.setPosition(pos1.x, pos1.y);

        this._content!.moveTo(child1, targetIndex);
        this._content!.moveTo(child2, this._originalIndex!);

        this.updateGridItemsMap(child1, child2);
    }

    private resetDraggedChild() {
        if (this._draggingChild && this._originalPosition) {
            this._draggingChild.setPosition(this._originalPosition.x, this._originalPosition.y);
            if (this._originalIndex !== undefined) {
                this._content!.moveTo(this._draggingChild, this._originalIndex);
            }
        }
    }

    private cleanupDragState() {
        this._draggingChild = undefined;
        this._originalPosition = undefined;
        this._originalIndex = undefined;
    }

    private updateGridItemsMap(child1: Container, child2: Container) {
        this.gridItemsMap.set(`${child1.x}-${child1.y}`, 1);
        this.gridItemsMap.set(`${child2.x}-${child2.y}`, 1);
    }

    private getChildAtPosition(x: number, y: number): Container | undefined {
        return (this._content!.getAll() as Container[]).find(child =>
            child !== this._draggingChild && 
            child.name === this._draggingChild!.name &&
            x >= child.x && x <= child.x + child.RealWidth &&
            y >= child.y && y <= child.y + child.RealHeight
        );
    }

    destroy(fromScene?: boolean): void {
        super.destroy(fromScene);
        this._content?.destroy(fromScene);
        this._gridLines?.destroy(fromScene);
        this.image?.destroy(fromScene);
        this.gridItemsMap.clear();
    }
}

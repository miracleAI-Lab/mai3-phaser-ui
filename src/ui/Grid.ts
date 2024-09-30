import { Container } from './Container';
import { BaseScene } from "../game";
import { TextButton, Text, TextBox, ImageButton, RoundedButton, Checkbox, CheckboxGroup, Label, ProgressBar, Slider, VolumeSlider, Image, Sprite } from './index';
import { GridConfig } from '../types';
import { Panel } from './Panel';

export class Grid extends Panel {
    private _content?: Container;
    private _gridLines?: Phaser.GameObjects.Graphics;
    private _draggingChild?: Container;
    private _originalPosition?: { x: number; y: number };
    private _originalIndex?: number;
    private _cellWidth: number = 0;
    private _cellHeight: number = 0;
    protected _config?: GridConfig;

    private indexToItemMap: Map<number, Container[]> = new Map<number, Container[]>();
    private positionToIndexMap: Map<string, number> = new Map<string, number>();
    private positionSlotMap: Map<string, number> = new Map<string, number>();

    constructor(scene: BaseScene, config: GridConfig) {
        super(scene, config);
        this.Type = 'Grid';
        this.initialize(config);
    }

    private initialize(config: GridConfig): void {
        this.draw(config);
    }

    private draw(config: GridConfig): void {
        this._config = config;
        this.setupContent();
        this.setupGridLayout();
    }

    private setupContent(): void {
        const { padding = { left: 0, right: 0, top: 0, bottom: 0 } } = this._config!;
        const left = padding.all ?? padding.left;
        const top = padding.all ?? padding.top;

        this.drawBg();
        this._content = new Container(this.scene);
        this._content.setPosition(left, top);
        this.addChildAt(this._content, 1);

        this.scene.input.enableDebug(this._content);
        this.RefreshBounds();
    }

    private setupGridLayout(): void {
        const { width = 200, height = 200, columns = 1, rows = 1, padding = { left: 0, right: 0, top: 0, bottom: 0 }, columnGap = 0, rowGap = 0 } = this._config!;
        const paddingX = padding.all ? padding.all * 2 : (padding.left! + padding.right!);
        const paddingY = padding.all ? padding.all * 2 : (padding.top! + padding.bottom!);
        const contentWidth = width - paddingX;
        const contentHeight = height - paddingY; 
        
        this._cellWidth = (contentWidth - (columns - 1) * columnGap) / columns;
        this._cellHeight = (contentHeight - (rows - 1) * rowGap) / rows;

        this.initializeGridMaps(columns, rows, columnGap, rowGap);
    }

    private initializeGridMaps(columns: number, rows: number, columnGap: number, rowGap: number): void {
        let index = 0;
        for (let j = 0; j < rows; j++) {
            for (let i = 0; i < columns; i++) {
                const x = i * (this._cellWidth + columnGap);
                const y = j * (this._cellHeight + rowGap);

                this.positionSlotMap.set(`${x}-${y}`, 0);
                this.positionToIndexMap.set(`${x}-${y}`, index);
                this.indexToItemMap.set(index, []);
                index++;
            }
        }
    }

    public reDraw(config: GridConfig): void {
        this.clear();
        this.draw(config);
    }

    public clear(): void {
        this._content?.removeAll(true);
        this.removeAll(true);
        if (this._gridLines) {
            this._gridLines.destroy();
            this._gridLines = undefined;
        }
        this.positionSlotMap.clear();
    }

    public addItems(childConfigs: any[]): void {
        const emptyCells = this.getEmptyCells();
        emptyCells.forEach((emptyCell, index) => {
            if (index >= childConfigs.length) return;
            this.addItemToCell(childConfigs[index], emptyCell, index);
        });
    }

    private addItemToCell(childConfig: any, emptyCell: { x: number; y: number }, index: number): void {
        const { width, height } = this.calculateChildDimensions(childConfig);
        const { x, y } = this.calculateChildPosition(childConfig, emptyCell, width, height);
        
        const mergedConfig = { ...childConfig, x, y, width, height };
        const child = this.createChildFromConfig(mergedConfig);
        
        this.setupChild(child, emptyCell, index);
    }

    private calculateChildDimensions(childConfig: any): { width: number; height: number } {
        const width = this._config?.autoFill ? this._cellWidth : childConfig.width;
        const height = this._config?.autoFill ? this._cellHeight : childConfig.height;
        return { width, height };
    }

    private calculateChildPosition(childConfig: any,emptyCell: { x: number; y: number }, width: number, height: number): { x: number; y: number } {
        const x = emptyCell.x + (childConfig?.x ?? (this._cellWidth - width) / 2);
        const y = emptyCell.y + (childConfig?.y ?? (this._cellHeight - height) / 2);

        return { x, y };
    }

    private setupChild(child: Container, emptyCell: { x: number; y: number }, index: number): void {
        child.setName(`item_0`);
        child.setEventInteractive();
        this.setupDraggable(child);
        this._content!.addChild(child);

        this.positionSlotMap.set(`${emptyCell.x}-${emptyCell.y}`, 1);
        this.indexToItemMap.get(index)?.push(child);
    }

    public addCellItems(childConfigs: any[][]): void {
        const emptyCells = this.getEmptyCells();
        emptyCells.forEach((emptyCell, index) => {
            if (index >= childConfigs.length) return;
            this.addItemsToCell(childConfigs[index], emptyCell, index);
        });
    }

    private addItemsToCell(itemConfigs: any[], emptyCell: { x: number; y: number }, cellIndex: number): void {
        itemConfigs.forEach((cfg, i) => {
            const { width, height } = this.calculateChildDimensions(cfg);
            const { x, y } = this.calculateChildPosition(cfg,emptyCell, width, height);
            
            const mergedConfig = { ...cfg, x, y, width, height };
            const child = this.createChildFromConfig(mergedConfig);
            
            this.setupCellChild(child, emptyCell, cellIndex, i, cfg.draggable);
        });
    }

    private setupCellChild(child: Container, emptyCell: { x: number; y: number }, cellIndex: number, itemIndex: number, draggable?: boolean): void {
        child.setName(`item_${itemIndex}`);
        child.setEventInteractive();
        this._content!.addChildAt(child, itemIndex);
        if (draggable) {
            this.setupDraggable(child);
        }

        this.positionSlotMap.set(`${emptyCell.x}-${emptyCell.y}`, 1);
        this.indexToItemMap.get(cellIndex)?.push(child);
    }

    public getCellItemsAtIndex(index: number): Container[] {
        return this.indexToItemMap.get(index) ?? [];
    }

    public getEmptyCells(): { x: number; y: number; }[] {
        const positions: { x: number; y: number; }[] = [];
        this.positionSlotMap.forEach((value, key) => {
            if (value === 0) {
                const [x, y] = key.split('-').map(Number);
                positions.push({ x, y });
            }
        });
        return positions;
    }

    private createChildFromConfig(config: any): Container {
        const componentMap: { [key: string]: any } = {
          Image: Image,
          TextButton: TextButton,
          TextBox: TextBox,
          ImageButton: ImageButton,
          RoundedButton: RoundedButton,
          Checkbox: Checkbox,
          CheckboxGroup: CheckboxGroup,
          Label: Label,
          ProgressBar: ProgressBar,
          Slider: Slider,
          VolumeSlider: VolumeSlider,
          Text: Text,
          Sprite: Sprite,
        };
        const ComponentClass = componentMap[config.type] || TextButton;
        return new ComponentClass(this.scene, config);
    }

    private setupDraggable(child: Container): void {
        if (!this._config?.draggable) return;

        this.scene.input.setDraggable(child);
        child.on('dragstart', this.handleDragStart.bind(this, child));
        child.on('drag', this.handleDrag.bind(this));
        child.on('dragend', this.handleDragEnd.bind(this));
    }

    private handleDragStart(child: Container, pointer: Phaser.Input.Pointer, dragX: number, dragY: number): void {
        this._draggingChild = child;
        this._originalPosition = { x: child.x, y: child.y };
        this._originalIndex = this._content!.getIndex(child);
        this._content!.bringToTop(child);

        this._config?.handleDragStart?.(child, pointer, dragX, dragY);
    }

    private handleDrag(pointer: Phaser.Input.Pointer, dragX: number, dragY: number): void {
        if (this._draggingChild) {
            this._draggingChild.x = dragX;
            this._draggingChild.y = dragY;
        }

        this._config?.handleDrag?.(this._draggingChild, pointer, dragX, dragY);
    }

    private handleDragEnd(pointer: Phaser.Input.Pointer): void {
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

        this._config?.handleDragEnd?.(this._draggingChild, targetChild, pointer);
        this.cleanupDragState();
    }

    private findNearestEmptyCell(x: number, y: number): { x: number, y: number } | null {
        let nearestCell = null;
        this.positionSlotMap.forEach((value, key) => {
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

    private moveChildToEmptyCell(child: Container, cell: { x: number, y: number }): void {
        const oldKey = `${this._originalPosition!.x}-${this._originalPosition!.y}`;
        const newKey = `${cell.x}-${cell.y}`;

        child.setPosition(cell.x, cell.y);
        this.positionSlotMap.set(newKey, 1);
        this.positionSlotMap.set(oldKey, 0);
    }

    private swapChildren(child1: Container, child2: Container): void {
        const targetIndex = this._content!.getIndex(child2);
        const pos1 = { x: this._originalPosition!.x, y: this._originalPosition!.y };
        const pos2 = { x: child2.x, y: child2.y };

        child1.setPosition(pos2.x, pos2.y);
        child2.setPosition(pos1.x, pos1.y);

        this._content!.moveTo(child1, targetIndex);
        this._content!.moveTo(child2, this._originalIndex!);

        this.updateGridItemsMap(child1, child2);
    }

    private resetDraggedChild(): void {
        if (this._draggingChild && this._originalPosition) {
            this._draggingChild.setPosition(this._originalPosition.x, this._originalPosition.y);
            if (this._originalIndex !== undefined) {
                this._content!.moveTo(this._draggingChild, this._originalIndex);
            }
        }
    }

    private cleanupDragState(): void {
        this._draggingChild = undefined;
        this._originalPosition = undefined;
        this._originalIndex = undefined;
    }

    private updateGridItemsMap(child1: Container, child2: Container): void {
        this.positionSlotMap.set(`${child1.x}-${child1.y}`, 1);
        this.positionSlotMap.set(`${child2.x}-${child2.y}`, 1);
    }

    private getChildAtPosition(x: number, y: number): Container | undefined {
        return (this._content!.getAll() as Container[]).find(child =>
            child !== this._draggingChild && 
            child.name === this._draggingChild!.name &&
            x >= child.x && x <= child.x + child.RealWidth &&
            y >= child.y && y <= child.y + child.RealHeight
        );
    }

    
    public removeChild(child: Container): void {
        const key = `${child.x}-${child.y}`;
        this.positionSlotMap.set(key, 0);
        this._content?.remove(child);
        child.destroy();
    }
    
    get config(): GridConfig {
        return this._config!;
    }
    
    destroy(fromScene?: boolean): void {
        super.destroy(fromScene);
        this._content?.destroy(fromScene);
        this._gridLines?.destroy(fromScene);
        this.positionSlotMap.clear();
    }
}

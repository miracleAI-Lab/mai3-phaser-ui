import { Container } from './Container';
import { DialogConfig } from '../types';
import { BaseScene } from "../game";
import { Panel } from './Panel';
import { TextButton, TextBox, ImageButton, RoundedButton, Checkbox, CheckboxGroup, Label, ProgressBar, Slider, VolumeSlider, Sprite, Image, Text } from './index';

export class Dialog extends Container {
    private _root?: Panel;
    private _dialogConfig?: DialogConfig;
    private _childComponents: Container[] = [];

    constructor(scene: BaseScene, config: DialogConfig) {
        super(scene, { ...config, x: 0, y: 0 });
        this.Type = 'Dialog';
        this.scene = scene;
        this._initDialog(config);
    }

    private _initDialog(config: DialogConfig): void {
        this._dialogConfig = config;

        this._createRoot();
        this._positionDialog();
    }

    private _createRoot(): void {
        const {
            x = 0, 
            y = 0, 
            width = 0, 
            height = 0, 
            texture = '', 
            frame,
            leftWidth = 0,
            rightWidth = 0,
            topHeight = 0,
            bottomHeight = 0,
            radius = 0,
            borderWidth = 0,
            borderColor = 0
        } = this._dialogConfig!;
        this._root = new Panel(this.scene, {x, y, width, height, texture, frame, leftWidth, rightWidth, topHeight, bottomHeight, radius, borderWidth, borderColor});
        this._root.setName("root");
        this._root.drawBackground();
        this.addAt(this._root, 1);
        if (this._dialogConfig?.closeButton) {
            let closeBtnConfig = this._dialogConfig.closeButton;
            closeBtnConfig.x = closeBtnConfig.x ?? ((this._dialogConfig.width ?? 0) - (closeBtnConfig.width ?? 0) - 30);
            closeBtnConfig.y = closeBtnConfig.y ?? 30
            const child = this.createChildFromConfig(closeBtnConfig);
            this._root!.addChild(child);
            this._childComponents.push(child);
        }
    }

    private _positionDialog(): void {
        const { width = 0, height = 0 } = this._dialogConfig!;
        const rootX = (this.scene.scale.width - width) / 2;
        const rootY = (this.scene.scale.height - height) / 2;
        this._root!.setPosition(rootX, rootY);
        this.setDepth(99999);
        this.RefreshBounds();
    }

    public addItems(childConfigs: any[]): void {
        childConfigs.forEach(childConfig => {
            const child = this.createChildFromConfig(childConfig);
            this._root!.addChild(child);
            this._childComponents.push(child);
        });
    }

    private createChildFromConfig(config: any): Container {
        const componentMap: { [key: string]: any } = {
          Image,
          TextButton,
          TextBox,
          ImageButton,
          RoundedButton,
          Checkbox,
          CheckboxGroup,
          Label,
          ProgressBar,
          Slider,
          VolumeSlider,
          Text,
          Sprite,
        };
        const ComponentClass = componentMap[config.type] || TextButton;
        return new ComponentClass(this.scene, config);
    }

    public reDraw(config: DialogConfig): void {
        this.destroy();
        this._initDialog(config);
    }

    public show(): void {
        this.setVisible(true);
    }

    public hide(): void {
        this.setVisible(false);
    }

    public close(): void {
        this.destroy();
    }

    private _handlePointerDown = (_: Phaser.Input.Pointer, _localX: number, _localY: number, event: Phaser.Types.Input.EventData): void => {
        event.stopPropagation();
    }

    get config(): DialogConfig {
        return this._dialogConfig!;
    }

    destroy(fromScene?: boolean): void {
        this._childComponents.forEach(child => {
            child.destroy(true);
        });
        this._childComponents = [];
        this._root?.removeAll(true);
        this.getAll().forEach(obj => obj.destroy(true));
        
        super.destroy(fromScene);
        this._root?.destroy(fromScene);
        this._root = undefined;
        this._dialogConfig = undefined;
    }
}

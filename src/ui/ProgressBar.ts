import { Container } from './Container';
import { BackgroundType, ProgressConfig } from '../types';
import Utils from '../utils';
import BaseScene from '../scene';
export class ProgressBar extends Container {
    protected borderWidth?: number;
    protected borderColor?: number;
    protected radius?: number;
    protected bgWidth?: number;
    protected bgHeight?: number;
    protected fillWidth?: number;
    protected _progressValue: number = 0;

    config: ProgressConfig;
    bg?: BackgroundType;
    fill?: BackgroundType;

    constructor(scene: BaseScene, config: ProgressConfig) {
        super(scene, config);
        this.config = config;
        this.Type = 'ProgressBar';

        this.reDraw(config);
    }

    reDraw(config: ProgressConfig) {
        this.config = config;
        this.bgWidth = config.width ?? 300;
        this.bgHeight = config.height ?? 32;

        this.fillWidth = 0;
        this.borderWidth = config.borderWidth ?? 0;
        this.borderColor = this.config.borderColor ?? 0xcf4b00;
        this.radius = this.config.radius ?? 0;

        this.drawBarBg();
        this.drawBarFill();
        this.RefreshBounds();
    }

    drawBarBg() {
        if (typeof this.config.bg === 'string') {
            this.bg = this.createOrGetSprite(this.bg, this.config.bg, true);
            this.bg.displayWidth = this.bgWidth!;
            this.bg.displayHeight = this.bgHeight!;
            this.bg.setOrigin(0);
        } else if (this.config.radius && this.config.radius > 0 && typeof this.config.bg === 'number') {
            this.bg = this.reDrawRoundedRectBG(0, 0, this.bgWidth!, this.bgHeight!, this.borderWidth!, this.radius!, this.borderColor!, this.config.bg as number || 0xcf4b00);
        } else {
            this.bg = this.createOrGetRectangle(this.bg, true, 0, 0, this.bgWidth, this.bgHeight! - this.borderWidth!, this.config.bg as number);
            this.bg.setStrokeStyle(this.borderWidth, this.config.bg as number, this.config.borderColorAlpha).setOrigin(0, 0);
            this.bg.setOrigin(0);
        }

        this.addChildAt(this.bg!, 0);
    }

    drawBarFill() {
        if (typeof this.config.fill === 'string') {
            this.fill = this.createOrGetSprite(this.fill, this.config.fill, false);
            this.fill.displayWidth = 0;
            this.fill.displayHeight = this.bgHeight!;
            this.fill.setOrigin(0);
        } else if (this.config.radius && this.config.radius > 0 && typeof this.config.fill === 'number') {
            this.fill = this.reDrawRoundedRectFill(0, 0, 0, 0, this.borderWidth!, this.radius!, this.borderColor!, this.config.fill as number || 0xff8221);
        } else {
            this.fill = this.createOrGetRectangle(this.fill, false, 0, 0, 4, this.bgHeight! - this.borderWidth!, this.config.fill as number, this.config.borderColorAlpha);
            this.fill.setOrigin(0);
        }

        this.addChildAt(this.fill!, 1);
    }

    createOrGetSprite(obj?: any, key?: string, isBg?: boolean) {
        let gameObj = obj ?? this.scene.make.sprite({ key });
        if (!(obj instanceof Phaser.GameObjects.Sprite)) {
            gameObj.destroy(true);
            gameObj = this.scene.make.sprite({ key });

            if (isBg) this.bg = gameObj;
            if (!isBg) this.fill = gameObj;
            this.addChildAt(isBg! ? this.bg! : this.fill!, isBg! ? 0 : 1);
        }

        gameObj.setTexture(key!);
        return gameObj as Phaser.GameObjects.Sprite;
    }

    createOrGetRectangle(obj?: any, isBg?: boolean, x?: number, y?: number, width?: number, height?: number, fillColor?: number, fillAlpha?: number) {
        let gameObj = (obj ?? this.scene.add.rectangle(x, y, width, height, fillColor, fillAlpha)) as Phaser.GameObjects.Rectangle;
        if (!(obj instanceof Phaser.GameObjects.Rectangle)) {
            gameObj.destroy(true);
            gameObj = this.scene.add.rectangle(x, y, width, height, fillColor, fillAlpha);

            if (isBg) this.bg = gameObj;
            if (!isBg) this.fill = gameObj;
            this.addChildAt(isBg! ? this.bg! : this.fill!, isBg! ? 0 : 1);
        }

        gameObj.width = width ?? gameObj.width;
        gameObj.height = height ?? gameObj.height;
        gameObj.setFillStyle(fillColor, fillAlpha);
        return gameObj;
    }

    reDrawRoundedRectBG(x: number, y: number, width: number, height: number, borderWidth: number, radius: number, borderColor: number, fillColor: number) {
        if (this.bg && !(this.bg instanceof Phaser.GameObjects.RenderTexture)) {
            this.bg.destroy(true);
        }

        const rt = this.bg as Phaser.GameObjects.RenderTexture;
        this.bg = Utils.reDrawRoundedRectRenderTexture(this.scene, rt, x, y, width, height, borderWidth, radius, borderColor, fillColor);
        return this.bg;
    }

    reDrawRoundedRectFill(x: number, y: number, width: number, height: number, borderWidth: number, radius: number, borderColor: number, fillColor: number) {
        if (this.fill && !(this.fill instanceof Phaser.GameObjects.RenderTexture)) {
            this.fill.destroy(true);
        }

        const rt = this.fill as Phaser.GameObjects.RenderTexture;
        this.fill = Utils.reDrawRoundedRectRenderTexture(this.scene, rt, x, y, width, height, borderWidth, radius, borderColor, fillColor);
        return this.fill;
    }

    updateProgress(progress: number) {
        if (this.fill instanceof Phaser.GameObjects.Sprite) {
            this.fill.x = 0;
            this.fill.displayWidth = this.bgWidth! * progress;
            this.fillWidth = this.fill.displayWidth;
        }

        if (this.fill instanceof Phaser.GameObjects.Rectangle) {
            this.fill.width = this.borderWidth! * 2 + (this.bgWidth! - this.borderWidth! * 2) * progress;
            this.fillWidth = this.fill.displayWidth;
        }

        if (this.fill instanceof Phaser.GameObjects.RenderTexture) {
            this.fillWidth = this.bgWidth! * progress;
            this.fill = this.reDrawRoundedRectFill(0, 0, this.fillWidth, this.bgHeight!, this.borderWidth!, this.radius!, this.borderColor!, this.config.fill as number || 0xff8221);
            this.addChildAt(this.fill, 1);
        }

        this._progressValue = progress;
    }

    set progress(value: number) {
        this.updateProgress(value);
    }

    get progress(): number {
        return this._progressValue;
    }

    public getProgressWith() {
        return this.fillWidth;
    }
}




import { ButtonConfig, GridItem } from '../types';
import Utils from '../utils';
import { BaseScene } from "../game";
import { BaseButton } from './BaseButton';

export class TextButton extends BaseButton implements GridItem {
    private _config: ButtonConfig;

    bg?: Phaser.GameObjects.RenderTexture;
    label?: Phaser.GameObjects.Text;
    columnSpan?: number;

    constructor(scene: BaseScene, config: ButtonConfig) {
        config.width = config.width ?? 200;
        config.height = config.height ?? 60;
        super(scene, config, 'TextButton');
        this._config = config;
        this.columnSpan = 12;

        this.reDraw(config);
        this.setEventInteractive();
    }

    reDraw(config: ButtonConfig) {
        config.width = config.width ?? 200;
        config.height = config.height ?? 60;
        this._config = config;

        const text = config.text ?? 'MiracleAI';
        const radius = config.radius ?? 0;
        const backgroundColor = config.backgroundColor ?? 0;
        const borderWidth = config.borderWidth ?? 0;
        const borderColor = config.borderColor || 0xcf4b00;
        if (this.bg) {
            this.bg.destroy(true);
            this.bg = undefined;
        }
        this.bg = Utils.reDrawRoundedRectRenderTexture(this.scene, this.scene.make.renderTexture({ x: 0, y: 0, width: config.width, height: config.height }), 0, 0, config.width, config.height, borderWidth, radius, borderColor, backgroundColor)!;
        this.addChildAt(this.bg, 0);

        if (!this.label)
            this.label = this.scene.make.text({});

        this.label.setText(text);
        this.label.setStyle(config.textStyle ?? {});
        this.label.setFontStyle(config.textStyle?.fontStyle!);
        this.label.setPadding(config.textStyle?.padding ?? {});
        this.label.setOrigin(0);

        const x = (config.width - this.label?.displayWidth!) / 2
        const y = (config.height - this.label?.displayHeight!) / 2;

        this.label?.setPosition(x, y);
        this.addChildAt(this.label, 1);
        
        this.updateConfig(config);
        this.RefreshBounds();
    }

    set text(text: string) {
        if (this.label)
            this.label.text = text;
    }

    get config(): ButtonConfig {
        return this._config!;
    }

    destroy(fromScene?: boolean) {
        if (this.bg) {
            this.bg.destroy();
            this.bg = undefined;
        }
        if (this.label) {
            this.label.destroy();
            this.label = undefined;
        }
        super.destroy(fromScene);
    }
}

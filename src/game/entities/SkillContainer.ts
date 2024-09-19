import Phaser from "phaser";
import BaseScene from "../../mai3/scene/BaseScene";
import { RoundedButton } from "../../mai3/gui/RoundedButton";
import Utils from "../../mai3/utils";
import { Label } from "../../mai3/gui/Label";
import { SkillButConfig } from "./Types";

class SkillContainer extends Phaser.GameObjects.Container {
    baseScene: BaseScene;
    border?: Phaser.GameObjects.Graphics;
    pointer?: Phaser.Input.Pointer;
    keyLabel: Label;
    skillBtn: RoundedButton;
    skillNameLabel: Label;
    SkillButConfig: SkillButConfig
    constructor(scene: BaseScene, x: number, y: number, width: number, height: number, skillbutconfig: SkillButConfig) {
        super(scene, x, y);

        this.width = width;
        this.height = height;
        this.baseScene = scene;
        this.SkillButConfig = skillbutconfig;
        this.renderBorder();

        const config = {
            x: x,
            y: y,
            radius: width / 2,
            geomType: "Circle",
            texture: this.SkillButConfig.texture,
            handleDown: {
                handleFn: () => {
                    skillbutconfig.handleDown?.handleFn?.()
                }
            },
        };

        this.skillBtn = new RoundedButton(scene, config).setPosition(0, 0);

        this.add(this.skillBtn);

        this.skillNameLabel = new Label(scene, {
            x: 0,
            y: height,
            text: this.SkillButConfig.name,
            autoHeight: true,
            width: width,
            textAlign: "center",
            borderWidth: 0,
            backgroundAlpha: 0,
            textStyle: {
                fontSize: "14px",
                color: "#FFffff",
            },
            isWordWrap: true,
            padding: { x: 0, y: 0 },
        });

        this.add(this.skillNameLabel);

        this.keyLabel = new Label(scene, {
            x: 0,
            y: 0,
            text: this.SkillButConfig.key,
            autoHeight: true,
            width: width,
            textAlign: "right",
            borderWidth: 0,
            backgroundAlpha: 0,
            textStyle: {
                fontSize: "12px",
                color: "#FFffff",
            },
            padding: { x: 5, y: 1 },
        });

        this.add(this.keyLabel);

        scene.add.existing(this);
    }

    renderBorder() {
        if (!this.border) {
            this.border = this.scene.add.graphics();
            this.add(this.border);
        }
        const borderWidth = 4;
        this.border = Utils.reDrawCircle(
            this.border,
            this.width / 2,
            this.height / 2,
            this.width / 2 - borderWidth,
            borderWidth,
            this.SkillButConfig.borderColor ?? 0xff8221,
            this.SkillButConfig.bgColor ?? 0xffd700
        );
    }

    destroy(fromScene?: boolean) {
        super.destroy(fromScene);
    }
}

export const NewSkillBut = (scene: BaseScene, x: number, y: number, width: number, height: number,
    skillbutconfig: SkillButConfig) =>
    new SkillContainer(scene, x, y, width, height, skillbutconfig);

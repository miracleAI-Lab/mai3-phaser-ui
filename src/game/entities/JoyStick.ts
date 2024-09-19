import { CustomScene } from "./Scene";
import { JoyStickConfig } from "./Types";

class JoyStick {
    scene: CustomScene
    joyStick: any
    constructor(scene: CustomScene, config: JoyStickConfig) {
        this.scene = scene
        this.joyStick = (scene.game.plugins.get("rexVirtualJoystickPlugin") as any).add(scene, {
            x: config.x,
            y: config.y,
            radius: config.radius,
            base: scene.add.circle(0, 0, config.radius, 0x888888),
            thumb: scene.add.circle(0, 0, config.radius / 2, 0xcccccc),
        }).on('update', this.dumpJoyStickState, this);
    }
    dumpJoyStickState() {
        const cursorKeys = this.joyStick.createCursorKeys();
        this.scene.joyStickcursors = cursorKeys
    }
}

export const NewJoyStick = (scene: CustomScene, config: JoyStickConfig) => {
    return new JoyStick(scene, config)
}

import BaseScene from "../../mai3/scene/BaseScene";

class KeyBoard {
    private scene: BaseScene;
    private cursors?: object;
    private oncekey?: Map<string, boolean>
    constructor(scene: BaseScene) {
        this.scene = scene
        this.oncekey = new Map()
    }

    AddKeys(key: string) {
        this.cursors = this.scene.input.keyboard?.addKeys(key)
        return this.cursors
    }

    SetOncekeyMap(mapkey: string, value: boolean) {
        this.oncekey?.set(mapkey, value)
    }

    GetOncekeyMap(mapkey: string): boolean | undefined {
        return this.oncekey?.get(mapkey)
    }

}
export const NewKeyBoard = (scene: BaseScene) => {
    return new KeyBoard(scene);
}



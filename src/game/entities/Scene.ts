import BaseScene from "../../mai3/scene/BaseScene";

export class CustomScene extends BaseScene {
    [prop: string]: any;
    name: string;
    private Property: { [key: string]: any } = {};
    private PropertyArray: { [key: string]: any[] } = {};
    private HandlePreload?: () => void;
    private HandleCreate?: () => void;
    private HandleUpdate?: (time: number, delta: number) => void;
    constructor(name: string) {
        super(name)
        this.name = name
    }
    preload(): void {
        this.HandlePreload?.()
    }
    create() {
        this.HandleCreate?.()
    }
    update(time: number, delta: number): void {
        this.HandleUpdate?.(time, delta)
    }
    SetProperty<T>(key: string, value: T) {
        this.Property[key] = value
    }
    GetProperty<T>(key: string): T {
        return this.Property[key]
    }
    SetPropertyArray<T>(key: string, value: T[]) {
        this.PropertyArray[key] = value
    }
    GetPropertyArray<T>(key: string): T[] {
        return this.PropertyArray[key]
    }
    SetHandlePreload(fn: () => void) {
        this.HandlePreload = fn
    }
    SetHandleCreate(fn: () => void) {
        this.HandleCreate = fn
    }
    SetHandleUpdate(fn: (time: number, delta: number) => void) {
        this.HandleUpdate = fn
    }


}

export const NewScene = (name: string) =>
    new CustomScene(name)
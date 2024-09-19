import { OrientEnum } from './enum';


export interface AnimationConifg {
    key: string
    frames: number[] | AnimationFrame[]
    frameRate: number
    repeat?: number
    texture?: string
}

export interface TweensConifg {
    id?: string
    x?: number
    y?: number
}

export interface MovementCoinfg {
    texture: string
    targer: Phaser.GameObjects.Sprite
}

export interface SpriteConifg {
    x: number
    y: number
    texture: string
    frame?: string | number
    scale?: number
}

export type AnimationFrame = {
    key?: string;
    frame?: string | number;
    duration?: number;
    visible?: boolean;
};

export interface SkillConifg {
    key: string
    x?: number
    y?: number
    width?: number
    height?: number
    count?: number
    distance?: number
}

export interface HealthBarConfig {
    x?: number,
    y?: number,
    widht?: number,
    height?: number,
    value?: number
}

export interface PlayerConfig {
    x?: number,
    y?: number,
    texture?: string
    hp?: number,

}

export interface ComputerConfig {
    x?: number,
    y?: number,
    texture?: string
    hp?: number,
    orient?: OrientEnum
    distance?: number
    skill?: {
        name: string
        count: number
        distance: number
    }
}

export interface ComputerMoveConfig {
    orient?: OrientEnum
    distance?: number
}

export interface JoyStickConfig {
    x: number,
    y: number,
    radius: number,
}

export interface SkillButConfig {
    id: number;
    name: string;
    texture: string
    nums: number;
    key: string;
    value: number;
    bgColor?: number;
    borderColor?: number;
    handleDown?: ButtonHandle;
    [key: string]: number | string | undefined | ButtonHandle; // 添加索引签名
}

export interface SoundConfig {
    key: string;
    volume?: number;
    loop?: boolean;
}

export interface ButtonHandle {
    audio?: string;
    texture?: string | Phaser.Textures.Texture;
    handleFn?: Function;
}

import BaseScene from '../../mai3/scene/BaseScene';
import { SoundConfig } from "./Types";

class Music {
    _volume: number;
    _loop: boolean;
    scene: BaseScene;
    audioSound: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    constructor(scene: BaseScene, config: SoundConfig) {
        this.scene = scene;
        this._volume = config.volume || 0.2
        this._loop = config.loop || true
        this.audioSound = scene.sound.add(config.key!);
    }

    get Volume() {
        return this._volume;
    }
    set Volume(value: number) {
        this._volume = value;
    }

    get Loop() {
        return this._loop;
    }
    set Loop(value: boolean) {
        this._loop = value;
    }
    stop() {
        this.audioSound.stop();
    }
    play() {
        this.audioSound.setLoop(this._loop);
        this.audioSound.setVolume(this._volume);
        this.audioSound.play();
    }
}

export const NewMusic = (scene: BaseScene, config: SoundConfig) => new Music(scene, config);
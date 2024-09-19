import { CustomScene } from './Scene';
import MaiGame from './MaiGame';
import { Text } from '@/mai3/gui/Text';
import { Image } from '@/mai3/gui/Image';
import { ComputerSprite } from './Computer';
import { ProgressBar } from '@/mai3/gui/ProgressBar';
import { ImageButton } from '@/mai3/gui/ImageButton';
import { RoundedButton } from '@/mai3/gui/RoundedButton';
import { ImageButtonConfig, ImageConfig, ProgressConfig, RoundedButtonConfig, TextConfig }
    from '@/mai3/types';


type ObjectType = RoundedButton | Text | ImageButton | Image | ProgressBar
    | Phaser.GameObjects.Image | Phaser.Tweens.Tween | Phaser.Time.Timeline | number | undefined | boolean
const SceneTrim = {

    createUIElement(scene: CustomScene, uiItem: Record<string, any>): ObjectType {
        const creators: Record<string, (s: CustomScene, item: Record<string, any>) => ObjectType> = {
            roundedbutton: this.AddRoundedButton,
            imagebutton: this.AddImageButton,
            text: (s, item) => item.isshow !== false ? this.AddText(s, item) : undefined,
            number: this.AddNumber,
            tween: this.AddTween,
            event: this.AddEvent,
            timer: this.AddTime,
            background: this.AddBackground,
            image: this.AddImage,
            progress: this.AddProgress,
        };

        const lowerCaseType = uiItem.type.toLowerCase();
        return creators[lowerCaseType]?.(scene, uiItem);
    },
    AddRoundedButton(scene: CustomScene, uiitem: Record<string, any>): RoundedButton {
        let obj = scene.mai3.add.roundedButton(uiitem as RoundedButtonConfig)
        if (uiitem?.id) {
            obj.name = uiitem.id
        }
        return obj
    },
    AddImageButton(scene: CustomScene, uiitem: Record<string, any>): ImageButton {
        let obj = scene.mai3.add.imageButton(uiitem as ImageButtonConfig)
        obj.debugHitArea()
        if (uiitem?.id) {
            obj.name = uiitem.id
        }
        return obj
    },
    AddTime(scene: CustomScene, uiitem: Record<string, any>): Phaser.Time.Timeline {
        const timeline = scene.add.timeline({
            in: uiitem.in,
            run: () => {
                Object.values(uiitem.executes).forEach((executeitem: any) => {
                    let tempitem = JSON.parse(JSON.stringify(executeitem));
                    SceneTrim.createUIElement(scene, tempitem)
                })
            },
        });
        timeline.loop = uiitem.loop
        timeline.play();
        return timeline
    },

    AddEvent(scene: CustomScene, uiitem: Record<string, any>): number {
        let i = 0
        if (uiitem.conditions.length > 0) {
            const condition_arry: Function[] = [];
            Object.values(uiitem.conditions).forEach((conditionitem: any) => {
                if (conditionitem.condition === "greater") {
                    condition_arry.push(() => (scene[conditionitem.id] > Number(conditionitem.value)) ? true : false)
                }
                if (conditionitem.condition === "pointerdown") {
                    const event = scene.children.getByName(conditionitem.id)
                    event?.setInteractive().on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                        let executeslab = true
                        condition_arry.forEach((funItem: Function) => {
                            if (!funItem()) {
                                executeslab = false
                                return
                            }
                        })
                        if (executeslab) {
                            Object.values(uiitem.executes).forEach((executeitem: any) => {
                                let tempitem = JSON.parse(JSON.stringify(executeitem));
                                if (executeitem.position === "pointer") {
                                    tempitem.x = pointer.downX;
                                    tempitem.y = pointer.downY;
                                }
                                SceneTrim.createUIElement(scene, tempitem)
                            })
                        }
                    })
                }
            })
        }
        return i
    },
    AddText(scene: CustomScene, uiitem: Record<string, any>): Text {
        const uiitemjson = MaiGame.Utils.variableEscape(scene, uiitem);
        let obj = (uiitem?.id && uiitem?.mode !== "add")
            ? scene.children.getByName(uiitem.id) as Text | undefined
            : undefined;

        if (!obj) {
            obj = scene.mai3.add.text(uiitemjson as TextConfig);
            obj.name = uiitemjson.id || '';
        } else {
            obj.Text = uiitemjson.text;
        }

        return obj;
    },
    AddImage(scene: CustomScene, uiitem: Record<string, any>): Image {
        const img = scene.mai3.add.image(uiitem as ImageConfig)
        img.image?.setScale(uiitem.scale ?? 1)
        return img
    },
    AddProgress(scene: CustomScene, uiitem: Record<string, any>): ProgressBar {
        uiitem.bg = (uiitem.strokeImage ?? "") === "" ? uiitem.bg : uiitem.strokeImage
        uiitem.fill = (uiitem.fillTexture ?? "") === "" ? uiitem.fill : uiitem.fillTexture
        return scene.mai3.add.progressBar(uiitem as ProgressConfig);
    },
    AddNumber(scene: CustomScene, uiitem: Record<string, any>): number {
        const actions = {
            setvalue: () => MaiGame.Utils.setValue(scene, uiitem.id, uiitem.value),
            addvalue: () => MaiGame.Utils.updateValue(scene, uiitem.id, uiitem.value, "add", uiitem.threshold),
            subvalue: () => MaiGame.Utils.updateValue(scene, uiitem.id, uiitem.value, "sub", uiitem.threshold)
        };

        const val = actions[(uiitem.action ?? "setvalue") as keyof typeof actions]?.() || 0;

        if (uiitem.action === 'addvalue' || uiitem.action === 'subvalue') {
            const variableData = scene.data.get(uiitem.id);
            if (Array.isArray(variableData)) {
                variableData.forEach(item => SceneTrim.createUIElement(scene, item));
            }
        }
        return val;
    },
    AddTween(scene: CustomScene, uiitem: Record<string, any>): (Phaser.Tweens.Tween | undefined) {
        let targetobj: any
        if (uiitem.targetobj) {
            targetobj = SceneTrim.createUIElement(scene, uiitem.targetobj)
        } else {
            const targetElement = MaiGame.Utils.getConfigElement(uiitem.target, scene.sceneconf.ui)
            if (!targetElement) {
                return
            }
            targetElement.isshow = true;
            if (uiitem.position === "pointer") {
                targetElement.x = uiitem.x;
                targetElement.y = uiitem.y;
            }
            targetobj = SceneTrim.createUIElement(scene, targetElement)
        }

        const newTween = MaiGame.UI.NewtTweensAnimation(scene, targetobj)
        return newTween
    },
    AddBackground(scene: CustomScene, uiitem: Record<string, any>): boolean {
        const scenebg = uiitem.backgroundimage
        const imgobj = scene.add.image(0, 0, scenebg).setOrigin(0);
        imgobj.setDisplaySize(scene.game.scale.width, scene.game.scale.height)

        const scenecolor = uiitem.backgroundcolor
        scene.cameras.main.setBackgroundColor(scenecolor)

        const bgMusickey = (!uiitem.backgroundmusic) ? uiitem.backgroundmusic : scene.data.get("gamebgmusic")
        if (bgMusickey) {
            const bgMusic = MaiGame.UI.NewMusic(scene, { key: bgMusickey, loop: true })
            bgMusic.play()
        }
        return true
    },
    AddComputers(scene: CustomScene) {
        const sceneconf = scene.sceneconf
        if (sceneconf.computers?.length > 0) {
            sceneconf.computers.forEach((computer: any) => {
                scene.computers = scene.add.group({
                    classType: ComputerSprite,
                    runChildUpdate: true
                });
                for (let i = 0; i < computer.num; i++) {
                    scene.img = "fight-e96"
                    scene.computers?.getFirstDead(true);
                }

            });
        }
    },
    AddKeyboard(scene: CustomScene) {
        const sceneconf = scene.sceneconf
        if (sceneconf.keyboard != null) {
            const keyArry = new Array<string>();
            const keyboard = MaiGame.UI.NewKeyBoard(scene)
            sceneconf.keyboard.forEach((keyItem: any) => {
                keyArry.push(keyItem as string);
                keyboard.SetOncekeyMap((keyItem as string), false);
            });
            const cursors = keyboard.AddKeys(keyArry.join(","));
            scene.keyboard = keyboard;
            scene.cursors = cursors;
            scene.keyArry = keyArry;
        }
    },
    AddPlayer(scene: CustomScene) {
        const sceneconf = scene.sceneconf
        if (sceneconf.player != null) {
            const player = MaiGame.UI.NewPlayerSprite(scene, { x: 100, y: 100, texture: sceneconf.player.texture, hp: 100 });
            scene.player = player
            if (sceneconf.player.move === true) {
                const newkeyboard = MaiGame.UI.NewKeyBoard(scene)
                const cursors = newkeyboard.AddKeys("W,S,A,D,Up,Down,Left,Right");
                scene.player.cursors = cursors
            }

            if (sceneconf.player.joystick === true) {
                MaiGame.UI.NewJoyStick(scene, { x: 300, y: 600, radius: 50 })
            }

            Object.values(sceneconf.player.skillbut).forEach((butitem: any) => {
                MaiGame.UI.NewSkillBut(scene, butitem.x, butitem.y, butitem.widht, butitem.height, {
                    id: butitem.id,
                    name: sceneconf.skills[butitem.id].name,
                    texture: butitem.texture,
                    nums: 10,
                    key: "1",
                    value: 10,
                    bgColor: butitem.bgColor,
                    borderColor: butitem.borderColor,
                    handleDown: {
                        handleFn: () => {

                            const skill = MaiGame.UI.NewSkill(scene, {
                                key: butitem.id,
                                x: 100,
                                y: 100,
                                width: 100,
                                height: 100,
                                count: sceneconf.skills[butitem.id].count,
                                distance: sceneconf.skills[butitem.id].distance
                            }, scene.player, scene.player.direction!)

                            console.log("scene.computers", scene.computers)
                            let hasDecreasedHp = false

                            scene.physics.add.overlap(scene.computers, skill.skillsprite, (cs: any, sk: any) => {

                                const rect1 = cs.getBounds();
                                const rect2 = sk.getBounds();
                                const xOverlap = Math.max(0, Math.min(rect1.right, rect2.right) - Math.max(rect1.left, rect2.left));
                                const yOverlap = Math.max(0, Math.min(rect1.bottom, rect2.bottom) - Math.max(rect1.top, rect2.top));

                                if (xOverlap * yOverlap > cs.width * cs.height * 0.9 && hasDecreasedHp === false) {
                                    // console.log("xOverlap * yOverlap", xOverlap, yOverlap, xOverlap * yOverlap)
                                    cs.hp.Decrease(10)
                                    hasDecreasedHp = true
                                    cs.moveType = 2
                                }

                            })

                        }
                    }
                })
            })
        }
    },

    KeyboardUpdate(scene: CustomScene) {
        const keyboard = scene.keyboard;
        const sceneconf = scene.sceneconf;

        scene.keyArry?.forEach((item: string) => {
            if (Object(scene.cursors!)[item].isDown && !keyboard.GetOncekeyMap(item)) {
                keyboard.SetOncekeyMap(item, true)
                const keyinputconf = sceneconf.player.keyinput
                if (keyinputconf.hasOwnProperty(item)) {

                    MaiGame.UI.NewSkill(scene, {
                        key: keyinputconf[item],
                        x: 100,
                        y: 100,
                        width: 100,
                        height: 100,
                        count: sceneconf.skills[keyinputconf[item]].count,
                        distance: sceneconf.skills[keyinputconf[item]].distance
                    }, scene.player.playerSprites, scene.player.direction!)

                }

            } else if (Object(scene.cursors!)[item].isUp) {
                keyboard.SetOncekeyMap(item, false)
            }
        })
    }

}

export default SceneTrim
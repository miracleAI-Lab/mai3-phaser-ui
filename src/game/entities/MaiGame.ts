import { NewSkill } from "./Skill"
import { NewScene } from './Scene';
import { NewMusic } from "./Music"
import { NewKeyBoard } from "./KeyBoard"
import { NewJoyStick } from "./JoyStick"
import { NewMovement } from './Movement';
import { NewSkillBut } from './SkillContainer';
import { NewHealthBar } from "./HealthBar"
import { NewPlayerSprite } from "./Player"



import { NewSingleAnimation, NewMultileAnimation, NewtTweensAnimation } from "./Animation"

import Utils from "./Utils";

var MaiGame = {
    UI: {
        NewKeyBoard, NewJoyStick, NewSingleAnimation, NewMultileAnimation,
        NewMusic, NewSkill, NewSkillBut, NewScene, NewMovement, NewHealthBar,
        NewPlayerSprite, NewtTweensAnimation
    },
    Utils: Utils
};
export default MaiGame;
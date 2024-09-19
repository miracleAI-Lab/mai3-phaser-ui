import { CustomScene } from './Scene';

const Utils = {
    getRandomIntSecure(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        const range = max - min + 1;
        const buffer = new Uint32Array(1);
        crypto.getRandomValues(buffer);
        return (buffer[0] % range) + min;
    },
    replacer(scene: CustomScene, match: string): any {
        return scene[match.substring(2, match.length - 2)] ?? "--"
    },
    replaceCurlyBraces(regex: RegExp, str: string, replacer: (match: string, scene: CustomScene) => any): string {
        return str.replace(regex, replacer);
    },
    variableEscape(scene: CustomScene, uiitem: Record<string, any>) {
        const regex = /\{\{([\s\S]*?)\}\}/g;
        const escape = JSON.parse(this.replaceCurlyBraces(regex, JSON.stringify(uiitem, null, 2),
            this.replacer.bind(this, scene)))

        if (!this.deepEqual(escape, uiitem) && uiitem.text) {
            const variables = uiitem.text.match(regex);
            if (variables) {
                variables.forEach((variable: string) => {
                    const key = variable.substring(2, variable.length - 2);
                    let variableData = scene.data.get(key) || [];
                    if (!variableData.some((item: any) => item.id === uiitem.id)) {
                        variableData.push(uiitem);
                        scene.data.set(key, variableData);
                    }
                });
            }
        }
        return escape;
    },
    setValue(scene: CustomScene, name: string, value: number): number {
        return scene[name] = value;
    },
    updateValue(scene: CustomScene, name: string, value: number, operation: 'add' | 'sub', threshold?: number): number {
        if (!scene[name]) scene[name] = 0;

        const newValue = operation === 'add'
            ? Number(scene[name]) + Number(value)
            : Number(scene[name]) - Number(value);

        if (threshold === undefined) {
            scene[name] = newValue;
        } else {
            scene[name] = operation === 'add'
                ? Math.min(newValue, threshold)
                : Math.max(newValue, threshold);
        }

        return scene[name];
    },
    // addValue(scene: CustomScene, name: string, value: number, threshold?: number): number {
    //     const addval = Number(scene[name]) + Number(value)
    //     if (!scene[name]) scene[name] = 0;
    //     if (!threshold && threshold !== 0) scene[name] = addval;
    //     else if (scene[name] <= threshold)
    //         scene[name] = (addval >= threshold) ? threshold : addval;

    //     return scene[name];
    // },
    // subValue(scene: CustomScene, name: string, value: number, threshold?: number): number {
    //     const subval = Number(scene[name]) - Number(value)
    //     if (!scene[name]) scene[name] = 0;
    //     if (!threshold && threshold !== 0) scene[name] = subval;
    //     else if (!threshold && scene[name] >= threshold)
    //         scene[name] = subval <= threshold ? threshold : subval;

    //     return scene[name];
    // },
    getConfigElement(id: string, uiitem: Record<string, any>) {
        let content: any
        uiitem.some((element: any) => {
            if (element.id === id) {
                content = element
                return true;
            }
            return false;
        })
        return content
    },
    deepEqual(obj1: unknown, obj2: unknown): boolean {
        if (obj1 === obj2) return true;

        if (typeof obj1 !== 'object' || obj1 === null ||
            typeof obj2 !== 'object' || obj2 === null) return false;

        const keys1 = Object.keys(obj1 as object);
        const keys2 = Object.keys(obj2 as object);

        if (keys1.length !== keys2.length) return false;

        return keys1.every(key =>
            Object.prototype.hasOwnProperty.call(obj2, key) &&
            this.deepEqual((obj1 as any)[key], (obj2 as any)[key])
        );
    }


}
export default Utils
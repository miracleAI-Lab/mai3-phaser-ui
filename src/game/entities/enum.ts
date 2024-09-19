export enum DirectionEnum {
    Up,
    Down,
    Left,
    Right,
    Middle
}

export enum OrientEnum {
    Horizontal,
    Vertical
}

export const EnumFn = {
    getEnumKey<T extends Record<string, unknown>>(enumObj: T, value: unknown): string | undefined {
        for (const key in enumObj) {
            if (enumObj.hasOwnProperty(key) && enumObj[key] === value) {
                return key as string;
            }
        }
        return undefined;
    },
    getEnumValue<T extends Record<string, unknown>>(enumObj: T, key: string): unknown {
        const descriptor = Object.getOwnPropertyDescriptor(enumObj, key);
        if (descriptor && descriptor.enumerable) {
            return descriptor.value;
        }
        return undefined;
    }

} 
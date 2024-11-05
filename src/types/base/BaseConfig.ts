import { OrientationTypes } from "../common";

export interface BaseConfigProperties {
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  draggable?: boolean;
  radius?: number;
  borderWidth?: number;
  space?: number;
  orientation?: OrientationTypes;
  geomType?: string;
  depth?: number;
  originalId?: string;
  type?: string;
  columnSpan?: number;
  childConfigs?: BaseConfig[];
}

export interface BaseConfig extends BaseConfigProperties {
  [key: string]: any;
}

import { NinePatchConfig } from "./NinePatchConfig";
import { Padding } from "../common";

export interface PanelConfig extends NinePatchConfig {
  borderWidth?: number;
  borderColor?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  padding?: Padding;
}

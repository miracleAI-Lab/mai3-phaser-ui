import { PanelConfig } from "./PanelConfig";
import { TextStyle, Padding } from "../common";

export interface LabelConfig extends PanelConfig {
  text?: string;
  textAlign?: string; // left | right | center
  isWordWrap?: boolean;
  autoWidth?: boolean;
  autoHeight?: boolean;
  borderWidth?: number;
  radius?: number;
  borderColor?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  textStyle?: TextStyle;
  padding?: Padding;
}

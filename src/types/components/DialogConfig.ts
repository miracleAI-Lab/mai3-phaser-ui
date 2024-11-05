import { OrientationTypes, Alignment, Padding } from "../common";
import { Container } from "../../ui/Container";
import { PanelConfig } from "./PanelConfig";
import { ImageButtonConfig } from "./ImageButtonConfig";

export type DialogHeader = {
  height?: number;
  title?: string;
  background?: string;
  borderWidth?: number;
  borderColor?: number;
  orientation: OrientationTypes;
  radius?: number;
  alignment?: Alignment;
  children?: Container[];
  padding?: Padding;
};

export type DialogBody = {
  height?: number;
  background?: string | number;
  borderWidth?: number;
  borderColor?: number;
  orientation: OrientationTypes;
  radius?: number;
  alignment?: Alignment;
  children?: Container[];
  padding?: Padding;
};

export type DialogFooter = {
  height?: number;
  background?: string | number;
  borderWidth?: number;
  borderColor?: number;
  orientation: OrientationTypes;
  radius?: number;
  alignment?: Alignment;
  children?: Container[];
  padding?: Padding;
};

export interface DialogConfig extends PanelConfig {
  width?: number;
  height?: number;
  frame?: number;
  leftWidth?: number;
  rightWidth?: number;
  topHeight?: number;
  bottomHeight?: number;
  texture?: string;
  isShowCloseButton?: boolean;
  closeButtonConfig?: ImageButtonConfig;
}

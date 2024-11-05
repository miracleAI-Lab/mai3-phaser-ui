import { BaseConfig } from "../base/BaseConfig";
import { Alignment } from "../common";

export interface TabsConfig extends BaseConfig {
  borderWidth?: number;
  borderColor?: number;
  radius?: number;
  background?: number;
  items?: TabItem[];
  alignment?: Alignment;
  itemSpace?: number;
  padding?: number;
  texture?: string;
  fontColor: string;
  onTabClick?: (index: number) => void;
}

export interface TabItem {
  title?: string;
  texture?: string;
  activeImg: string;
}

import { BaseConfig } from "../base/BaseConfig";
import { Alignment } from "../common";
import { Container } from "../../ui/Container";

export interface FlexLayoutConfig extends BaseConfig {
  padding?: number;
  alignment?: Alignment;
  contents?: Container[];
}

export interface FlexLayoutConfig extends BaseConfig {
  background?: string | number;
  borderWidth?: number;
  radius?: number;
  borderColor?: number;
  padding?: number;
  space?: number;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch";
  justifyContent?: "flex-start" | "flex-end" | "center";
  flexDirection?: "row" | "column";
  children?: Container[];
}

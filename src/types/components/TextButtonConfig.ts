import { ButtonConfig } from "./ButtonConfig";

export interface TextButtonConfig extends ButtonConfig {
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
  iconPosition?: "left" | "right";
  iconPadding?: number;
}

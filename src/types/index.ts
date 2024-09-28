import { Checkbox } from "../ui/Checkbox";
import { CheckboxGroup } from "../ui/CheckboxGroup";
import { Container } from "../ui/Container";
import { ImageButton } from "../ui/ImageButton";
import { Label } from "../ui/Label";
import { ProgressBar } from "../ui/ProgressBar";
import { RoundedButton } from "../ui/RoundedButton";
import { Slider } from "../ui/Slider";
import { TextBox } from "../ui/TextBox";
import { TextButton } from "../ui/TextButton";
import { VolumeSlider } from "../ui/VolumeSlider";

export type OrientationTypes = 'horizontal' | 'vertical';
export type Mai3Component = TextButton | ImageButton | RoundedButton
  | Checkbox | CheckboxGroup | Label | ProgressBar | Slider | VolumeSlider
  | TextBox;
export type BackgroundType = Phaser.GameObjects.Sprite | Phaser.GameObjects.Rectangle | Phaser.GameObjects.Graphics | Phaser.GameObjects.RenderTexture;
export type TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
export type PhaserTextPadding = Phaser.Types.GameObjects.Text.TextPadding;
export type RoundedRectRadius = Phaser.Types.GameObjects.Graphics.RoundedRectRadius | number;

export interface Padding extends PhaserTextPadding {
  all?: number;
}
export type BorderWidths = Padding;
export type Margin = Padding;

export interface BorderRadius {
  all?: number;
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomRightRadius?: number;
  borderBottomLeftRadius?: number;
}

export const BorderStyle = {
  dotted: 'dotted', // 定义点线边框
  dashed: 'dashed', // 定义虚线边框
  solid: 'solid', // 定义实线边框
  double: 'double', // 定义双边框
  groove: 'groove', // 定义 3D 坡口边框。效果取决于 border-color 值
  ridge: 'ridge', // 定义 3D 脊线边框。效果取决于 border-color 值
  inset: 'inset', // 定义 3D inset 边框。效果取决于 border-color 值
  outset: 'outset', // 定义 3D outset 边框。效果取决于 border-color 值
  none: 'none', // 定义无边框
  hidden: 'hidden' // 定义隐藏边框
}

export const FontStyle = {
  normal: 'normal',
  italic: 'italic',
  oblique: 'oblique'
};

export const FontWeight = {
  normal: 'normal',
  bold: 'bold',
};

export interface Alignment {
  horizontal: 'left' | 'center' | 'right';
  vertical: 'top' | 'middle' | 'bottom';
}

export interface BaseConfig {
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  enableDrag?: boolean;
  enablePointer?: boolean;
  radius?: number;
  borderWidth?: number;
  space?: number;
  orientation?: OrientationTypes;
  geomType?: string;
  depth?: number;
  originalId?: string;
  type?: string;
  columnSpan?: number;
  handleHover?: ButtonHandle;
  handleOut?: ButtonHandle;
  handleDown?: ButtonHandle;
  handleUp?: ButtonHandle;
}

export interface FlexLayoutConfig extends BaseConfig {
  padding?: number;
  alignment?: Alignment;
  contents?: Container[];
}

export interface ProgressConfig extends BaseConfig {
  bgColor?: number;
  fillColor?: number;
  bgTexture?: string;
  fillTexture?: string;
  radius?: number;
  border?: number;
  borderWidth?: number;
  borderColor?: number;
  borderColorAlpha?: number;
  value?: number;
  process?: number;
}

export interface progressTextrureConfig {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  key?: string;
  frame?: string;
  leftWidth?: number;
  rightWidth?: number;
  topHeight?: number;
  bottomHeight?: number;
}

export interface ImageProgressConfig extends BaseConfig {
  barTexture?: progressTextrureConfig;
  fillTexture?: progressTextrureConfig;
  value?: number;
}

export interface SliderConfig extends ProgressConfig {
  min?: number;
  max?: number;
  step?: number;
  progressPercent?: number;
  showValue?: boolean;
  valueTextStyle?: TextStyle;
  valueTextOffset?: { x?: number; y?: number };
  slider?: Phaser.GameObjects.GameObject | string;
  handleRadius?: number;
  handleBorderWidth?: number,
  handleBorderColor?: number,
  handleBackgroundColor?: number,
  handleBackgroundAlpha?: number,
  handleGeomType?: string,
  handleTexture?: string,
}

export interface VolumeSliderConfig extends SliderConfig {
  text?: string;
  value?: number;
  textStyle?: TextStyle;
}

export interface CheckboxItem {
  label?: string;
  value?: number;
}

export interface ButtonHandle {
  audio?: string;
  texture?: string | Phaser.Textures.Texture;
  handleFn?: Function;
}

export interface ButtonConfig extends BaseConfig {
  borderWidth?: number;
  backgroundColor?: number;
  borderColor?: number;
  borderColorAlpha?: number;
  text?: string;
  textStyle?: TextStyle;
  radius?: number;
  handleHover?: ButtonHandle,
  handleOut?: ButtonHandle,
  handleDown?: ButtonHandle,
  handleUp?: ButtonHandle
}

export interface ContainerConfig extends BaseConfig {
  radius?: number;
  borderWidth?: number;
  borderColor?: number;
  backgroundColor?: number;
}

export interface BaseContainerConfig {
  width?: number;
  height?: number;
  rootRadius?: number;
  rootBorderWidth?: number;
  rootBorderColor?: number;
  rootBackgroundColor?: number;
}

export interface CheckboxConfig extends BaseConfig {
  x?: number;
  y?: number;
  markBgRadius: number;
  markBgBorderWidth?: number;
  markBgBorderColor?: number;
  markBgColor?: number;
  markBgAlpha?: number;
  markBgTexture?: string;

  markFillRadius: number;
  markFillBorderWidth?: number;
  markFillBorderColor?: number;
  markFillColor?: number;
  markFillAlpha?: number;
  markFillTexture?: string;
  isChecked?: boolean;
  text?: string;
  value?: string;
  textStyle?: TextStyle;
  labelSpace?: number;
  handleSelect?: Function
}

export interface CheckboxGroupItem {
  text?: string;
  value?: string;
}

export interface ListViewConfig extends BaseConfig {
  width: number;
  height: number;
  padding?: number;
  background?: string | number;
  itemHeight?: number;
}

export interface ListViewItemConfig extends BaseConfig {
  text: string;
  icon?: string;
  rightContent?: {
    type: 'text' | 'switch' | 'arrow';
    text?: string;
    checked?: boolean;
  };
}

export interface CheckboxGroupConfig extends BaseConfig {
  itemWidth?: number;
  itemHeight?: number;
  borderWidth?: number;
  space?: number;
  checkColor?: number;
  uncheckColor?: number;
  borderColorAlpha?: number;
  multiSelect?: boolean;
  defaultSelectedIndex?: number;
  textStyle?: TextStyle;
  items?: CheckboxGroupItem[];
  handleSelect?: Function
}

export interface ImageButtonConfig extends NinePatchConfig {
  handleHover?: ButtonHandle,
  handleOut?: ButtonHandle,
  handleDown?: ButtonHandle,
  handleUp?: ButtonHandle
}

export interface RoundedButtonConfig extends BaseConfig {
  radius?: number;
  texture?: string;
  frame?: string | number;
  borderWidth?: number;
  borderColor?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  handleHover?: ButtonHandle;
  handleOut?: ButtonHandle;
  handleDown?: ButtonHandle;
  handleUp?: ButtonHandle;
}

export interface NinePatchConfig extends BaseConfig {
  x?: number;
  y?: number;
  texture?: string | Phaser.Textures.Texture;
  frame?: string | number;
  width?: number;
  height?: number;
  leftWidth?: number;
  rightWidth?: number;
  topHeight?: number;
  bottomHeight?: number;
}

export interface PanelConfig extends NinePatchConfig {
  borderWidth?: number;
  borderColor?: number;
  backgroundColor?: number;
  backgroundAlpha?: number;
  padding?: Padding;
}

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

export interface ToastConfig extends LabelConfig {
  alignment?: Alignment;
  type?: 'success' | 'warn' | 'error' | 'info';
  animationType?: 'fade' | 'slide' | 'slideDown' | 'slideUp' | 'scale' | 'bounce';
  duration?: number;
  margin?: Margin;
}

export interface TextConfig extends BaseConfig {
  text?: string;
  textAlign?: string; // left | right | center
  isWordWrap?: boolean;
  autoWidth?: boolean;
  autoHeight?: boolean;
  textStyle?: TextStyle;
  isShow?: boolean;
}

export interface CssStyle {
  width?: number;
  height?: number;
  borderWidths?: BorderWidths;
  borderStyle?: string; // BoderStyle
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: BorderRadius;
  boxSizing?: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string;
  fontWeight?: string;
  paddings?: Padding;
  zIndex?: number;
}

export interface TextBoxConfig extends LabelConfig {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  isPassword?: boolean;
  placeholder?: string;
  value?: string;
  textRows?: number;
  maxLength?: number;
}

export type DialogHeader = {
  height?: number;
  title?: string;
  background?: string;
  borderWidth?: number;
  borderColor?: number;
  orientation: OrientationTypes;
  radius?: number;
  alignment?: Alignment;
  children?: Container[],
  padding?: number
}

export type DialogBody = {
  height?: number;
  background?: string | number;
  borderWidth?: number;
  borderColor?: number;
  orientation: OrientationTypes;
  radius?: number;
  alignment?: Alignment;
  children?: Container[],
  padding?: number
}

export type DialogFooter = {
  height?: number;
  background?: string | number;
  borderWidth?: number;
  borderColor?: number;
  orientation: OrientationTypes;
  radius?: number;
  alignment?: Alignment;
  children?: Container[],
  padding?: number
}

export interface DialogConfig extends BaseConfig {
  borderWidth?: number;
  borderColor?: number;
  radius?: number;
  background?: string | number;
  header?: DialogHeader;
  body?: DialogBody;
  footer?: DialogFooter;
  itemSpace?: number;
  padding?: number;
}

export interface LinearLayoutConfig extends BaseConfig {
  borderWidth?: number;
  borderColor?: number;
  radius?: number;
  background?: string | number;
  children?: Container[];
  alignment?: Alignment;
  itemSpace?: number;
  padding?: number;
}

export interface FlexLayoutConfig extends BaseConfig {
  background?: string | number;
  borderWidth?: number;
  radius?: number;
  borderColor?: number;
  padding?: number;
  space?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center';
  flexDirection?: 'row' | 'column';
  children?: Container[];
}

export interface DragHandlers {
  handleDragStart?: (child: Container, pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void;
  handleDrag?: (pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void;
  handleDragEnd?: (pointer: Phaser.Input.Pointer) => void;
}

export interface GridConfig extends PanelConfig {
  width?: number;
  height?: number;
  rows?: number;
  columns?: number;
  rowGap?: number;
  columnGap?: number;
  autoFill?: boolean;
  draggable?: boolean;
  background?: string | number;
  borderWidth?: number;
  radius?: number;
  borderColor?: number;
  showGrid?: boolean;
  alignment?: Alignment;
  children?: GridItem[];
  handleDragStart?: (dragChild: Container | undefined, pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void;
  handleDrag?: (dragChild: Container | undefined, pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => void;
  handleDragEnd?: (dragChild: Container | undefined, targetChild: Container | undefined, pointer: Phaser.Input.Pointer) => void;
}

export interface GridItem extends Container {
  columnSpan?: number;
}

export interface TabsConfig extends BaseConfig {
  borderWidth?: number;
  borderColor?: number;
  radius?: number;
  background?: number;
  items?: TabItem[];
  alignment?: Alignment;
  itemSpace?: number;
  padding?: number;
  onTabClick?: (index: number) => void;
}

export interface TabItem {
  title?: string;
  texture?: string;
}
export interface ImageConfig extends BaseConfig {
  id?: string;
  x?: number;
  y?: number;
  type?: string;
  width?: number;
  height?: number;
  radius?: number;
  key?: string;
  frame?: string;
  isCircle?: boolean;
  enableDrag?: boolean;
  borderWidth?: number;
  borderColor?: number;
  enablePointer?: boolean;
  backgroundColor?: number;
  backgroundAlpha?: number;
}

export type SpriteConfig = Phaser.Types.GameObjects.Sprite.SpriteConfig & BaseConfig;

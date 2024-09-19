import * as types from "./types";
import BaseScene from "./scene";
import { Checkbox } from "./ui/Checkbox";
import { CheckboxGroup } from "./ui/CheckboxGroup";
import { Container } from "./ui/Container";
import { Dialog } from "./ui/Dialog";
import { Grid } from "./ui/Grid";
import { GridLayout } from "./ui/GridLayout";
import { Image } from "./ui/Image";
import { ImageButton } from "./ui/ImageButton";
import { Label } from "./ui/Label";
import { Layout } from "./ui/Layout";
import { ProgressBar } from "./ui/ProgressBar";
import { RoundedButton } from "./ui/RoundedButton";
import { Slider } from "./ui/Slider";
import { Tabs } from "./ui/Tabs";
import { Text } from "./ui/Text";
import { TextBox } from "./ui/TextBox";
import { TextButton } from "./ui/TextButton";
import { Toast } from "./ui/Toast";
import { VolumeSlider } from "./ui/VolumeSlider";
import Utils from "./utils";
import { Mai3Plugin } from "./ui/Mai3Plugin";


var Mai3 = {
  Mai3Plugin: Mai3Plugin,
  BaseScene: BaseScene,
  Container: Container,
  Layout: Layout,
  Grid: Grid,
  GridLayout: GridLayout,
  Checkbox: Checkbox,
  CheckboxGroup: CheckboxGroup,
  Dialog: Dialog,
  Image: Image,
  ImageButton: ImageButton,
  RoundedButton: RoundedButton,
  TextButton: TextButton,
  Label: Label,
  ProgressBar: ProgressBar,
  VolumeSlider: VolumeSlider,
  Slider: Slider,
  Tabs: Tabs,
  Text: Text,
  TextBox: TextBox,
  Toast: Toast,
  Utils: Utils,
  Types: types,
};

export default Mai3;
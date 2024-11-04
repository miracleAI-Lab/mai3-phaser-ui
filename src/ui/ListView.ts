import { BaseScene } from "../game";
import { ListViewConfig } from "../types";
import { ScrollView } from "./ScrollView";

export class ListView extends ScrollView<ListViewConfig> {
  constructor(scene: BaseScene, config: ListViewConfig) {
    super(scene, config);
    this.Type = "ListView";
  }
}

import { Container } from "../ui/Container";
import { BaseScene } from "../game";
import { GridItemConfig } from "../types";
import Utils from "../utils";

export default class GridItem extends Container {
  config: GridItemConfig;

  constructor(scene: BaseScene, config: GridItemConfig) {
    super(scene, config);

    this.scene = scene;
    this.config = config;

    console.log("GridItem config", config);

    config.itemConfigs.forEach((itemConfig, index) => {
      const child = scene.createChildFromConfig(itemConfig);
      this.addChildAt(child, index);
    })

    
    const border = this.scene.add.graphics();
    border.lineStyle(1, 0xff00ff);
    border.strokeRect(0, 0, config.width!, config.height!);
    this.add(border);
    
    this.scene.add.existing(this);
  }
}

# mai3-phaser-ui

**mai3-phaser-ui** is a UI component library built for the Phaser 3 game engine. It provides a collection of reusable and customizable user interface components that can be easily integrated into Phaser-based games. The library is designed to simplify the creation of game UI elements like buttons, sliders, dialogs, and more, allowing developers to focus on gameplay rather than UI implementation.

## Features

- **Phaser 3 Compatibility**: Optimized for Phaser 3.8+.
- **Customizable Components**: Includes ready-to-use UI elements such as buttons, sliders, checkboxes, and dialogs.
- **TypeScript Support**: Fully typed for improved development experience and easier integration into modern TypeScript-based projects.
- **Event Handling**: Pre-built event listeners for user interactions like clicks and value changes.
- **Responsive Design**: UI components are adaptable to different screen sizes and game layouts.

## Installation

You can install **mai3-phaser-ui** via npm or yarn:

```bash
npm install mai3-phaser-ui
# or
yarn add mai3-phaser-ui
```

```typescript
import BaseScene from "mai3-phaser-ui/dist/scene";
import { Mai3Plugin } from '../../src/ui/Mai3Plugin';

export class ButtonDemo extends BaseScene {

  constructor() {
    super('ButtonDemo');
  }

  
  preload() {
    super.preload();
  }

  create() {
    this.createTextButton();
  }

  private createTextButton() {
    this.mai3.add.textButton({
      x: 10,
      y: 70,
      width: 200,
      height: 80,
      borderColor: 0x900C3F,
      borderWidth: 3,
      backgroundColor: 0xC70039,
      text: "关闭窗口",
      radius: 20,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#FFFFFF',
      },
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
      },
      handleUp: {
        handleFn: () => {
        }
      }
    });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 800,
  backgroundColor: '#111111',
  scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
  },
  plugins: {
    scene: [
      { key: 'Mai3Plugin', plugin: Mai3Plugin, mapping: 'mai3' },
    ],
  },
  scene: [ ButtonDemo ]
})

```

运行项目示例：

```bash
git clone https://github.com/miracleAI-Lab/mai3-phaser-ui
cd mai3-phaser-ui/examples
yarn 
yarn dev
```

## Usage

To learn how to use **mai3-phaser-ui** in your Phaser projects, visit the [examples repository](https://github.com/miracleAI-Lab/mai3-phaser-ui-examples). It contains detailed demo scenes that showcase how to implement and configure various UI components in different contexts.

## Example Demos

The following list includes links to specific example files in the **mai3-phaser-ui-examples** repository, demonstrating the usage of various UI components:

- [Button](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/ButtonDemo.ts)
- [Checkbox](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/CheckboxDemo.ts)
- [Dialog](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/DialogDemo.ts)
- [GridLayout](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/GridLayoutDemo.ts)
- [Image](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/ImageDemo.ts)
- [Label](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/LabelDemo.ts)
- [ProgressBar](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/ProgressBarDemo.ts)
- [Resize](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/ResizeDemo.ts)
- [Slider](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/SliderDemo.ts)
- [Tabs](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/TabsDemo.ts)
- [TextBox](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/TextBoxDemo.ts)
- [Toast](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/ToastDemo.ts)

Each of these examples demonstrates a specific component from **mai3-phaser-ui**, helping you integrate these UI elements into your own projects.

## Contributing

We welcome contributions! If you have any suggestions or improvements, feel free to open an issue or submit a pull request in the **mai3-phaser-ui** repository.

## License

**mai3-phaser-ui** is licensed under the MIT License. For more information, please refer to the [LICENSE](LICENSE) file.
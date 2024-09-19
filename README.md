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

## Basic Usage

Here's a demonstration of how to create various types of buttons using the **mai3-phaser-ui** library:

```typescript
import { BaseScene } from "mai3-phaser-ui";
import { Mai3Plugin } from 'mai3-phaser-ui';

export class ButtonDemo extends BaseScene {

  constructor() {
    super('ButtonDemo');
  }
  
  preload() {
    super.preload();
  }

  create() {
    this.createButtons();
  }

  private createButtons() {
    this.createTextButton();
    this.createDraggableButton();
    this.createRoundedButton();
    this.createImageButton();
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
      text: "Close Window",
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
          // Add action for handleUp if needed
        }
      }
    });
  }

  private createDraggableButton() {
    const btn = this.mai3.add.textButton({
      x: 220,
      y: 70,
      borderColor: 0xFF5733,
      borderWidth: 3,
      backgroundColor: 0xFFC300,
      text: "Mai3 (Draggable)",
      radius: 20,
      textStyle: {
        fontFamily: 'Arial',
        fontSize: '24px',
        color: '#000000',
      },
      handleHover: {
        audio: "sfx-hover",
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          btn.text = "Hello There";
        }
      },
      enableDrag: true
    });
  }

  private createRoundedButton() {
    this.mai3.add.roundedButton({
      x: 430,
      y: 70,
      radius: 100,
      texture: "cangshu",
      borderWidth: 6,
      borderColor: 0xFFD700,
      backgroundColor: 0x32CD32,
      handleHover: {
        audio: "sfx-hover"
      },
      handleDown: {
        audio: "sfx-press",
        handleFn: () => {
          // Add action for handleDown if needed
        }
      }
    });
  }

  private createImageButton() {
    this.mai3.add.imageButton({
      x: 10,
      y: 160,
      width: 160,
      height: 60,
      texture: "StartGameButton",
      borderWidth: 3,
      handleHover: {
        audio: "sfx-hover",
        texture: "StartGameButtonHover",
      },
      handleOut: {
        texture: "StartGameButton",
      },
      handleDown: {
        audio: "sfx-press",
        texture: "StartGameButtonDown",
        handleFn: () => {
          console.log("Button pressed");
        }
      },
      handleUp: {
        texture: "StartGameButton",
        handleFn: () => {
          console.log("Button released");
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
});
```

In this example, you'll see how to create different types of buttons including text buttons, draggable buttons, rounded buttons, and image buttons. Each button type demonstrates different properties and functionalities, allowing you to customize them according to your needs.


## Example Demos

The following steps will guide you through running the UI component examples:

```bash
# Clone the repository
git clone https://github.com/miracleAI-Lab/mai3-phaser-ui

# Navigate to the examples directory
cd mai3-phaser-ui/examples

# Install dependencies
yarn install

# Start the development server
yarn start
```

By following these steps, you'll be able to view and interact with various UI component examples.


## Example Demos Links:

The following list includes links to specific example files in the **mai3-phaser-ui** repository, demonstrating the usage of various UI components:

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
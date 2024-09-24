# mai3-phaser-ui - Phaser 3 UI Components Library

**mai3-phaser-ui** is a highly customizable and reusable UI component library designed specifically for the **Phaser 3** game engine. With this library, developers can quickly create and integrate essential UI elements like buttons, sliders, dialogs, and more into Phaser-based games, reducing the complexity of UI implementation and allowing more focus on gameplay.

## Key Features

- **Phaser 3 Compatibility**: Fully compatible with Phaser 3.8+.
- **Customizable Components**: Provides out-of-the-box UI components such as buttons, sliders, checkboxes, dialogs, and more.
- **TypeScript Support**: Includes TypeScript types for a better development experience.
- **Flexible Event Handling**: Easy-to-use event handlers for interactions like clicks, hovers, and value changes.
- **Responsive Design**: Adaptable UI elements that work across different screen sizes and game layouts.

## Installation

Install **mai3-phaser-ui** via npm or yarn:

```bash
npm install mai3-phaser-ui
# or
yarn add mai3-phaser-ui
```

## Usage Example

Here’s a quick example of how to create different types of buttons using the **mai3-phaser-ui** library:

```typescript
import { BaseScene, Mai3Game, Mai3Plugin } from "mai3-phaser-ui";

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

const config = getGameConfig();
const game = Mai3Game.Init(config);
game.scene.add('ButtonDemo', ButtonDemo, true);

//==== config.ts ====
export function getGameConfig() {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#00746b',
    scale: {
      width: 960,
      height: 1280,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    dom: {
      createContainer: true
    },
    parent: 'root',
    physics: {
      default: 'arcade',
      arcade: {
        debug: true,
        gravity: { x: 0, y: 0 }
      }
    },
  };

  return config;
}
```

This example demonstrates how to integrate different types of buttons, including text, draggable, rounded, and image buttons, all fully customizable through the **mai3-phaser-ui** library.

## Live Demos

You can explore various **mai3-phaser-ui** components by following these steps:

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

## Documentation & Examples

Explore individual examples directly in the **mai3-phaser-ui** repository:

- [Button Example](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/ButtonDemo.ts)
- [Checkbox Example](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/CheckboxDemo.ts)
- [Dialog Example](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/DialogDemo.ts)
- [ProgressBar Example](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/ProgressBarDemo.ts)
- [Slider Example](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/SliderDemo.ts)
- [TextBox Example](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/examples/src/scenes/TextBoxDemo.ts)

These examples demonstrate how to utilize each component in real-world Phaser 3 game development scenarios.

## Contribution

We welcome contributions! If you’d like to help improve **mai3-phaser-ui**, feel free to submit issues or pull requests on our [GitHub repository](https://github.com/miracleAI-Lab/mai3-phaser-ui).

## License

This project is licensed under the MIT License. For details, check the [LICENSE](https://github.com/miracleAI-Lab/mai3-phaser-ui/blob/main/LICENSE) file.
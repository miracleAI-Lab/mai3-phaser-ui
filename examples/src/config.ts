
export function getGameConfig() {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0xffffff,
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

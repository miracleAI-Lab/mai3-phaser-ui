const Memory = {
    DelEventsBeforeDestory: function (obj: Phaser.GameObjects.GameObject) {
        obj.on('destroy', () => {
            obj?.removeInteractive();
            obj?.removeAllListeners();
        }, obj);
    },
}

export default Memory;
import { BaseScene } from "../../../dist";
export class ToastDemo extends BaseScene {
    constructor() {
        super('ToastDemo');
    }

    preload() {
        super.preload();
    }

    async create() {
        this.createToasts();
        this.createReturnButton();
    }

    private createReturnButton() {
        this.mai3.add.textButton({
            x: 10,
            y: 30,
            width: 150,
            height: 50,
            text: "Return",
            backgroundColor: 0x4CAF50,
            borderColor: 0x45A049,
            borderWidth: 2,
            radius: 10,
            textStyle: {
                fontFamily: 'Arial',
                fontSize: '18px',
                color: '#FFFFFF',
            },
            handleUp: {
                handleFn: () => {
                    this.scene.start('DemoScene');
                }
            },
        });
    }

    private createToasts() {
        const toastTypes = ['success', 'info', 'warning', 'error'];
        const toastColors = [0x008B00, 0x0000FF, 0xFFA500, 0xFF0000];
        const toastTexts = ['Success', 'Information', 'Warning', 'Error'];

        toastTypes.forEach((type: any, index) => {
            const toast = this.mai3.add.toast({
                x: 400,
                y: 100 + index * 100,
                width: 200,
                height: 60,
                text: toastTexts[index],
                duration: 3000,
                type: type,
                textAlign: 'center',
                alignment: {horizontal: 'right', vertical: 'top'},
                animationType: 'slide',
                backgroundColor: toastColors[index],
                textStyle: {
                    fontFamily: 'Arial',
                    fontSize: '18px',
                    color: '#FFFFFF',
                },
                margin: { all: 10 },
            });

            this.mai3.add.textButton({
                x: 200,
                y: 100 + index * 100,
                width: 150,
                height: 50,
                text: `Show ${toastTexts[index]}`,
                backgroundColor: toastColors[index],
                textStyle: {
                    fontFamily: 'Arial',
                    fontSize: '16px',
                    color: '#FFFFFF',
                },
                handleUp: {
                    handleFn: () => {
                        toast.show()
                    }
                },
            });
        });
    }

    update() { }
}
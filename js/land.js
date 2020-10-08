const landDom = document.querySelector('.land'),
    landStyles = getComputedStyle(landDom, null),
    landWidth = parseInt(landStyles.width),
    landHeight = parseInt(landStyles.height),
    landTop = parseInt(landStyles.top);

class Land extends Rectangle {
    constructor(speed) {
        super(landWidth, landHeight, 0, landTop, speed, 0, landDom)
    }
    onMove() {
        if (this.left <= -landWidth / 2) {
            this.left = 0;
        }
    }
}
// const land = new Land();
// setInterval(() => {
//     land.move(16 / 1000)
// }, 16)
const skyDom = document.querySelector('.sky'),
      skyStyles = getComputedStyle(skyDom, null),
      skyWidth = parseInt(skyStyles.width),
      skyHeight = parseInt(skyStyles.height);

class Sky extends Rectangle {
    constructor() {
        super(skyWidth, skyHeight, 0, 0, -50, 0, skyDom);
    }
    onMove() {
        if (this.left < -skyWidth / 2) {
            this.left = 0
        }
    }
}
// const sky = new Sky();
// setInterval(() => {
//     sky.move(16 / 1000)
// }, 16);
const birdDom = document.querySelector('.bird'),
    birdStyles = getComputedStyle(birdDom, null),
    birdWidth = parseInt(birdStyles.width),
    birdHeight = parseInt(birdStyles.height),
    birdTop = parseInt(birdStyles.top),
    birdLeft = parseInt(birdStyles.left),
    gameDom = document.querySelector('.game'),
    gameStyles = getComputedStyle(gameDom, null),
    gameWidth = parseInt(gameStyles.width),
    gameHeight = parseInt(gameStyles.height);

class Bird extends Rectangle {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = 1200;
        this.swingStatus = 1;
        this.timer = null;
    }

    startSwing() {
        if (this.timer) {
            return;
        }
        this.timer = setInterval(() => {
            this.swingStatus++;
            if (this.swingStatus > 3) {
                this.swingStatus = 1;
            }
            this.dom.className = `bird swing${this.swingStatus}`;
        }, 180)
    }

    stopSwing() {
        clearInterval(this.timer);
        this.timer = null;
    }    

    jump() {
        this.ySpeed = -440;
    }

    // onMove() {
    //     if (this.top >= gameHeight - landHeight - birdHeight) {
    //         this.top = gameHeight - landHeight - birdHeight;
    //     }
    // }

    move(duration) {
        this.ySpeed = this.ySpeed + this.g * duration;
        this.top += this.ySpeed * duration;
        // if (this.onMove) {
        //     this.onMove();
        // }
        this.render();
    }
}

// const bird = new Bird();
// setInterval(() => {
//     bird.move(16 / 1000)
// }, 16);
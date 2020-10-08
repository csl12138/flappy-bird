class Game {
    constructor() {
        this.sky = new Sky();
        this.land = new Land(-100);
        this.bird = new Bird();
        this.pipeProducer = new PipePairProducer(-100);
        this.timer = null;
        this.gameOver = false;
    }

    regEvent() {
        document.onkeydown = (e) => {
            if (e.which == 13) {
                if (this.timer) {
                    this.pauseGame();
                } else {
                    this.startGame();
                }
            } else if (e.which == 32) {
                e.preventDefault();
                this.bird.jump();
            }
        }
    }

    startGame() {
        if (this.timer) {
            return
        }
        if (this.gameOver) {
            window.location.reload();
        }
        this.bird.startSwing();
        this.pipeProducer.startProduce();
        this.timer = setInterval(()=> {
            this.sky.move(16 / 1000);
            this.land.move(16 / 1000);
            this.bird.move(16 / 1000);
            this.pipeProducer.pairs.forEach((pairs) => {
                pairs.move(16 / 1000);
            })
        if (this.isGameOver()) {
            this.pauseGame();
            this.gameOver = true;
        }
        }, 16)
    }

    isHit(dom1, dom2) {
        const centerX1 = dom1.left + dom1.width / 2,
              centerX2 = dom2.left + dom2.width / 2,
              centerY1 = dom1.top + dom1.height / 2,
              centerY2 = dom2.top + dom2.height / 2,
              disX = Math.abs(centerX1 - centerX2),
              disY = Math.abs(centerY1 - centerY2);
        if (disX < (dom1.width + dom2.width) / 2 && disY < (dom1.height + dom2.height) / 2) {
            return true;
        }
    }

    isGameOver() {
        // 小鸟和大地有没有碰撞
        if (this.bird.top >= gameHeight - this.land.height - this.bird.height) {
            return true;
        }
        // 小鸟和柱子有没有碰撞
        const len = this.pipeProducer.pairs.length;
        for(let i = 0; i < len; i++) {
            const upPipe = this.pipeProducer.pairs[i].upPipe,
                  downPipe = this.pipeProducer.pairs[i].downPipe;
            if (this.isHit(this.bird, upPipe) || this.isHit(this.bird, downPipe)) {
                return true;
            }
        }
        return false;
    }

    pauseGame() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.stopSwing();
        this.pipeProducer.stopProduce();
    }
}
const game = new Game();
game.regEvent();
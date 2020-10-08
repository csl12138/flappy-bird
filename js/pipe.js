function randomHeight(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}

//单个的柱子类 如果该柱子移出了视野，删除对应的dom
class Pipe extends Rectangle {
    constructor(height, top, speed, dom) {
        super(52, height, gameWidth, top, speed, 0, dom);
        this.render();
    }

    onMove() {
        if (this.left < -this.width) {
            this.dom.remove();
        }
    }
}

//柱子对的类 
class PipePair {
    constructor(speed) {
        this.gap = 150;
        this.minHeight = 80;
        this.maxHeight = landTop - this.minHeight - this.gap;
        const upHeight = randomHeight(this.minHeight, this.maxHeight);
        const upDom = document.createElement('div');
        upDom.className = 'pipe up';
        gameDom.appendChild(upDom);
        this.upPipe = new Pipe(upHeight, 0, speed, upDom); //上水管

        const downHeight = landTop - this.gap - upHeight;
        const downTop = landTop - downHeight;
        const downDom = document.createElement('div');
        downDom.className = 'pipe down';
        gameDom.appendChild(downDom);
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom); //下水管
    }
    // 判断该柱子类是否可用
    get useLess() {
        return this.upPipe.left < - this.upPipe.width;
    }

    move(duration) {
        this.downPipe.move(duration);
        this.upPipe.move(duration);
    }
}

// 创建柱子对的类
class PipePairProducer {
    constructor(speed) {
        this.speed = speed;
        this.pairs = [];
        this.timer = null;
    }

    startProduce() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            this.pairs.push(new PipePair(this.speed))
            for (let i = 0; i < this.pairs.length; i++) {
                if(this.pairs[i].useLess) {
                    this.pairs.splice(i, 1);
                    i --;
                }
            }
        }, 1800)
    }

    stopProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}

// 创建柱子对的类 -> 柱子对的类 -> 柱子的类

// const producer = new PipePairProducer(-100)
// producer.startProduce();
// setInterval(() => {
//     producer.pairs.forEach((pair) => {
//         pair.move(16 / 1000);
//     })
// }, 16);
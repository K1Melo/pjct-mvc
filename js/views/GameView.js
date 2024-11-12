export class GameView {
    constructor() {
        this.gameContainer = document.getElementById('game-container');
        this.paddle = document.getElementById('paddle');
        this.ball = document.getElementById('ball');
        this.startBtn = document.getElementById('startBtn');
        this.leftBtn = document.getElementById('leftBtn');
        this.rightBtn = document.getElementById('rightBtn');
    }

    createBrick(brick) {
        const brickElement = document.createElement('div');
        brickElement.classList.add('brick');
        brickElement.style.left = `${brick.x}px`;
        brickElement.style.top = `${brick.y}px`;
        this.gameContainer.appendChild(brickElement);
        return brickElement;
    }

    updateBallPosition(x, y) {
        this.ball.style.left = `${x}px`;
        this.ball.style.top = `${y}px`;
    }

    updatePaddlePosition(x) {
        this.paddle.style.left = `${x}px`;
    }

    removeBrick(brickElement) {
        brickElement.remove();
    }
}
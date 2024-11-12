import { BrickModel } from '../models/BrickModel.js';

export class GameController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.brickElements = [];
        this.setupEventListeners();
    }
    setupEventListeners() {
        this.view.startBtn.addEventListener('click', () => this.startGame());
        this.view.leftBtn.addEventListener('click', () => this.moveLeft());
        this.view.rightBtn.addEventListener('click', () => this.moveRight());
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowLeft') this.moveLeft();
            if (event.key === 'ArrowRight') this.moveRight();
        });
    }

    startGame() {
        if (!this.model.isGameStarted) {
            this.model.isGameStarted = true;
            this.createBricks();
            this.model.ballInterval = setInterval(() => this.moveBall(), 10);
        }
    }

    createBricks() {
        const brickRows = 3;
        const brickCols = 8;
        const brickWidth = 50;
        const brickHeight = 20;
        const brickPadding = 10;
        const totalBricksWidth = brickCols * brickWidth + (brickCols - 1) * brickPadding;
        const brickOffsetTop = 30;
        const brickOffsetLeft = (this.view.gameContainer.offsetWidth - totalBricksWidth) / 2;

        for (let row = 0; row < brickRows; row++) {
            for (let col = 0; col < brickCols; col++) {
                const x = brickOffsetLeft + col * (brickWidth + brickPadding);
                const y = brickOffsetTop + row * (brickHeight + brickPadding);
                const brick = new BrickModel(x, y, brickWidth, brickHeight);
                this.model.bricks.push(brick);
                this.brickElements.push(this.view.createBrick(brick));
            }
        }
    }

    moveLeft() {
        const leftPos = this.view.paddle.offsetLeft - this.model.paddleSpeed;
        const paddleBounds = this.view.gameContainer.offsetWidth - this.view.paddle.offsetWidth;
        this.view.updatePaddlePosition(Math.max(0, leftPos));
    }

    moveRight() {
        const leftPos = this.view.paddle.offsetLeft + this.model.paddleSpeed;
        const paddleBounds = this.view.gameContainer.offsetWidth - this.view.paddle.offsetWidth;
        this.view.updatePaddlePosition(Math.min(paddleBounds, leftPos));
    }

    moveBall() {
        let ballX = this.view.ball.offsetLeft + this.model.ballDirectionX;
        let ballY = this.view.ball.offsetTop + this.model.ballDirectionY;

        if (ballX <= 0 || ballX >= this.view.gameContainer.offsetWidth - this.view.ball.offsetWidth) {
            this.model.ballDirectionX = -this.model.ballDirectionX;
        }
        if (ballY <= 0) {
            this.model.ballDirectionY = -this.model.ballDirectionY;
        }

        if (
            ballY >= this.view.paddle.offsetTop - this.view.ball.offsetHeight &&
            ballX + this.view.ball.offsetWidth >= this.view.paddle.offsetLeft &&
            ballX <= this.view.paddle.offsetLeft + this.view.paddle.offsetWidth
        ) {
            this.model.ballDirectionY = -this.model.ballDirectionY;
        }

        this.model.bricks.forEach((brick, index) => {
            if (brick.isActive) {
                const brickRect = this.brickElements[index].getBoundingClientRect();
                const ballRect = this.view.ball.getBoundingClientRect();

                if (
                    ballRect.right >= brickRect.left &&
                    ballRect.left <= brickRect.right &&
                    ballRect.bottom >= brickRect.top &&
                    ballRect.top <= brickRect.bottom
                ) {
                    this.model.ballDirectionY = -this.model.ballDirectionY;
                    brick.isActive = false;
                    this.view.removeBrick(this.brickElements[index]);
                }
            }
        });

        if (ballY >= this.view.gameContainer.offsetHeight - this.view.ball.offsetHeight) {
            clearInterval(this.model.ballInterval);
            this.model.reset();
            alert('Game Over!');
            window.location.reload();
        }

        this.view.updateBallPosition(ballX, ballY);

        if (this.model.bricks.every(brick => !brick.isActive)) {
            clearInterval(this.model.ballInterval);
            alert('You Win!');
            this.model.reset();
            window.location.reload();
        }
    }
}
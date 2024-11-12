export class GameModel {
    constructor() {
        this.isGameStarted = false;
        this.ballDirectionX = 2;
        this.ballDirectionY = -2;
        this.paddleSpeed = 40;
        this.bricks = [];
        this.ballInterval = null;
    }

    reset() {
        this.isGameStarted = false;
        this.ballDirectionX = 2;
        this.ballDirectionY = -2;
        this.bricks = [];
        this.ballInterval = null;
    }
}
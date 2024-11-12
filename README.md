# MVC Breakbreaker Game Docs - Kauã Melo 

## Overview

Breakbreaker is a classic arcade-style game implemented using vanilla JavaScript with an MVC (Model-View-Controller) architecture. The player controls a paddle to bounce a ball and break bricks, aiming to clear all bricks from the screen without letting the ball fall below the paddle.

## Project Structure

```
breakbreaker/
  ├── index.html            # Main HTML file
  ├── styles.css           # Game styles
  └── js/                  # JavaScript source files
      ├── main.js          # Application entry point
      ├── models/          # Data and game state
      │   ├── GameModel.js
      │   └── BrickModel.js
      ├── views/           # UI and rendering
      │   └── GameView.js
      └── controllers/     # Game logic and control
          └── GameController.js
```

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Set up a local development server. You can use one of the following methods:
   - VS Code Live Server extension
   - Python: `python -m http.server`
   - Node.js: `npx serve`

3. Open the game in your browser:
```
http://localhost:[port]
```

## Architecture

The game follows the MVC (Model-View-Controller) pattern:

### Model
- Handles data and game state
- Contains game logic and rules
- Manages brick states and ball physics

### View
- Renders game elements
- Updates the UI
- Manages DOM elements

### Controller
- Processes user input
- Coordinates between Model and View
- Manages game flow

## Components

### GameModel
```javascript
class GameModel {
    properties:
        - isGameStarted: boolean
        - ballDirectionX: number
        - ballDirectionY: number
        - paddleSpeed: number
        - bricks: array
        - ballInterval: number
    
    methods:
        - reset(): void
}
```

### BrickModel
```javascript
class BrickModel {
    properties:
        - x: number
        - y: number
        - width: number
        - height: number
        - isActive: boolean
}
```

### GameView
```javascript
class GameView {
    methods:
        - createBrick(brick: BrickModel): HTMLElement
        - updateBallPosition(x: number, y: number): void
        - updatePaddlePosition(x: number): void
        - removeBrick(brickElement: HTMLElement): void
}
```

### GameController
```javascript
class GameController {
    methods:
        - startGame(): void
        - createBricks(): void
        - moveLeft(): void
        - moveRight(): void
        - moveBall(): void
}
```

## Game Logic

### Ball Movement
- The ball moves in a straight line until it collides with objects
- On collision, the ball's direction is reversed based on the collision angle
- Ball speed remains constant throughout the game

### Collision Detection
```javascript
// Brick collision example
if (
    ballRect.right >= brickRect.left &&
    ballRect.left <= brickRect.right &&
    ballRect.bottom >= brickRect.top &&
    ballRect.top <= brickRect.bottom
) {
    // Handle collision
}
```

### Scoring System
- Each brick broken adds to the player's score
- Game tracks active bricks for win condition
- Win achieved when all bricks are destroyed

## Controls

### Keyboard Controls
- Left Arrow: Move paddle left
- Right Arrow: Move paddle right

### Button Controls
- Left Button: Move paddle left
- Start Button: Start game
- Right Button: Move paddle right

## Development Guide

### Adding New Features

1. **New Brick Types**
```javascript
class SpecialBrick extends BrickModel {
    constructor(x, y, width, height, power) {
        super(x, y, width, height);
        this.power = power;
    }
}
```

2. **Custom Events**
```javascript
// In GameController
this.view.gameContainer.addEventListener('customEvent', (e) => {
    // Handle custom event
});
```

### Modifying Game Behavior

1. **Change Ball Speed**
```javascript
// In GameModel
this.ballDirectionX = 3; // Increase horizontal speed
this.ballDirectionY = -3; // Increase vertical speed
```

2. **Modify Paddle Size**
```css
/* In styles.css */
#paddle {
    width: 100px; /* Adjust paddle width */
}
```

## Troubleshooting

### Common Issues

1. **Modules Not Loading**
   - Ensure you're using a local server
   - Check file paths in import statements
   - Verify browser support for ES6 modules

2. **Game Performance**
   - Reduce animation complexity
   - Optimize collision detection
   - Use requestAnimationFrame for smoother animation

3. **Collision Detection Issues**
   - Verify bounding box calculations
   - Check for timing issues in game loop
   - Ensure proper element positioning

### Debug Tips

1. Use browser developer tools to:
   - Monitor game state
   - Check for console errors
   - Inspect element positions

2. Add logging for troubleshooting:
```javascript
console.log('Ball position:', { x: ballX, y: ballY });
console.log('Collision detected:', collisionData);
```

## Future Enhancements

Potential improvements for the game:

1. Power-ups
   - Multiple balls
   - Paddle size modifications
   - Speed adjustments

2. Levels System
   - Progressive difficulty
   - Different brick patterns
   - Increasing ball speed

3. Sound Effects
   - Collision sounds
   - Background music
   - Win/lose effects

4. Score System
   - High scores
   - Local storage
   - Multiplier bonuses

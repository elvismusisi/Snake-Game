document.addEventListener('DOMContentLoaded', () => {
    const snake = document.getElementById('snake');
    const food = document.getElementById('food');

    let snakeX = 0;
    let snakeY = 0;
    let snakeXSpeed = 1;
    let snakeYSpeed = 0;
    let foodX = 0;
    let foodY = 0;

    function moveSnake() {
        snakeX += snakeXSpeed;
        snakeY += snakeYSpeed;

        // Check collision with walls
        if (snakeX < 0 || snakeY < 0 || snakeX >= 15 || snakeY >= 15) {
            resetGame();
        }

        // Check collision with food
        if (snakeX === foodX && snakeY === foodY) {
            // Increase the size of the snake
            snake.appendChild(document.createElement('div'));
            // Move food to a new random position
            placeFood();
        }

        // Move the snake by updating its position
        const snakeParts = snake.children;
        for (let i = snakeParts.length - 1; i > 0; i--) {
            const prevPart = snakeParts[i - 1];
            const currentPart = snakeParts[i];
            currentPart.style.left = prevPart.style.left;
            currentPart.style.top = prevPart.style.top;
        }
        snake.children[0].style.left = snakeX * 20 + 'px';
        snake.children[0].style.top = snakeY * 20 + 'px';

        // Check collision with itself
        for (let i = 1; i < snakeParts.length; i++) {
            if (snakeX === parseInt(snakeParts[i].style.left) / 20 &&
                snakeY === parseInt(snakeParts[i].style.top) / 20) {
                resetGame();
            }
        }

        requestAnimationFrame(moveSnake);
    }

    function placeFood() {
        foodX = Math.floor(Math.random() * 15);
        foodY = Math.floor(Math.random() * 15);
        food.style.left = foodX * 20 + 'px';
        food.style.top = foodY * 20 + 'px';
    }

    function resetGame() {
        // Remove all snake parts
        while (snake.firstChild) {
            snake.removeChild(snake.firstChild);
        }
        // Reset snake position and speed
        snakeX = 0;
        snakeY = 0;
        snakeXSpeed = 1;
        snakeYSpeed = 0;
        // Place the initial snake part
        snake.appendChild(document.createElement('div'));
        // Place initial food
        placeFood();
    }

    // Initialize the game
    resetGame();
    moveSnake();

    // Handle keyboard input
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                snakeXSpeed = 0;
                snakeYSpeed = -1;
                break;
            case 'ArrowDown':
                snakeXSpeed = 0;
                snakeYSpeed = 1;
                break;
            case 'ArrowLeft':
                snakeXSpeed = -1;
                snakeYSpeed = 0;
                break;
            case 'ArrowRight':
                snakeXSpeed = 1;
                snakeYSpeed = 0;
                break;
        }
    });
});

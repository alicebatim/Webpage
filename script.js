const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const box = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: getRandomPosition(), y: getRandomPosition() };
let dx = box, dy = 0;

function getRandomPosition() {
    return Math.floor(Math.random() * (canvas.width / box)) * box;
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "lime";
    snake.forEach((part, index) => {
        ctx.fillRect(part.x, part.y, box, box);
        if (index > 0 && part.x === snake[0].x && part.y === snake[0].y) resetGame();
    });

    moveSnake();
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
        resetGame();
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = { x: getRandomPosition(), y: getRandomPosition() };
    } else {
        snake.pop();
    }
}

function changeDirection(direction) {
    if (direction === "up" && dy === 0) { dx = 0; dy = -box; }
    if (direction === "down" && dy === 0) { dx = 0; dy = box; }
    if (direction === "left" && dx === 0) { dx = -box; dy = 0; }
    if (direction === "right" && dx === 0) { dx = box; dy = 0; }
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    dx = box;
    dy = 0;
    food = { x: getRandomPosition(), y: getRandomPosition() };
}

setInterval(draw, 100);

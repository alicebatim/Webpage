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
    snake.forEach(part => ctx.fillRect(part.x, part.y, box, box));

    moveSnake();
}

function moveSnake() {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Wall Wrapping Logic
    if (head.x < 0) head.x = canvas.width - box;  // Left to Right
    if (head.x >= canvas.width) head.x = 0;       // Right to Left
    if (head.y < 0) head.y = canvas.height - box; // Top to Bottom
    if (head.y >= canvas.height) head.y = 0;      // Bottom to Top

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

// Attach both click and touch events
["up", "down", "left", "right"].forEach(dir => {
    const button = document.getElementById(dir);
    button.addEventListener("click", () => changeDirection(dir));
    button.addEventListener("touchstart", (e) => {
        e.preventDefault(); // Prevent ghost taps
        changeDirection(dir);
    });
});

setInterval(draw, 100);

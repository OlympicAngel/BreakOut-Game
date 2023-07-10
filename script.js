/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
CanvasItem.ctx = ctx;

const h = canvas.height,
    w = canvas.width;
const settings = {
    gridSize: w / 20,
    running: false,
    life: 0,
    maxScore: 0,
    score: 0
}
CanvasBrick.width = settings.gridSize;
CanvasBrick.height = settings.gridSize / 2;

const grid = {},
    ball = new CanvasBall(0, 0, settings.gridSize / 3, "#fff"),
    paddle = new CanvasPaddle(w / 2 - w / 8 / 2, h * (1 - 0.01), w / 8, h * 0.01, "#fff");

window.addEventListener("keydown", (e) => {
    if (e.key == "ArrowRight")
        paddle.direction = 1

    if (e.key == "ArrowLeft")
        paddle.direction = -1
})

window.addEventListener("keyup", (e) => {
    if (e.key == "ArrowRight" && paddle.direction == 1)
        paddle.direction = 0

    if (e.key == "ArrowLeft" && paddle.direction == -1)
        paddle.direction = 0
})

function startGame() {
    if (settings.running)
        return;
    settings.running = true;
    settings.life = 2;
    settings.maxScore = CreateBrickGrid();
    settings.score = 0;
    ball.reset(w / 2, h / 2);
    gameLoop();
}

function gameLoop() {
    updateGame();
    drawGame();

    if (settings.running)
        requestAnimationFrame(gameLoop);
}

function gameOver() {
    settings.running = false;

}

function CreateBrickGrid() {
    const lines = 9;
    let count = 0;
    const colors = ["mediumorchid", "deeppink", "red", "tomato", "orange", "gold", "yellow", "lime", "turquoise"]
    for (let line = 0; line < lines; line++) {
        if (!grid[line])
            grid[line] = {};

        for (let x = 0; x < w / settings.gridSize; x++) {
            const brick = new CanvasBrick(x * CanvasBrick.width,
                line * CanvasBrick.height,
                colors[~~((line + x ** 0.55 + (1 + Math.cos(x))) % colors.length)]
            )
            grid[line][x] = brick;
            count++;
        }
    }
    return count;
}

//update
function updateGame() {
    const ballLost = ball.update();
    //test if life lost & handle it
    if (ballLost) {
        settings.life--;
        if (settings.life <= 0)
            return gameOver();
        ball.reset(w / 2, h / 2);
    }
    const hit = ball.testCollision(grid)
    if (hit) {
        settings.score++;
        if (settings.score >= settings.maxScore)
            settings.running = false;
    }
    paddle.update(ball);
}

//draw staff
function drawGame() {
    ctx.clearRect(0, 0, w, h);
    drawBricks()
    ball.draw();
    paddle.draw();
}

function drawBricks() {
    for (let key in grid) {
        const line = grid[key]
        for (let lineKey in line) {
            const brick = line[lineKey]
            brick.draw()
        }
    }
}
class CanvasBall extends CanvasItem {
    /**
     * Brick item
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} r 
     * @param {String} color 
     */
    constructor(x = 0, y = 0, r = 20, color = "#ff0000") {
        super(x, y);
        this.r = r;
        this.color = color;
        this.velocity = [1, -1];
        this.speed = 3;
    }

    reset(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;
        ball.velocity = [1 - Math.random() * 2, -1]
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r / 2, 0, 360)
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.velocity[0] * this.speed;
        this.y += this.velocity[1] * this.speed;

        if (this.x + this.r > ctx.canvas.width || this.x - this.r / 2 <= 0)
            this.velocity[0] *= -1;
        if (this.y - this.r / 2 <= 0)
            this.velocity[1] *= -1;

        if (this.y >= ctx.canvas.height)
            return true;

        return false;
    }

    testCollision(grid) {
        //find a brick that is an a brick region from grid
        function findInGrid(dot) {
            const lineRegion = ~~(dot.y / CanvasBrick.height),
                xRegion = ~~(dot.x / CanvasBrick.width)
            if (grid[lineRegion]?.[xRegion])
                return [lineRegion, xRegion]
        }

        //calc all contact dots possible (using square)
        const contactDots = [
            { y: ball.y + ball.r / 2, x: ball.x, location: "bottom" }, //bottom
            { y: ball.y - ball.r / 2, x: ball.x, location: "top" }, //top
            { y: ball.y, x: ball.x + ball.r / 2, location: "right" }, //right
            { y: ball.y, x: ball.x - ball.r / 2, location: "left" } //left
        ]

        //attempt find a dot the touches a brick
        const touchingDot = contactDots.find(findInGrid);
        if (!touchingDot)
            return;

        //get the brick
        const brickPos = findInGrid(touchingDot);
        /**@type {CanvasBrick} */
        const brick = grid[brickPos[0]][brickPos[1]];

        switch (touchingDot.location) {
            case "bottom":
            case "top":
                //if on top/bottom hit & but x is on the border => hit on the side of the ball
                if (ball.x >= brick.x + CanvasBrick.width + ball.speed * ball.velocity[0] ||
                    ball.x <= brick.x + ball.speed * ball.velocity[0])
                    ball.velocity[0] *= -1;
                else
                    ball.velocity[1] *= -1;
                break;
            case "left":
            case "right":

                //if on left/right hit & but y is on the border => hit on the side of the ball
                if (ball.y >= brick.y + CanvasBrick.height + ball.speed * ball.velocity[1] ||
                    ball.y <= brick.y + ball.speed * ball.velocity[1])
                    ball.velocity[1] *= -1;
                else
                    ball.velocity[0] *= -1;
        }

        ball.velocity[0] += 0.1 - 0.2 * Math.random()

        delete grid[brickPos[0]][brickPos[1]];//remove brick
        return true;
    }
}
class CanvasPaddle extends CanvasItem {

    /**
     * Brick item
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} width
     * @param {String} color 
     */
    constructor(x = 0, y = 0, width = 100, height = 10, color = "#ff0000") {
        super(x, y);
        this.color = color;
        this.width = width;
        this.height = height;
        this.direction = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }
    /**
     * 
     * @param {CanvasBall} ball 
     */
    update(ball) {
        this.x += this.direction * this.width * 0.05;
        if (this.x <= 0)
            this.x = 0;
        if (this.x + this.width >= ctx.canvas.width)
            this.x = ctx.canvas.width - this.width;

        if (ball.y + ball.r / 2 >= this.y &&
            ball.x + ball.r / 2 >= this.x && ball.x - ball.r / 2 <= this.x + this.width) {

            ball.velocity[1] = -1;
            if (this.direction) {
                ball.velocity[0] += Math.min(1.5, Math.max(0.5, (Math.random() * 0.5 * Math.sign(this.direction * -1) / 2)))
            }
        }
    }
}   
class CanvasItem {
    /** @type {CanvasRenderingContext2D} */
    static ctx;
    /**
     * basic dot
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#ff0000"
        ctx.rect(this.x, this.y, 1, 1);
        ctx.fill()
        ctx.closePath();
    }
}
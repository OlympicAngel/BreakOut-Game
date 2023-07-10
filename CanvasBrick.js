class CanvasBrick extends CanvasItem {
    static width;
    static height;

    /**
     * Brick item
     * @param {Number} x 
     * @param {Number} y 
     * @param {String} color 
     */
    constructor(x = 0, y = 0, color = "#ff0000") {
        super(x, y);
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.rect(this.x, this.y, CanvasBrick.width, CanvasBrick.height);
        ctx.fill();


        ctx.lineWidth = CanvasBrick.width / 8;

        ctx.fillStyle = "black";
        const halfStroke = ctx.lineWidth / 2;
        ctx.globalAlpha = 0.25;
        ctx.strokeRect(this.x + halfStroke, this.y + halfStroke, CanvasBrick.width - halfStroke * 2, CanvasBrick.height - halfStroke * 2);
        ctx.globalAlpha = 1;
        ctx.lineWidth = 1;
        ctx.strokeRect(this.x, this.y, CanvasBrick.width, CanvasBrick.height);
        ctx.closePath();
    }
}   
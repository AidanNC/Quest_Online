
class CanvasDrawer{
    height: number;
    width: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    constructor(height: number, width: number, canvas: HTMLCanvasElement){
        this.height = height;
        this.width = width;
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = canvas.getContext("2d");
    }
    drawDot(x: number, y: number){
        if(this.ctx){
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(x, y, 5, 5);
        }
    }
}


export default CanvasDrawer;

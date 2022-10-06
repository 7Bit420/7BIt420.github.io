const canvas = document.getElementById('main-canvas')
const ctx = (
    canvas instanceof HTMLCanvasElement ?
        canvas :
        document.createElement('canvas')
).getContext('2d');









class pong {

    int = 0

    ballDir = 0
    paddleA = 0
    paddleB = 450

    paddleADir = 1
    paddleBDir = 1

    width = 0
    height = 0

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    constructor(ctx, width, height) {
        this.width = width;
        this.height = height;

        this.int = setInterval(this.#loop.bind(this, ctx), 10)
    }

    /**
     * @param {CanvasRenderingContext2D} ctx 
     */
    #loop(ctx) {
        ctx.clearRect(0, 0, this.width, this.height)
        ctx.fillRect(10, this.paddleA, 10, 100)
        ctx.fillRect(this.width - 20, this.paddleB, 10, 100)

        if (this.paddleADir) {
            if (this.paddleA > 800) {
                this.paddleADir--
            } else {
                this.paddleA++
            }
        } else {
            if (this.paddleA < 0) {
                this.paddleADir++
            } else {
                this.paddleA--
            }
        }

        if (this.paddleBDir) {
            if (this.paddleB > 800) {
                this.paddleBDir--
            } else {
                this.paddleB++
            }
        } else {
            if (this.paddleB < 0) {
                this.paddleBDir++
            } else {
                this.paddleB--
            }
        }
    }

    end() {
        clearInterval(this.int)
    }
}

new pong(ctx, canvas.width, canvas.height)
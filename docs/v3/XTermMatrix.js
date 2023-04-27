// import { Terminal } from "xterm";

function gen_unicode(start, end) {
    var chars = [];
    for (var i = start; i <= end; ++i) {
        chars.push(String.fromCharCode(i));
    }
    return chars;
}

/**
 * @member {{start:number,length:number}[]} cols
 */
class Matrix {

    cols
    width
    height
    loop

    MAX_LEN
    BANNER_POZ
    CHARS
    BANNER
    NO_GO_ZONE

    /**
     * @param {(char:string,x:number,y:number)=>void} write 
     * @param {()=>void} clear 
     * @param {number} width 
     * @param {number} height 
     * @param {string} Banner 
     */
    constructor(write, clear, width, height) {
        this.write = write
        this.clear = clear
        this.loop = false

        this.cols = []
        this.width = width
        this.height = height

        this.MAX_LEN = 15
        this.BANNER_POZ = [5, 3]
        this.CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        this.reset()
    }

    render(t) {
        if (t % 2 == 0) for (let i = 0; i < this.width; i++) {
            if (this.cols[i].start <= this.height) { this.cols[i].start++ } else { this.cols[i].length-- };
            if (this.cols[i].start < 0) { continue };
            if (this.cols[i].start <= this.height) {
                if (this.cols[i].start < this.height) { this.write('\x1b[97m' + this.randomChar() + '\x1b[92m', i, this.cols[i].start); }
                if (this.cols[i].start != 0) this.write('\x1b[92m' + this.randomChar(), i, this.cols[i].start - 1);
            }
            if ((this.cols[i].start - this.cols[i].length + 1) > 0) this.write(' ', i, this.cols[i].start - this.cols[i].length);
            if (this.cols[i].length < 0) {
                this.cols[i] = {
                    start: 0,
                    length: Math.floor(Math.random() * this.MAX_LEN) + 3
                };
            }
        }
        if (this.loop) {
            requestAnimationFrame(this.render.bind(this))
        }
    }

    resize(width, height) {
        this.cols = []
        this.width = width
        this.height = height
        this.reset()
    }

    randomChar() {
        return this.CHARS[Math.floor(Math.random() * this.CHARS.length)]
    }

    reset() {
        this.clear()
        for (let i = 0; i < this.width; i++) {
            this.cols[i] = {
                start: Math.floor(Math.random() * this.height) - this.height - 10,
                length: Math.floor(Math.random() * this.MAX_LEN) + 3
            }

        }
    }

    start() {
        if (this.loop) return;
        this.loop = true;
        requestAnimationFrame(this.render.bind(this))
    }

    stop() {
        if (!this.loop) return;
        this.loop = false
    }
}

function createXTermMatrix(width, height) {
    const XTerminal = new Terminal({
        cols: width,
        rows: height,
        disableStdin: true,
        altClickMovesCursor: false,
        cursorBlink: false,
        cursorStyle: "underline"
    })

    function write(char, x, y) {
        XTerminal.write(
            // '\u001B[' + (x < 0 ? ((-x).toString() + 'D') : ((x).toString() + 'C'))
            // + '\u001B[' + (y < 0 ? ((-y).toString() + 'A') : ((x).toString() + 'B'))
            '\u001B[' + (y + 1) + ';' + (x + 1) + 'H'
            + char
        )
    }

    const matrix = new Matrix(
        write,
        XTerminal.clear.bind(XTerminal),
        XTerminal.cols,
        XTerminal.rows,
    )

    return {
        Xterm: XTerminal, Matrix: matrix, resize() {
            XTerminal.resize(cols, rows)
            matrix.resize(cols, rows)
        }
    }
}

export { Matrix, createXTermMatrix, gen_unicode }
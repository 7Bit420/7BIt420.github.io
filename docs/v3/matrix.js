#!/usr/local/bin/node
const fs = require('fs')

function write(char, x, y) {
    process.stdout.cursorTo(x, y)
    process.stdout.write(char)
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
    constructor(write, clear, width, height, Banner) {
        this.write = write
        this.clear = clear
        this.loop = -1

        this.cols = []
        this.width = width
        this.height = height

        this.MAX_LEN = 15
        this.BANNER_POZ = [5, 3]
        this.CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        this.BANNER = Banner
        this.NO_GO_ZONE = [
            this.BANNER_POZ,
            [3 + this.BANNER.split('\n')[1].length + this.BANNER_POZ[0], 2 + this.BANNER.split('\n').length + this.BANNER_POZ[1]]
        ]
        this.reset()
        this.writeBanner(...this.BANNER_POZ)
    }

    render() {
        for (let i = 0; i < this.width; i++) {
            if (this.cols[i].start < this.height) { this.cols[i].start++ } else { this.cols[i].length-- };
            if (this.cols[i].start < 0) { continue };
            if (!(
                this.NO_GO_ZONE[0][0] <= i && this.NO_GO_ZONE[1][0] >= i &&
                this.NO_GO_ZONE[0][1] <= this.cols[i].start && this.NO_GO_ZONE[1][1] >= this.cols[i].start
            )) {
                if (this.cols[i].start < this.height) {
                    this.write('\x1b[97m' + this.randomChar() + '\x1b[92m', i, this.cols[i].start);
                    if (this.cols[i].start != 0) write('\x1b[92m' + this.randomChar(), i, this.cols[i].start - 1);
                }
            }
            if (!(
                this.NO_GO_ZONE[0][0] <= i && this.NO_GO_ZONE[1][0] >= i &&
                (this.NO_GO_ZONE[0][1]) < (this.cols[i].start - this.cols[i].length) &&
                (this.NO_GO_ZONE[1][1]) > (this.cols[i].start - this.cols[i].length)
            )) {
                if ((this.cols[i].start - this.cols[i].length + 1) > 0) this.write(' ', i, this.cols[i].start - this.cols[i].length);
            }
            if (this.cols[i].length < 0) {
                this.cols[i] = {
                    start: 0,
                    length: Math.floor(Math.random() * this.MAX_LEN) + 3
                };
            }
        }
    }

    resize(width, height) {
        this.cols = []
        this.width = width
        this.height = height
        this.reset()
        this.writeBanner(...this.BANNER_POZ)
    }

    randomChar() {
        return this.CHARS[Math.floor(Math.random() * this.CHARS.length)]
    }

    writeBanner(x, y) {
        this.BANNER.split('\n').forEach((v, i) => {
            write(v, x + 2, y + i + 1)
        })
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
        if (this.loop > 0) return;
        this.loop = setInterval(this.render.bind(this), 100)
    }

    stop() {
        if (this.loop > 0) return;
        clearInterval(this.loop)
        this.loop = -1
    }
}

if (globalThis.process) {
    var matrix = new Matrix(
        write,
        console.clear,
        ...process.stdout.getWindowSize(),
        fs.readFileSync('7bit.dev (BANNER).txt', { encoding: 'utf-8' })
    )

    process.stdout.addListener('resize', () => {
        matrix.resize(...process.stdout.getWindowSize())
    })

    matrix.start()
}

// export { Matrix }

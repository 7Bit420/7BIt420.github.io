#!/usr/local/bin/node
function write(char, x, y) {
    process.stdout.cursorTo(x, y)
    process.stdout.write(char)
}

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
        this.reset()
    }

    render() {
        for (let i = 0; i < this.width; i++) {
            if (this.cols[i].start <= this.height) { this.cols[i].start++ } else { this.cols[i].length-- };
            if (this.cols[i].start < 0) { continue };
            if (this.cols[i].start <= this.height) {
                if (this.cols[i].start < this.height) {this.write('\x1b[97m' + this.randomChar() + '\x1b[92m', i, this.cols[i].start);}
                if (this.cols[i].start != 0) write('\x1b[92m' + this.randomChar(), i, this.cols[i].start - 1);
            }
            if ((this.cols[i].start - this.cols[i].length + 1) > 0) this.write(' ', i, this.cols[i].start - this.cols[i].length);
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
        if (this.loop > 0) return;
        this.loop = setInterval(this.render.bind(this), 50)
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
    )

    process.stdout.addListener('resize', () => {
        matrix.resize(...process.stdout.getWindowSize())
    })

    // matrix.CHARS = gen_unicode(0x30A1, 0x30F6) // + gen_unicode(0x3041, 0x3096)
    matrix.start()
}

// export { Matrix }

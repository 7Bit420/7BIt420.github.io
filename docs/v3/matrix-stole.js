function gen_unicode(start, end) {
    var chars = [];
    for (var i = start; i <= end; ++i) {
        chars.push(String.fromCharCode(i));
    }
    return chars;
}

// ---------------------------------------------------------------
function rnd(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ---------------------------------------------------------------
function width() {
    return window.innerWidth;
}

// ---------------------------------------------------------------
function height() {
    return window.innerHeight;
}

var katagana = gen_unicode(0x30A1, 0x30F6);
var hiragana = gen_unicode(0x3041, 0x3096);

// ---------------------------------------------------------------
class Matrix {
    constructor(canvas, {
        chars = null,
        font_size = 14,
        width,
        height,
        font = 'monospace',
        color,
        background
    } = {}) {
        this._columns = width
        this._font_size = font_size;
        this._drops = [];
        this._color = color;
        this._background = background;
        this._font = font;
        this._chars = chars ? chars : katagana.concat(hiragana);
        this.resize(width, height);
    }
    random_char() {
        return rnd(this._chars);
    }
    render_char(char, x, y) {
        // console.log('write')
        process.stdout.cursorTo(x, y)
        process.stdout.write(char)
    }
    start() {
        let frames = 0;
        this._run = true;
        const self = this;
        (async function loop() {
            if (frames++ % 2 === 0) {
                self.render(); // slower render
            }
            if (self._run) {
                await new Promise(t => setTimeout(t, 10))
                loop();
            }
        })();
    }
    stop() {
        this._run = false;
    }
    reset() {
        for (let x = 0; x < this._columns; x++) {
            this._drops[x] = 255;
        }
    }
    resize(width, height) {
        this._width = width;
        this._height = height;
    }
    clear() {
        console.clear()
    }
    render() {
        this.clear();
        // console.log(this._drops)
        for (let col = 0; col < this._drops.length; col++) {
            const char = this.random_char();
            const x = col * this._font_size;
            const y = this._drops[col] * this._font_size;
            this.render_char(char, x, y);
            if (y > this._height && Math.random() > .975) {
                this._drops[col] = 0;
            }
            this._drops[col]++;
        }
    }
}

var matrix = new Matrix(undefined, {
    width: 10,
    height: 10
})

matrix.reset()
matrix.start()
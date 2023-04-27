import { createXTermMatrix } from '../../../XTermMatrix.js'

var matrix = createXTermMatrix(159,48)

matrix.Xterm.open(document.getElementById('matrix'))
matrix.Matrix.start()

globalThis.matrix = matrix

/*import { Matrix } from "./matrix.js";

const Banner =
    `AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC`;
`╔════════════════════════════════════════════════════════════════════════════════╗
║ ▄▄▄▄▄▄▄▄  ▄▄           ██                               ▄▄                     ║
║ ▀▀▀▀▀███  ██           ▀▀       ██                      ██                     ║
║     ▄██   ██▄███▄    ████     ███████              ▄███▄██   ▄████▄   ██▄  ▄██ ║
║     ██    ██▀  ▀██     ██       ██                ██▀  ▀██  ██▄▄▄▄██   ██  ██  ║
║    ██     ██    ██     ██       ██                ██    ██  ██▀▀▀▀▀▀   ▀█▄▄█▀  ║
║   ██      ███▄▄██▀  ▄▄▄██▄▄▄    ██▄▄▄      ██     ▀██▄▄███  ▀██▄▄▄▄█    ████   ║
║  ▀▀       ▀▀ ▀▀▀    ▀▀▀▀▀▀▀▀     ▀▀▀▀      ▀▀       ▀▀▀ ▀▀    ▀▀▀▀▀      ▀▀    ║
╚════════════════════════════════════════════════════════════════════════════════╝`;

var canvas = document.createElement('canvas')
var ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

canvas.addEventListener('click', () => {
    canvas.webkitRequestFullscreen()
})

canvas.style.margin = '0'

ctx.fillStyle = 'black'

var charHeight = 20
ctx.font = `${charHeight}px monospaced`
var charWidth = ctx.measureText('A').width

ctx.fillRect(0, 0, canvas.width, canvas.height)

/**
 * @param {string} char 
 * @param {number} x 
 * @param {number} y 
 * @param {string} colour 
 /
async function write(char, x, y, colour) {
    if (char.length > 1) {
        for (var i = 0; i > char.length; i++) {
            await write(char[i], x + i, y, colour)
        }
        return
    }
    ctx.fillRect(x * charWidth, y * charHeight, charWidth, charHeight)
    await Promise.resolve()
    ctx.font = `10px "Space Mono"`
    ctx.fillStyle = colour || 'green'
    ctx.fillText(char, x * charWidth, y * (charHeight + 0))
    ctx.fillStyle = 'black'
}

function clear() {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

var matrix = new Matrix(
    write,
    clear,
    Math.floor(canvas.width / charWidth),
    Math.floor(canvas.height / charHeight),
    Banner
)

globalThis.matrix = matrix

document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(canvas)
    matrix.start()
})

*/
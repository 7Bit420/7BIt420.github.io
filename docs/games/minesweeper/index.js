import tooManyMinesError from "./errors/tooManyMines.js";

class MinesweeperManger extends EventTarget {

    #mines = 0
    #width = 0
    #height = 0
    #map = [[0]]
    #revealedMap = [[false]]
    #elms = {
        div: document.createElement('div'), //
        menubar: document.createElement('div'), //
        modButtons: document.createElement('div'),
        sound: document.createElement('button'),
        share: document.createElement('button'),
        title: document.createElement('h1'),
        score: document.createElement('h1'),
        flagCount: document.createElement('h1'),
        timer: document.createElement('h1'),
        levelMenu: document.createElement('select'),
        grid: document.createElement('table'),
        elmGrid: [{ row: [document.createElement('td')], elm: document.createElement('tr') }]
    }
    constructor() {
        super();

        this.#map = []
        this.#mines = 0
        this.#width = 0
        this.#height = 0

        this.#elms.div.appendChild(this.#elms.grid)
        this.#elms.div.appendChild(this.#elms.menubar)
        this.#elms.menubar.appendChild(this.#elms.sound)
        this.#elms.menubar.appendChild(this.#elms.share)
        this.#elms.menubar.appendChild(this.#elms.title)
        this.#elms.menubar.appendChild(this.#elms.score)
        this.#elms.menubar.appendChild(this.#elms.flagCount)
        this.#elms.menubar.appendChild(this.#elms.timer)
        this.#elms.menubar.appendChild(this.#elms.levelMenu)
    }

    /**
     * @param {number} mines 
     * @param {number} width 
     * @param {number} height 
     * @param {HTMLElement} replaceElm
     */
    init(mines, width, height, startx, starty, replaceElm) {
        this.#map = new Array(width).fill(undefined).map(() => new Array(height))
        this.#revealedMap = new Array(width).fill(undefined).map(() => new Array(height))

        this.#mines = mines
        this.#width = width
        this.#height = height

        for (let i = 0; i <= mines;) {
            var x = Math.floor(Math.random() * width), y = Math.floor(Math.random() * height)
            if (
                this.#map[x][y] != 0 &&
                this.#validateMinePoz(x, y) &&
                startx != x &&
                starty != y
            ) {
                this.#map[x][y] = -1;
                this.#map[x][y] = true
                i++
            }
        }

        console.log(this.#map)

        this.#elms.elmGrid = []
        for (let x = 0; x < width; x++) {
            this.#elms.elmGrid[x] = { elm: document.createElement('tr'), row: [] }
            this.#elms.grid.appendChild(this.#elms.elmGrid[x].elm)
            for (let y = 0; y < height; y++) {
                var elm = document.createElement('td')
                this.#map[x][y] ??= this.#getSurroundingMines(x, y).length
                this.#map[x][y] ??= false
                elm.setAttribute('x', x)
                elm.setAttribute('y', y)
                this.#elms.elmGrid[x].row.push(elm)
                this.#elms.elmGrid[x].elm.appendChild(elm)
            }
        }

        replaceElm.replaceWith(this.#elms.div)
    }

    /**
     * 
     * @param {number} type
     * @param {number} x 
     * @param {number} y 
     */
    input(type, x, y) {
        switch (type) {
            case 0:
                if (this.#map[x][y] == -1) {
                    // alert('U Dead')
                } else if (this.#map[x][y] == 0) {
                    this.#zeroPropogate(x, y)
                } {
                    this.#elms.elmGrid[x].row[y].innerText = this.#map[x][y]
                    this.#elms.elmGrid[x].row[y].style.background = this.#mapColour(this.#map[x][y])
                }
                break;
            case 1:
                this.#elms.elmGrid[x].row[y].style.background = (
                    this.#elms.elmGrid[x].row[y].style.background == "red" ? "" : "red")
                break;
        }
    }

    #getSurroundingMines(x, y) {
        return [
            this.#map[x - 1]?.[y - 1], this.#map[x - 1]?.[y], this.#map[x - 1]?.[y + 1],
            this.#map[x]?.[y - 1], this.#map[x]?.[y + 1],
            this.#map[x + 1]?.[y - 1], this.#map[x + 1]?.[y], this.#map[x + 1]?.[y + 1],
        ].filter(t => t == -1)
    }

    #validateMinePoz(x, y) {
        return [
            this.#map[x - 1]?.[y - 1], this.#map[x - 1]?.[y], this.#map[x - 1]?.[y + 1],
            this.#map[x]?.[y - 1], this.#map[x]?.[y + 1],
            this.#map[x + 1]?.[y - 1], this.#map[x + 1]?.[y], this.#map[x + 1]?.[y + 1],
        ].filter(t => t == -1 || t == undefined).length > 7
    }

    /**
     * @param {number} mines 
     */
    #mapColour(mines) {
        switch (mines) {
            case -1:
                return "red"
            case 0:
                return "green"
            case 1:
                return "lightblue"
            case 2:
                return "blue"
            case 3:
                return "lightgreen"
            case 4:
                return "lime"
            case 5:
                return "yellow"
            case 6:
                return "orange"
            case 7:
                return "black"
            default:
                return "green"
        }
    }

    #zeroPropogate(x, y) {
        console.log(x, y)
        if (this.#revealedMap[x][y]) return;
        this.#revealedMap[x][y] = true
        if (
            this.#map[x - 1]?.[y - 1] != -1 &&
            this.#map[x - 1]?.[y - 1] != undefined &&
            !this.#revealedMap[x - 1][y - 1]
        ) {
            this.#elms.elmGrid[x - 1].row[y - 1].innerText = this.#map[x - 1][y - 1]
            this.#elms.elmGrid[x - 1].row[y - 1].style.background = this.#mapColour(this.#map[x][y])
            if (this.#map[x - 1][y - 1] == 0) this.#zeroPropogate(x - 1, y - 1)
        }
        if (
            this.#map[x - 1]?.[y + 1] != -1 &&
            this.#map[x - 1]?.[y + 1] != undefined &&
            !this.#revealedMap[x - 1][y + 1]
        ) {
            this.#elms.elmGrid[x - 1].row[y + 1].innerText = this.#map[x - 1][y + 1]
            this.#elms.elmGrid[x - 1].row[y + 1].style.background = this.#mapColour(this.#map[x][y])
            if (this.#map[x - 1][y + 1] == 0) this.#zeroPropogate(x - 1, y + 1)
        }
        if (
            this.#map[x + 1]?.[y - 1] != -1 &&
            this.#map[x + 1]?.[y - 1] != undefined &&
            !this.#revealedMap[x + 1][y - 1]) {
            this.#elms.elmGrid[x + 1].row[y - 1].innerText = this.#map[x + 1][y - 1]
            this.#elms.elmGrid[x + 1].row[y - 1].style.background = this.#mapColour(this.#map[x][y])
            if (this.#map[x + 1][y - 1] == 0) this.#zeroPropogate(x + 1, y - 1)
        }
        if (
            this.#map[x + 1]?.[y + 1] != -1 &&
            this.#map[x + 1]?.[y + 1] != undefined &&
            !this.#revealedMap[x][y]) {
            this.#elms.elmGrid[x + 1].row[y + 1].innerText = this.#map[x + 1][y + 1]
            this.#elms.elmGrid[x + 1].row[y + 1].style.background = this.#mapColour(this.#map[x][y])
            if (this.#map[x + 1][y + 1] == 0) this.#zeroPropogate(x + 1, y + 1)
        }
        if (
            this.#map[x]?.[y - 1] != -1 &&
            this.#map[x]?.[y - 1] != undefined &&
            !this.#revealedMap[x][y]) {
            this.#elms.elmGrid[x].row[y - 1].innerText = this.#map[x][y -1]
            this.#elms.elmGrid[x].row[y - 1].style.background = this.#mapColour(this.#map[x][y])
            if (this.#map[x][y - 1] == 0) this.#zeroPropogate(x, y - 1)
        }
        if (
            this.#map[x]?.[y + 1] != -1 &&
            this.#map[x]?.[y + 1] != undefined &&
            !this.#revealedMap[x][y + 1]) {
            this.#elms.elmGrid[x].row[y + 1].innerText = this.#map[x][y + 1]
            this.#elms.elmGrid[x].row[y + 1].style.background = this.#mapColour(this.#map[x][y])
            if (this.#map[x][y + 1] == 0) this.#zeroPropogate(x, y + 1)
        }

        if (
            this.#map[x - 1]?.row[y] != -1 &&
            this.#map[x - 1]?.row[y] != undefined &&
            !this.#revealedMap[x - 1][y]) {
            this.#elms.elmGrid[x - 1].row[y].innerText = this.#map[x - 1][y]
            this.#elms.elmGrid[x - 1].row[y].style.background = this.#mapColour(this.#map[x - 1][y])
            if (this.#map[x - 1][y] == 0) this.#zeroPropogate(x - 1, y)
        }

        if (
            this.#map[x + 1].row[y] != -1 &&
            this.#map[x + 1]?.[y] != undefined &&
            !this.#revealedMap[x][y]) {
            this.#elms.elmGrid[x + 1].row[y].innerText = this.#map[x + 1][y]
            this.#elms.elmGrid[x + 1].row[y].style.background = this.#mapColour(this.#map[x][y])
            if (this.#map[x + 1][y] == 0) this.#zeroPropogate(x + 1, y)
        }
    }
}


const manager = new MinesweeperManger()

document.addEventListener('DOMContentLoaded', () => {
    manager.init(100, 30, 30, 10, 10, document.getElementById('game'))
    document.addEventListener('contextmenu', (ev) => ev.preventDefault())
    document.addEventListener('click', (ev) => {
        console.log(ev)
        if (ev.target instanceof HTMLTableCellElement) {
            manager.input(
                ev.button,
                ev.target.getAttribute('x'),
                ev.target.getAttribute('y')
            )
        }
    })
})

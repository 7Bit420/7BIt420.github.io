import tooManyMinesError from "./errors/tooManyMines";

class MinesweeperManger extends EventTarget {

    #mines = 0
    #width = 0
    #height = 0
    #map = [[0]]
    #elms = {
        div: document.createElement('div'),
        modButtons: document.createElement('div'),
        sound: document.createElement('button'),
        share: document.createElement('button'),
        title: document.createElement('h1'),
        score: document.createElement('h1'),
        flagCount: document.createElement('h1'),
        timer: document.createElement('h1'),
        levelMenu: document.createElement('select'),
    }
    constructor() {
        super()

        this.#map = []
        this.#mines = 0
        this.#width = 0
        this.#height = 0
    }

    /**
     * @param {number} mines 
     * @param {number} width 
     * @param {number} height 
     */
    init(mines, width, height) {
        this.#map = new Array(width).fill(t => new Array(height).fill(0))

        for (let i = 0; i < mines;) {
            var [x, y] = [
                Math.floor(Math.random() * width),
                Math.floor(Math.random() * height),
            ]
            if (this.#map[x][y] >= 0) { this.#map[x][y] = -1; i++ }
        }

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                var surroundingMines = this.#getSurroundingMines(x, y)
                if (this.#map[x][y] == -1) {

                } else {

                }
            }
        }
    }

    imput(type, x, y) {

    }

    #getSurroundingMines(x, y) {
        return [
            this.#map[x][y], this.#map[x][y], this.#map[x][y],
            this.#map[x][y], this.#map[x][y], this.#map[x][y],
            this.#map[x][y], this.#map[x][y], this.#map[x][y],
        ].filter(t => t != -1)
    }
}

class MinesweeperElm extends HTMLElement {
    init(grid) {

    }
}

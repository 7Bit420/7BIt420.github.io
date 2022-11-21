import tooManyMinesError from "./errors/tooManyMines";


class MinesweeperManger {

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
    constructor(mines, width, height) {

    }

}

class MinesweeperElm extends HTMLElement { }

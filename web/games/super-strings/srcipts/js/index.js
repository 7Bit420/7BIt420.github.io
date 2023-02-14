(async () => {

    function blockView() {
        var rect = document.createElement('div')
        rect.style.width = "100vw"
        rect.style.height = "100vh"
        var prevStyle = document.body.style.overflow
        document.body.style.overflow = "none"
        rect.style.top = "0px"
        rect.style.left = "0px"
        rect.style.position = "fixed"
        rect.style.zIndex = 9e6
        rect.style.background = "rgb(200,200,200,0.5)"
        document.body.appendChild(rect)
        return () => { rect.remove(); document.body.style.overflow = prevStyle }
    }

    /**
     * @member {HTMLTableElement} gridElm
     */
    class game {

        #width = 10
        #height = 10

        #grid = []
        #attemptedPaths = []
        #elmGrid = []
        gridElm

        #colours = [
            "#0048BA",
            "#B0BF1A",
            "#7CB9E8",
            "#B284BE",
            "#72A0C1",
            "#F0F8FF",
            "#DB2D43",
            "#C46210",
            "#EFDECD",
            "#9F2B68",
            "#F19CBB",
            "#AB274F",
            "#3B7A57",
            "#FFBF00",
            "#9966CC",
            "#3DDC84",
            "#CD9575",
            "#665D1E",
            "#915C83",
            "#841B2D",
            "#FAEBD7",
            "#FBCEB1",
            "#00FFFF",
            "#7FFFD4",
            "#D0FF14",
            "#4B6F44",
            "#E9D66B",
            "#B2BEB5",
            "#FF9966",
            "#FDEE00",
            "#007FFF",
            "#F0FFFF",
            "#89CFF0",
            "#A1CAF1",
            "#F4C2C2",
            "#FEFEFA",
            "#FF91AF",
            "#FAE7B5",
            "#7C0A02",
            "#848482",
            "#BCD4E6",
            "#9F8170",
            "#F5F5DC",
            "#2E5894",
            "#9C2542",
            "#FFE4C4",
            "#3D2B1F",
            "#967117",
            "#CAE00D",
            "#000000",
            "#3D0C02",
            "#54626F",
            "#3B3C36",
            "#BFAFB2",
            "#FFEBCD",
            "#A57164",
            "#318CE7",
            "#ACE5EE",
            "#660000",
            "#0000FF",
            "#1F75FE",
            "#0093AF",
            "#0087BD",
            "#0018A8",
            "#333399",
            "#A2A2D0",
            "#6699CC",
            "#5DADEC",
            "#126180",
            "#8A2BE2",
            "#5072A7",
            "#3C69E7",
            "#DE5D83",
            "#79443B",
            "#E3DAC9",
            "#CB4154",
            "#D891EF",
            "#C32148",
            "#1974D2",
            "#FFAA1D",
            "#CD7F32",
            "#AF6E4D",
            "#7BB661",
            "#FFC680",
            "#800020",
            "#DEB887",
            "#A17A74",
            "#CC5500",
            "#E97451",
            "#8A3324",
            "#BD33A4",
            "#702963",
            "#5F9EA0",
            "#91A3B0",
            "#006B3C",
            "#ED872D",
            "#A67B5B",
            "#4B3621",
            "#A3C1AD",
            "#C19A6B",
            "#EFBBCC",
            "#FFFF99",
            "#FFEF00",
            "#E4717A",
            "#00BFFF",
            "#C41E3A",
            "#00CC99",
            "#960018",
            "#D70040",
            "#FFA6C9",
            "#B31B1B",
            "#56A0D3",
            "#ED9121",
            "#703642",
            "#C95A49",
            "#ACE1AF",
            "#B2FFFF",
            "#DE3163",
            "#007BA7",
            "#2A52BE",
            "#6D9BC3",
            "#1DACD6",
            "#F7E7CE",
            "#F1DDCF",
            "#36454F",
            "#E68FAC",
            "#80FF00",
            "#FFB7C5",
            "#954535",
            "#E23D28",
            "#DE6FA1",
            "#AA381E",
            "#856088",
            "#FFB200",
            "#7B3F00",
            "#D2691E",
            "#98817B",
            "#E34234",
            "#CD607E",
            "#E4D00A",
            "#9FA91F",
            "#7F1734",
            "#6F4E37",
            "#B9D9EB",
            "#F88379",
            "#8C92AC",
            "#B87333",
            "#DA8A67",
            "#AD6F69",
            "#CB6D51",
            "#996666",
            "#FF3800",
            "#FF7F50",
            "#F88379",
            "#893F45",
            "#FBEC5D",
            "#6495ED",
            "#FFF8DC",
            "#2E2D88",
            "#FFF8E7",
            "#81613C",
            "#FFBCD9",
            "#FFFDD0",
            "#DC143C",
            "#9E1B32",
            "#F5F5F5",
            "#00FFFF",
            "#00B7EB",
            "#58427C",
            "#FFD300",
            "#F56FA1",
            "#654321",
            "#5D3954",
            "#008B8B",
            "#536878",
            "#B8860B",
            "#006400",
            "#1A2421",
            "#BDB76B",
            "#483C32",
            "#543D37",
            "#8B008B",
            "#556B2F",
            "#FF8C00",
            "#9932CC",
            "#301934",
            "#8B0000",
            "#E9967A",
            "#8FBC8F",
            "#3C1414",
            "#8CBED6",
            "#483D8B",
            "#2F4F4F",
            "#177245",
            "#00CED1",
            "#9400D3",
            "#555555",
            "#DA3287",
            "#FAD6A5",
            "#B94E48",
            "#004B49",
            "#FF1493",
            "#FF9933",
            "#00BFFF",
            "#4A646C",
            "#7E5E60",
            "#1560BD",
            "#2243B6",
            "#C19A6B",
            "#EDC9AF",
            "#696969",
            "#1E90FF",
            "#967117",
            "#00009C",
            "#EFDFBB",
            "#555D50",
            "#C2B280",
            "#1B1B1B",
            "#614051",
            "#F0EAD6",
            "#CCFF00",
            "#BF00FF",
            "#8F00FF",
            "#50C878",
            "#6C3082",
            "#B48395",
            "#AB4B52",
            "#CC474B",
            "#563C5C",
            "#00FF40",
            "#96C8A2",
            "#C19A6B",
            "#801818",
            "#B53389",
            "#DE5285",
            "#E5AA70",
            "#4F7942",
            "#6C541E",
            "#FF5470",
            "#683068",
            "#B22222",
            "#CE2029",
            "#E25822",
            "#EEDC82",
            "#A2006D",
            "#FFFAF0",
            "#228B22",
            "#A67B5B",
            "#856D4D",
            "#0072BB",
            "#FD3F92",
            "#86608E",
            "#9EFD38",
            "#D473D4",
            "#FD6C9E",
            "#C72C48",
            "#77B5FE",
            "#8806CE",
            "#E936A7",
            "#FF00FF",
            "#C154C1",
            "#E48400",
            "#87421F",
        ]

        #crntPath = []
        #crntNabours = []
        #pathStarted = false
        #crntElm
        #crntX
        #crntY

        #number = 0
        #factors = []

        #nabourListner

        #highLightColour = 'orange'
        #selectColour = 'blue'

        score = 0

        constructor(width, height) {
            this.#width = width ?? 10
            this.#height = height ?? 10
            var n = game.#numbs[Math.floor(Math.random() * game.#numbs.length)]
            this.#number = n.n
            this.#factors = n.f

            this.#gengrid()
            this.genElmGrid()
            this.#nabourListner = this.#nabourListnerN.bind(this)
        }

        #gengrid() {
            this.#grid = Array(this.#width).fill(undefined).map(t => new Array(this.#height));

            var unfilledSquares = this.#width * this.#height

            this.#factors.forEach(t => {
                var poz = this.getRandomPosition(true)
                this.#grid[poz.x][poz.y] = t
                unfilledSquares--
            })

            while (unfilledSquares--) {
                var poz = this.getRandomPosition(true)
                this.#grid[poz.x][poz.y] = this.#factors[Math.floor(Math.random() * this.#factors.length)]
            }
        }

        getNabouringCells(dx, dy) {
            var cells = []
            for (
                let x = Math.max(dx - 1, 0);
                x < Math.min(dx + 2, this.#width);
                x++
            ) {
                for (
                    let y = Math.max(dy - 1, 0);
                    y < Math.min(dy + 2, this.#height);
                    y++
                ) {
                    if (((x == dx) & (y == dy))) continue;
                    cells.push({
                        x: x,
                        y: y,
                        cell: this.#elmGrid[x][y]
                    })
                }
            }
            return cells
        }

        addColour(elm, colour) {
            var colors = JSON.parse(elm.getAttribute('colours')) ?? []
            if (colors.includes(colour)) return;
            colors.push(colour)
            elm.setAttribute('colours', JSON.stringify(colors))
            elm.style.background = this.genrateConicGradient(colors)
        }

        removeColour(elm, colour) {
            var colors = JSON.parse(elm.getAttribute('colours')) ?? []
            colors = colors.filter(t => t != colour)
            elm.setAttribute('colours', JSON.stringify(colors))
            elm.style.background = this.genrateConicGradient(colors)
        }

        beginPath(elm, x, y) {
            this.#crntX = x
            this.#crntY = y
            this.#crntElm = elm

            this.addColour(this.#crntElm, this.#selectColour)

            this.#pathStarted = true
            this.#crntPath.push(elm)
            this.#crntElm.setAttribute('selectable', "false")
            this.#crntNabours = this.getNabouringCells(x, y)
            this.#crntNabours.forEach(t => {
                this.addColour(t.cell, this.#highLightColour)
                t.cell.setAttribute('selectable', "true")
            })
        }

        addPoint(elm, x, y) {
            this.#crntElm = elm
            this.#crntPath.push(this.#crntElm)
            this.#crntElm.setAttribute('selectable', "false")
            this.#crntX = x
            this.#crntY = y

            this.#crntNabours.forEach(t => {
                this.removeColour(t.cell, this.#highLightColour)
                t.cell.setAttribute('selectable', 'false')
            })
            this.#crntNabours = this.getNabouringCells(x, y)
                .filter(t =>
                    !this.#crntPath.includes(t.cell)
                )
            this.#crntNabours.forEach(t => {
                this.addColour(t.cell, this.#highLightColour)
                t.cell.setAttribute('selectable', 'true')
            })

            this.addColour(this.#crntElm, this.#selectColour)
        }

        endPath() {
            this.#crntNabours.forEach(t => {
                this.removeColour(t.cell, this.#highLightColour)
            })

            var path = this.#crntPath.map(t => Number(t.innerText)).sort((a, b) => a - b)

            if (
                (path.reduce((prev, crnt) => crnt * prev, 1) == this.#number) &
                (!this.#attemptedPaths.includes(path.join('-')))
            ) {
                var colour = this.#colours.splice(Math.floor(Math.random() * this.#colours.length), 1)[0]

                this.score += this.#crntPath.reduce((crnt, prev) => {
                    this.removeColour(prev, this.#selectColour)
                    this.addColour(prev, colour)
                    prev.setAttribute('selectable', 'false')

                    return (Math.ceil(Number(prev.innerText) / 25) + crnt)
                }, 0)

                this.#attemptedPaths.push(path.join('-'))
            } else {
                alert('Invalid Path')
                this.#crntPath.forEach((t) => {
                    this.removeColour(t, this.#selectColour)
                    t.setAttribute('selectable', 'false')
                })
            }

            this.#crntNabours = []
            this.#crntPath = []
            this.#crntX = 0
            this.#crntY = 0
            this.#crntElm = undefined
            this.#pathStarted = false
        }

        /**
         * @param {string[]} colors 
         */
        genrateConicGradient(colors) {
            if (colors.length == 0) return '';
            var offset = 0
            var str = 'conic-gradient( '
            var int = 360 / colors.length
            for (let i = 0; i < (colors.length); i++) {
                str += `${colors[i]} ${((i * int) + offset) % 360}deg ${(((i + 1) * int) + offset) % 360}deg${(i + 1) == colors.length ? '' : ','} `
            }
            str += ')'
            return str
        }

        /**
         * @param {MouseEvent} e 
         * @param {HTMLDataElement} e 
         */
        #nabourListnerN(elm, e) {
            console.log(e.buttons)
            if (e.buttons != 1) return;
            if (!JSON.parse(elm.getAttribute('selectable'))) return;
            var x = Number(e.target.getAttribute('x')),
                y = Number(e.target.getAttribute('y'))
            this.addPoint(
                this.#elmGrid[x][y],
                x, y
            )
        }

        /**
         * 
         * @param {HTMLTableCellElement} elm 
         * @param {number} x 
         * @param {number} y 
         */
        #provideFunctionality(elm, x, y) {
            elm.addEventListener('mousedown', (() => {
                if (this.#pathStarted) return;
                this.beginPath(elm, x, y)
            }).bind(this))
        }

        genElmGrid() {
            this.#elmGrid = Array(this.#width).fill(undefined).map(t => new Array(this.#height));
            this.gridElm = document.createElement('table')
            for (let x = 0; x < this.#width; x++) {
                var row = document.createElement('tr')
                for (let y = 0; y < this.#height; y++) {
                    this.#elmGrid[x][y] = document.createElement('td')
                    this.#elmGrid[x][y].innerText = this.#grid[x][y]
                    this.#elmGrid[x][y].setAttribute('x', x)
                    this.#elmGrid[x][y].setAttribute('y', y)
                    this.#elmGrid[x][y].setAttribute('selectable', 'false')
                    this.#elmGrid[x][y].addEventListener('mousedown', this.#nabourListnerN.bind(this, this.#elmGrid[x][y]))
                    this.#elmGrid[x][y].addEventListener('mouseover', this.#nabourListnerN.bind(this, this.#elmGrid[x][y]))
                    row.appendChild(this.#elmGrid[x][y])
                    this.#provideFunctionality(this.#elmGrid[x][y], x, y)
                }
                this.gridElm.appendChild(row)
            }
            return this.gridElm
        }

        /**
         * 
         * @param {boolean} filtered 
         * @returns {{x:number,y:number}}
         */
        getRandomPosition(filtered) {
            var x = Math.floor(Math.random() * this.#height),
                y = Math.floor(Math.random() * this.#width);
            if (!filtered) {
                return {
                    x: x,
                    y: y
                }
            } else {
                while (this.#grid[x][y]) {
                    x = Math.floor(Math.random() * this.#height)
                    y = Math.floor(Math.random() * this.#width)
                }
                return {
                    x: x,
                    y: y
                }
            }

        }

        static #numbs = [{ n: 0, f: [0] }]
        static async init(lvl = 1) {
            var req = new XMLHttpRequest()
            req.open('GET', `assets/lvl${lvl}.json`)
            req.send()
            await new Promise(r => req.addEventListener('load', r))
            this.#numbs = JSON.parse(req.responseText)
        }

        get number() { return this.#number }
        get factors() { return this.#factors }
        get attempts() { return this.#attemptedPaths }
    }

    if (document.readyState != 'complete') await new Promise(r => document.addEventListener('DOMContentLoaded', r));
    var factorisation = document.getElementById('factorisation')

    async function initGame(level) {
        await game.init(level)

        var ssGame = new game()
        globalThis.ssGame = ssGame
        var finish = document.createElement('button')
        var number = document.createElement('p')
        var score = document.createElement('p')

        finish.id = "finish"
        number.id = "number"
        score.id = "score"
        ssGame.gridElm.id = "gameGrid"
        factorisation.textContent = `Factors of ${ssGame.number}: ${ssGame.factors.join(', ')}`

        finish.classList.add('finish')
        number.classList.add('number')
        score.classList.add('score')

        finish.innerText = 'Finish Attempt'
        number.innerText = `Number: ${ssGame.number}`
        score.innerText = `Score: ${ssGame.score}`

        finish.addEventListener('click', () => {
            ssGame.endPath()
            score.innerText = `Score: ${ssGame.score}`
        })

        document.getElementById('gameGrid').replaceWith(ssGame.gridElm)
        document.getElementById('finish').replaceWith(finish)
        document.getElementById('number').replaceWith(number)
        document.getElementById('score').replaceWith(score)
    }


    var select = document.getElementById('level')
    for (let i = 1; i <= 10; i++) {
        var option = document.createElement('option')
        option.value = i
        option.textContent = i
        select.appendChild(option)
    }
    select.value = "10"
    select.addEventListener('change', async () => {
        var res = blockView()
        initGame(Number(select.value))
        res()
    })

    await initGame(10)
})()

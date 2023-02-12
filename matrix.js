const process = require('process')

let matrixData = []
let matrix = []

let cols = 0, rows = 0
const randConst = 20

const randomChar = () => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&()[]"[Math.floor(Math.random() * 72)]

function init() {
	[cols, rows] = process.stdout.getWindowSize()
	matrixData = []
	matrix = []

	for (let c = 0; c < cols; c++) { matrix.push((new Array(rows)).fill(false)) }
	for (let c = 0; c < cols; c++) { matrixData.push({ state: false, charsLeft: Math.floor(Math.random() * randConst) }) }
}

function replaceChars() {
	for (const colN in matrixData) {
		const col = matrixData[colN]
		if (col.charsLeft <= 0) {
			col.charsLeft = (col.state * 3) * Math.floor(Math.random() * randConst) + 9
			col.state = !col.state
		}
		col.charsLeft--
		matrix[colN].pop()
		matrix[colN].unshift(col.state)
	}
}

console.log('\033[40m')

function update() {
	var output = ""
	replaceChars()
	for (let x = 0; x < rows; x++) {
		for (let y = 0; y < cols; y++) {
			output +=
				((matrix[y][x + 1] ?? true) != matrix[y][x] ? '\033[37m' : "") +
				(matrix[y][x] ? randomChar() : " ") +
				((matrix[y][x + 1] ?? true) != matrix[y][x] ? '\033[32m' : "")
		}
		output += "\n"
	}
	console.clear()
	console.log(output)
}

init()
setInterval(update, 50)
process.stdout.addListener('resize', init)
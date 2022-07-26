const fs = require('fs')

const vcal = fs.readFileSync('calender.ics').toString('ascii')

function phraseIcalObjectstr(str = '') {
    var lines = str.split('\n').map(t => t.split(':', 2).map(t => t.trim())).map(t => ({ name: t[0], value: t[1] }))
    var out = {}
    var indexs = []


    for (var i of lines) {
        switch (i.name) {
            case 'BEGIN':
                var trgtArr = indexs.reduce((prev, crnt, i) => prev[crnt], out)
                trgtArr[i.value] ??= []
                indexs.push(i.value, trgtArr[i.value].length)
                trgtArr[i.value].push({})
                break;
            case 'END':
                indexs.splice(-2, 2)
                break;
            default:
                indexs.reduce((prev, crnt, i) => prev[crnt], out)[i.name] = i.value
                break;
        }
    }

    return out
}

fs.writeFileSync('out.json', JSON.stringify(phraseIcalObjectstr(vcal)))
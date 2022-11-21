var secSize = 500

function genNmbers(p) {
    const fs = require('fs')
    
    var start = 50 + (secSize * p)
    var end = 500 + (secSize * p)
    
    function factors(n) {
        let arr = [];
        for (let i = 3; i < Math.floor(n / 2); i++) {
            if (n % i === 0) {
                arr.push(i);
            }
        }
        return arr;
    }
    
    var numbs = []
    
    for (let i = start; i < end; i+=2) {
        var f = factors(i)
        if (f.length > 6) {
            numbs.push({
                n: i,
                f: f
            })
        }
    }
    
    fs.writeFileSync(`assets/lvl${p + 1}.json`, JSON.stringify(numbs))
}

for (let p = 0; p < 10; p++) {
    genNmbers(p)
}
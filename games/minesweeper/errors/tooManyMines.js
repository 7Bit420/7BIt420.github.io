class tooManyMinesError extends Error() { 
    constructor(width, height) { 
        super(`Too Many Mines, with a grid of ${width}x${height} you can have a maximim of ${(width*height)-1} mines`) 
    } 
}

export default tooManyMinesError
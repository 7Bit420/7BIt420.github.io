(async () => {
    var worker = new Worker('scripts/js/calanderLoader.js')

    worker.addEventListener('message', (ev)=>{
        console.log(ev.data)
    })
})()
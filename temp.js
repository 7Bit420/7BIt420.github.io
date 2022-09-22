(async () => {
    var wsam = (await (await fetch('test.wasm')).arrayBuffer());

    globalThis.wsamInstance = await WebAssembly.instantiate(wsam, {
        wasi_snapshot_preview1: {
            fd_seek: console.log.bind(console, "fd_seek"),
            fd_write: console.log.bind(console, "fd_write"),
            fd_close: console.log.bind(console, "fd_close"),
            proc_exit: console.log.bind(console, "proc_exit"),
        },
        env: {
            emscripten_memcpy_big: console.log.bind(console, "emscripten_memcpy_big")
        }
    })
})()
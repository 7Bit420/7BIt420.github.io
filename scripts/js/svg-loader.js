(async () => {
    if (!(document.readyState == ("interactive" || "complete"))) {
        await new Promise(res => document.addEventListener('DOMContentLoaded', res, { once: true }))
    }
    Array.from(document.getElementsByTagName('svg')).forEach(svg => {
        var src = svg.getAttribute('src')
        if (!src) return;

        var req = new XMLHttpRequest()
        req.open('GET', src)
        req.addEventListener('load', () => {
            var n = req.responseXML.firstElementChild
            Array.from(svg.attributes).forEach(t => n.setAttribute(t.name, t.value))
            if (req.responseXML) svg.replaceWith(n)
        })
        req.send()
    })
})()
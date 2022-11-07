(async () => {
    var searchPrams = new URLSearchParams(location.search)

    var req = new XMLHttpRequest()
    req.open('POST', 'https://api.onlinevideoconverter.pro/api/convert')
    req.send(JSON.stringify({
        converter: "ffmpeg-mp3",
        url: 'https://youtu.be/' + searchPrams.get('v')
    }))

    await new Promise(res => req.onload = res)

    console.log(req.responseText)
})()
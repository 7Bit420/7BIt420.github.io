function within(a, x, b) {
    return (a <= x) && (x <= b)
}

(async () => {
    const ICalender = (await import('/scripts/js/phrasers/icalPhraser.js')).default
    const textCal = await fetch('/resources/calanders/calender.ics')
    var calander = new ICalender(await textCal.text())

    var offset = 1000 * 60 * 60 * 24
    var time = Date.now() - (new Date().getTimezoneOffset() * 1000)

    console.log(calander.VEvents.filter(t =>
        within(time - offset, t.starts[0], time + offset)
    ))
})()

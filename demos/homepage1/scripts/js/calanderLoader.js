function within(a,x,b) {
    return (a <= x) && (x <= b)
}

(async () => {
    const ICalender = (await import('/scripts/js/phrasers/icalPhraser.js')).default
    const textCal = await fetch('/resources/calanders/calender.ics')
    var calander = new ICalender(await textCal.text())

    var offset = 1000 * 60 * 60 * 24

    console.log(calander.toJSON())
    console.log(calander.VEvents.filter(t =>
        within(Date.now(), t.starts[0], Date.now() + offset)
    ))
    console.log(new Date(calander.VEvents[47].starts[0] - (1000 * (57 * 1000))), calander.VEvents[47])
})()

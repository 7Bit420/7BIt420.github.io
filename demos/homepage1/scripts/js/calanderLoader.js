(async () => {
    const ICalender = (await import('/scripts/js/phrasers/icalPhraser.js')).default
    const textCal = await fetch('/resources/calanders/calender.ics')
    var calander = new ICalender(await textCal.text())

    var offset = 1000 * 60 * 2

    console.log(calander.toJSON())
    console.log(calander.VEvents.filter(t =>
        (t.starts[0] <= (Date.now() - offset)) &&
        (t.starts[0] <= (Date.now() + offset))
    ))
})()

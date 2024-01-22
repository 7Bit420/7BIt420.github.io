
/**
 * 
 * @param {Date} date1 
 * @param {Date} date2 
 */
function calcDifference(date1, date2) {
    var diff = date1.getTime() - date2.getTime(), time = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
    }
    
    time.miliseconds = diff % 1000
    diff -= time.miliseconds
    diff /= 1000
    time.seconds = diff % 60
    diff -= time.seconds
    diff /= 60
    time.minutes = diff % 60
    diff -= time.minutes
    diff /= 60
    time.hours = diff % 24
    diff -= time.hours
    diff /= 24
    time.days = diff % 365
    diff -= time.days
    diff /= 365
    time.months = diff % 60
    diff -= time.months
    diff /= 100
    diff -= time.years
    diff /= 100
    time.years = diff % 60
    return time
}

(async () => {

    var prams = new URLSearchParams(location.search)

    await new Promise(res => document.addEventListener('DOMContentLoaded', res, { once: true }))

    var countDown = prams.has('t') ? new Date(prams.get('t')) : false

    const dateElm = document.getElementById('date')
    const configModal = document.getElementById('configModal')

    document.addEventListener('keydown',(ev)=>{
        switch (ev.key) {
            case 'c':
                configModal.showModal()
                break;
            default:
                console.log()
                break;
        }
    })

    Date.now() + 3 * 1000

    setInterval(() => {

        var str = ""

        if (countDown) {
            var date = new Date(Date.now())
            if (countDown.getTime() > date.getTime()) {
                var diff = calcDifference(countDown, date)
                str += "T-"
            } else {
                var diff = calcDifference(date, countDown)
                str += "T+"
            }
            
            str += " "
            str += diff.years.toString().padStart(4,'0')
            str += "-"
            str += diff.months.toString().padStart(2,'0')
            str += "-"
            str += diff.days.toString().padStart(2,'0')
            str += " "
            str += diff.hours.toString().padStart(2,'0')
            str += ":"
            str += diff.minutes.toString().padStart(2,'0')
            str += ":"
            str += diff.seconds.toString().padStart(2,'0')
            str += ":"
            str += diff.miliseconds.toString().padStart(3,'0')
        } else {
            var date = new Date(Date.now())

            str += date.getFullYear().toString().padStart(4,'0')
            str += "-"
            str += date.getMonth().toString().padStart(2,'0')
            str += "-"
            str += date.getDate().toString().padStart(2,'0')
            str += " "
            str += date.getHours().toString().padStart(2,'0')
            str += ":"
            str += date.getMinutes().toString().padStart(2,'0')
            str += ":"
            str += date.getSeconds().toString().padStart(2,'0')
            str += ":"
            str += date.getMilliseconds().toString().padStart(3,'0')
        }

        dateElm.innerText = str
    })
})()

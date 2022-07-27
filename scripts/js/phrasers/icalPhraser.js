export class ICalender {

    #events = []
    #todos = []
    #jornals = []
    #freeBuzy = []
    #calander = {}
    #vertion = ''
    #timezones = []

    static #phraseIcalToJSON(str = '') {
        var lines = str.split('\n')

        for (let i = 0; i < lines.length; i++) {
            while (lines[i + 1]?.[0] == ' ') {
                try {
                    lines[i] += (lines[i + 1]?.trimStart() ?? '')
                    lines.splice(i + 1, 1)
                } catch (err) { }
            }
            lines[i] = lines[i].replace(/\\n/g, '\n')
            switch (true) {
                case /^\w*:/.test(lines[i]):
                    lines[i] = (t => ({ name: t[0], value: t[1] }))(lines[i].split(':', 2).map(t => t.trim()))
                    break;
                case /^\w*;/.test(lines[i]):
                    lines[i] = (t => ({ name: t[0], value: t[1].split(',') }))(lines[i].split(';', 2).map(t => t.trim()))
            }
        }

        var out = {}
        var indexs = []


        for (var i of lines) {
            switch (i.name) {
                case 'BEGIN':
                    var trgtArr = indexs.reduce((prev, crnt, i) => prev[crnt], out)
                    trgtArr[i.value] ??= []
                    indexs.push(i.value, trgtArr[i.value].length)
                    trgtArr[i.value].push({})
                    break;
                case 'END':
                    indexs.splice(-2, 2)
                    break;
                default:
                    indexs.reduce((prev, crnt, i) => prev[crnt], out)[i.name] = i.value
                    break;
            }
        }

        return out
    }

    constructor(str) {
        if (typeof str != 'string') throw new TypeError('str needs to be an ical string')

        this.#calander = ICalender.#phraseIcalToJSON(str).VCALENDAR[0]

        this.#vertion = this.#calander.VERSION

        this.#timezones = this.#calander.VTIMEZONE?.map(t => new VTimeZone(t)) ?? []
        this.#events = this.#calander.VEVENT?.map(t => new VEvent(t, this.#timezones)) ?? []
        this.#todos = this.#calander.VTODO?.map(t => new VTodo(t)) ?? []
        this.#jornals = this.#calander.VJOURNAL?.map(t => new VJournal(t)) ?? []
        this.#freeBuzy = this.#calander.VFREEBUSY?.map(t => new VFreeBusy(t)) ?? []
    }

    get VJournals() { return this.#jornals }
    get VFreeBusys() { return this.#freeBuzy }
    get VTodos() { return this.#todos }
    get VEvents() { return this.#events }

    toJSON() { return this.#calander }
}

class VEvent {

    #obj = {
        "CREATED": "20210720T032841Z",
        "UID": "000959BC-2376-41AA-822C-A856D0C63F4E",
        "DTEND": [
            "TZID=Australia/Melbourne:20211117T101000"
        ],
        "SUMMARY": "Day - 1\\, English  Mr Cutinelli  8",
        "DTSTAMP": "20210720T032841Z",
        "DTSTART": [
            "TZID=Australia/Melbourne:20211117T092500"
        ],
        "SEQUENCE": "0"
    }


    constructor(obj, TZInfo) {
        Object.assign(this.#obj, obj)
        this.#obj.DTEND = this.#obj.DTEND.map(this.#stringToDate)
        this.#obj.DTSTART = this.#obj.DTSTART.map(this.#stringToDate)
    }

    #stringToDate(t) {
        var str = t.replace(/[\w\"]*TZID=[\w\"]*\/[\w\"]*:/, '')

        return (Date.UTC(
            Number(str.substring(0, 4)),
            Number(str.substring(4, 6)),
            Number(str.substring(6, 8)),
            Number(str.substring(9, 11)),
            Number(str.substring(11, 13))
        ))

    }

    get created() { return this.#obj.CREATED }
    get uid() { return this.#obj.UID }
    get summary() { return this.#obj.SUMMARY }
    get dateStamp() { return this.#obj.DTSTAMP }
    get sequence() { return this.#obj.SEQUENCE }
    get starts() { return this.#obj.DTSTART }
    get ends() { return this.#obj.DTEND }

}

class VTodo {

    constructor(obj) {

    }

}

class VJournal {

    constructor(obj) {

    }

}

class VFreeBusy {

    constructor(obj) {

    }

}

class VTimeZone {

    constructor(obj) {
        
    }

}

export default ICalender

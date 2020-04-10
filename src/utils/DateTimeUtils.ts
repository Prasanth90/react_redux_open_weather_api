export interface IDateTimeObject {
    year: number
    month: string
    day: string
    date: number
    hours: number
    minutes: string
    ampm: string
}

export default class DateTimeUtils {
    public static getDateTimeObject(utcTime: number, timezone: string) {
        const myObj = new Date((utcTime) * 1000)
        const convertedDateString = myObj.toLocaleString("en-US", {timeZone: timezone})
        const dateTimeObject = new Date(convertedDateString)
        const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        const days = ['Sunday', 'Monday', 'Tuesday','Wednesday', 'Thursday', 'Friday', 'Saturday']
        let hours = dateTimeObject.getHours()
        const ampm = hours >= 12 ? 'pm' : 'am'
        hours = hours % 12;
        hours = hours ? hours : 12;
        return {
            year: dateTimeObject.getFullYear(),
            month: months[dateTimeObject.getMonth()],
            day: days[dateTimeObject.getDay()],
            date: dateTimeObject.getDate(),
            hours: hours,
            ampm: ampm,
            minutes: ("0" + dateTimeObject.getMinutes()).slice(-2)
        }
    }

    public static getTime(utcTime: number | undefined, timezone: string | undefined) {
        if(utcTime && timezone) {
            const dt : IDateTimeObject  = this.getDateTimeObject(utcTime, timezone)
            return `${dt.hours} ${dt.ampm}`
        }
    }

    public static getTimeWithMins(utcTime: number | undefined, timezone: string | undefined) {
        if(utcTime && timezone) {
            const dt : IDateTimeObject  = this.getDateTimeObject(utcTime, timezone)
            return `${dt.hours}:${dt.minutes} ${dt.ampm}`
        }
    }

    public static getDayDateMonth(utcTime: number | undefined, timezone: string | undefined) {
        if(utcTime && timezone) {
            const dt : IDateTimeObject  = this.getDateTimeObject(utcTime, timezone)
            return `${dt.day} ${dt.date}, ${dt.month}`
        }
    }

    public static getDayDateMonthTime(utcTime: number | undefined, timezone: string | undefined) {
        if(utcTime && timezone) {
            const dt : IDateTimeObject  = this.getDateTimeObject(utcTime, timezone)
            return `${dt.month}, ${dt.day} ${dt.date} ${dt.hours}:${dt.minutes} ${dt.ampm}`
        }
    }
}
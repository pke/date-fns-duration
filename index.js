const dateFunctions = require("date-fns")

const ISO_PERIOD = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/

module.exports = function addDuration(date, duration) {
  date = (typeof date === "string") ? dateFunctions.parseISO(date) : dateFunctions.toDate(date)
  if (isNaN(date.getTime())) {
    throw new TypeError(`invalid date: "${date}"`)
  }
  duration = duration.trim()
  const matches = ISO_PERIOD.exec(duration)
  if (!matches || duration.length < 3) {
    throw new TypeError(`invalid duration: "${duration}". Must be an ISO 8601 duration. See https://en.wikipedia.org/wiki/ISO_8601#Durations`)
  }
  const prefix = matches[1] === "-" ? "sub" : "add"
  return ["Years", "Months", "Weeks", "Days", "Hours", "Minutes", "Seconds"].reduce((result, part, index) => {
    const value = matches[index+2] // +2 for full match and sign parts
    return value ? dateFunctions[prefix + part](result, value) : result
  }, date)
}
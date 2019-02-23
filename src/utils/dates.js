import moment from 'moment'

function dateToDayMonthYear(date) {
  return date ? moment(date).format('DD.MM.YYYY') : undefined
}

function dateToDayMonthYearDashed(date) {
  return date ? moment(date).format('DD-MM-YYYY') : undefined
}

function dateToYearMonthDay(date) {
  return moment(date).format('YYYY.MM.DD')
}

export { dateToYearMonthDay, dateToDayMonthYear, dateToDayMonthYearDashed }
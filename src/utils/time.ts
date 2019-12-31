const ONE_DAY = 1000 * 60 * 60 * 24

export const formatDateToInputString = (value?: Date) => {
  if (!value || !(value instanceof Date)) {
    return ''
  }

  return value.toISOString().split('T')[0]
}

type FormatDateOptions = {
  withoutZero?: boolean
  separator?: string
}

const addZero = (n: number) => String(n).padStart(2, '0')

export const getDayMonthYearFromTimestamp = (date: number) => {
  const d = new Date(date)

  const month = d.getMonth()
  const day = d.getDate()
  const year = d.getFullYear()

  return [day, month, year]
}

export const formatDate = (date: number, options: FormatDateOptions = {}): string => {
  const { withoutZero, separator = '.' } = options
  const [day, month, year] = getDayMonthYearFromTimestamp(date)

  if (withoutZero) {
    return [day, month + 1, year].join(separator)
  }

  return [addZero(day), addZero(month + 1), year].join(separator)
}

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate()
}

export const monthsDiff = (start: number, end: number) => {
  const startDate = new Date(start)
  const endDate = new Date(end)

  return (
    Math.abs(endDate.getMonth() - startDate.getMonth()) +
    12 * Math.abs(endDate.getFullYear() - startDate.getFullYear())
  )
}

export const getStartOfDay = (date: number) => new Date(date).setHours(0, 0, 0)
export const getEndOfDay = (date: number) => new Date(date).setHours(23, 59, 59)

export const daysDiff = (start: number, end: number) => Math.round(Math.abs(end - start) / ONE_DAY)

const ONE_DAY = 1000 * 60 * 60 * 24

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

export const getStartOfDay = (date: number) => new Date(date).setHours(0, 0, 0)
export const getEndOfDay = (date: number) => new Date(date).setHours(23, 59, 59)

export const daysDiff = (start: number, end: number) => Math.round(Math.abs(end - start) / ONE_DAY)

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

export const formatDate = (date: number, options: FormatDateOptions = {}): string => {
  const { withoutZero, separator = '.' } = options
  const [day, month, year] = getDayMonthYearFromTimestamp(date)

  if (withoutZero) {
    return [day, month + 1, year].join(separator)
  }

  return [addZero(day), addZero(month + 1), year].join(separator)
}

export const getDayMonthYearFromTimestamp = (date: number) => {
  const d = new Date(date)

  const month = d.getMonth()
  const day = d.getDate()
  const year = d.getFullYear()

  return [day, month, year]
}

export const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate()
}

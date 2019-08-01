export const MINUTE = 1000 * 60
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR

export function subtractTime(
  date: Date,
  days: number = 0,
  hours: number = 0,
  minutes: number = 0
): Date {
  return new Date(date.valueOf() - days * DAY - hours * HOUR - minutes * MINUTE)
}

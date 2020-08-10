import {
  daysDiff,
  formatDate,
  getDayMonthYearFromTimestamp,
  getEndOfDay,
  getStartOfDay,
} from '../time'

const date = Date.UTC(2019, 0, 1)

describe('time', () => {
  describe('formatDate', () => {
    it('возвращает отформатированную дату', () => {
      expect(formatDate(date)).toBe('01.01.2019')
    })

    it('возвращает отформатированную дату с разделителем "-"', () => {
      expect(formatDate(date, { separator: '-' })).toBe('01-01-2019')
    })

    it('возвращает отформатированную дату без дополнительных нулей', () => {
      expect(formatDate(date, { withoutZero: true })).toBe('1.1.2019')
    })
  })

  describe('getDayMonthYearFromTimestamp', () => {
    it('возвращает корректные значения', () => {
      expect(getDayMonthYearFromTimestamp(date)).toEqual([1, 0, 2019])
    })
  })

  describe('daysDiff', () => {
    it('возвращает количество дней между двух дат', () => {
      expect(daysDiff(date, Date.UTC(2019, 0, 28))).toBe(27)
    })

    it('возвращает положительное количество дней между двух дат, если даты переданы в обратном порядке', () => {
      expect(daysDiff(Date.UTC(2019, 0, 28), date)).toBe(27)
    })
  })

  describe('getEndOfDay', () => {
    it('возвращает конец дня', () => {
      expect(getEndOfDay(date)).toBe(1546376399000)
    })
  })

  describe('getStartOfDay', () => {
    it('возвращает начало дня', () => {
      expect(getStartOfDay(date)).toBe(1546290000000)
    })
  })
})

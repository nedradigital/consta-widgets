import {
  daysDiff,
  formatDate,
  getDayMonthYearFromTimestamp,
  getDaysInMonth,
  monthsDiff,
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

  describe('monthsDiff', () => {
    it('возвращает количество месяцев между двух дат', () => {
      expect(monthsDiff(date, Date.UTC(2019, 11, 1))).toBe(11)
    })

    it('возвращает положительное количество месяцев между двух дат, если даты переданы в обратном порядке', () => {
      expect(monthsDiff(Date.UTC(2019, 11, 1), date)).toBe(11)
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

  describe('getDaysInMonth', () => {
    it('возвращает количество дней в месяце', () => {
      expect(getDaysInMonth(2, 2019)).toBe(28)
    })

    it('возвращает количество дней в феврале для высокосного года', () => {
      expect(getDaysInMonth(2, 2020)).toBe(29)
    })
  })
})

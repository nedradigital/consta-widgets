import { isValidDate } from '@/common/utils/type-guards'

describe('type-guards', () => {
  describe('isValidDate', () => {
    it('возвращает true, если передан валидный объект даты', () => {
      expect(isValidDate(new Date(2020, 6, 6))).toBeTruthy()
      expect(isValidDate(new Date('2020-07-06'))).toBeTruthy()
    })

    it('возвращает false, если передан невалидный объект даты', () => {
      expect(isValidDate(new Date('some text'))).toBeFalsy()
    })

    it('возвращает false, если передан не объект даты', () => {
      expect(isValidDate('2020-06-06')).toBeFalsy()
      expect(isValidDate(undefined)).toBeFalsy()
      expect(isValidDate(true)).toBeFalsy()
      expect(isValidDate(null)).toBeFalsy()
    })
  })
})

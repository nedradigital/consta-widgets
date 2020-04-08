import { isValueSelected } from '../'

describe('isValueSelected', () => {
  const minDate = new Date(2019, 0, 1)
  const maxDate = new Date(2020, 3, 1)

  describe('переданное значение - одна дата', () => {
    it('возвращает true, если значение календарно совпадает с переданной датой', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 2),
          value: new Date(2019, 0, 2),
          minDate,
          maxDate,
        })
      ).toBeTruthy()
    })

    it('возвращет false, если значение календарно не совпадает с переданной датой', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 2),
          value: new Date(2019, 0, 3),
          minDate,
          maxDate,
        })
      ).toBeFalsy()
    })

    it('возвращет false, если значение календарно совпадает с переданной датой, но за пределами разрешенных дат', () => {
      expect(
        isValueSelected({
          date: new Date(2018, 0, 1),
          value: new Date(2018, 0, 1),
          minDate,
          maxDate,
        })
      ).toBeFalsy()
      expect(
        isValueSelected({
          date: new Date(2021, 0, 1),
          value: new Date(2022, 0, 1),
          minDate,
          maxDate,
        })
      ).toBeFalsy()
    })

    it('возвращет false, если значение не задано', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 2),
          value: undefined,
          minDate,
          maxDate,
        })
      ).toBeFalsy()
    })
  })

  describe('переданное значение - диапазон дат', () => {
    const range = [new Date(2019, 0, 10), new Date(2019, 0, 12)] as const

    it('возвращает true, если значение представлено полностью и дата календарно в пределах этого значения', () => {
      expect(
        isValueSelected({ date: new Date(2019, 0, 11), value: range, minDate, maxDate })
      ).toBeTruthy()
    })

    it('возвращает true, если первая дата значения позже второй', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 11),
          value: [range[1], range[0]],
          minDate,
          maxDate,
        })
      ).toBeTruthy()
    })

    it('возвращает true, если значение представлено полностью и дата календарно на границах этого значения', () => {
      expect(isValueSelected({ date: range[0], value: range, minDate, maxDate })).toBeTruthy()
      expect(isValueSelected({ date: range[1], value: range, minDate, maxDate })).toBeTruthy()
    })

    it('возвращает false, если значение представлено полностью и дата календарно за пределами этого значения', () => {
      expect(
        isValueSelected({ date: new Date(2019, 0, 13), value: range, minDate, maxDate })
      ).toBeFalsy()
    })

    it('возвращает false, если значение представлено полностью, дата календарно в пределах этого значения, но за пределами разрешенных дат', () => {
      expect(
        isValueSelected({
          date: new Date(2019, 0, 13),
          value: [new Date(2018, 0, 1), new Date(2021, 0, 1)],
          minDate,
          maxDate,
        })
      ).toBeFalsy()
    })

    it('возвращает true, если значение представлено одной датой и дата календарно совпадает с ней', () => {
      expect(
        isValueSelected({ date: range[0], value: [range[0], undefined], minDate, maxDate })
      ).toBeTruthy()
      expect(
        isValueSelected({ date: range[1], value: [undefined, range[1]], minDate, maxDate })
      ).toBeTruthy()
    })

    it('возвращает false, если значение представлено одной датой и дата календарно не совпадает с ней', () => {
      expect(
        isValueSelected({ date: range[1], value: [range[0], undefined], minDate, maxDate })
      ).toBeFalsy()
      expect(
        isValueSelected({ date: range[0], value: [undefined, range[1]], minDate, maxDate })
      ).toBeFalsy()
    })

    it('возвращет false, если значение не задано', () => {
      expect(
        isValueSelected({ date: new Date(2019, 0, 10), value: undefined, minDate, maxDate })
      ).toBeFalsy()
      expect(
        isValueSelected({
          date: new Date(2019, 0, 10),
          value: [undefined, undefined],
          minDate,
          maxDate,
        })
      ).toBeFalsy()
    })
  })
})

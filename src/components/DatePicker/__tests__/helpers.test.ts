import MockDate from 'mockdate'

import { getCurrentVisibleDate } from '../helpers'

describe('getCurrentVisibleDate', () => {
  const currentDate = new Date(2020, 4, 15)

  beforeAll(() => {
    return MockDate.set(currentDate)
  })

  afterAll(() => {
    return MockDate.reset()
  })

  describe('если значение не задано', () => {
    it('возвращает текущую дату, если её месяц полностью входит в разрешенные границы', () => {
      expect(
        getCurrentVisibleDate({
          minDate: new Date(2020, 3, 1),
          maxDate: new Date(2020, 5, 1),
        })
      ).toEqual(currentDate)
    })

    it('возвращает текущую дату, если её месяц частично входит в минимальные границы', () => {
      expect(
        getCurrentVisibleDate({
          minDate: new Date(2020, 4, 16),
          maxDate: new Date(2020, 5, 14),
        })
      ).toEqual(currentDate)
    })

    it('возвращает текущую дату, если её месяц частично входит в максимальные границы', () => {
      expect(
        getCurrentVisibleDate({
          minDate: new Date(2020, 2, 16),
          maxDate: new Date(2020, 4, 14),
        })
      ).toEqual(currentDate)
    })

    it('возвращает минимальную дату, если месяц текущей заканчивается ранее минимальной', () => {
      const minDate = new Date(2020, 5, 15)

      expect(
        getCurrentVisibleDate({
          minDate,
          maxDate: new Date(2020, 6, 15),
        })
      ).toEqual(minDate)
    })

    it('возвращает максимальную дату, если месяц текущей начинается позже максимальной', () => {
      const maxDate = new Date(2020, 3, 15)

      expect(
        getCurrentVisibleDate({
          minDate: new Date(2020, 2, 15),
          maxDate,
        })
      ).toEqual(maxDate)
    })
  })

  describe('если значение задано', () => {
    const minDate = new Date(2020, 2, 15)
    const maxDate = new Date(2020, 6, 15)

    it('возвращает выбранную дату, если она задана', () => {
      const value = new Date(2020, 2, 25)

      expect(
        getCurrentVisibleDate({
          value,
          minDate,
          maxDate,
        })
      ).toEqual(value)
    })

    describe('если значение - диапазон дат', () => {
      const rangeStart = new Date(2020, 2, 15)
      const rangeEnd = new Date(2020, 2, 25)

      it('возвращает конец диапазона, если заданы начало и конец', () => {
        expect(
          getCurrentVisibleDate({
            minDate,
            maxDate,
            value: [rangeStart, rangeEnd],
          })
        ).toEqual(rangeEnd)
      })

      it('возвращает начало диапазона, если задано только начало', () => {
        expect(
          getCurrentVisibleDate({
            minDate,
            maxDate,
            value: [rangeStart, undefined],
          })
        ).toEqual(rangeStart)
      })

      it('возвращает конец диапазона, если задан только конец', () => {
        expect(
          getCurrentVisibleDate({
            minDate,
            maxDate,
            value: [undefined, rangeEnd],
          })
        ).toEqual(rangeEnd)
      })

      describe('если не заданы начало и конец', () => {
        it('возвращает текущую дату, если она полностью входит в разрешенные границы', () => {
          expect(
            getCurrentVisibleDate({
              minDate,
              maxDate,
              value: [undefined, undefined],
            })
          ).toEqual(currentDate)
        })

        it('возвращает текущую дату, если она частично входит в минимальные границы', () => {
          expect(
            getCurrentVisibleDate({
              minDate: new Date(2020, 4, 16),
              maxDate,
              value: [undefined, undefined],
            })
          ).toEqual(currentDate)
        })

        it('возвращает текущую дату, если она частично входит в максимальные границы', () => {
          expect(
            getCurrentVisibleDate({
              minDate,
              maxDate: new Date(2020, 4, 14),
              value: [undefined, undefined],
            })
          ).toEqual(currentDate)
        })

        it('возвращает минимальную дату, если месяц текущей заканчивается ранее минимальной', () => {
          const minDateRange = new Date(2020, 5, 15)

          expect(
            getCurrentVisibleDate({
              minDate: minDateRange,
              maxDate,
              value: [undefined, undefined],
            })
          ).toEqual(minDateRange)
        })

        it('возвращает максимальную дату, если месяц текущей начинается позже максимальной', () => {
          const maxDateRange = new Date(2020, 3, 15)

          expect(
            getCurrentVisibleDate({
              minDate: new Date(2020, 2, 15),
              maxDate: maxDateRange,
              value: [undefined, undefined],
            })
          ).toEqual(maxDateRange)
        })
      })
    })
  })
})

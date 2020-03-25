import { getDateOffsetOnTimeline } from '@/components/DatePicker/components/Timeline'

const TICK_WIDTH = 20
const NOT_ALLOWED_MONTHS_AMOUNT = 12

describe('<Timeline />', () => {
  describe('getDateOffsetOnTimeline', () => {
    it('возвращает отступ периода при отсутствии недоступных для выбора месяцев', () => {
      const date = new Date(2020, 5, 5)
      const minDate = new Date(2020, 4, 5)
      const ticksOutsideRange = 0

      expect(
        getDateOffsetOnTimeline({ date, minDate, tickWidth: TICK_WIDTH, ticksOutsideRange })
      ).toEqual(23)
    })

    it('возвращает отступ периода, если выбранная и минимальная дата находятся в одном и том же годе и месяце', () => {
      const date = new Date(2020, 2, 28)
      const minDate = new Date(2020, 2, 11)

      expect(
        getDateOffsetOnTimeline({
          date,
          minDate,
          tickWidth: TICK_WIDTH,
          ticksOutsideRange: NOT_ALLOWED_MONTHS_AMOUNT,
        })
      ).toEqual(258)
    })

    it('возвращает отступ периода, если выбранная и минимальная дата находятся в одном и том же годе и разных месяцах с разницей менее месяца', () => {
      const date = new Date(2019, 1, 8)
      const minDate = new Date(2019, 0, 25)

      expect(
        getDateOffsetOnTimeline({
          date,
          minDate,
          tickWidth: TICK_WIDTH,
          ticksOutsideRange: NOT_ALLOWED_MONTHS_AMOUNT,
        })
      ).toEqual(266)
    })

    it('возвращает отступ периода, если выбранная и минимальная дата находятся в одном и том же годе и разных месяцах с разницей более месяца', () => {
      const date = new Date(2019, 2, 8)
      const minDate = new Date(2019, 0, 1)

      expect(
        getDateOffsetOnTimeline({
          date,
          minDate,
          tickWidth: TICK_WIDTH,
          ticksOutsideRange: NOT_ALLOWED_MONTHS_AMOUNT,
        })
      ).toEqual(285)
    })

    it('возвращает отступ периода, если выбранная и минимальная дата находятся в разных годах с разницей менее месяца', () => {
      const date = new Date(2020, 0, 1)
      const minDate = new Date(2019, 11, 31)

      expect(
        getDateOffsetOnTimeline({
          date,
          minDate,
          tickWidth: TICK_WIDTH,
          ticksOutsideRange: NOT_ALLOWED_MONTHS_AMOUNT,
        })
      ).toEqual(261)
    })

    it('возвращает отступ периода, если выбранная и минимальная дата находятся в разных годах с разницей более месяца', () => {
      const date = new Date(2020, 2, 1)
      const minDate = new Date(2019, 11, 31)

      expect(
        getDateOffsetOnTimeline({
          date,
          minDate,
          tickWidth: TICK_WIDTH,
          ticksOutsideRange: NOT_ALLOWED_MONTHS_AMOUNT,
        })
      ).toEqual(301)
    })

    it('возвращает отступ периода, если выбранная и минимальная дата находятся в разных годах с разницей более года', () => {
      const date = new Date(2021, 0, 1)
      const minDate = new Date(2019, 11, 31)

      expect(
        getDateOffsetOnTimeline({
          date,
          minDate,
          tickWidth: TICK_WIDTH,
          ticksOutsideRange: NOT_ALLOWED_MONTHS_AMOUNT,
        })
      ).toEqual(501)
    })
  })
})

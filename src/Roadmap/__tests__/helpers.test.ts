import { getLineStyle, getMonths, getXCoordByDate, MARGIN_BETWEEN_BARS } from '../helpers'

describe('getMonths', () => {
  it('получение списка месяцев для одного года', () => {
    const months = getMonths(Date.UTC(2019, 0, 1), Date.UTC(2019, 1, 1))

    expect(months).toEqual([
      {
        value: 'янв',
        year: 2019,
        period: 'I',
      },
      {
        value: 'фев',
        year: 2019,
        period: undefined,
      },
    ])
  })

  it('получение списка месяцев для нескольких лет', () => {
    const months = getMonths(Date.UTC(2019, 11, 1), Date.UTC(2020, 0, 1))

    expect(months).toEqual([
      {
        value: 'дек',
        year: 2019,
        period: 'IV',
      },
      {
        value: 'янв',
        year: 2020,
        period: 'I',
      },
    ])
  })
})

describe('getStyle', () => {
  const monthWidth = 100

  it('получение стилей линии, без отступов', () => {
    const style = getLineStyle({
      graphStartDate: Date.UTC(2019, 0, 1),
      startDate: Date.UTC(2019, 0, 1),
      endDate: Date.UTC(2019, 1, 1),
      monthWidth,
      withMargin: false,
    })

    expect(style).toEqual({
      left: 0,
      width: monthWidth,
    })
  })

  it('получение стилей линии, с отступами', () => {
    const style = getLineStyle({
      graphStartDate: Date.UTC(2019, 0, 1),
      startDate: Date.UTC(2019, 0, 1),
      endDate: Date.UTC(2019, 1, 1),
      monthWidth,
      withMargin: true,
    })

    expect(style).toEqual({
      left: MARGIN_BETWEEN_BARS,
      width: monthWidth - MARGIN_BETWEEN_BARS,
    })
  })
})

describe('getXCoordByDate', () => {
  it('получение нулевой позиции если начальные даты совпадают', () => {
    const x = getXCoordByDate({
      startDate: Date.UTC(2019, 0, 1),
      graphStartDate: Date.UTC(2019, 0, 1),
      monthWidth: 100,
    })

    expect(x).toEqual(0)
  })

  it('получение позиции X равной размеру месяца, если даты отличаются в один месяц', () => {
    const x = getXCoordByDate({
      startDate: Date.UTC(2019, 1, 1),
      graphStartDate: Date.UTC(2019, 0, 1),
      monthWidth: 100,
    })

    expect(x).toEqual(100)
  })

  it('получение позиции X, если разница в датах меньше чем месяц', () => {
    const x = getXCoordByDate({
      startDate: Date.UTC(2019, 0, 15),
      graphStartDate: Date.UTC(2019, 0, 1),
      monthWidth: 100,
    })

    expect(x).toEqual(45)
  })
})

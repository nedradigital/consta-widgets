import { endOfDay, startOfDay } from 'date-fns'

import { getQuarters } from '../helpers'

const QUARTERS_START_AND_END = [
  [startOfDay(new Date(2019, 0, 1)), endOfDay(new Date(2019, 2, 31))],
  [startOfDay(new Date(2019, 3, 1)), endOfDay(new Date(2019, 5, 30))],
  [startOfDay(new Date(2019, 6, 1)), endOfDay(new Date(2019, 8, 30))],
  [startOfDay(new Date(2019, 9, 1)), endOfDay(new Date(2019, 11, 31))],
] as const

const date = new Date(2019, 6, 1)

describe('getQuarters', () => {
  it('возвращает кварталы, которые полностью попадают в разрешённые пределы', () => {
    const minDate = new Date(2019, 1, 1)
    const maxDate = new Date(2019, 12, 31)

    expect(getQuarters({ date, minDate, maxDate })).toEqual(QUARTERS_START_AND_END)
  })

  it('возвращает кварталы, которые частично попадают в разрешённые пределы', () => {
    const minDate = new Date(2019, 2, 31)
    const maxDate = new Date(2019, 9, 1)

    expect(getQuarters({ date, minDate, maxDate })).toEqual(QUARTERS_START_AND_END)
  })

  it('не возвращает кварталы, которые находятся вне разрешённых пределов', () => {
    const minDate = new Date(2019, 3, 1)
    const maxDate = new Date(2019, 8, 30)

    expect(getQuarters({ date, minDate, maxDate })).toEqual([
      [],
      QUARTERS_START_AND_END[1],
      QUARTERS_START_AND_END[2],
      [],
    ])
  })
})

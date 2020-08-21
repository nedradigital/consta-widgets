import { getSections, getSectionsForColumns } from '../helpers'

const scaler = (_size: number, value: number) => {
  return value
}

describe('getSections', () => {
  it('получение секций колонки', () => {
    const result = getSections({ size: 100, maxValue: 100, sections: undefined, scaler })

    expect(result).toEqual([])
  })

  it('Получение секций колонки, если список секций пустой', () => {
    const result = getSections({ size: 100, maxValue: 100, sections: [], scaler })

    expect(result).toEqual([])
  })

  it('Получение секций колонки, с пустыми значениями в секциях', () => {
    const result = getSections({
      size: 100,
      maxValue: 100,
      sections: [
        { color: 'red', value: 4 },
        { color: 'blue', value: undefined },
      ],
      scaler,
    })

    expect(result).toEqual([
      { color: 'red', value: 4, length: 4 },
      { color: 'blue', value: undefined },
    ])
  })

  it('Получение секций колонки, с укороченными длинными секциями', () => {
    const result = getSections({
      size: 100,
      maxValue: 100,
      sections: [
        { color: 'red', value: 90 },
        { color: 'blue', value: 1 },
        { color: 'yellow', value: 1 },
        { color: 'aquamarine', value: 1 },
        { color: 'black', value: 1 },
        { color: 'orange', value: 6 },
      ],
      scaler,
    })

    expect(result).toEqual([
      { color: 'red', value: 90, length: 90 },
      { color: 'blue', value: 1, length: 1 },
      { color: 'yellow', value: 1, length: 1 },
      { color: 'aquamarine', value: 1, length: 1 },
      { color: 'black', value: 1, length: 1 },
      { color: 'orange', value: 6, length: 6 },
    ])
  })
})

describe('getSectionsForColumns', () => {
  it('получение секций для колонок', () => {
    const result = getSectionsForColumns({
      columns: [
        undefined,
        {
          total: 100,
          sections: [
            { color: 'red', value: 50 },
            { color: 'blue', value: 50 },
          ],
        },
        { total: 0 },
      ],
      maxValue: 100,
      scaler,
      scalerSize: 100,
    })

    expect(result).toEqual({
      0: [],
      1: [
        { color: 'red', value: 50, length: 50 },
        { color: 'blue', value: 50, length: 50 },
      ],
      2: [],
    })
  })

  it('получение секций для колонок, если колонок нет', () => {
    const result = getSectionsForColumns({ columns: [], maxValue: 100, scaler, scalerSize: 100 })

    expect(result).toEqual({})
  })
})

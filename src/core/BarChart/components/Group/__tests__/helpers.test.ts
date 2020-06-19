import { getSections } from '../helpers'

const scaler = (_size: number, value: number) => {
  return value
}

describe('getSections', () => {
  it('получение секций колонки', () => {
    const result = getSections({ size: 100, sections: undefined, scaler })

    expect(result).toEqual([])
  })

  it('', () => {
    const result = getSections({ size: 100, sections: [], scaler })

    expect(result).toEqual([])
  })

  it('', () => {
    const result = getSections({
      size: 100,
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
})

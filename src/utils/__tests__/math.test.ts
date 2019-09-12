import { getAverageWeightedPercent } from '../math'

describe('getAverageWeightedPercent', () => {
  it('average in the beginning', () => {
    expect(getAverageWeightedPercent([1, 0, 0, 0])).toEqual(0)
  })

  it('average in the end', () => {
    expect(getAverageWeightedPercent([0, 0, 0, 1])).toEqual(100)
  })

  it('average in the middle', () => {
    expect(getAverageWeightedPercent([1, 0, 0, 0, 1])).toEqual(50)
  })

  it('average in the left part', () => {
    expect(getAverageWeightedPercent([4, 2, 2, 0])).toEqual(25)
  })

  it('average in the right part', () => {
    expect(getAverageWeightedPercent([0, 5, 5, 10])).toEqual(75)
  })
})

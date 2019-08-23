import { createArrayOfIndexes } from '../array'

describe('array', () => {
  it('createArrayOfIndexes returns clear array', () => {
    expect(createArrayOfIndexes(0)).toEqual([])
  })

  it('createArrayOfIndexes returns fill array', () => {
    expect(createArrayOfIndexes(5)).toEqual([0, 1, 2, 3, 4])
  })
})

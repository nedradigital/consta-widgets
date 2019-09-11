import { createArrayOfIndexes, move } from '../array'

describe('array', () => {
  it('createArrayOfIndexes returns clear array', () => {
    expect(createArrayOfIndexes(0)).toEqual([])
  })

  it('createArrayOfIndexes returns fill array', () => {
    expect(createArrayOfIndexes(5)).toEqual([0, 1, 2, 3, 4])
  })

  it('move returns array with moved element', () => {
    expect(move([1, 2, 3, 4, 5], 2, 0)).toEqual([3, 1, 2, 4, 5])
  })
})

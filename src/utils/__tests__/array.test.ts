import { createArrayOfIndexes, move, removeAt, updateAt } from '../array'

describe('array', () => {
  describe('createArrayOfIndexes', () => {
    it('returns clear array', () => {
      expect(createArrayOfIndexes(0)).toEqual([])
    })

    it('returns fill array', () => {
      expect(createArrayOfIndexes(5)).toEqual([0, 1, 2, 3, 4])
    })
  })

  describe('move', () => {
    it('returns array with moved element', () => {
      expect(move([1, 2, 3, 4, 5], 2, 0)).toEqual([3, 1, 2, 4, 5])
    })
  })

  describe('updateAt', () => {
    it('updates element at index', () => {
      expect(updateAt([0, 1, 2, 3], 2, 999)).toEqual([0, 1, 999, 3])
    })

    it('does nothing if index is out of bounds', () => {
      expect(updateAt([0, 1, 2, 3], 4, 999)).toEqual([0, 1, 2, 3])
    })
  })

  describe('removeAt', () => {
    it('removes element at index', () => {
      expect(removeAt([0, 1, 2, 3], 2)).toEqual([0, 1, 3])
    })

    it('does nothing if index is out of bounds', () => {
      expect(removeAt([0, 1, 2, 3], 4)).toEqual([0, 1, 2, 3])
    })
  })
})

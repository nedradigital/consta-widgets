import { getValueRange } from '../'

describe('getValueRange', () => {
  describe('single line', () => {
    const lines = [
      {
        values: [0, 1, 2, 3, 4, 5],
      },
    ]

    it('calculates range', () => {
      expect(getValueRange(lines, [0, 0], 0)).toEqual([0, 5])
    })

    it('calculates range with padding', () => {
      expect(getValueRange(lines, [0.2, 0.2], 0)).toEqual([-1, 6])
    })

    it('calculates range with padding and 2-digit precision', () => {
      expect(getValueRange(lines, [0.25, 0.25], 2)).toEqual([-1.25, 6.25])
    })
  })

  describe('multiple lines', () => {
    const lines = [
      {
        values: [-1, 0, 1, 2, 3, 4, 5],
      },
      {
        values: [-5, -4, -3, -2, -1, 0, 1],
      },
    ]

    it('calculates range', () => {
      expect(getValueRange(lines, [0, 0], 0)).toEqual([-5, 5])
    })

    it('calculates range with padding', () => {
      expect(getValueRange(lines, [0.2, 0.2], 0)).toEqual([-7, 7])
    })

    it('calculates range with padding and 2-digit precision', () => {
      expect(getValueRange(lines, [0.025, 0.025], 2)).toEqual([-5.25, 5.25])
    })
  })
})

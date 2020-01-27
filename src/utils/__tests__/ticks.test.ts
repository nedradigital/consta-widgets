import { getTicks } from '../ticks'

const domainOnlyPositiveValues = [0, 100] as const
const domainWithNegativeValues = [-100, 100] as const

describe('ticks', () => {
  describe('getTicks', () => {
    it('возвращает список для положительного домена и количества равного 1', () => {
      const result = getTicks(domainOnlyPositiveValues, 1)

      expect(result).toEqual([0, 100])
    })

    it('возвращает список для положительного домена и количества равного 2', () => {
      const result = getTicks(domainOnlyPositiveValues, 2)

      expect(result).toEqual([0, 100])
    })

    it('возвращает список для положительного домена и количества равного 3', () => {
      const result = getTicks(domainOnlyPositiveValues, 3)

      expect(result).toEqual([0, 50, 100])
    })

    it('возвращает список для домена с отрицательными значениями и количества равного 1', () => {
      const result = getTicks(domainWithNegativeValues, 1)

      expect(result).toEqual([-100, 0, 100])
    })

    it('возвращает список для домена с отрицательными значениями и количества равного 2', () => {
      const result = getTicks(domainWithNegativeValues, 2)

      expect(result).toEqual([-100, 0, 100])
    })

    it('возвращает список для домена с отрицательными значениями и количества равного 3', () => {
      const result = getTicks(domainWithNegativeValues, 3)

      expect(result).toEqual([-100, -50, 0, 50, 100])
    })
  })
})

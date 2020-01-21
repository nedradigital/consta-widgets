import { scaleLinear } from 'd3-scale'

import { getTicks } from '../ticks'

const getScaler = (domain: readonly number[]) => {
  return scaleLinear()
    .domain([...domain])
    .range([...domain])
}

const domainOnlyPositiveValues = [0, 100] as const
const domainWithNegativeValues = [-100, 100] as const

describe('ticks', () => {
  describe('getTicks', () => {
    it('возвращает список для положительного домена и количества равного 1', () => {
      const result = getTicks({
        items: domainOnlyPositiveValues,
        count: 1,
        scaler: getScaler(domainOnlyPositiveValues),
      })

      expect(result).toEqual([0, 100])
    })

    it('возвращает список для положительного домена и количества равного 2', () => {
      const result = getTicks({
        items: domainOnlyPositiveValues,
        count: 2,
        scaler: getScaler(domainOnlyPositiveValues),
      })

      expect(result).toEqual([0, 100])
    })

    it('возвращает список для положительного домена и количества равного 3', () => {
      const result = getTicks({
        items: domainOnlyPositiveValues,
        count: 3,
        scaler: getScaler(domainOnlyPositiveValues),
      })

      expect(result).toEqual([0, 50, 100])
    })

    it('возвращает список для домена с отрицательными значениями и количества равного 1', () => {
      const result = getTicks({
        items: domainWithNegativeValues,
        count: 1,
        scaler: getScaler(domainWithNegativeValues),
      })

      expect(result).toEqual([-100, 0, 100])
    })

    it('возвращает список для домена с отрицательными значениями и количества равного 2', () => {
      const result = getTicks({
        items: domainWithNegativeValues,
        count: 2,
        scaler: getScaler(domainWithNegativeValues),
      })

      expect(result).toEqual([-100, 0, 100])
    })

    it('возвращает список для домена с отрицательными значениями и количества равного 3', () => {
      const result = getTicks({
        items: domainWithNegativeValues,
        count: 3,
        scaler: getScaler(domainWithNegativeValues),
      })

      expect(result).toEqual([-100, -50, 0, 50, 100])
    })
  })
})

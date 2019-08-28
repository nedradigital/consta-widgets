import { getDurations, getDurationsGrid, getMaxDurationSteps } from '../duration'

describe('duration', () => {
  it('getMaxDurationSteps returns min value', () => {
    expect(getMaxDurationSteps(1)).toEqual(8)
  })

  it('getMaxDurationSteps returns another value', () => {
    expect(getMaxDurationSteps(12)).toEqual(12)
    expect(getMaxDurationSteps(95)).toEqual(8)
    expect(getMaxDurationSteps(96)).toEqual(16)
  })

  it('getDurationsGrid returns constant array if data is undefined', () => {
    expect(getDurationsGrid(undefined, 5)).toEqual([
      0,
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.7,
      0.8,
      0.9,
      1,
    ])
  })

  it('getDurationsGrid returns array of numbers', () => {
    expect(getDurationsGrid([1, 2, 3, 4, 5], 5)).toEqual([0, 0.2, 0.4, 0.6, 0.8, 1])
  })

  it('getDurations returns array of numbers', () => {
    expect(getDurations(5)).toEqual([0, 1, 2, 3, 4, 5])
    expect(getDurations(105)).toEqual([
      0,
      5,
      10,
      15,
      20,
      25,
      30,
      35,
      40,
      45,
      50,
      55,
      60,
      65,
      70,
      75,
      80,
      85,
      90,
      95,
      100,
      105,
    ])
  })
})
